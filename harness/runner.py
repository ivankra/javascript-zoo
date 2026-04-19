# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import os
import resource
import select
import shlex
import signal
import subprocess
import sys
import threading
import time
from pathlib import Path
from typing import Callable

from .config import EngineConfig
from .data import Verdict, RunResult, RunRusage


class Runner:
    """Process executor: launches engine, captures output, measures resources.

    Classification (verdict_type/verdict_detail) is intentionally separate – use Annotator.

    Not thread-safe - we currently use a single shared OOM watchdog thread
    for performance. Use with a process pool to parallelize.
    """

    def __init__(self, config: EngineConfig, on_spawn: Callable[[int], None] | None = None) -> None:
        config.resolve()
        self._config = config
        self._on_spawn = on_spawn
        self._proc: subprocess.Popen[bytes] | None = None

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
        """Execute argv and return initial RunResult."""
        timeout = timeout_sec or self._config.timeout_sec
        memory_limit_mb = memory_limit_mb or self._config.memory_limit_mb
        memory_addr_limit_mb = memory_addr_limit_mb or self._config.memory_addr_limit_mb
        cwd = cwd or self._config.cwd or os.getcwd()

        run_env = os.environ.copy()
        run_env.update(self._config.env)
        if env:
            run_env.update(env)

        preexec_fn = None
        if memory_addr_limit_mb:
            preexec_fn = lambda: self._preexec_fn(memory_addr_limit_mb)

        # Hack for Node.js: pass the script via stdin to get true global scope.
        # Note: do not pipe - breaks some of its pipe/file-sensitive internals.
        redirect_stdin = (self._config.redirect_stdin and not argv[-1].endswith(".mjs"))
        if redirect_stdin:
            stdin_fp = open(argv[-1], "rb")
            cwd = str(Path(argv[-1]).resolve().parent)  # so relative imports resolve
            argv = argv[:-1] + ["-"]
        else:
            stdin_fp = None

        watchdog: MemoryWatchdog = MemoryWatchdog.get()
        peak_watchdog_kb = 0
        oom_killed = False
        timed_out = False
        output_limit_hit = False
        stdout_b = b""
        stderr_b = b""
        ru_before = resource.getrusage(resource.RUSAGE_CHILDREN)
        start_time = time.monotonic()

        try:
            self._proc = subprocess.Popen(
                argv,
                cwd=cwd,
                env=run_env,
                stdin=stdin_fp or subprocess.DEVNULL,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=False,
                preexec_fn=preexec_fn,   # expensive!
                start_new_session=True,  # start new process group to let us kill all children
            )

            if stdin_fp:
                stdin_fp.close()
                stdin_fp = None

            self._set_niceness(self._proc.pid)

            if memory_limit_mb:
                watchdog.monitor(self._proc.pid, memory_limit_mb, test_path)

            # communicate pgid to PoolExecutor of the master process
            if self._on_spawn is not None:
                self._on_spawn(self._proc.pid)

            stdout_b, stderr_b, output_limit_hit, timed_out = self._communicate(timeout)
        finally:
            self.stop(signal.SIGKILL)
            peak_watchdog_kb, oom_killed = watchdog.stop()
            if stdin_fp:
                stdin_fp.close()
                stdin_fp = None
        assert self._proc is not None
        duration = time.monotonic() - start_time
        ru_after = resource.getrusage(resource.RUSAGE_CHILDREN)

        rusage = RunRusage(
            real_time=duration,
            user_time=max(0.0, float(ru_after.ru_utime - ru_before.ru_utime)),
            sys_time=max(0.0, float(ru_after.ru_stime - ru_before.ru_stime)),
            max_rss_kb=max(int(ru_after.ru_maxrss), peak_watchdog_kb),
            io_in_blocks=max(0, int(ru_after.ru_inblock - ru_before.ru_inblock)),
            io_out_blocks=max(0, int(ru_after.ru_oublock - ru_before.ru_oublock)),
            ctx_switches_voluntary=max(0, int(ru_after.ru_nvcsw - ru_before.ru_nvcsw)),
            ctx_switches_involuntary=max(0, int(ru_after.ru_nivcsw - ru_before.ru_nivcsw)),
        )

        run = RunResult(
            run_id=run_id,
            test_id=test_id or run_id,
            command=shlex.join(argv),
            cwd=str(cwd),
            stdout=stdout_b.decode("utf-8", errors="replace"),
            stderr=stderr_b.decode("utf-8", errors="replace"),
            exit_code=self._proc.returncode,
            pid=self._proc.pid,
            rusage=rusage,
            test_path=test_path,
            script_path=script_path,
        )

        if oom_killed:
            run.verdict_type = Verdict.OOM
            run.verdict_detail = f">{memory_limit_mb}MB"
        elif output_limit_hit:
            run.verdict_type = Verdict.OOM
            run.verdict_detail = f"output >{self._config.output_limit_mb}MB"
        elif timed_out:
            run.verdict_type = Verdict.TIMEOUT
            run.verdict_detail = f">{timeout:.0f}s"

        self._proc = None
        return run

    def stop(self, sig: int = signal.SIGKILL) -> None:
        """Kill the active process group, if a command is still running."""
        if self._proc is not None:
            try:
                os.killpg(self._proc.pid, sig)
            except (ProcessLookupError, OSError):
                pass

    def _communicate(self, timeout: float | None) -> tuple[bytes, bytes, bool, bool]:
        """Read stdout/stderr, enforcing time and output limits.

        Returns (stdout, stderr, output_limit_hit, timed_out).
        """
        assert self._proc is not None
        limit = self._config.output_limit_mb * 1048576.0
        stdout_chunks: list[bytes] = []
        stderr_chunks: list[bytes] = []
        chunks_by_fd: dict[int, list[bytes]] = {
            self._proc.stdout.fileno(): stdout_chunks,  # type: ignore[union-attr]
            self._proc.stderr.fileno(): stderr_chunks,  # type: ignore[union-attr]
        }
        total = 0
        truncated = False
        timed_out = False
        deadline = time.monotonic() + timeout if timeout is not None else None

        while chunks_by_fd:
            remaining = max(0.0, deadline - time.monotonic()) if deadline is not None else None
            try:
                readable, _, _ = select.select(list(chunks_by_fd), [], [], remaining)
            except (ValueError, OSError):
                break
            if not readable:
                timed_out = True
                break
            for fd in readable:
                chunk = os.read(fd, 8192)
                if not chunk:
                    del chunks_by_fd[fd]
                    continue
                chunks_by_fd[fd].append(chunk)
                total += len(chunk)
                if total > limit:
                    truncated = True
                    break
            if truncated:
                break

        if truncated or timed_out:
            self.stop(signal.SIGKILL)

        for pipe in (self._proc.stdout, self._proc.stderr):
            try:
                if pipe:
                    pipe.close()
            except OSError:
                pass

        self._proc.wait()
        return b"".join(stdout_chunks), b"".join(stderr_chunks), truncated, timed_out

    @staticmethod
    def _preexec_fn(memory_addr_limit_mb: int) -> None:
        limit_bytes = memory_addr_limit_mb * 1024 * 1024
        resource.setrlimit(resource.RLIMIT_AS, (limit_bytes, limit_bytes))

    @staticmethod
    def _set_niceness(pid: int, *, oom_score_adj: int = 1000, nice: int = 19) -> None:
        """Lower child priority for CPU scheduling and OOM selection."""
        try:
            with open(f"/proc/{pid}/oom_score_adj", "w", encoding="ascii") as f:
                f.write(f"{oom_score_adj}\n")
        except (OSError, PermissionError):
            pass

        try:
            os.setpriority(os.PRIO_PROCESS, pid, nice)
        except (OSError, PermissionError):
            pass


