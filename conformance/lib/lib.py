# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import glob
import json
import os
import re
import resource
import shlex
import shutil
import signal
import subprocess
import time
from enum import StrEnum
from pathlib import Path
from typing import Any, Iterator

from .config import EngineConfig


class Verdict(StrEnum):
    """Test result's coarse classification."""

    OK = "OK"
    FAILED = "failed"
    SKIPPED = "skipped"  # didn't run the test due to some filter


class ErrorType(StrEnum):
    """Fine-grained subcategories for FAIL/SKIP verdicts."""

    GENERIC = "generic"       # unclassified error / generic Error exception
    CRASH = "crash"           # killed by a signal
    EXIT = "exit"             # non-zero exit code
    TIMEOUT = "timeout"
    MISSING_OK = "MissingOK"  # expected "...: OK" marker absent
    ASYNC_TEST_FAILURE = "AsyncTestFailure"  # Test262:AsyncTestFailure
    MISSING_ASYNC_TEST_COMPLETE = "MissingAsyncTestComplete"
    # Standard JavaScript exception types
    SYNTAX_ERROR = "SyntaxError"
    REFERENCE_ERROR = "ReferenceError"
    TYPE_ERROR = "TypeError"
    EVAL_ERROR = "EvalError"
    RANGE_ERROR = "RangeError"
    URI_ERROR = "URIError"
    INTERNAL_ERROR = "InternalError"
    AGGREGATE_ERROR = "AggregateError"
    # test262 exceptions (assertion etc)
    TEST262_ERROR = "Test262Error"
    # test262 negative-expectation mismatch
    NEGATIVE = "Negative"

    @classmethod
    def from_js_error(cls, exception_name: str) -> ErrorType | None:
        try:
            et = cls(exception_name)
            return et if et.value.endswith("Error") else None
        except ValueError:
            return None


# ---------------------------------------------------------------------------
# RunMetrics
# ---------------------------------------------------------------------------

@dataclasses.dataclass
class RunMetrics:
    """Normalized process resource metrics.

    Populated from resource.getrusage(RUSAGE_CHILDREN) deltas.
    Fields are None when the measurement was not available.
    """
    user_time: float | None = None
    sys_time: float | None = None
    real_time: float | None = None
    max_rss_kb: int | None = None
    io_in_blocks: int | None = None
    io_out_blocks: int | None = None
    ctx_switches_voluntary: int | None = None
    ctx_switches_involuntary: int | None = None


_RUN_METRICS_FIELDS = frozenset(f.name for f in dataclasses.fields(RunMetrics))


# ---------------------------------------------------------------------------
# RunResult
# ---------------------------------------------------------------------------

