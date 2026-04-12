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
from typing import TYPE_CHECKING, Any, Callable

from .config import EngineConfig

if TYPE_CHECKING:
    from .tags import Tags

from .data import Verdict, RunResult, RunRusage


class Runner:
    """Process executor: launches engine, captures output, measures resources.

    Classification (verdict_type/verdict_detail) is intentionally separate – use Annotator.
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
        """Execute argv and return raw RunResult (verdict_type is not set here).

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
            self._set_niceness(proc.pid)
            if self.on_spawn is not None:
                self.on_spawn(proc.pid)
            watchdog: MemoryWatchdog | None = None
            if memory_limit_mb:
                watchdog = MemoryWatchdog.monitor(proc.pid, memory_limit_mb, test_path)
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
            run.verdict_type = Verdict.OOM
            run.verdict_detail = f">{memory_limit_mb}MB"
        elif timed_out:
            run.verdict_type = Verdict.TIMEOUT
            run.verdict_detail = f">{timeout:.0f}s"

        return run

    @staticmethod
    def _preexec_fn(memory_addr_limit_mb: int | None) -> None:
        if memory_addr_limit_mb is not None:
            limit_bytes = int(memory_addr_limit_mb) * 1024 * 1024
            resource.setrlimit(resource.RLIMIT_AS, (limit_bytes, limit_bytes))

    def _set_niceness(self, pid: int, *, oom_score_adj: int = 1000, nice: int = 19) -> None:
        """Lower child priority for CPU scheduling and OOM selection."""
        try:
            with open(f"/proc/{pid}/oom_score_adj", "w", encoding="ascii") as f:
                f.write(f"{oom_score_adj}\n")
        except:
            pass

        try:
            os.setpriority(os.PRIO_PROCESS, pid, nice)
        except:
            pass


class MemoryWatchdog:
    """Process-wide singleton: one daemon thread polls /proc on a fixed
    cadence and writes peak RSS / OOM-kill state into shared fields.
    """

    POLL_SEC = 0.05  # ~20 Hz
    PAGE_SIZE = os.sysconf("SC_PAGESIZE")

    _instance: MemoryWatchdog | None = None
    _instance_lock = threading.Lock()

    @classmethod
    def monitor(cls, pgid: int, memory_limit_mb: int, test_path: str | None) -> MemoryWatchdog:
        """Install a new monitoring session on pgid and return the singleton."""
        inst = cls._instance
        if inst is None:
            with cls._instance_lock:
                if cls._instance is None:
                    cls._instance = cls()
                inst = cls._instance
        with inst._lock:
            inst._pid = pgid
            inst._limit_bytes = memory_limit_mb * 1024 * 1024
            inst._peak_rss = 0
            inst._oom_killed = False
            inst._test_path = test_path
        return inst

    def __init__(self) -> None:
        # State guarded by self._lock. The polling thread runs on its own
        # POLL_SEC timer — monitor() does NOT wake it. This avoids the
        # per-call notify+context-switch cost on the runner's hot path.
        # Tradeoff: a process exiting in <POLL_SEC is never sampled
        # (peak_rss stays 0; runner falls back to ru_maxrss from rusage).
        self._lock = threading.Lock()
        self._pid = 0  # 0 when idle; also the session identity
        self._limit_bytes = 0
        self._peak_rss = 0  # bytes
        self._oom_killed = False
        self._test_path: str | None = None
        threading.Thread(target=self._run, daemon=True).start()

    def stop(self) -> tuple[int, bool]:
        """Detach the current session and return (peak_rss_kb, oom_killed)."""
        with self._lock:
            self._pid = 0
            self._test_path = None
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
            killed_test_path: str | None = None
            over_limit = False
            with self._lock:
                if self._pid != pid:
                    continue
                if rss > self._peak_rss:
                    self._peak_rss = rss
                if rss > limit_bytes:
                    self._oom_killed = True
                    self._pid = 0
                    killed_test_path = self._test_path
                    over_limit = True
            if not over_limit:
                continue
            prefix = "\r\x1b[K" if sys.stderr.isatty() else ""
            print(
                f"{prefix}memory watchdog: killing pid={pid}"
                f" rss={rss / (1024 * 1024):.1f}MB"
                f" limit={limit_bytes // (1024 * 1024)}MB"
                f" test={killed_test_path}",
                file=sys.stderr, flush=True,
            )
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

    @classmethod
    def _reset_after_fork(cls) -> None:
        cls._instance = None
        cls._instance_lock = threading.Lock()


# Make sure worker processes creates own watchdog threads after a fork().
os.register_at_fork(after_in_child=MemoryWatchdog._reset_after_fork)
