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

def sort_key(value: str) -> list[object]:
    parts = re.split(r"(\d+)", value)
    return [int(part) if i % 2 else part.lower() for i, part in enumerate(parts)]


def normalize_unified_value(value: Any) -> str | dict[str, str]:
    if isinstance(value, str):
        return "PASS" if value == "OK" else value
    if isinstance(value, dict):
        return {
            str(mode): ("PASS" if mode_value == "OK" else str(mode_value))
            for mode, mode_value in value.items()
        }
    raise SystemExit(f"unsupported unified test result: {value!r}")


def coarse_status(value: str | dict[str, str]) -> str:
    if isinstance(value, dict):
        statuses = {coarse_status(v) for v in value.values()}
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


def detail_text(value: str | dict[str, str]) -> str:
    if isinstance(value, dict):
        return json.dumps(value, ensure_ascii=False, sort_keys=True)
    return value


def display_text(value: str | dict[str, str]) -> str:
    if isinstance(value, dict):
        return detail_text(value)
    return detail_text(value)


def read_file(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except FileNotFoundError:
        raise SystemExit(f"file not found: {path}")


def load_unified(path: Path) -> tuple[dict[str, str | dict[str, str]], dict[str, str | None]]:
    data = json.loads(read_file(path))
    if not isinstance(data, dict):
        raise SystemExit(f"expected JSON object in {path}")

    tests = data.get("tests")
    if not isinstance(tests, dict):
        raise SystemExit(f"missing tests object in {path}")

    normalized_tests: dict[str, str | dict[str, str]] = {}
    for key, value in tests.items():
        if not isinstance(key, str):
            raise SystemExit(f"non-string test id in {path}: {key!r}")
        normalized_tests[key] = normalize_unified_value(value)

    binary = data.get("binary")
    test262 = data.get("test262")
    metadata = {
        "engine_revision": binary.get("revision") if isinstance(binary, dict) else None,
        "engine_version": binary.get("version") if isinstance(binary, dict) else None,
        "engine_arch": binary.get("arch") if isinstance(binary, dict) else None,
        "test262_revision": test262.get("revision") if isinstance(test262, dict) else None,
    }
    return normalized_tests, metadata


def load_test262_harness(path: Path) -> tuple[dict[str, str | dict[str, str]], dict[str, str | None]]:
    data = json.loads(read_file(path))
    if not isinstance(data, dict):
        raise SystemExit(f"expected JSON object in {path}")

    tests: dict[str, str | dict[str, str]] = {}
    for key, value in data.items():
        if not isinstance(key, str) or not isinstance(value, str):
            raise SystemExit(f"unsupported test262-harness entry in {path}: {key!r} -> {value!r}")
        tests[key if key.startswith("test/") else f"test/{key}"] = value
    return tests, {
        "engine_revision": None,
        "engine_version": None,
        "engine_arch": None,
        "test262_revision": None,
    }


def is_test262_harness_payload(data: Any) -> bool:
    if not isinstance(data, dict):
        return False

    sample_keys = [
        "test/annexB/built-ins/Array/from/iterator-method-emulates-undefined.js",
        "test/annexB/built-ins/Date/prototype/getYear/B.2.4.js",
    ]

    for key in sample_keys:
        value = data.get(key)
        if isinstance(value, str):
            return True

    return False


def load_results(path: Path, fmt: str) -> tuple[dict[str, str | dict[str, str]], dict[str, str | None]]:
    if fmt == "jsz":
        data = json.loads(read_file(path))
        if is_test262_harness_payload(data):
            return load_test262_harness(path)
        return load_unified(path)
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

    ours, our_meta = load_unified(ours_path)
    theirs, their_meta = load_results(theirs_path, args.format)

    shared = sorted(set(ours) & set(theirs), key=sort_key)
    diffs: list[tuple[str, str | dict[str, str], str | dict[str, str]]] = []
    skip_shared_count = 0
    ours_skip_count = sum(1 for value in ours.values() if coarse_status(value) == "SKIP")
    theirs_skip_count = sum(1 for value in theirs.values() if coarse_status(value) == "SKIP")
    for test in shared:
        our_value = ours[test]
        their_value = theirs[test]
        our_coarse = coarse_status(our_value)
        their_coarse = coarse_status(their_value)
        if "SKIP" in (our_coarse, their_coarse):
            skip_shared_count += 1
            continue
        if our_coarse != their_coarse:
            diffs.append((test, our_value, their_value))

    print(f"Comparing: {ours_path} {theirs_path}")
    print(format_meta_match("Binary revision", our_meta.get("engine_revision"), their_meta.get("engine_revision")))
    if our_meta.get("engine_arch") and their_meta.get("engine_arch"):
        print(format_meta_match("Binary arch", our_meta.get("engine_arch"), their_meta.get("engine_arch")))
    print(format_meta_match("Test262 revision", our_meta.get("test262_revision"), their_meta.get("test262_revision")))
    tests_match = "MATCH" if len(ours) == len(theirs) else "MISMATCH"
    print(f"Tests: {tests_match} (ours: {len(ours)}, theirs: {len(theirs)}, shared: {len(shared)})")
    print(f"Skipped tests: {skip_shared_count} (ours: {ours_skip_count}, theirs: {theirs_skip_count})")

    print(f"Diffs: {len(diffs)}\n")
    for test, our_value, their_value in diffs:
        print(f"{test}: {display_text(our_value)} vs {display_text(their_value)}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