@dataclasses.dataclass
class RunResult:
    """Single script execution outcome plus post-classification fields.

    Produced by Runner.run_command() and optionally refined by Arbiter.classify().
    """
    # Stable identifier for reports (relative test path, maybe with a mode suffix).
    run_id: str | None = None
    # Final outcome: set by Arbiter after classification.
    verdict: Verdict | None = None
    # Shell-renderable command string for reproducibility/debugging.
    command: str | None = None
    cwd: str | None = None
    # Captured process streams (decoded with replacement for non-UTF8 output).
    stdout: str | None = None
    stderr: str | None = None
    # Coarse failure reason; for test262 negative maps to expected error class.
    error_type: ErrorType | None = None
    # Human-readable one-line explanation (None when error_type is self-explanatory).
    error_message: str | None = None
    # Sidecar build_metadata loaded from <engine>.json, carried for reporting.
    build_metadata: dict[str, Any] = dataclasses.field(default_factory=dict)
    # Concrete runnable script path passed to the engine
    # (usually a temp file containing the test code after preprocessing).
    script_path: str | None = None
    # Absolute path to the original test file (e.g. file in the checked out test262 tree).
    test_path: str | None = None
    # Raw subprocess return code; negative means terminated by signal (-N → signal N).
    exit_code: int | None = None
    # Resource metrics from rusage.
    metrics: RunMetrics = dataclasses.field(default_factory=RunMetrics)
    # Benchmark-specific numeric scores extracted from output.
    benchmarks: dict[str, int | float | None] = dataclasses.field(default_factory=dict)
    # Test262 features declared in this test's frontmatter (empty for non-test262 runs).
    features: frozenset[str] = dataclasses.field(default_factory=frozenset)

    def combined_output(self) -> str:
        """Merge stdout and stderr into a single string for parsing."""
        out = self.stdout or ""
        err = self.stderr or ""
        if not err:
            return out
        if not out:
            return err
        sep = "" if out.endswith("\n") else "\n"
        return f"{out}{sep}{err}"

    def verdict_message(self) -> str:
        """Render verdict plus optional error detail as a compact status string."""
        if self.verdict is None:
            return ""
        status = str(self.verdict)
        if self.error_type is not None and self.error_type not in (ErrorType.GENERIC, ErrorType.EXIT):
            if self.verdict is Verdict.FAILED:
                status = self.error_type.value
            else:
                status += f": {self.error_type.value}"
        if self.error_message:
            status += f": {self.error_message}"
        return status

    def to_dict(self) -> dict[str, Any]:
        d = dataclasses.asdict(self)
        if d.get("verdict") is not None:
            d["verdict"] = str(d["verdict"])
        if d.get("error_type") is not None:
            d["error_type"] = str(d["error_type"])
        return d

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> RunResult:
        allowed = {f.name for f in dataclasses.fields(cls)}
        unknown = sorted(set(data) - allowed)
        if unknown:
            raise ValueError(f"unknown RunResult fields: {unknown}")
        try:
            values = {k: data[k] for k in allowed if k in data}
            if values.get("verdict") is not None:
                values["verdict"] = Verdict(str(values["verdict"]))
            if values.get("error_type") is not None:
                values["error_type"] = ErrorType(str(values["error_type"]))
            if "metrics" in values and isinstance(values["metrics"], dict):
                values["metrics"] = RunMetrics(**{
                    k: v for k, v in values["metrics"].items()
                    if k in _RUN_METRICS_FIELDS
                })
            return cls(**values)
        except (TypeError, ValueError) as e:
            raise ValueError(f"invalid RunResult data: {e}") from e



# ---------------------------------------------------------------------------
# Runner
# ---------------------------------------------------------------------------

