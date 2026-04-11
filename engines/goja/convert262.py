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


RESULT_RE = re.compile(
    r"^\s*--- (?P<status>PASS|FAIL|SKIP): TestTC39/tc39/(?P<path>test/.+?\.js) \([^)]+\)$"
)
RUN_RE = re.compile(r"^=== RUN   TestTC39/tc39/(?P<path>test/.+?\.js)$")


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


def iter_test_paths(test262_dir: Path) -> list[str]:
    tests: list[str] = []
    for path in sorted(test262_dir.rglob("*.js")):
        if "_FIXTURE" in path.name:
            continue
        tests.append(f"test/{path.relative_to(test262_dir).as_posix()}")
    return tests


def first_meaningful_message(lines: list[str]) -> str:
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith("Running normal test:") or stripped.startswith("Running strict test:"):
            continue
        if stripped.startswith("tc39_test.go:") or stripped.startswith("goja_test.go:") or stripped.startswith("sobek_test.go:"):
            _, _, rest = stripped.partition(": ")
            return rest or stripped
        return stripped
    return "FAIL"


def parse_log(path: Path) -> dict[str, str]:
    results: dict[str, str] = {}
    current_path: str | None = None
    current_lines: list[str] = []

    for raw_line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        run_match = RUN_RE.match(raw_line)
        if run_match:
            current_path = run_match.group("path")
            current_lines = []
            continue

        result_match = RESULT_RE.match(raw_line)
        if result_match:
            path_key = result_match.group("path")
            status = result_match.group("status")
            if status == "PASS":
                results[path_key] = "PASS"
            elif status == "SKIP":
                results[path_key] = "SKIP"
            else:
                results[path_key] = first_meaningful_message(current_lines)
            current_path = None
            current_lines = []
            continue

        if current_path is not None:
            current_lines.append(raw_line)

    return results


def conv_tests(all_tests: list[str], observed: dict[str, str]) -> dict[str, str]:
    paths = sorted(set(all_tests) | set(observed))
    return {path: observed.get(path, "SKIP") for path in paths}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-b", "--binary", default="/dist/goja", type=Path)
    parser.add_argument("-e", "--engine", choices=["goja", "sobek"], default="goja")
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("--test262-dir", default="testdata/test262", type=Path)
    parser.add_argument("input", default="test262.log", type=Path)
    args = parser.parse_args()

    converted = {
        "note": "Converted from `go test -v TestTC39` output",
        "binary": conv_binary(args.binary.with_suffix(".json"), engine=args.engine),
        "test262": conv_test262(test262_dir=args.test262_dir),
        "tests": conv_tests(iter_test_paths(args.test262_dir / "test"), parse_log(args.input)),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
