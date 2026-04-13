#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path
from typing import Any


ENGINE = "v8"


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


def normalize_test_name(name: str) -> str:
    if name.startswith("test262/"):
        name = name[len("test262/") :]
    if name.startswith("test/"):
        name = name[5:]
    if name.endswith(".js"):
        name = name[:-3]
    return name


def normalize_result_value(value: str) -> str:
    if value in {"PASS", "SKIP", "FAIL", "CRASH", "TIMEOUT"}:
        return value
    return value or "FAIL"


def extract_expected(item: dict[str, Any]) -> str:
    expected = item.get("expected")
    if not isinstance(expected, list):
        return ""
    for value in expected:
        if not isinstance(value, str):
            continue
        normalized = normalize_result_value(value.strip())
        if normalized:
            return normalized
    return ""


def has_expected_pass_and_fail(item: dict[str, Any]) -> bool:
    expected = item.get("expected")
    if not isinstance(expected, list):
        return False
    values = {
        normalize_result_value(str(value).strip())
        for value in expected
        if isinstance(value, str) and str(value).strip()
    }
    return "PASS" in values and "FAIL" in values


def extract_actual(item: dict[str, Any]) -> str:
    # Seen in V8 status expectations where both outcomes are acceptable, e.g.:
    # - built-ins/Array/prototype/sort/bug_596_1
    # - built-ins/Date/prototype/setFullYear/new-value-time-clip
    # Mark these as skipped even though they ran if result wasn't recorded.
    if has_expected_pass_and_fail(item) and not item.get("result"):
        return "SKIP: may PASS or FAIL"

    result = str(item.get("result") or "").strip()
    if result:
        return normalize_result_value(result)

    expected = extract_expected(item)
    if expected:
        return expected

    if item.get("exit_code") == 0:
        return "PASS"
    return "FAIL"


def conv_tests(log_data: dict[str, Any]) -> dict[str, str]:
    tests: dict[str, str] = {}
    for item in log_data.get("results", []):
        if not isinstance(item, dict):
            continue
        name = item.get("name")
        if not isinstance(name, str) or not name.startswith("test262/"):
            continue
        test = f"test/{normalize_test_name(name)}.js"
        tests[test] = extract_actual(item)
    return dict(sorted(tests.items()))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/v8", type=Path)
    parser.add_argument("--test262-dir", default="test/test262/data", type=Path)
    parser.add_argument("input", default="test262.log", type=Path)
    args = parser.parse_args()

    log_data = load_json(args.input)
    if not isinstance(log_data, dict):
        raise SystemExit(f"expected JSON object in {args.input}")

    converted = {
        "note": "Converted from V8 tools/run-tests.py JSON output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(test262_dir=args.test262_dir),
        "tests": conv_tests(log_data),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
