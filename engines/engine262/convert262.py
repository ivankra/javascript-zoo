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


ENGINE = "engine262"
PASS_HEADER = "The following tests passed:"
SKIP_HEADER = "The following tests were skipped:"
FAIL_HEADER = "The following tests failed:"
PATH_PREFIX = "./test/test262/test262/test/"



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


def normalize_test_path(path: str) -> str:
    path = path.strip()
    if path.startswith("- "):
        path = path[2:].strip()
    if path.startswith(PATH_PREFIX):
        path = path[len(PATH_PREFIX) :]
    if path.startswith("test/"):
        return path
    return f"test/{path}"


def parse_failure_messages(text: str) -> dict[str, str]:
    pattern = re.compile(r"^ FAIL  (?P<path>\S+) (?P<desc>.+?)\n(?P<body>.*?)(?=^ FAIL  |\Z)", re.M | re.S)
    failures: dict[str, str] = {}
    preferred_patterns = [
        re.compile(r"^(?:\w+Error|Error):\s"),
        re.compile(r"^Expected .+"),
        re.compile(r"^NoAsyncTestComplete\b"),
    ]
    for match in pattern.finditer(text):
        test = normalize_test_path(match.group("path"))
        lines = [line.strip() for line in match.group("body").splitlines()]
        message = ""
        for pattern in preferred_patterns:
            for line in lines:
                if not line or line.startswith("<NATIVE>") or line.startswith("at "):
                    continue
                if line.startswith("|") or line.startswith("^") or re.match(r"^\d+\s+\|", line):
                    continue
                if pattern.match(line):
                    message = line
                    break
            if message:
                break
        if not message:
            for line in lines:
                if not line or line.startswith("<NATIVE>") or line.startswith("at "):
                    continue
                if line.startswith("|") or line.startswith("^") or re.match(r"^\d+\s+\|", line):
                    continue
                if "---" in line:
                    continue
                message = line
                break
        failures[test] = message or "FAIL"
    return failures


def parse_sections(text: str) -> tuple[set[str], dict[str, str], set[str]]:
    passed: set[str] = set()
    skipped: dict[str, str] = {}
    failed: set[str] = set()

    section: str | None = None
    skip_kind = "SKIP"

    for raw_line in text.splitlines():
        line = raw_line.rstrip()
        stripped = line.strip()

        if stripped == PASS_HEADER:
            section = "passed"
            continue
        if stripped == SKIP_HEADER:
            section = "skipped"
            skip_kind = "SKIP"
            continue
        if stripped == FAIL_HEADER:
            section = "failed"
            continue

        if section == "skipped" and stripped.startswith("- Reason: "):
            reason = stripped[len("- Reason: ") :]
            if reason.startswith("slow-list"):
                skip_kind = "SKIP: slow"
            else:
                skip_kind = "SKIP"
            continue

        if stripped.startswith("Total "):
            continue

        if not stripped:
            continue

        if section == "skipped" and stripped.startswith("- ./"):
            test = normalize_test_path(stripped[2:])
            skipped[test] = skip_kind
            continue

        if section == "skipped" and stripped.startswith("./"):
            skipped[normalize_test_path(stripped)] = skip_kind
            continue

        if stripped.startswith("- "):
            test = normalize_test_path(stripped[2:])
            if section == "passed":
                passed.add(test)
            elif section == "failed":
                failed.add(test)

    return passed, skipped, failed


def conv_tests(log_text: str) -> dict[str, str]:
    passed, skipped, failed = parse_sections(log_text)
    failure_messages = parse_failure_messages(log_text)

    overlap = (passed & failed) | (passed & set(skipped)) | (failed & set(skipped))
    if overlap:
        raise SystemExit(f"test appears in multiple engine262 result categories: {sorted(overlap)[0]}")

    missing_fail_message = sorted(test for test in failed if test not in failure_messages)
    if missing_fail_message:
        raise SystemExit(f"missing failure message in engine262 log for: {missing_fail_message[0]}")

    tests: dict[str, str] = {}
    for test in sorted(passed):
        tests[test] = "PASS"
    for test, value in sorted(skipped.items()):
        tests[test] = value
    for test in sorted(failed):
        tests[test] = failure_messages[test]
    return tests


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/engine262", type=Path)
    parser.add_argument("--test262-dir", default="test/test262/test262", type=Path)
    parser.add_argument("input", default="test262.log", type=Path)
    args = parser.parse_args()
    binary_json_path = args.binary.with_suffix(".json")

    converted = {
        "note": "Converted from engine262 test262.mts --vv output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(test262_dir=args.test262_dir),
        "tests": conv_tests(args.input.read_text(encoding="utf-8")),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
