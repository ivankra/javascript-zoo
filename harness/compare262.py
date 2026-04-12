#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from harness.data import PerModeTestResult, Report, TestResult


def sort_key(value: str) -> list[object]:
    parts = re.split(r"(\d+)", value)
    return [int(part) if i % 2 else part.lower() for i, part in enumerate(parts)]


def normalize_unified_value(value: Any) -> TestResult:
    if isinstance(value, str):
        return "PASS" if value == "OK" else value
    if isinstance(value, dict):
        normalized: PerModeTestResult = {}
        for mode, mode_value in value.items():
            mode_name = str(mode)
            status = "PASS" if mode_value == "OK" else str(mode_value)
            if mode_name == "strict":
                normalized["strict"] = status
            elif mode_name == "sloppy":
                normalized["sloppy"] = status
            else:
                raise SystemExit(f"unsupported unified test mode: {mode_name!r}")
        return normalized
    raise SystemExit(f"unsupported unified test result: {value!r}")


def coarse_status(value: TestResult) -> str:
    if isinstance(value, dict):
        statuses = {coarse_status(v) for v in value.values() if isinstance(v, str)}
        if statuses == {"PASS"}:
            return "PASS"
        if statuses == {"SKIP"}:
            return "SKIP"
        if statuses <= {"PASS", "SKIP"} and "PASS" not in statuses:
            return "SKIP"
        return "FAIL"

    if value == "PASS":
        return "PASS"
    if value.startswith("SKIP"):
        return "SKIP"
    return "FAIL"


def detail_text(value: TestResult) -> str:
    if isinstance(value, dict):
        return json.dumps(value, ensure_ascii=False, sort_keys=True)
    return value



def read_file(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except FileNotFoundError:
        raise SystemExit(f"file not found: {path}")


def _load_dict(path: Path) -> dict[str, Any]:
    data = json.loads(read_file(path))
    if not isinstance(data, dict):
        raise SystemExit(f"expected JSON object in {path}")
    return data


def load_unified(path: Path, data: dict[str, Any] | None = None) -> Report:
    data = data or _load_dict(path)
    if not isinstance(data.get("tests"), dict):
        raise SystemExit(f"missing tests object in {path}")
    report = Report.from_dict(data)
    report.tests = {k: normalize_unified_value(v) for k, v in report.tests.items()}
    return report


def load_test262_harness(path: Path, data: dict[str, Any] | None = None) -> Report:
    data = data or _load_dict(path)
    tests: dict[str, TestResult] = {}
    for key, value in data.items():
        if not isinstance(key, str) or not isinstance(value, str):
            raise SystemExit(f"unsupported test262-harness entry in {path}: {key!r} -> {value!r}")
        tests[key if key.startswith("test/") else f"test/{key}"] = value
    return Report(tests=tests)


def is_test262_harness_payload(data: Any) -> bool:
    if not isinstance(data, dict):
        return False
    sample_keys = [
        "test/annexB/built-ins/Array/from/iterator-method-emulates-undefined.js",
        "test/annexB/built-ins/Date/prototype/getYear/B.2.4.js",
    ]
    return any(isinstance(data.get(k), str) for k in sample_keys)


def load_results(path: Path, fmt: str) -> Report:
    if fmt == "jsz":
        data = _load_dict(path)
        if is_test262_harness_payload(data):
            return load_test262_harness(path, data)
        return load_unified(path, data)
    if fmt == "test262-harness":
        return load_test262_harness(path)
    raise SystemExit(f"unsupported format: {fmt}")


def format_meta_match(label: str, left: str | None, right: str | None) -> str:
    if left and right:
        match = "MATCH" if left == right else "MISMATCH"
        return f"{label}: {match} (ours: {left[:12]}, theirs: {right[:12]})"
    if left or right:
        return f"{label}: ours={left or 'N/A'}, theirs={right or 'N/A'}"
    return f"{label}: N/A"


def main() -> int:
    parser = argparse.ArgumentParser(description="Compare test262 JSON outputs")
    parser.add_argument("ours_json", help="Our jsz test262 JSON file")
    parser.add_argument("theirs_json", help="Other JSON file to compare against")
    parser.add_argument("-f", "--format", choices=["jsz", "test262-harness"], default="jsz", help="Format of theirs_json (default: jsz)")
    args = parser.parse_args()

    ours_path = Path(args.ours_json)
    theirs_path = Path(args.theirs_json)

    ours = load_unified(ours_path)
    theirs = load_results(theirs_path, args.format)

    shared = sorted(set(ours.tests) & set(theirs.tests), key=sort_key)
    diffs: list[tuple[str, TestResult, TestResult]] = []
    skip_shared_count = 0
    ours_skip_count = sum(1 for v in ours.tests.values() if coarse_status(v) == "SKIP")
    theirs_skip_count = sum(1 for v in theirs.tests.values() if coarse_status(v) == "SKIP")
    for test in shared:
        our_value = ours.tests[test]
        their_value = theirs.tests[test]
        our_coarse = coarse_status(our_value)
        their_coarse = coarse_status(their_value)
        if "SKIP" in (our_coarse, their_coarse):
            skip_shared_count += 1
            continue
        if our_coarse != their_coarse:
            diffs.append((test, our_value, their_value))

    print(f"Comparing: {ours_path} {theirs_path}")
    print(format_meta_match("Binary revision",
        ours.binary.get("revision") if ours.binary else None,
        theirs.binary.get("revision") if theirs.binary else None))
    if (ours.binary and ours.binary.get("arch")) and (theirs.binary and theirs.binary.get("arch")):
        print(format_meta_match("Binary arch", ours.binary.get("arch"), theirs.binary.get("arch")))
    print(format_meta_match("Test262 revision",
        ours.test262.revision if ours.test262 else None,
        theirs.test262.revision if theirs.test262 else None))
    tests_match = "MATCH" if len(ours.tests) == len(theirs.tests) else "MISMATCH"
    print(f"Tests: {tests_match} (ours: {len(ours.tests)}, theirs: {len(theirs.tests)}, shared: {len(shared)})")
    print(f"Skipped tests: {skip_shared_count} (ours: {ours_skip_count}, theirs: {theirs_skip_count})")

    print(f"Diffs: {len(diffs)}\n")
    for test, our_value, their_value in diffs:
        print(f"{test}: {detail_text(our_value)} vs {detail_text(their_value)}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