class Runner:
    """Process executor: launches engine, captures output, measures resources.

    Classification (verdict/error_type) is intentionally separate – use Arbiter.
    """

    # Strip ANSI escape sequences (CSI codes) from all engine output by default.
    _ANSI_RE = re.compile(r"\x1b\[[0-9;]*[A-Za-z]")

    def __init__(self, config: EngineConfig) -> None:
        self.config = config
        self.current_proc: subprocess.Popen[bytes] | None = None
        user = [(re.compile(p), r) for p, r in config.stdout_replace_re.items()]
        self._stdout_replace = [(self._ANSI_RE, "")] + user
        user = [(re.compile(p), r) for p, r in config.stderr_replace_re.items()]
        self._stderr_replace = [(self._ANSI_RE, "")] + user

    def run_command(
        self,
        argv: list[str],
        *,
        run_id: str | None = None,
        test_path: str | None = None,
        script_path: str | None = None,
        timeout_sec: float | None = None,
        cwd: str | None = None,
        env: dict[str, str] | None = None,
    ) -> RunResult:
        """Execute argv and return raw RunResult (verdict is not set here).

        Uses resource.getrusage(RUSAGE_CHILDREN) for timing/RSS measurements.
        Timeout is two-step: SIGTERM grace period (0.2s), then SIGKILL.
        """
        timeout = timeout_sec if timeout_sec is not None else self.config.timeout_sec
        run_cwd = cwd or self.config.cwd or os.getcwd()

        run_env = os.environ.copy()
        run_env.update(self.config.env)
        if env:
            run_env.update(env)

        ru_before = resource.getrusage(resource.RUSAGE_CHILDREN)
        start = time.monotonic()

        proc: subprocess.Popen[bytes] | None = None
        stdout_b = b""
        stderr_b = b""
        timed_out = False

        try:
            proc = subprocess.Popen(
                argv,
                cwd=run_cwd,
                env=run_env,
                stdin=subprocess.DEVNULL,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=False,
                # New session = dedicated process group; lets us kill wrappers/children.
                start_new_session=True,
            )
            self.current_proc = proc
            stdout_b, stderr_b = proc.communicate(timeout=timeout)
        except subprocess.TimeoutExpired:
            timed_out = True
            if proc is not None and proc.poll() is None:
                try:
                    os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
                except (ProcessLookupError, OSError):
                    pass
                try:
                    out, err = proc.communicate(timeout=0.2)
                    stdout_b += out
                    stderr_b += err
                except subprocess.TimeoutExpired:
                    try:
                        os.killpg(os.getpgid(proc.pid), signal.SIGKILL)
                    except (ProcessLookupError, OSError):
                        pass
                    out, err = proc.communicate()
                    stdout_b += out
                    stderr_b += err
        finally:
            self.current_proc = None
            wall = time.monotonic() - start

        ru_after = resource.getrusage(resource.RUSAGE_CHILDREN)

        stdout = stdout_b.decode("utf-8", errors="replace")
        stderr = stderr_b.decode("utf-8", errors="replace")

        stdout = apply_replacements(stdout, self._stdout_replace)
        stderr = apply_replacements(stderr, self._stderr_replace)

        if len(stdout) > self.config.output_limit:
            stdout = stdout[: self.config.output_limit] + "\n... stdout truncated ...\n"
        if len(stderr) > self.config.output_limit:
            stderr = stderr[: self.config.output_limit] + "\n... stderr truncated ...\n"

        metrics = RunMetrics(
            real_time=wall,
            user_time=max(0.0, float(ru_after.ru_utime - ru_before.ru_utime)),
            sys_time=max(0.0, float(ru_after.ru_stime - ru_before.ru_stime)),
            io_in_blocks=max(0, int(ru_after.ru_inblock - ru_before.ru_inblock)),
            io_out_blocks=max(0, int(ru_after.ru_oublock - ru_before.ru_oublock)),
            ctx_switches_voluntary=max(0, int(ru_after.ru_nvcsw - ru_before.ru_nvcsw)),
            ctx_switches_involuntary=max(0, int(ru_after.ru_nivcsw - ru_before.ru_nivcsw)),
        )
        if ru_after.ru_maxrss > 0:
            metrics.max_rss_kb = int(ru_after.ru_maxrss)

        run = RunResult(
            run_id=run_id,
            command=shlex.join(argv),
            cwd=str(run_cwd),
            stdout=stdout,
            stderr=stderr,
            exit_code=proc.returncode if proc is not None else None,
            metrics=metrics,
            test_path=test_path,
            script_path=script_path,
            build_metadata=self.config.build_metadata,
        )

        if timed_out:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.TIMEOUT
            run.error_message = f">{timeout:.0f}s"

        return run


def apply_replacements(text: str, replacements: list[tuple[re.Pattern[str], str]]) -> str:
    """Apply regex substitutions to text, then drop lines that became empty."""
    if not replacements:
        return text
    for cre, repl in replacements:
        text = cre.sub(repl, text)
    lines = [ln for ln in text.splitlines() if ln.strip()]
    return "\n".join(lines) + "\n" if lines else ""


# ---------------------------------------------------------------------------
# Arbiter
# ---------------------------------------------------------------------------

