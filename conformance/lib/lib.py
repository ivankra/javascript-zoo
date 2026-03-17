# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import json
import os
import re
import resource
import shlex
import signal
import subprocess
import time
from enum import StrEnum
from typing import Any

from .config import EngineConfig


class Verdict(StrEnum):
    """Test result's coarse classification."""

    OK = "OK"
    FAILED = "failed"
    SKIPPED = "skipped"  # didn't run the test due to some filter


class ErrorType(StrEnum):
    """Fine-grained subcategories for FAIL/SKIP verdicts."""

    GENERIC = "generic"       # unclassified error / missing OK marker / generic Error exception
    CRASHED = "crashed"       # killed by a signal or runtime panic
    EXIT = "exit"             # non-zero exit code
    TIMEOUT = "timeout"
    # Standard JavaScript exception types
    SYNTAX_ERROR = "SyntaxError"
    REFERENCE_ERROR = "ReferenceError"
    TYPE_ERROR = "TypeError"
    EVAL_ERROR = "EvalError"
    RANGE_ERROR = "RangeError"
    URI_ERROR = "URIError"
    INTERNAL_ERROR = "InternalError"
    AGGREGATE_ERROR = "AggregateError"
    SUPPRESSED_ERROR = "SuppressedError"  # esnext
    # test262 errors
    TEST262_ERROR = "Test262Error"  # assert etc
    NEGATIVE = "Negative"           # negative test expectations mismatch
    ASYNC_TEST_FAILURE = "AsyncTestFailure"  # Test262:AsyncTestFailure
    NO_ASYNC_TEST_COMPLETE = "NoAsyncTestComplete"

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
    # Original captured process streams
    stdout: str | None = None
    stderr: str | None = None
    # Refined output streams with engine-specific cleanups applied by Arbiter
    stdout_cleaned: str | None = None
    stderr_cleaned: str | None = None
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

    def print_streams(self) -> None:
        """Print stdout and stderr with stream-prefixed lines."""
        for line in (self.stdout or "").rstrip().splitlines():
            print(f"  stdout> {line}")
        for line in (self.stderr or "").rstrip().splitlines():
            print(f"  stderr> {line}")

    def combined_output(self) -> str:
        """Merge stdout and stderr into a single string for parsing."""
        out = self.stdout_cleaned if self.stdout_cleaned is not None else (self.stdout or "")
        err = self.stderr_cleaned if self.stderr_cleaned is not None else (self.stderr or "")
        if not err:
            return out
        if not out:
            return err
        sep = "" if out.endswith("\n") else "\n"
        return f"{err}{sep}{out}"

    def verdict_message(self) -> str:
        """Render verdict plus optional error detail as a compact status string."""
        if self.verdict is None:
            return ""
        assert self.error_message not in ("OK", "skipped")
        if self.error_type in (ErrorType.GENERIC, ErrorType.EXIT):
            assert self.verdict == Verdict.FAILED
            return self.error_message or "failed"
        status = str(self.error_type or self.verdict)
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

    def __init__(self, config: EngineConfig) -> None:
        config.resolve()
        self.config = config
        self.current_proc: subprocess.Popen[bytes] | None = None

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

        raw_stdout = stdout_b.decode("utf-8", errors="replace")
        raw_stderr = stderr_b.decode("utf-8", errors="replace")

        if len(raw_stdout) > self.config.output_limit:
            raw_stdout = raw_stdout[: self.config.output_limit] + "\n... stdout truncated ...\n"
        if len(raw_stderr) > self.config.output_limit:
            raw_stderr = raw_stderr[: self.config.output_limit] + "\n... stderr truncated ...\n"

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
            stdout=raw_stdout,
            stderr=raw_stderr,
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
    if not replacements or not text:
        return text
    for cre, repl in replacements:
        text = cre.sub(repl, text)
    lines = [ln.rstrip() for ln in text.splitlines() if ln.strip()]
    return "\n".join(lines) + "\n" if lines else ""


# ---------------------------------------------------------------------------
# Arbiter
# ---------------------------------------------------------------------------

# Regex to match JS error constructor names in engine output.
_JS_ERROR_NAME_RE = re.compile(
        r"(?<!\bdoes not throw )"
        r"\b([A-Za-z_][A-Za-z0-9_]*Error)\b"
)

