# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import os
import re
import resource
import shlex
import signal
import subprocess
import sys
import threading
import time
from enum import StrEnum
from typing import TYPE_CHECKING, Any, Callable

from .config import EngineConfig

if TYPE_CHECKING:
    from .tags import Tags


class Verdict(StrEnum):
    """Test result's coarse classification."""

    OK = "OK"
    FAILED = "FAILED"
    SKIPPED = "SKIPPED"  # didn't run the test due to some filter


class ErrorType(StrEnum):
    """Fine-grained subcategories for FAILED/SKIPPED verdicts."""

    FAILED = "FAILED"    # unclassified error / missing OK marker / generic Error exception
    CRASHED = "CRASHED"  # killed by a signal or runtime panic
    TIMEOUT = "TIMEOUT"
    OOM = "OOM"
    # Non-zero exit code (low priority, only given when no better error type fits)
    EXIT = "EXIT"
    # Standard JavaScript exception types
    SYNTAX_ERROR = "SyntaxError"
    REFERENCE_ERROR = "ReferenceError"
    TYPE_ERROR = "TypeError"
    EVAL_ERROR = "EvalError"
    RANGE_ERROR = "RangeError"
    URI_ERROR = "URIError"
    INTERNAL_ERROR = "InternalError"
    AGGREGATE_ERROR = "AggregateError"
    SUPPRESSED_ERROR = "SuppressedError"
    # Test262Error exception (assertion failure, etc)
    TEST262_ERROR = "Test262Error"
    # Negative test passed or threw an unexpected error
    NEGATIVE = "NEGATIVE"
    # Got "Test262: This statement should not be evaluated."
    # Usually a negative syntax test that didn't get rejected.
    DONOTEVALUATE = "DONOTEVALUATE"
    # Got "Test262:AsyncTestFailure:..."
    ASYNC_TEST_FAILURE = "AsyncTestFailure"
    # Missing "Test262:AsyncTestComplete" marker
    NO_ASYNC_TEST_COMPLETE = "NO_ASYNC_TEST_COMPLETE"

    @classmethod
    def from_js_error(cls, exception_name: str) -> ErrorType | None:
        if exception_name == "Error":
            return ErrorType.FAILED
        try:
            et = cls(exception_name)
            return et if et.value.endswith("Error") else None
        except ValueError:
            return None