# Regex to match known JS error constructor names in engine output.
_ERROR_CLASS_RE = re.compile(r"\b([A-Za-z_][A-Za-z0-9_]*Error)\b(?!\.js\b)")
# Lines that look like runtime diagnostics (not just mentions of error type names).
_ERROR_CONTEXT_RE = re.compile(r"(?i)(?:error|exception|uncaught|panic|fatal|crash|thrown|throw)")
# Negative-test wording that should NOT be extracted as a thrown error type.
_ERROR_REJECT_RE = re.compile(
    r"(?i)(?:does not throw|no exception|wrong exception|expected.{1,40}to be thrown)"
)
# Generic error patterns
_ERROR_GENERIC_RE = re.compile(
    r"(?i)(?:error|panic|exception|uncaught|mismatch|failed|invalid|incorrect|unsupported|cannot|can't|timeout|crash)"
)

class Arbiter:
    """Convert a raw RunResult into verdict/error_type/error_message."""

    def __init__(self, config: EngineConfig) -> None:
        self._error_cres = [re.compile(p) for p in config.errors_re]
        self._warn_cres = [re.compile(p) for p in config.warnings_re]
        self._exc_cres = [re.compile(p) for p in config.exceptions_re]

        # Pattern coming from conformance/compat-table test's wrapper
        kangax_re = re.compile('(?:kangax|compat-table/|es[0-9])[^ :]+: exception: (?P<type>[A-Za-z]*Error)(?:: )?(?P<message>.*?)$')
        self._exc_cres.append(kangax_re)

    def classify(
        self,
        run: RunResult,
        *,
        expect_ok_pattern: str | None = None,
        expect_async: bool = False,
    ) -> RunResult:
        """Classify run outcome; returns the same RunResult with fields set.

        Args:
            expect_ok_pattern: regex that must match a line for OK verdict (conformance/test262).
            expect_async:       require Test262:AsyncTestComplete token (test262).
        """
        # Timeout was already classified by Runner.
        if run.error_type == ErrorType.TIMEOUT:
            run.verdict = Verdict.FAILED
            return run

        # Clear any stale classification from Runner.
        run.error_type = None
        run.error_message = None

        # Crash = negative exit code (terminated by signal).
        if run.exit_code is not None and run.exit_code < 0:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.CRASH
            signum = -run.exit_code
            try:
                run.error_message = signal.Signals(signum).name
            except ValueError:
                run.error_message = f"signal {signum}"
            return run

        # High-priority: structured exception pattern.
        exc = (self._match_exception(run.stdout or "", self._exc_cres) or
               self._match_exception(run.stderr or "", self._exc_cres))
        if exc:
            run.verdict = Verdict.FAILED
            run.error_type, run.error_message = exc
            self._shorten_message(run)
            return run

        output = run.combined_output()

        # test262 async protocol checks.
        if expect_async:
            if "Test262:AsyncTestFailure:" in output:
                m = re.search(r"Test262:AsyncTestFailure:\s*(.*)", output)
                run.verdict = Verdict.FAILED
                run.error_type = ErrorType.ASYNC_TEST_FAILURE
                run.error_message = m.group(1).strip() if m else None
                return run
            if "Test262:AsyncTestComplete" not in output:
                run.verdict = Verdict.FAILED
                run.error_type = ErrorType.MISSING_ASYNC_TEST_COMPLETE
                return run
            # Strip completion token line before further analysis.
            output = "\n".join(
                line for line in output.splitlines()
                if "Test262:AsyncTestComplete" not in line
            )

        # OK marker check (conformance / test262 positive tests).
        if expect_ok_pattern:
            ok_re = re.compile(expect_ok_pattern)
            if any(ok_re.search(line) for line in output.splitlines()):
                run.verdict = Verdict.OK
                return run

            # OK marker absent – look for a concrete diagnostic first.
            diag = self._best_error_line(output)
            if diag:
                run.verdict = Verdict.FAILED
                run.error_type, run.error_message = self._classify_line(diag)
                if run.error_message in ('failed', 'error'):
                    run.error_message = None
                self._shorten_message(run)
                return run

            if run.exit_code not in (0, None):
                run.verdict = Verdict.FAILED
                run.error_type = ErrorType.EXIT
                run.error_message = f"exit code {run.exit_code}"
                return run

            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.MISSING_OK
            return run

        # Look for generic error lines, then check exit code.
        diag = self._best_error_line(output)
        if diag:
            run.verdict = Verdict.FAILED
            run.error_type, run.error_message = self._classify_line(diag)
            self._shorten_message(run)
            return run

        if run.exit_code not in (0, None):
            et_result = self.extract_error_type_from_text(output)
            run.verdict = Verdict.FAILED
            if et_result:
                run.error_type, run.error_message = et_result
            else:
                run.error_type = ErrorType.EXIT
                run.error_message = f"exit code {run.exit_code}"
            return run

        run.verdict = Verdict.OK
        return run

    def extract_error_type_from_line(self, line: str) -> ErrorType | None:
        """Extract JS error type from a single output line, or None."""
        if _ERROR_REJECT_RE.search(line):
            return None
        names = [m.group(1) for m in _ERROR_CLASS_RE.finditer(line)]
        if not names:
            return None
        for name in names:
            et = ErrorType.from_js_error(name)
            if et is not None:
                return et
        return ErrorType.GENERIC

    def extract_error_type_from_text(self, text: str) -> tuple[ErrorType, str] | None:
        """Extract the first JS error type from multi-line output.

        Returns (error_type, source_line) — the line that triggered detection —
        or None if nothing was found.
        """
        lines = text.splitlines()

        # Pass 1: lines that look like runtime diagnostics.
        for line in lines:
            if not _ERROR_CONTEXT_RE.search(line):
                continue
            t = self.extract_error_type_from_line(line)
            if t:
                return t, line

        # Pass 2: fallback scan, skip conformance "...: OK" lines.
        for line in lines:
            if re.search(r":\s*OK\s*$", line):
                continue
            t = self.extract_error_type_from_line(line)
            if t:
                return t, line

        return None

    def _match_exception(
        self, text: str, cres: list[re.Pattern[str]]
    ) -> tuple[ErrorType, str | None] | None:
        """Scan text lines for a structured exception match; return (type, message) or None."""
        for line in text.splitlines():
            for cre in cres:
                m = cre.search(line)
                if m:
                    raw_type = m.group("type") if "type" in cre.groupindex else None
                    et = ErrorType.from_js_error(raw_type) if raw_type else None
                    message = m.group("message") if "message" in cre.groupindex else None
                    if et is None:
                        if raw_type:
                            message = f"{raw_type}: {message}" if message else raw_type
                        return ErrorType.GENERIC, message or None
                    return et, message or None
        return None

    def _best_error_line(self, output: str) -> str | None:
        """Return the first diagnostic error line, or None."""
        candidates = self._error_cres + [_ERROR_GENERIC_RE]
        for line in output.splitlines():
            line = line.strip()
            if not line:
                continue
            if any(r.search(line) for r in self._warn_cres):
                continue
            for r in candidates:
                m = r.search(line)
                if not m:
                    continue
                msg = m.groupdict().get("message")
                return msg.strip() if msg and msg.strip() else line
        return None

    def _shorten_message(self, run: RunResult) -> None:
        if not run.error_message:
            return

        for path in [run.script_path, run.test_path]:
            if path and path.startswith('/') and path in run.error_message:
                # Shorten full absolute script path to just basename in error messages
                run.error_message = run.error_message.replace(path, os.path.basename(path))

        while True:
            message = run.error_message
            assert message is not None
            lowered = message.lower()
            for prefix in ("error:", "failed:"):
                if lowered.startswith(prefix):
                    run.error_message = message[len(prefix):].strip()
                    break
            else:
                break

    def _classify_line(self, line: str) -> tuple[ErrorType, str | None]:
        """Map an error line to (ErrorType, message)."""
        # Strip common "path/test.js: " prefix.
        m = re.search(r"[^:\s]+\.js:\s*(.*)$", line)
        msg = m.group(1).strip() if m else line.strip()
        low = msg.lower()

        if "timeout" in low:
            return ErrorType.TIMEOUT, msg

        et_result = self.extract_error_type_from_text(msg)
        if et_result:
            return et_result

        return ErrorType.GENERIC, msg


