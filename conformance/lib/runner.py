# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import os
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


@dataclasses.dataclass
class RunResult:
    """Single script execution outcome plus post-classification fields.

    Produced by Runner.run_command() and optionally refined by Classifier.classify().
    """
    # Stable identifier for reports (relative test path, maybe with a mode suffix)
    run_id: str | None = None
    # Final outcome: set by Classifier
    verdict: Verdict | None = None
    # Shell-renderable command string for reproducibility/debugging.
    command: str | None = None
    cwd: str | None = None
    # Original captured process streams
    stdout: str | None = None
    stderr: str | None = None
    # Refined output streams with engine-specific cleanups applied by Clasifier
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


class Runner:
    """Process executor: launches engine, captures output, measures resources.

    Classification (verdict/error_type) is intentionally separate – use Classifier.
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
