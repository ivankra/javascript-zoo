# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import glob
import json
import os
import re
import shutil
import subprocess
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


def expand_template_literals(source: str) -> str:
    """Rewrite simple JS template literals as string concatenation."""

    def convert_template(body: str) -> str:
        parts: list[str] = []
        literal: list[str] = []
        index = 0
        while index < len(body):
            if body.startswith(r"\`", index):
                literal.append("`")
                index += 2
            elif body.startswith(r"\${", index):
                literal.append("${")
                index += 3
            elif body.startswith("${", index):
                if literal:
                    parts.append(json.dumps("".join(literal)))
                    literal = []
                depth = 1
                index += 2
                start = index
                while index < len(body) and depth:
                    if body[index] == "{":
                        depth += 1
                    elif body[index] == "}":
                        depth -= 1
                    index += 1
                parts.append(f"({body[start:index - 1]})")
            else:
                literal.append(body[index])
                index += 1
        if literal or not parts:
            parts.append(json.dumps("".join(literal)))
        return " + ".join(part for part in parts if part != '""')

    def rewrite_multiline_eval_templates(text: str) -> str:
        return re.sub(
            r"eval\(`((?:\\.|[^`])*)`\)",
            lambda m: f"eval({convert_template(m.group(1))})",
            text,
            flags=re.DOTALL,
        )

    def is_tagged(line: str, index: int) -> bool:
        return index > 0 and (line[index - 1].isalnum() or line[index - 1] in "_$)]")

    def consume_quoted(line: str, index: int) -> tuple[str, int]:
        quote = line[index]
        start = index
        index += 1
        while index < len(line):
            if line[index] == "\\":
                index += 2
                continue
            if line[index] == quote:
                index += 1
                break
            index += 1
        return line[start:index], index

    def rewrite_line(line: str) -> str:
        if line.lstrip().startswith(("//", "/*", "*")):
            return line
        out: list[str] = []
        index = 0
        while index < len(line):
            ch = line[index]
            if ch in ("'", '"'):
                frag, index = consume_quoted(line, index)
                out.append(frag)
            elif ch == "`" and not is_tagged(line, index):
                end = index + 1
                while end < len(line):
                    if line[end] == "\\":
                        end += 2
                        continue
                    if line[end] == "`":
                        break
                    end += 1
                if end >= len(line):
                    prev = line[index - 1] if index > 0 else ""
                    if index == 0 or prev.isspace() or prev in "([{=:+-*/,?<>!&|%^~;":
                        raise ValueError(f"multiline template literals are not supported: {line.rstrip()!r}")
                    out.append(line[index:])
                    break
                out.append(convert_template(line[index + 1:end]))
                index = end + 1
            else:
                out.append(ch)
                index += 1
        return "".join(out)

    source = rewrite_multiline_eval_templates(source)
    return "".join(rewrite_line(line) for line in source.splitlines(keepends=True))
