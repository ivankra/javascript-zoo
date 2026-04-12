# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import glob
import json
import os
import queue
import random
import re
import shutil
import subprocess
import sys
import tempfile
import threading
from pathlib import Path
from typing import Any, Iterable, Iterator

from .data import GitRevisionInfo


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


class HelpFormatter(argparse.HelpFormatter):
    def _format_action_invocation(self, action: argparse.Action) -> str:
        if isinstance(action, argparse.BooleanOptionalAction):
            opts = [opt for opt in action.option_strings if opt.startswith("--")]
            if len(opts) == 2:
                positive = next((opt for opt in opts if not opt.startswith("--no-")), opts[0])
                if positive.startswith("--"):
                    return f"--[no-]{positive[2:]}"
        return super()._format_action_invocation(action)


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
    """Sort key matching `sort -V`: '/' sorts first (for hierarchical path
    ordering), letters sort before other punctuation/symbols."""
    parts = re.split(r'(\d+)', name)
    return [(int(p), -len(p)) if i % 2 else tuple(
                0 if c == '/' else ord(c) if c.isalpha() else ord(c) + 128
                for c in p)
            for i, p in enumerate(parts)]


def write_atomic(path: Path, data: bytes, *, check_same: bool = False) -> None:
    """Atomically write data via temp+rename; skip if content is identical.

    check_same: print a warning to stderr if replacing different content.
    """
    if path.exists():
        try:
            existing = path.read_bytes()
            if existing == data:
                return
            if check_same:
                print(f"warning: overwriting {path} with different content", file=sys.stderr)
        except OSError:
            pass
    fd, tmp_name = tempfile.mkstemp(
        dir=str(path.parent),
        prefix=f".{path.name}.{os.getpid()}.",
        suffix=".tmp",
    )
    tmp = Path(tmp_name)
    try:
        with os.fdopen(fd, "wb") as f:
            f.write(data)
        os.replace(tmp, path)
    except Exception:
        tmp.unlink(missing_ok=True)
        raise


