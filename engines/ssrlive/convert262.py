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


ENGINE = "ssrlive"
RESULT_RE = re.compile(r"^(PASS|FAIL|SKIP|TIMEOUT|CRASH)\s+(/test262/test/.+\.js)$")


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


def normalize_path(path: str) -> str:
    return f"test/{path.removeprefix('/test262/test/')}"


def fail_message(lines: list[str]) -> str:
    filtered = [line.strip() for line in lines if line.strip()]
    if not filtered or filtered == ["<no output>"]:
        return "FAIL"
    for line in filtered:
        if line.startswith("Uncaught:"):
            return line.removeprefix("Uncaught:").strip()
    for line in filtered:
        if "Error" in line or "TypeError" in line or "SyntaxError" in line:
            return line
    return filtered[0]


def conv_tests(path: Path) -> dict[str, str]:
    results: dict[str, str] = {}
    pending_fail_path: str | None = None
    in_fail_output = False
    current_fail_output: list[str] = []

    for raw_line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        line = raw_line.strip()

        if pending_fail_path is not None and line == "---- OUTPUT (summary) ----":
            in_fail_output = True
            current_fail_output = []
            continue

        if in_fail_output:
            if line == "----------------":
                results[pending_fail_path] = fail_message(current_fail_output)
                pending_fail_path = None
                in_fail_output = False
                current_fail_output = []
            else:
                current_fail_output.append(raw_line)
            continue

        match = RESULT_RE.match(line)
        if not match:
            continue
        status, raw_path = match.groups()
        path_key = normalize_path(raw_path)
        if status == "PASS":
            results[path_key] = "PASS"
        elif status == "SKIP":
            results[path_key] = "SKIP"
        elif status == "TIMEOUT":
            results[path_key] = "TIMEOUT"
        elif status == "CRASH":
            results[path_key] = "CRASH"
        else:
            pending_fail_path = path_key
            results[path_key] = "FAIL"

    if pending_fail_path is not None and pending_fail_path not in results:
        results[pending_fail_path] = "FAIL"
    if not results:
        raise SystemExit(f"no test result rows found in {path}")
    return results


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/ssrlive", type=Path)
    parser.add_argument("--test262-dir", default="/test262", type=Path)
    parser.add_argument("input", default="test262-results.log", type=Path)
    args = parser.parse_args()
    binary_json_path = args.binary.with_suffix(".json")

    converted = {
        "note": "Converted from ssrlive test262 ci runner's test262-results.log",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(test262_dir=args.test262_dir),
        "tests": conv_tests(args.input),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
