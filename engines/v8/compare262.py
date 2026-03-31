#!/usr/bin/env python3
"""Compare our test262 JSON against upstream V8 test262.status.

Usage: compare262.py <ours.json> [test262.status]

Generate ours:
  ./conformance/test262.py -o conformance/v8.json ./dist/arm64/v8_full

If test262.status is not provided and doesn't exist next to this script, it
will be downloaded from:
  https://raw.githubusercontent.com/v8/v8/main/test/test262/test262.status
"""

from __future__ import annotations

import json
import fnmatch
import os
import re
import sys
import urllib.request
from pathlib import Path

REMOTE_URL = "https://raw.githubusercontent.com/v8/v8/main/test/test262/test262.status"
DEFAULT_FILE = Path(__file__).with_name("test262.status")


def sort_key(s: str) -> list[object]:
    parts = re.split(r"(\d+)", s)
    return [int(p) if i % 2 else p.lower() for i, p in enumerate(parts)]


def download(url: str, dest: Path) -> None:
    print(f"Downloading {url} ...", file=sys.stderr)
    urllib.request.urlretrieve(url, dest)
    print(f"Saved to {dest}", file=sys.stderr)


def load_ours(path: str) -> dict[str, str]:
    data = json.load(open(path))
    out: dict[str, str] = {}
    for test, val in data.get("tests", {}).items():
        if isinstance(val, str):
            out[test] = val
        elif isinstance(val, dict):
            out[test] = next((v for v in val.values() if v != "OK"), "OK")
    return out


def extract_our_test262_revision(path: str) -> str | None:
    data = json.load(open(path))
    rev = data.get("test262", {}).get("revision")
    return rev if isinstance(rev, str) and rev else None


def normalize_status_pattern(pattern: str) -> str:
    if pattern.startswith("test/"):
        pattern = pattern[5:]
    if pattern.endswith(".js"):
        pattern = pattern[:-3]
    return pattern


def normalize_our_test(test: str) -> str:
    if test.startswith("test/"):
        test = test[5:]
    if test.endswith(".js"):
        test = test[:-3]
    return test


def classify_ours(status: str | None) -> str:
    if status is None:
        return "MISSING"
    return "OK" if status == "OK" else "FAIL"


def parse_status_outcomes(outcomes: str) -> set[str]:
    return {token.strip() for token in outcomes.split(",")}


def load_status_patterns(path: str) -> tuple[list[tuple[str, str, str]], dict[str, set[str]]]:
    patterns: list[tuple[str, str, str]] = []
    seen: dict[str, set[str]] = {}
    entry_re = re.compile(r"'([^']+)'\s*:\s*\[([^\]]+)\]")
    in_always = False

    with open(path, encoding="utf-8") as f:
        for line in f:
            stripped = line.strip()
            if stripped == "[ALWAYS, {":
                in_always = True
                continue
            if in_always and stripped == "}],":
                in_always = False
                continue
            if not in_always:
                continue

            line = line.split("#", 1)[0]
            m = entry_re.search(line)
            if not m:
                continue

            pattern, outcomes_raw = m.groups()
            outcomes = parse_status_outcomes(outcomes_raw)
            if outcomes == {"SKIP"}:
                normalized = normalize_status_pattern(pattern)
                patterns.append((pattern, normalized, "SKIP"))
                seen.setdefault(normalized, set()).add("SKIP")
            elif outcomes == {"FAIL"}:
                normalized = normalize_status_pattern(pattern)
                patterns.append((pattern, normalized, "FAIL"))
                seen.setdefault(normalized, set()).add("FAIL")
            else:
                # Ignore ambiguous/flaky entries like [PASS, FAIL].
                continue

    return patterns, {k: v for k, v in seen.items() if len(v) > 1}


def extract_test262_revision(path: str) -> str | None:
    rev_re = re.compile(r"# import test262@([0-9a-f]{8,40})\b")
    latest: str | None = None
    with open(path, encoding="utf-8") as f:
        for line in f:
            m = rev_re.search(line)
            if m:
                latest = m.group(1)
    return latest


def expected_class(
    test: str,
    patterns: list[tuple[str, str, str]],
) -> str:
    name = normalize_our_test(test)
    expected = "OK"
    for _raw, pattern, outcome in patterns:
        if fnmatch.fnmatchcase(name, pattern):
            expected = outcome
    return expected


def main() -> None:
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        sys.exit(f"Usage: {sys.argv[0]} <ours.json> [test262.status]")

    theirs_path = Path(sys.argv[2]) if len(sys.argv) == 3 else DEFAULT_FILE
    if not theirs_path.exists():
        if len(sys.argv) == 3:
            sys.exit(f"File not found: {theirs_path}")
        download(REMOTE_URL, theirs_path)

    ours = load_ours(sys.argv[1])
    our_rev = extract_our_test262_revision(sys.argv[1])
    patterns, conflicting_patterns = load_status_patterns(str(theirs_path))
    status_rev = extract_test262_revision(str(theirs_path))

    mismatches: list[tuple[str, str, str]] = []
    skips: list[tuple[str, str, str]] = []

    for test in sorted(ours, key=sort_key):
        actual = classify_ours(ours.get(test))
        expected = expected_class(test, patterns)

        if expected == "SKIP":
            detail = ours[test][:120] if actual == "FAIL" else actual
            skips.append((test, detail, expected))
            continue

        if actual != expected:
            detail = ours[test][:120] if actual == "FAIL" else actual
            mismatches.append((test, detail, expected))

    fail_count = sum(1 for *_rest, outcome in patterns if outcome == "FAIL")
    skip_count = sum(1 for *_rest, outcome in patterns if outcome == "SKIP")
    print(f"Loaded {len(ours)} tests (ours), {fail_count} FAIL patterns, {skip_count} SKIP patterns")
    if our_rev or status_rev:
        marker = "MISMATCH" if our_rev and status_rev and our_rev != status_rev else "match"
        print(f"test262 revisions: {marker} ours={our_rev or '?'} v8={status_rev or '?'}")
    if conflicting_patterns:
        print(f"warning: {len(conflicting_patterns)} status patterns have conflicting ALWAYS outcomes; last entry wins")

    print(f"\n=== Mismatches ({len(mismatches)}) ===")
    for test, actual, expected in mismatches:
        print(f'{test}: "{actual}" vs {expected}')

    print(f"\n=== Skips ({len(skips)}) ===")
    for test, actual, expected in skips:
        print(f'{test}: "{actual}" vs {expected}')


if __name__ == "__main__":
    main()