class MemoryWatchdog:
    """Process-wide singleton: one daemon thread polls /proc on a fixed
    cadence and writes peak RSS / OOM-kill state into shared fields.
    """

    POLL_SEC = 0.05  # ~20 Hz
    PAGE_SIZE = os.sysconf("SC_PAGESIZE")

    _instance: MemoryWatchdog | None = None
    _instance_lock = threading.Lock()

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

    @classmethod
    def get(cls) -> MemoryWatchdog:
        """Return the process-wide singleton, creating it if necessary."""
        if cls._instance is None:
            with cls._instance_lock:
                if cls._instance is None:
                    cls._instance = cls()
        return cls._instance

    def monitor(self, pgid: int, memory_limit_mb: int, test_path: str | None) -> None:
        """Install a new monitoring session on pgid."""
        with self._lock:
            self._pid = pgid
            self._limit_bytes = memory_limit_mb * 1024 * 1024
            self._peak_rss = 0
            self._oom_killed = False
            self._test_path = test_path

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

    @staticmethod
    def _read_tree_rss(root_pid: int) -> int | None:
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
        return total_pages * MemoryWatchdog.PAGE_SIZE if root_ok else None

    @classmethod
    def _reset_after_fork(cls) -> None:
        cls._instance = None
        cls._instance_lock = threading.Lock()


# Make sure worker processes creates own watchdog threads after a fork().
os.register_at_fork(after_in_child=MemoryWatchdog._reset_after_fork)