class FileDiscovery:
    """Discovers test files, optionally in a background thread.

    Construction modes:
    - FileDiscovery(patterns, root=...) — sync discovery (blocks until done).
    - FileDiscovery(..., background=True) — background thread; __iter__ streams
      files as they're found via an unbounded queue.
    - FileDiscovery.from_list(items) — wraps a pre-computed list, no I/O.

    If shuffle=True, all files are collected first then shuffled (forces sync
    collection even in background mode before streaming begins).

    Reporter reads .files, .count, .done for progress display.
    """

    def __init__(
        self,
        selectors: Iterable[str],
        *,
        root: Path | None = None,
        exclude_re: list[re.Pattern[str]] | None = None,
        shuffle: bool = False,
        background: bool = False,
    ) -> None:
        self._files: list[str] = []
        self._done = threading.Event()
        self._error: BaseException | None = None
        self._queue: queue.SimpleQueue[str | None] | None = (
            queue.SimpleQueue() if background else None
        )

        args = (list(selectors), root, exclude_re, shuffle)
        if background:
            self._thread: threading.Thread | None = threading.Thread(
                target=self._run, args=args, daemon=True,
            )
            self._thread.start()
        else:
            self._thread = None
            self._run(*args)

    @staticmethod
    def from_list(items: Iterable[str]) -> FileDiscovery:
        """Wrap a pre-computed list (no background thread, no I/O)."""
        d = object.__new__(FileDiscovery)
        d._files = list(items)
        d._done = threading.Event()
        d._done.set()
        d._error = None
        d._queue = None
        d._thread = None
        return d

    @staticmethod
    def _walk_js_sorted(d: Path) -> Iterator[Path]:
        """Recursively yield .js files under d in deterministic name order."""
        with os.scandir(d) as it:
            entries = sorted(it, key=lambda e: version_sort_key(e.name))
        for entry in entries:
            p = Path(entry.path)
            if entry.is_dir(follow_symlinks=True):
                yield from FileDiscovery._walk_js_sorted(p)
            elif p.suffix == ".js":
                yield p

    @staticmethod
    def _iter_files(
        selectors: list[str],
        root: Path | None,
        exclude_re: list[re.Pattern[str]] | None,
    ) -> Iterator[str]:
        """Yield path strings for .js files matching selectors (recursive, deduped).

        - Relative selectors resolve under root when provided.
        - Directories are walked recursively in deterministic name order.
        - exclude_re: skip paths whose string representation matches any pattern.
        - Returned strings are root-relative when root is provided, otherwise str(path).
        """
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
                for path in FileDiscovery._walk_js_sorted(p):
                    yield from _emit(path)
                continue

            if any(c in str(p) for c in "*?[]"):
                for item in sorted(glob.glob(str(p), recursive=True), key=lambda s: version_sort_key(s)):
                    q = Path(item)
                    if q.is_dir():
                        for path in FileDiscovery._walk_js_sorted(q):
                            yield from _emit(path)
                    elif q.is_file():
                        yield from _emit(q)
                continue

            if p.exists() and p.is_file():
                yield from _emit(p)

    def _run(
        self,
        selectors: list[str],
        root: Path | None,
        exclude_re: list[re.Pattern[str]] | None,
        shuffle: bool,
    ) -> None:
        try:
            it: Iterator[str] = self._iter_files(selectors, root, exclude_re)
            if shuffle:
                items = list(it)
                self._files.extend(items)
                random.shuffle(items)
                for path in items:
                    if self._queue is not None:
                        self._queue.put(path)
            else:
                for path in it:
                    self._files.append(path)
                    if self._queue is not None:
                        self._queue.put(path)
        except BaseException as e:
            self._error = e
        finally:
            self._done.set()
            if self._queue is not None:
                self._queue.put(None)

    def __iter__(self) -> Iterator[str]:
        """Iterate discovered files. In background mode, blocks until each is ready."""
        if self._queue is None:
            yield from self._files
            return
        while True:
            item = self._queue.get()
            if item is None:
                if self._error:
                    raise self._error
                return
            yield item

    @property
    def files(self) -> list[str]:
        """Files discovered so far (in discovery order)."""
        return self._files

    @property
    def count(self) -> int:
        """Number of files discovered so far."""
        return len(self._files)

    @property
    def done(self) -> bool:
        """True once discovery is complete."""
        return self._done.is_set()

    def wait(self) -> list[str]:
        """Block until discovery finishes, return all files."""
        if self._thread is not None:
            self._thread.join()
        else:
            self._done.wait()
        if self._error:
            raise self._error
        return self._files


def iterate_js_files(
    selectors: list[str],
    *,
    root: Path | None = None,
    exclude_re: list[re.Pattern[str]] | None = None,
) -> Iterator[str]:
    """Yield .js files matching selectors. Thin wrapper around FileDiscovery."""
    return FileDiscovery._iter_files(selectors, root, exclude_re)


def get_git_revision(path: Path) -> GitRevisionInfo | None:
    """Return the HEAD revision and committer date of a git repo, or None."""
    try:
        # -c safe.directory: allow reading repos with different ownership
        # (e.g. bind-mounted into a container with a different uid).
        git = ["git", "-c", f"safe.directory={path}", "-C", str(path)]
        out = subprocess.check_output(
            git + ["log", "-1", "--format=%H%n%cd", "--date=short"],
            stderr=subprocess.DEVNULL,
        ).decode().strip()
        rev, date = out.split("\n", 1)
        if not rev:
            return None
        dirty = subprocess.call(
            git + ["diff", "--quiet", "HEAD"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        ) != 0
        try:
            repo = subprocess.check_output(
                git + ["remote", "get-url", "origin"],
                stderr=subprocess.DEVNULL,
            ).decode().strip() or None
        except (subprocess.CalledProcessError, FileNotFoundError):
            repo = None
        return GitRevisionInfo(revision=rev, revision_date=date, revision_dirty=dirty, repository=repo)
    except (subprocess.CalledProcessError, FileNotFoundError, ValueError):
        return None


def read_json(path: Path, default: Any = None) -> Any:
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default
