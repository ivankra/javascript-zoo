#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path
from typing import Any


def load_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def conv_binary(path: Path, engine: str) -> dict[str, Any]:
    data: dict[str, Any] = {"engine": engine}
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


def conv_tests(path: Path) -> dict[str, str | dict[str, str]]:
    test_re = re.compile(r"^\d+: (test262/test/\S+)(?P<tail>.*)$")
    results: dict[str, str | dict[str, str]] = {}
    current_path: str | None = None
    current_flags: list[str] = []
    current_lines: list[str] = []
    current_failures: dict[str, str] = {}

    def flush_current() -> None:
        nonlocal current_path, current_flags, current_lines, current_failures
        if current_path is None:
            return
        if "module" in current_flags or "raw" in current_flags or "@noStrict" in current_flags or "noStrict" in current_flags:
            results[current_path] = current_failures.get("sloppy", "PASS")
        elif "@onlyStrict" in current_flags or "onlyStrict" in current_flags:
            results[current_path] = current_failures.get("strict", "PASS")
        else:
            sloppy = current_failures.get("sloppy", "PASS")
            strict = current_failures.get("strict", "PASS")
            results[current_path] = sloppy if sloppy == strict else {"sloppy": sloppy, "strict": strict}
        current_path = None
        current_flags = []
        current_lines = []
        current_failures = {}

    for raw_line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        match = test_re.match(raw_line)
        if match:
            flush_current()
            test_path = match.group(1).removeprefix("test262/")
            flags = match.group("tail").strip().split()
            if flags and flags[-1] == "SKIPPED":
                results[test_path] = "SKIP"
                continue
            current_path = test_path
            current_flags = flags
            current_lines = []
            current_failures = {}
            continue

        if raw_line == "  FAILED":
            if current_path is None:
                continue
            mode = "sloppy"
            if current_lines and current_lines[0].strip().startswith("strict mode: "):
                mode = "strict"
            elif not current_lines and ("@onlyStrict" in current_flags or "onlyStrict" in current_flags):
                mode = "strict"
            current_failures[mode] = "FAIL"
            for line in current_lines:
                stripped = line.strip()
                if not stripped or stripped.startswith("at "):
                    continue
                if stripped.startswith("strict mode: "):
                    stripped = stripped.removeprefix("strict mode: ").strip()
                current_failures[mode] = stripped or "FAIL"
                break
            current_lines = []
            continue

        if current_path is not None:
            current_lines.append(raw_line)

    flush_current()
    return results


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/quickjs", type=Path)
    parser.add_argument("--test262-dir", default="test262", type=Path)
    parser.add_argument("input", default="test262_report.txt", type=Path)
    args = parser.parse_args()

    if not args.input.exists():
        sys.exit(f"{args.input} doesn't exist")

    note = "Converted from QuickJS test262_report.txt"

    converted = {
        "note": note,
        "binary": conv_binary(args.binary.with_suffix(".json"), "quickjs"),
        "test262": conv_test262(test262_dir=args.test262_dir),
        "tests": conv_tests(args.input)
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
