# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import glob
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import Any, Iterator, NamedTuple


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


class GitRevision(NamedTuple):
    revision: str
    revision_date: str  # YYYY-MM-DD


def get_git_revision(path: Path) -> GitRevision | None:
    """Return the HEAD revision and author date of a git repo, or None."""
    try:
        out = subprocess.check_output(
            ["git", "-C", str(path), "log", "-1", "--format=%H%n%ad", "--date=short"],
            stderr=subprocess.DEVNULL,
        ).decode().strip()
        rev, date = out.split("\n", 1)
        return GitRevision(rev, revision_date=date) if rev else None
    except (subprocess.CalledProcessError, FileNotFoundError, ValueError):
        return None


def read_json(path: Path, default: Any = None) -> Any:
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default
