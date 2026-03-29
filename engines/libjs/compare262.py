#!/usr/bin/env python3
"""Compare test262 results: our harness JSON vs libjs-data per-file-master.json.

Usage: compare262.py <libjs.json> [per-file-master.json]

Generate ours:
  ./harness/test262.py -o libjs.json /dist/libjs

If per-file-master.json is not provided and doesn't exist in cwd, it will be
downloaded from:
  https://raw.githubusercontent.com/LadybirdBrowser/libjs-data/master/test262/per-file-master.json
"""
import json
import os
import re
import sys
import urllib.request
REMOTE_URL = "https://raw.githubusercontent.com/LadybirdBrowser/libjs-data/master/test262/per-file-master.json"
DEFAULT_FILE = "per-file-master.json"


def sort_key(s: str) -> list:
    parts = re.split(r'(\d+)', s)
    return [int(p) if i % 2 else p.lower() for i, p in enumerate(parts)]


def download(url: str, dest: str) -> None:
    print(f"Downloading {url} ...", file=sys.stderr)
    urllib.request.urlretrieve(url, dest)
    print(f"Saved to {dest}", file=sys.stderr)


def load_ours(path: str) -> tuple[dict[str, str], str | None]:
    data = json.load(open(path))
    revision = None
    t262 = data.get("test262")
    if isinstance(t262, dict):
        revision = t262.get("revision")
    out: dict[str, str] = {}
    for test, val in data.get("tests", {}).items():
        if isinstance(val, str):
            out[test] = val
        elif isinstance(val, dict):
            out[test] = next((v for v in val.values() if v != "OK"), "OK")
    return out, revision


THEIR_CLASS = {
    "PASSED": "OK",
    "FAILED": "FAIL",
    "HARNESS_ERROR": "FAIL",
    "PROCESS_ERROR": "FAIL",
    "TODO_ERROR": "FAIL",
    "SKIPPED": "SKIPPED",
}


def load_theirs(path: str) -> dict[str, str]:
    data = json.load(open(path))
    out: dict[str, str] = {}
    for test, status in data.get("results", {}).items():
        out[test] = status
    return out


def main() -> None:
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        sys.exit(f"Usage: {sys.argv[0]} <libjs.json> [per-file-master.json]")

    theirs_path = sys.argv[2] if len(sys.argv) == 3 else DEFAULT_FILE
    if not os.path.exists(theirs_path):
        if len(sys.argv) == 3:
            sys.exit(f"File not found: {theirs_path}")
        download(REMOTE_URL, theirs_path)

    ours, our_rev = load_ours(sys.argv[1])
    theirs = load_theirs(theirs_path)

    if our_rev:
        print(f"Our test262 revision: {our_rev}")

    all_tests = sorted(set(ours) | set(theirs), key=sort_key)

    test_mm: list[tuple[str, str, str]] = []

    for test in all_tests:
        o, t = ours.get(test), theirs.get(test)
        oc = ("OK" if o == "OK" else "FAIL") if o else "MISSING"
        tc = THEIR_CLASS.get(t, "MISSING") if t else "MISSING"
        if tc == "SKIPPED":
            continue

        if oc != tc:
            detail = o[:120] if oc == "FAIL" and o else oc
            test_mm.append((test, detail, tc))

    print(f"Loaded {len(ours)} tests (ours), {len(theirs)} tests (theirs)")

    if test_mm:
        print(f"\n=== Test mismatches ({len(test_mm)}) ===")
        for test, detail, tc in test_mm:
            print(f"{test}: \"{detail}\" vs {tc}")
    else:
        print("\nNo test mismatches.")


if __name__ == "__main__":
    main()