@dataclasses.dataclass
class RunRusage:
    """Normalized process resource usage metrics.

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

    def to_json(self) -> dict[str, Any]:
        data = dataclasses.asdict(self)
        for key in ("user_time", "sys_time", "real_time"):
            value = data.get(key)
            if value is not None:
                data[key] = round(value, 3)
        return data


_RUN_RUSAGE_FIELDS = frozenset(f.name for f in dataclasses.fields(RunRusage))


@dataclasses.dataclass
class RunResult:
    """Single script execution outcome plus post-classification fields.

    Produced by Runner.run_command() and optionally refined by Annotator.classify().
    """
    # Staging-path identifier for reports (includes .mjs rename, .strict/.sloppy suffix).
    run_id: str | None = None
    # Original test file path relative to test root (discovery key, e.g. "test/foo.js").
    # Used for grouping runs by file.  Defaults to run_id when not explicitly set.
    test_id: str | None = None
    # Final outcome: set by Annotator
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
    # Process group leader pid for the engine process tree.
    pid: int | None = None
    # Resource usage metrics from rusage.
    rusage: RunRusage = dataclasses.field(default_factory=RunRusage)
    # Benchmark-specific numeric scores extracted from output.
    benchmarks: dict[str, int | float | None] = dataclasses.field(default_factory=dict)
    tags: Tags | None = None
    # Execution mode: "strict" or "sloppy" (test262).
    mode: str = ""
    # Weight for compat-table's weighted pass rate calculation.
    weight: float | None = None

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
        assert self.error_message not in ("OK", "FAILED", "SKIPPED")
        if self.error_type in (ErrorType.FAILED, ErrorType.EXIT):
            # Format EXIT as simply their error message: "exit code N"
            assert self.verdict == Verdict.FAILED
            return self.error_message or "FAILED"
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
            if "rusage" in values and isinstance(values["rusage"], dict):
                values["rusage"] = RunRusage(**{
                    k: v for k, v in values["rusage"].items()
                    if k in _RUN_RUSAGE_FIELDS
                })
            return cls(**values)
        except (TypeError, ValueError) as e:
            raise ValueError(f"invalid RunResult data: {e}") from e


class Runner:
    """Process executor: launches engine, captures output, measures resources.

    Classification (verdict/error_type) is intentionally separate – use Annotator.
    """

    def __init__(self, config: EngineConfig, on_spawn: Callable[[int], None] | None = None) -> None:
        config.resolve()
        self.config = config
        self.on_spawn = on_spawn
        self.proc: subprocess.Popen[bytes] | None = None
        self.pgid: int | None = None

    def stop(self, sig: int = signal.SIGKILL) -> None:
        """Kill the active process group, if a command is still running."""
        if self.pgid is not None:
            try:
                os.killpg(self.pgid, sig)
            except (ProcessLookupError, OSError):
                pass

    def run_command(
        self,
        argv: list[str],
        *,
        run_id: str | None = None,
        test_id: str | None = None,
        test_path: str | None = None,
        script_path: str | None = None,
        timeout_sec: float | None = None,
        memory_limit_mb: int | None = None,
        memory_addr_limit_mb: int | None = None,
        cwd: str | None = None,
        env: dict[str, str] | None = None,
    ) -> RunResult:
        """Execute argv and return raw RunResult (verdict is not set here).

        Uses resource.getrusage(RUSAGE_CHILDREN) for timing/RSS measurements.
        Timeout is two-step: SIGTERM grace period (0.2s), then SIGKILL.
        Memory limit (when set) is enforced by polling /proc for group RSS.
        """
        timeout = timeout_sec or self.config.timeout_sec
        memory_limit_mb = memory_limit_mb or self.config.memory_limit_mb
        memory_addr_limit_mb = memory_addr_limit_mb or self.config.memory_addr_limit_mb
        run_cwd = cwd or self.config.cwd or os.getcwd()

        run_env = os.environ.copy()
        run_env.update(self.config.env)
        if env:
            run_env.update(env)

        ru_before = resource.getrusage(resource.RUSAGE_CHILDREN)
        start = time.monotonic()

        proc: subprocess.Popen[bytes] | None = None
        peak_watchdog_kb = 0
        oom_killed = False
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
                preexec_fn=((lambda: self._preexec_fn(memory_addr_limit_mb)) if memory_addr_limit_mb else None),
                # New session = dedicated process group; lets us kill wrappers/children.
                start_new_session=True,
            )
            self.proc = proc
            self.pgid = proc.pid
            if self.on_spawn is not None:
                self.on_spawn(proc.pid)
            watchdog: MemoryWatchdog | None = None
            if memory_limit_mb:
                watchdog = MemoryWatchdog.get()
                watchdog.start(proc, memory_limit_mb)
            try:
                stdout_b, stderr_b = proc.communicate(timeout=timeout)
            finally:
                if watchdog is not None:
                    peak_watchdog_kb, oom_killed = watchdog.stop()
                    watchdog = None
        except subprocess.TimeoutExpired:
            timed_out = True
            if proc is not None and proc.poll() is None:
                self.stop(signal.SIGKILL)
                out, err = proc.communicate()
                stdout_b += out
                stderr_b += err
        finally:
            # Kill any orphaned children in the process group
            if proc is not None:
                self.stop(signal.SIGKILL)
            self.proc = None
            self.pgid = None
            wall = time.monotonic() - start

        ru_after = resource.getrusage(resource.RUSAGE_CHILDREN)

        stdout = stdout_b.decode("utf-8", errors="replace")
        stderr = stderr_b.decode("utf-8", errors="replace")

        if len(stdout) > self.config.output_limit:
            stdout = stdout[: self.config.output_limit] + "\n..."
        if len(stderr) > self.config.output_limit:
            stderr = stderr[: self.config.output_limit] + "\n..."

        rusage = RunRusage(
            real_time=wall,
            user_time=max(0.0, float(ru_after.ru_utime - ru_before.ru_utime)),
            sys_time=max(0.0, float(ru_after.ru_stime - ru_before.ru_stime)),
            io_in_blocks=max(0, int(ru_after.ru_inblock - ru_before.ru_inblock)),
            io_out_blocks=max(0, int(ru_after.ru_oublock - ru_before.ru_oublock)),
            ctx_switches_voluntary=max(0, int(ru_after.ru_nvcsw - ru_before.ru_nvcsw)),
            ctx_switches_involuntary=max(0, int(ru_after.ru_nivcsw - ru_before.ru_nivcsw)),
        )
        peak_rusage = int(ru_after.ru_maxrss) if ru_after.ru_maxrss > 0 else 0
        if peak_watchdog_kb or peak_rusage:
            rusage.max_rss_kb = max(peak_watchdog_kb, peak_rusage)

        run = RunResult(
            run_id=run_id,
            test_id=test_id or run_id,
            command=shlex.join(argv),
            cwd=str(run_cwd),
            stdout=stdout,
            stderr=stderr,
            exit_code=proc.returncode if proc is not None else None,
            pid=proc.pid if proc is not None else None,
            rusage=rusage,
            test_path=test_path,
            script_path=script_path,
            build_metadata=self.config.build_metadata,
        )

        if oom_killed:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.OOM
            run.error_message = f">{memory_limit_mb}MB"
        elif timed_out:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.TIMEOUT
            run.error_message = f">{timeout:.0f}s"

        return run

    @staticmethod
    def _preexec_fn(memory_addr_limit_mb: int | None) -> None:
        if memory_addr_limit_mb is not None:
            limit_bytes = int(memory_addr_limit_mb) * 1024 * 1024
            resource.setrlimit(resource.RLIMIT_AS, (limit_bytes, limit_bytes))


class MemoryWatchdog:
    """Process-wide singleton: one daemon thread polls /proc on a fixed
    cadence and writes peak RSS / OOM-kill state into shared fields.
    """

    POLL_SEC = 0.05  # ~20 Hz
    PAGE_SIZE = os.sysconf("SC_PAGESIZE")

    _instance: MemoryWatchdog | None = None
    _instance_lock = threading.Lock()
    _atfork_registered = False

    @classmethod
    def get(cls) -> MemoryWatchdog:
        """Return the per-process singleton, creating it on first call."""
        inst = cls._instance
        if inst is not None:
            return inst
        with cls._instance_lock:
            if cls._instance is None:
                cls._instance = cls()
            return cls._instance

    def __init__(self) -> None:
        # State guarded by self._lock. The polling thread runs on its own
        # POLL_SEC timer — start() does NOT wake it. This avoids the
        # per-call notify+context-switch cost on the runner's hot path.
        # Tradeoff: a process exiting in <POLL_SEC is never sampled
        # (peak_rss stays 0; runner falls back to ru_maxrss from rusage).
        self._lock = threading.Lock()
        self._pid = 0  # 0 when idle; also the session identity
        self._limit_bytes = 0
        self._peak_rss = 0  # bytes
        self._oom_killed = False
        threading.Thread(target=self._run, daemon=True).start()

    def start(self, proc: subprocess.Popen[bytes], limit_mb: int) -> None:
        """Install a new monitoring session. Returns immediately."""
        with self._lock:
            self._pid = proc.pid
            self._limit_bytes = limit_mb * 1024 * 1024
            self._peak_rss = 0
            self._oom_killed = False

    def stop(self) -> tuple[int, bool]:
        """Detach the current session and return (peak_rss_kb, oom_killed)."""
        with self._lock:
            self._pid = 0
            return self._peak_rss // 1024, self._oom_killed

    def _run(self) -> None:
        while True:
            time.sleep(self.POLL_SEC)
            with self._lock:
                pid = self._pid
                limit_bytes = self._limit_bytes
            if pid == 0:
                continue
            rss = self._read_tree_rss(pid)
            if rss is None:
                continue
            with self._lock:
                if self._pid != pid:
                    continue
                if rss > self._peak_rss:
                    self._peak_rss = rss
                if rss > limit_bytes:
                    self._oom_killed = True
                    self._pid = 0
                    print(f"memory watchdog: killing pid={pid} rss={rss / (1024 * 1024):.1f}MB limit={limit_bytes // (1024 * 1024)}MB", file=sys.stderr, flush=True)
                    try:
                        os.killpg(pid, signal.SIGKILL)
                    except (ProcessLookupError, OSError):
                        pass

    @classmethod
    def _read_tree_rss(cls, root_pid: int) -> int | None:
        """Sum RSS (in bytes) of root_pid and all its descendants."""
        total_pages = 0
        seen: set[int] = set()
        stack = [root_pid]
        root_ok = False
        while stack:
            p = stack.pop()
            if p in seen:
                continue
            seen.add(p)
            try:
                with open(f"/proc/{p}/statm", "rb") as f:
                    statm = f.read()
                # statm: size resident shared text lib data dirty (in pages)
                resident = int(statm.split(b" ", 2)[1])
                total_pages += resident
                if p == root_pid:
                    root_ok = True
            except (FileNotFoundError, ProcessLookupError, PermissionError):
                if p == root_pid:
                    return None
                continue
            try:
                with open(f"/proc/{p}/task/{p}/children", "rb") as f:
                    for c in f.read().split():
                        stack.append(int(c))
            except (FileNotFoundError, ProcessLookupError, PermissionError):
                continue
        return total_pages * cls.PAGE_SIZE if root_ok else None