# ---------------------------------------------------------------------------
# Utilities
# ---------------------------------------------------------------------------

UNAME_TO_GOARCH_MAP = {
    "x86_64": "amd64",
    "aarch64": "arm64",
    "armv7l": "arm",
    "i686": "386",
    "loongarch64": "loong64",
    "ppc64le": "ppc64le",
    "riscv64": "riscv64",
    "s390x": "s390x",
}


def docker_arch_name() -> str:
    """Return Docker/GOARCH-style architecture name (matches build.mk)."""
    machine = os.uname().machine
    return UNAME_TO_GOARCH_MAP.get(machine, machine)


def resolve_binary(path_or_name: str) -> Path:
    """Resolve engine binary: relative/absolute path or bare name via PATH."""
    if "/" in path_or_name:
        p = Path(path_or_name)
    else:
        found = shutil.which(path_or_name)
        p = Path(found) if found else Path(path_or_name)
    if not p.exists():
        raise SystemExit(f"{path_or_name}: not found")
    if not os.access(p, os.X_OK):
        raise SystemExit(f"{path_or_name}: not executable")
    return p.resolve()


def version_sort_key(name: str) -> list:
    """Sort key matching `sort -V`: letters sort before punctuation/symbols."""
    parts = re.split(r'(\d+)', name)
    return [int(p) if i % 2 else tuple(ord(c) if c.isalpha() else ord(c) + 128 for c in p)
            for i, p in enumerate(parts)]