class Arbiter:
    """Convert a raw RunResult into verdict/error_type/error_message."""

    # Strip ANSI escape sequences (CSI codes) from all engine output by default.
    _ANSI_RE = re.compile(r"\x1b\[[0-9;]*[A-Za-z]")

    def __init__(self, config: EngineConfig) -> None:
        self._config = config
        self._warn_cres = [re.compile(p) for p in config.warnings_re]
        self._errors_cres = [re.compile(p) for p in config.errors_re]
        self._crash_cres = [re.compile(p) for p in config.crash_re]

        # Pattern coming from conformance/compat-table test's wrapper
        kangax_re = re.compile('(?:kangax|compat-table/|es[0-9])[^ :]+: exception: (?P<type>[A-Za-z]*Error)(?:: )?(?P<message>.*?)$')
        self._errors_cres.append(kangax_re)

        src = config.stdout_replace_re
        user = [(re.compile(p, re.MULTILINE), r) for d in (src if isinstance(src, list) else [src]) for p, r in d.items()]
        self._stdout_replace: list[tuple[re.Pattern[str], str]] = [(self._ANSI_RE, "")] + user
        src = config.stderr_replace_re
        user = [(re.compile(p, re.MULTILINE), r) for d in (src if isinstance(src, list) else [src]) for p, r in d.items()]
        self._stderr_replace: list[tuple[re.Pattern[str], str]] = [(self._ANSI_RE, "")] + user

    def classify(
        self,
        run: RunResult,
        *,
        ok_pattern: str | None = None,
        fail_pattern: str | None = None,
        expect_async: bool = False,
        strip_line_prefix: str | None = None,
    ) -> RunResult:
        """Classify run outcome; returns the same RunResult with fields set.

        Args:
            ok_pattern:        regex that must match a line for OK verdict.
            fail_pattern:      regex matching explicit failure lines from the test wrapper.
                               If both ok_pattern and fail_pattern match, test will fail.
            expect_async:      require Test262:AsyncTestComplete token (test262).
            strip_line_prefix: fixed string prefix stripped from the start of each error
                               message line (e.g. "test/foo.js: " added by test wrappers).
        """
        # Produce cleaned streams by applying engine-specific replacements.
        run.stdout_cleaned = apply_replacements(run.stdout or "", self._stdout_replace)
        run.stderr_cleaned = apply_replacements(run.stderr or "", self._stderr_replace)

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
            run.error_type = ErrorType.CRASHED
            signum = -run.exit_code
            try:
                run.error_message = signal.Signals(signum).name
            except ValueError:
                run.error_message = f"signal {signum}"
            return run

        # Check for runtime panic messages
        exc = (self._match_exception(run.stderr_cleaned or "", self._crash_cres) or
               self._match_exception(run.stdout_cleaned or "", self._crash_cres))
        if exc:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.CRASHED
            run.error_message = exc[1]
            self._shorten_message(run, strip_line_prefix=strip_line_prefix)
            return run

        output = run.combined_output().strip()
        lines = output.splitlines()
        ok_found = bool(ok_pattern and any(re.search(ok_pattern, ln) for ln in lines))
        fail_found = bool(fail_pattern and any(re.search(fail_pattern, ln) for ln in lines))
        errors = (self._collect_errors(run.stderr_cleaned or "", self._errors_cres) +
                  self._collect_errors(run.stdout_cleaned or "", self._errors_cres))

        # test262 async protocol checks
        if expect_async:
            if "Test262:AsyncTestFailure:" in output:
                m = re.search(r"Test262:AsyncTestFailure:\s*(.*)", output)
                run.verdict = Verdict.FAILED
                run.error_type = ErrorType.ASYNC_TEST_FAILURE
                run.error_message = m.group(1).strip() if m else None
                return run

            if "Test262:AsyncTestComplete" not in output:
                run.verdict = Verdict.FAILED
                run.error_type = ErrorType.NO_ASYNC_TEST_COMPLETE
                return run

        if ok_found and fail_found:
            # probably engine dumped a large block of source code with both markers
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.GENERIC
            run.error_message = "found both ok and fail markers"
            return run

        # TODO: fix ambiguous cases
        # jsish      es3/global.SyntaxError.thrown.js
        # metaes     compat-table/es2017/async.arrow-in-class.js
        # njs        compat-table/es2018/Promise.prototype.Finally.js
        # sophonjs   es3/Number.prototype.toExponential.throws-infinity.js
        # topchetoeu compat-table/es6/Promise.js (flaky)
        # yantra     compat-table/es2017/async.return.js
        # quad-wheel compat-table/es6/misc.for-in-no-assignment-strict.js,
        if ok_found and errors:
            assert self._config.engine in ('bali', 'jsish', 'metaes', 'njs', 'quad-wheel', 'sophonjs', 'topchetoeu', 'yantra'), \
                    f"OK marker and errors matched in test: {run.test_path}, stdout: {run.stdout}, stderr: {run.stderr}"

        if errors:
            best_et, best_msg = errors[0]
            for et, msg in errors:
                if et != ErrorType.GENERIC:
                    best_et, best_msg = et, msg
                    break
            msgs = [msg for _, msg in errors if msg]
            run.verdict = Verdict.FAILED
            run.error_type = best_et
            run.error_message = "\n".join(msgs) if msgs else None
            self._shorten_message(run, strip_line_prefix=strip_line_prefix)
            return run

        # Heuristic: scan output lines for the first JS error class name.
        if not errors:
            for line in output.splitlines():
                line_filt = line.removeprefix(strip_line_prefix or '')
                if run.test_path:
                    # don't trip on test filenames
                    line_filt = line.replace(os.path.basename(run.test_path), "<test>")
                for m in _JS_ERROR_NAME_RE.finditer(line_filt):
                    js_exc = ErrorType.from_js_error(m.group(1))
                    if js_exc is not None:
                        run.verdict = Verdict.FAILED
                        run.error_type = js_exc
                        run.error_message = line
                        self._shorten_message(run, strip_line_prefix=strip_line_prefix)
                        return run

        if (ok_pattern and not ok_found) or fail_found:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.GENERIC
            run.error_message = output or None
            self._shorten_message(run, strip_line_prefix=strip_line_prefix)
            return run

        # TODO: fix Promise.prototype.finally.js - many engines pass with non-zero exit code
        assert run.exit_code is not None
        if run.exit_code != 0 and 'es2018/Promise.prototype.finally.js' not in (run.test_path or ''):
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.EXIT
            run.error_message = f"exit code {run.exit_code}"
            return run

        run.verdict = Verdict.OK
        return run

    def _collect_errors(
        self, text: str, cres: list[re.Pattern[str]]
    ) -> list[tuple[ErrorType, str | None]]:
        """Collect all structured error matches from text lines, skipping warning lines."""
        results = []
        for line in text.splitlines():
            if self._warn_cres and any(r.search(line) for r in self._warn_cres):
                continue
            for cre in cres:
                m = cre.search(line)
                if m:
                    raw_type = m.group("type") if "type" in cre.groupindex else None
                    et = ErrorType.from_js_error(raw_type) if raw_type else None
                    message = m.group("message") if "message" in cre.groupindex else None
                    if et is None:
                        if raw_type:
                            message = f"{raw_type}: {message}" if message else raw_type
                        results.append((ErrorType.GENERIC, message or None))
                    else:
                        results.append((et, message or None))
                    break
        return results

    def _match_exception(
        self, text: str, cres: list[re.Pattern[str]]
    ) -> tuple[ErrorType, str | None] | None:
        """Return the first structured exception match, or None."""
        matches = self._collect_errors(text, cres)
        return matches[0] if matches else None

    def _shorten_message(self, run: RunResult, *, strip_line_prefix: str | None = None) -> None:
        if not run.error_message:
            return

        # Strip per-line prefix, drop empty lines, dedup, flatten to a single line
        lines = run.error_message.splitlines()
        if strip_line_prefix:
            lines = [ln[len(strip_line_prefix):] if ln.startswith(strip_line_prefix) else ln
                     for ln in lines]
        lines = [ln.strip() for ln in lines]
        lines = [ln for (i, ln) in enumerate(lines)
                 if ln.lower() not in ('', 'failed', 'error', 'undefined') and (i == 0 or ln != lines[i-1])]
        run.error_message = '; '.join(lines)

        # Shorten full absolute script path in messages to just
        # the basename of the original test file to keep messages
        # short and consistent between runs.
        for path in [run.script_path, run.test_path]:
            if path and path.startswith('/') and path in run.error_message:
                run.error_message = run.error_message.replace(path, os.path.basename(run.test_path or path))

        # Replace temporary script basename (from test262.py) with
        # the basename of the original test filename
        if 't262-temp-' in run.error_message and run.test_path:
            run.error_message = re.sub(
                    't262-temp-[a-z0-9-]+[.]js',
                    os.path.basename(run.test_path),
                    run.error_message
            )

        # Drop temp dir name from test262.py's staged module paths
        # to keep messages short and consistent between runs.
        if '/tmp/t262-mod' in run.error_message:
            run.error_message = re.sub('/tmp/t262-mod-[^/]+/', '', run.error_message)

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

        if run.error_type and run.error_type.endswith('Error') and run.error_message.startswith(run.error_type + ':'):
            run.error_message = run.error_message[len(run.error_type)+1:].strip()

        run.error_message = run.error_message.strip()
        if len(run.error_message) > 200:
            run.error_message = run.error_message[:200] + '...'

        if run.error_message and run.error_message.lower() in ('ok', 'error', 'fail', 'failed', 'skipped', str(run.error_type)):
            run.error_message = None

        if not run.error_message:
            run.error_message = None
