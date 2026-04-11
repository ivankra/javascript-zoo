#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import json
import re
import subprocess
from pathlib import Path
from typing import Any


ENGINE = "jsse"
FRONTMATTER_RE = re.compile(r"/\*---\n(.*?)\n---\*/", re.DOTALL)
FLAGS_RE = re.compile(r"^flags:\s*\[(.*?)\]\s*$", re.MULTILINE)


def load_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def conv_binary(path: Path) -> dict[str, Any]:
    data: dict[str, Any] = {"engine": ENGINE}
    if not path.exists():
        return data

    src = load_json(path)
    if not isinstance(src, dict):
        return data

    for key in ("arch", "engine", "repository", "revision", "revision_date"):
        value = src.get(key)
        if value:
            data[key] = value
    return data


def conv_test262(*, test262_dir: Path) -> dict[str, str]:
    try:
        result = subprocess.run(
            ["git", "rev-parse", "HEAD"],
            cwd=test262_dir,
            capture_output=True,
            text=True,
            check=False,
        )
    except OSError:
        return {}

    revision = result.stdout.strip()
    if result.returncode != 0 or not revision:
        return {}
    return {"revision": revision}


def parse_flags(source: str) -> set[str]:
    normalized = source.replace("\r\n", "\n").replace("\r", "\n")
    match = FRONTMATTER_RE.search(normalized)
    if not match:
        return set()
    flags_match = FLAGS_RE.search(match.group(1))
    if not flags_match:
        return set()
    raw = flags_match.group(1).strip()
    if not raw:
        return set()
    return {part.strip() for part in raw.split(",") if part.strip()}


def modes_for_test(path: Path) -> tuple[str, ...]:
    flags = parse_flags(path.read_text(encoding="utf-8", errors="replace"))
    if "module" in flags or "onlyStrict" in flags:
        return ("strict",)
    if "noStrict" in flags or "raw" in flags:
        return ("sloppy",)
    return ("sloppy", "strict")


def load_passed(path: Path) -> set[str]:
    passed: set[str] = set()
    if not path.exists():
        raise SystemExit(f"missing pass list: {path}")
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        passed.add(line.removeprefix("test262/"))
    return passed


def collapse(values: dict[str, str]) -> str | dict[str, str]:
    if set(values) == {"sloppy", "strict"} and len(set(values.values())) == 1:
        return next(iter(values.values()))
    if len(values) == 1:
        return next(iter(values.values()))
    return dict(sorted(values.items()))


def iter_runner_tests(test262_dir: Path) -> list[Path]:
    tests: list[Path] = []
    for subdir in ("language", "built-ins", "annexB", "intl402"):
        root = test262_dir / subdir
        if root.is_dir():
            tests.extend(path for path in sorted(root.rglob("*.js")) if "_FIXTURE" not in path.name)
    return tests


def conv_tests(test262_dir: Path, passed: set[str]) -> dict[str, str | dict[str, str]]:
    if not test262_dir.exists():
        raise SystemExit(f"test262 dir not found: {test262_dir}")

    tests: dict[str, str | dict[str, str]] = {}
    for path in iter_runner_tests(test262_dir):
        rel = path.relative_to(test262_dir).as_posix()
        test = f"test/{rel}"
        modes = modes_for_test(path)
        per_mode: dict[str, str] = {}
        for mode in modes:
            passed_key = test if len(modes) == 1 or mode == "sloppy" else f"{test}:strict"
            per_mode[mode] = "PASS" if passed_key in passed else "FAIL"
        tests[test] = collapse(per_mode)
    return tests


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/jsse", type=Path)
    parser.add_argument("--test262-dir", default="test262", type=Path)
    parser.add_argument("pass_txt", default="test262-pass.txt", type=Path)
    args = parser.parse_args()

    converted = {
        "note": "Converted from JSSE test262-pass.txt output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(test262_dir=args.test262_dir),
        "tests": conv_tests(args.test262_dir / "test", load_passed(args.pass_txt)),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
