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
from typing import Any, Callable, Iterable, Iterator, NamedTuple


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
    return [int(p) if i % 2 else tuple(
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

    Root inference (when root is None):
      When root is not provided, FileDiscovery can infer it from the discovered
      file paths.  This is controlled by two optional parameters:

      - fallback_roots: ordered list of directories to try when a bare selector
        (not absolute, not starting with ./ or ../) doesn't match anything from
        cwd.  Each root is tried in order; the first one that produces matches
        wins.  Explicit selectors (absolute paths, ./ or ../ prefixed) are never
        tried against fallback_roots — they resolve from cwd only.

      - root_marker: a relative path (e.g. "harness/assert.js") used to detect
        the actual root directory.  When a concrete file is found, its path is
        fully resolved (symlinks followed), then parents are walked upward
        looking for root_marker.  The first ancestor containing it becomes the
        effective root.  All returned paths are then relative to this root.
        If a later file resolves to a different root, discovery aborts with an
        error.

      When root is explicitly set (e.g. run.py passing root=CONFORMANCE_DIR),
      fallback_roots and root_marker are ignored — root is used as-is for
      selector resolution and path relativization.
    """

    def __init__(
        self,
        selectors: Iterable[str],
        *,
        root: Path | None = None,
        fallback_roots: list[Path] | None = None,
        root_marker: str | None = None,
        exclude_re: list[re.Pattern[str]] | None = None,
        shuffle: bool = False,
        background: bool = False,
    ) -> None:
        self._files: list[str] = []
        self._done = threading.Event()
        self._root_ready = threading.Event()
        self._error: BaseException | None = None
        self._queue: queue.SimpleQueue[str | None] | None = (
            queue.SimpleQueue() if background else None
        )
        self._inferred_root: Path | None = root
        if root is not None:
            self._root_ready.set()

        args = (list(selectors), root, fallback_roots, root_marker, exclude_re, shuffle)
        if background:
            self._thread: threading.Thread | None = threading.Thread(
                target=self._run, args=args, daemon=True,
            )
            self._thread.start()
            # Block until root is determined (first file) so callers can
            # use inferred_root immediately.  File discovery continues in
            # the background.
            self._root_ready.wait()
            if self._error:
                raise self._error
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
        d._inferred_root = None
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
    def _find_root_marker(p: Path, marker: str) -> Path | None:
        """Walk up parents of resolved path looking for marker file."""
        p = p.resolve()
        for parent in (p if p.is_dir() else p.parent, *p.parents):
            if (parent / marker).exists():
                return parent
        return None

    @staticmethod
    def _is_explicit(token: str) -> bool:
        """True if selector is an explicit path (absolute or ./ or ../ prefixed)."""
        return token.startswith("/") or token.startswith("./") or token.startswith("../")

    @staticmethod
    def _iter_files(
        selectors: list[str],
        root: Path | None,
        exclude_re: list[re.Pattern[str]] | None,
        fallback_roots: list[Path] | None = None,
        root_marker: str | None = None,
        on_root_inferred: Callable[[Path | None], None] | None = None,
    ) -> Iterator[str]:
        """Yield path strings for .js files matching selectors (recursive, deduped).

        - Relative selectors resolve under root when provided.
        - Directories are walked recursively in deterministic name order.
        - exclude_re: skip paths whose string representation matches any pattern.
        - Returned strings are root-relative when root is provided, otherwise str(path).
        - fallback_roots / root_marker: see class docstring.  Only active when
          root is None.
        - on_root_inferred: called once when the root is first inferred from a
          discovered file (only when root is None and root_marker is set).
        """
        effective_root = root
        infer_root = root is None and root_marker is not None

        root_signalled = False

        pending_root_check: list[Path] = []

        def _check_root(p: Path) -> None:
            """Infer or verify root from a resolved file path.

            Signals on_root_inferred on the first file (so the constructor
            unblocks).  Keeps trying _find_root_marker until a root is
            established, then switches to fast is_relative_to() checks.
            Files seen before root is established are retroactively verified.
            """
            nonlocal effective_root, root_signalled
            if not infer_root:
                return
            if effective_root is not None:
                # Fast path: root already known, just verify membership.
                if not p.is_relative_to(effective_root):
                    raise RuntimeError(
                        f"test file {p} is outside root {effective_root} "
                        f"(all tests must be within the same tree)"
                    )
                return
            # Root not yet established — try to find it from this file.
            found = FileDiscovery._find_root_marker(p, root_marker)  # type: ignore[arg-type]
            if found is not None:
                effective_root = found
                # Retroactively verify files emitted before root was known.
                for prev in pending_root_check:
                    if not prev.is_relative_to(effective_root):
                        raise RuntimeError(
                            f"test file {prev} is outside root {effective_root} "
                            f"(all tests must be within the same tree)"
                        )
                pending_root_check.clear()
            else:
                pending_root_check.append(p)
            if not root_signalled:
                root_signalled = True
                if on_root_inferred is not None:
                    on_root_inferred(found)

        def _keep(p: Path) -> bool:
            if not exclude_re:
                return True
            s = str(p)
            return not any(pat.search(s) for pat in exclude_re)

        def _item(p: Path) -> str:
            r = effective_root
            if r is not None:
                try:
                    return str(p.relative_to(r))
                except ValueError:
                    pass
            return str(p)

        seen: set[str] = set()

        def _emit(p: Path) -> Iterator[str]:
            _check_root(p)
            if not _keep(p):
                return
            s = _item(p)
            if s in seen:
                return
            seen.add(s)
            yield s

        def _resolve_selector(token: str) -> Path:
            """Resolve a selector to a concrete path, trying root and fallbacks.

            For non-glob selectors, checks existence to pick the right root.
            For globs, just checks for metachar presence — actual expansion is
            deferred to the main loop.
            When root inference is active (infer_root), paths are resolved
            (symlinks followed) so _item() can relativize with pure string ops.
            Otherwise paths are returned as-is to preserve cwd-relative forms.
            """
            p = Path(token)
            explicit = FileDiscovery._is_explicit(token)
            is_glob = any(c in token for c in "*?[]")

            if root is not None and not explicit:
                # Classic behavior: try under explicit root
                rooted = root / p
                if rooted.exists() or is_glob:
                    return rooted

            # Try as-is (cwd-relative or absolute)
            if p.exists():
                return p.resolve() if infer_root else p
            if is_glob:
                return p  # defer to glob.glob() in main loop

            # Explicit paths must not fall through to fallback roots
            if explicit:
                return p  # return as-is, will produce no matches

            # Try fallback roots
            if fallback_roots and root is None:
                for fb in fallback_roots:
                    candidate = fb / p
                    if candidate.exists():
                        return candidate.resolve()

            return p  # return as-is

        for token in selectors:
            p = _resolve_selector(token)

            if p.is_dir():
                d = p.resolve() if infer_root else p
                for path in FileDiscovery._walk_js_sorted(d):
                    yield from _emit(path)
                continue

            if any(c in str(p) for c in "*?[]"):
                # Try fallback roots if no matches from cwd / root
                results = list(glob.glob(str(p), recursive=True))
                if not results and fallback_roots and root is None and not FileDiscovery._is_explicit(token):
                    for fb in fallback_roots:
                        results = list(glob.glob(str(fb / token), recursive=True))
                        if results:
                            break
                for item in sorted(results, key=lambda s: version_sort_key(s)):
                    q = Path(item).resolve() if infer_root else Path(item)
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
        fallback_roots: list[Path] | None,
        root_marker: str | None,
        exclude_re: list[re.Pattern[str]] | None,
        shuffle: bool,
    ) -> None:
        def _on_root(r: Path | None) -> None:
            self._inferred_root = r
            self._root_ready.set()

        try:
            it: Iterator[str] = self._iter_files(
                selectors, root, exclude_re,
                fallback_roots=fallback_roots,
                root_marker=root_marker,
                on_root_inferred=_on_root,
            )
            if shuffle:
                items = list(it)
                random.shuffle(items)
                it = iter(items)
            for path in it:
                self._files.append(path)
                if self._queue is not None:
                    self._queue.put(path)
        except BaseException as e:
            self._error = e
        finally:
            self._root_ready.set()  # unblock waiters even if no root found
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

    @property
    def inferred_root(self) -> Path | None:
        """Root directory inferred from discovered files (or the explicit root).

        Always available immediately — __init__ blocks until the root is
        determined (first file found or discovery completes with no files).
        """
        return self._inferred_root

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


class GitRevision(NamedTuple):
    revision: str
    revision_date: str  # YYYY-MM-DD
    revision_dirty: bool = False

    def to_json(self) -> dict[str, Any]:
        d: dict[str, Any] = {
            "revision": self.revision,
            "revision_date": self.revision_date,
        }
        if self.revision_dirty:
            d["revision_dirty"] = True
        return d


def get_git_revision(path: Path) -> GitRevision | None:
    """Return the HEAD revision and author date of a git repo, or None."""
    try:
        out = subprocess.check_output(
            ["git", "-C", str(path), "log", "-1", "--format=%H%n%ad", "--date=short"],
            stderr=subprocess.DEVNULL,
        ).decode().strip()
        rev, date = out.split("\n", 1)
        if not rev:
            return None
        dirty = subprocess.call(
            ["git", "-C", str(path), "diff", "--quiet", "HEAD"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        ) != 0
        return GitRevision(rev, revision_date=date, revision_dirty=dirty)
    except (subprocess.CalledProcessError, FileNotFoundError, ValueError):
        return None


def read_json(path: Path, default: Any = None) -> Any:
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default
