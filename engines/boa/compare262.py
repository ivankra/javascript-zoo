#!/usr/bin/env python3
"""Compare test262 results: our harness JSON vs boa_tester latest.json.

Usage: compare262.py <ours.json> [latest.json]

Generate ours:
  ./harness/test262.py -o boa.json /dist/boa

If latest.json is not provided and doesn't exist in cwd, it will be downloaded from:
  https://raw.githubusercontent.com/boa-dev/data/main/test262/refs/heads/main/latest.json

Ensure both use the same test262 revision. Either:
  - point boa_tester at our copy: --test262-path /zoo/third_party/test262
  - or match revisions: check test262_config.toml "commit" vs our submodule

Also clear "features" and "tests" lists from test262_config.toml.
Keep just OOM/crashes that would hang boa_tester.
"""
import json
import os
import re
import sys
import urllib.request

REMOTE_URL = "https://raw.githubusercontent.com/boa-dev/data/main/test262/refs/heads/main/latest.json"
DEFAULT_FILE = "latest.json"


def sort_key(s: str) -> list:
    parts = re.split(r'(\d+)', s)
    return [int(p) if i % 2 else p.lower() for i, p in enumerate(parts)]


def load_ours(path: str) -> tuple[dict[str, str], dict[str, str | None]]:
    data = json.load(open(path))
    revisions: dict[str, str | None] = {
        "engine": data.get("binary", {}).get("binary_sha256"),
        "test262": (data.get("test262") or {}).get("revision"),
    }
    out: dict[str, str] = {}
    for test, val in data.get("tests", {}).items():
        if isinstance(val, str):
            out[test] = val
        elif isinstance(val, dict):
            out[test] = next((v for v in val.values() if v != "OK"), "OK")
    return out, revisions


def load_theirs(path: str) -> tuple[dict[str, str], dict[str, str | None]]:
    data = json.load(open(path))
    revisions: dict[str, str | None] = {
        "engine": data.get("c"),
        "test262": data.get("u"),
    }
    out: dict[str, str] = {}
    def walk(suite: dict, prefix: str) -> None:
        cur = f"{prefix}/{suite['n']}" if prefix else suite.get("n", "")
        for t in suite.get("t", []):
            out[f"{cur}/{t['n']}.js"] = t["r"]
        for s in suite.get("s", []):
            walk(s, cur)
    walk(data["r"], "")
    return out, revisions


THEIR_CLASS = {"O": "OK", "I": "IGNORED", "F": "FAIL", "P": "FAIL"}


def download(url: str, dest: str) -> None:
    print(f"Downloading {url} ...", file=sys.stderr)
    urllib.request.urlretrieve(url, dest)
    print(f"Saved to {dest}", file=sys.stderr)


def main() -> None:
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        sys.exit(f"Usage: {sys.argv[0]} <ours.json> [latest.json]")

    theirs_path = sys.argv[2] if len(sys.argv) == 3 else DEFAULT_FILE
    if not os.path.exists(theirs_path):
        if len(sys.argv) == 3:
            sys.exit(f"File not found: {theirs_path}")
        download(REMOTE_URL, theirs_path)

    ours, our_rev = load_ours(sys.argv[1])
    theirs, their_rev = load_theirs(theirs_path)

    for key in ("engine", "test262"):
        ov, tv = our_rev.get(key), their_rev.get(key)
        if ov and tv:
            match = "MATCH" if ov == tv else "MISMATCH"
            print(f"{key} revision: {match} (ours: {ov[:12]}, theirs: {tv[:12]})")
        elif ov or tv:
            print(f"{key} revision: ours={ov or 'N/A'}, theirs={tv or 'N/A'}")

    all_tests = sorted(set(ours) | set(theirs), key=sort_key)

    test_mm: list[tuple[str, str, str]] = []
    from collections import Counter
    our_ok: Counter[str] = Counter()
    our_fail: Counter[str] = Counter()
    their_ok: Counter[str] = Counter()
    their_fail: Counter[str] = Counter()

    for test in all_tests:
        o, t = ours.get(test), theirs.get(test)
        oc = ("OK" if o == "OK" else "FAIL") if o else "MISSING"
        tc = THEIR_CLASS.get(t, "MISSING") if t else "MISSING"
        if tc == "IGNORED":
            continue

        d = test.rsplit("/", 1)[0]
        if o: (our_ok if oc == "OK" else our_fail)[d] += 1
        if t: (their_ok if tc == "OK" else their_fail)[d] += 1

        if oc != tc:
            detail = o[:120] if oc == "FAIL" and o else oc
            test_mm.append((test, detail, tc))

    print(f"Loaded {len(ours)} tests (ours), {len(theirs)} tests (theirs)")

    all_dirs = set(our_ok) | set(our_fail) | set(their_ok) | set(their_fail)
    dm = []
    for d in all_dirs:
        ok_diff = abs(our_ok[d] - their_ok[d])
        fail_diff = abs(our_fail[d] - their_fail[d])
        if ok_diff or fail_diff:
            dm.append((d, our_ok[d], our_fail[d], their_ok[d], their_fail[d], ok_diff + fail_diff))
    dm.sort(key=lambda x: -x[5])
    if dm:
        print(f"\n=== Directory mismatches ({len(dm)}) ===")
        for d, oo, of_, to, tf, _ in dm:
            print(f"{d}: {oo}/{of_} vs {to}/{tf}")

    if test_mm:
        print(f"\n=== Test mismatches ({len(test_mm)}) ===")
        for test, detail, tc in test_mm:
            print(f"{test}: \"{detail}\" vs {tc}")
    else:
        print("\nNo test mismatches.")


if __name__ == "__main__":
    main()
