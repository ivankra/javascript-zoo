from __future__ import annotations

import multiprocessing
import os
import queue
import signal
import traceback
from collections.abc import Callable, Iterable, Iterator
from dataclasses import dataclass
from typing import Any, cast

from .runner import RunResult


@dataclass(slots=True)
class _Started:
    test_id: str


@dataclass(slots=True)
class _Spawn:
    pid: int


@dataclass(slots=True)
class _Result:
    value: list[RunResult]


@dataclass(slots=True)
class _Error:
    worker_pid: int
    error_type: str
    message: str
    tb: str


def _worker_main(
    task_queue: multiprocessing.queues.Queue[tuple[str | None, object] | None],
    result_queue: multiprocessing.queues.Queue[object],
    worker_cls: type["PoolWorker"],
    worker_args: tuple[object, ...],
) -> None:
    task_queue.cancel_join_thread()
    result_queue.cancel_join_thread()
    def on_spawn(pid: int) -> None:
        result_queue.put(_Spawn(pid))

    worker = cast(Any, worker_cls)(*worker_args, on_spawn=on_spawn)

    def stop(signum: int, _frame: object) -> None:
        worker_stop = getattr(worker, "stop", None)
        if worker_stop is not None:
            try:
                worker_stop()
            except BaseException:
                pass
        os._exit(128 + signum)

    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)

    while True:
        task = task_queue.get()
        if task is None:
            break
        test_id, payload = task
        if test_id is not None:
            result_queue.put(_Started(test_id))
        try:
            result_queue.put(_Result(worker.run(payload)))
        except BaseException as exc:
            result_queue.put(_Error(
                worker_pid=os.getpid(),
                error_type=type(exc).__name__,
                message=str(exc),
                tb=traceback.format_exc(),
            ))
            break


class PoolWorker:
    """Base class for harness process-pool workers."""

    def __init__(self, on_spawn: Callable[[int], None]) -> None:
        self.on_spawn = on_spawn

    def run(self, task: Any) -> list[RunResult]:
        raise NotImplementedError

    def stop(self) -> None:
        pass


class PoolExecutor:
    def __init__(self, *, max_workers: int, worker_cls: type[PoolWorker], worker_args: tuple[object, ...] = ()) -> None:
        self._ctx: Any
        try:
            self._ctx = multiprocessing.get_context("fork")
        except ValueError:
            self._ctx = multiprocessing.get_context()
        self._task_queue = self._ctx.Queue()
        self._result_queue = self._ctx.Queue()
        self._pids: set[int] = set()
        self._processes = [
            self._ctx.Process(
                target=_worker_main,
                args=(self._task_queue, self._result_queue, worker_cls, worker_args),
            )
            for _ in range(max_workers)
        ]
        self._closed = False
        for proc in self._processes:
            proc.start()

    def imap(self, items: Iterable[tuple[str | None, object]], *, on_started: Callable[[str], None] | None = None) -> Iterator[list[RunResult]]:
        pending = 0
        for item in items:
            self._task_queue.put(item)
            pending += 1

        try:
            while pending:
                self._raise_if_worker_died()
                try:
                    message = self._result_queue.get(timeout=0.1)
                except queue.Empty:
                    continue

                if isinstance(message, _Started):
                    if on_started is not None:
                        on_started(message.test_id)
                elif isinstance(message, _Spawn):
                    self._pids.add(message.pid)
                elif isinstance(message, _Result):
                    pending -= 1
                    for run in message.value:
                        if run.pid is not None:
                            self._pids.discard(run.pid)
                            run.pid = None
                    yield message.value
                elif isinstance(message, _Error):
                    raise RuntimeError(
                        f"worker {message.worker_pid} failed with "
                        f"{message.error_type}: {message.message}\n{message.tb}"
                    )
                else:
                    raise RuntimeError(f"unexpected pool message: {message!r}")

            self._raise_if_worker_died()
        except BaseException:
            self.stop()
            raise

    def stop(self) -> None:
        if self._closed:
            return
        self._closed = True
        self._drain_messages()
        for pid in self._pids:
            try:
                os.killpg(pid, signal.SIGKILL)
            except (ProcessLookupError, OSError):
                pass
        for sig in (signal.SIGTERM, signal.SIGKILL):
            for proc in self._processes:
                assert proc.pid is not None
                try:
                    os.kill(proc.pid, sig)
                except (ProcessLookupError, OSError):
                    pass
            for proc in self._processes:
                proc.join(timeout=1.0)
        self._cleanup_queues()

    def _drain_messages(self) -> None:
        while True:
            try:
                message = self._result_queue.get_nowait()
            except queue.Empty:
                return
            if isinstance(message, _Spawn):
                self._pids.add(message.pid)
                continue
            if isinstance(message, _Result):
                for run in message.value:
                    if run.pid is not None:
                        self._pids.discard(run.pid)
                continue

    def _cleanup_queues(self) -> None:
        self._task_queue.cancel_join_thread()
        self._result_queue.cancel_join_thread()
        self._task_queue.close()
        self._result_queue.close()

    def _raise_if_worker_died(self) -> None:
        for proc in self._processes:
            if proc.exitcode is not None and proc.exitcode != 0:
                raise RuntimeError(
                    f"worker {proc.pid} exited with status {proc.exitcode}"
                )