def iterate_js_files(
    selectors: list[str],
    *,
    root: Path | None = None,
    exclude_re: list[re.Pattern[str]] | None = None,
) -> Iterator[str]:
    """Yield path strings for .js files matching selectors (always recursive, deduped).

    - Relative selectors resolve under root when provided.
    - Directories are walked recursively in deterministic name order.
    - exclude_re: skip paths whose string representation matches any pattern.
    - Returned strings are root-relative when root is provided, otherwise str(path).
    """

    def _walk_js_sorted(root: Path) -> Iterator[Path]:
        """Recursively yield .js files under root in deterministic name order."""
        with os.scandir(root) as it:
            entries = sorted(it, key=lambda e: version_sort_key(e.name))
        for entry in entries:
            p = Path(entry.path)
            if entry.is_dir(follow_symlinks=True):
                yield from _walk_js_sorted(p)
            elif p.suffix == ".js":
                yield p

    def _keep(p: Path) -> bool:
        if not exclude_re:
            return True
        s = str(p)
        return not any(pat.search(s) for pat in exclude_re)

    def _item(p: Path) -> str:
        if root is not None:
            try:
                return str(p.relative_to(root))
            except ValueError:
                pass
        return str(p)

    seen: set[str] = set()

    def _emit(p: Path) -> Iterator[str]:
        if not _keep(p):
            return
        s = _item(p)
        if s in seen:
            return
        seen.add(s)
        yield s

    for token in selectors:
        p = Path(token)
        if (
            root is not None
            and not p.is_absolute()
            and not token.startswith("./")
            and not token.startswith("../")
        ):
            rooted = root / p
            if rooted.exists() or any(c in token for c in "*?[]"):
                p = rooted

        if p.is_dir():
            for path in _walk_js_sorted(p):
                yield from _emit(path)
            continue

        if any(c in str(p) for c in "*?[]"):
            for item in sorted(glob.glob(str(p), recursive=True), key=lambda s: version_sort_key(s)):
                q = Path(item)
                if q.is_dir():
                    for path in _walk_js_sorted(q):
                        yield from _emit(path)
                elif q.is_file():
                    yield from _emit(q)
            continue

        if p.exists() and p.is_file():
            yield from _emit(p)


def read_json(path: Path, default: Any = None) -> Any:
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default
