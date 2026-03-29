#!/usr/bin/env python3
"""Compare test262 results: quickjs.json (ours) vs run-test262 output (theirs).

Usage: compare262.py <quickjs.json> [test262.out]

Generate ours:
  ./harness/test262.py -o quickjs.json /dist/quickjs

Generate theirs (in quickjs repo):
  ./run-test262 -c test262.conf -r test262.out
"""
import json
import re
import sys

def sort_key(s: str) -> list:
    parts = re.split(r'(\d+)', s)
    return [int(p) if i % 2 else p.lower() for i, p in enumerate(parts)]


def load_ours(path: str) -> dict[str, str]:
    """Load quickjs.json -> {test_path: status_or_error}"""
    data = json.load(open(path))
    out: dict[str, str] = {}
    for test, val in data.get("tests", {}).items():
        # paths in quickjs.json start with "test/..."
        if isinstance(val, str):
            out[test] = val
        elif isinstance(val, dict):
            out[test] = next((v for v in val.values() if v != "OK"), "OK")
    return out


def load_theirs(path: str) -> dict[str, str]:
    """Parse run-test262 output -> {test_path: "OK"|"SKIPPED"|error_message}

    Format:
      N: test262/test/path/to/test.js [flags...]
      [error lines...]
      [  FAILED]
    or
      N: test262/test/path/to/test.js [flags...]  SKIPPED
    """
    out: dict[str, str] = {}
    current_test = None
    error_lines: list[str] = []

    with open(path) as f:
        for line in f:
            line = line.rstrip('\n')

            # test line: "N: test262/test/..."
            m = re.match(r'\d+: (test262/test/\S+)', line)
            if m:
                # flush previous test
                if current_test is not None:
                    out[current_test] = "OK"

                test_path = m.group(1)
                # normalize: strip "test262/" prefix -> "test/..."
                test_path = test_path.removeprefix("test262/")

                if line.rstrip().endswith("SKIPPED"):
                    out[test_path] = "SKIPPED"
                    current_test = None
                else:
                    current_test = test_path
                    error_lines = []
                continue

            if line == "  FAILED":
                if current_test is not None:
                    msg = "\n".join(error_lines).strip()
                    out[current_test] = msg if msg else "FAILED"
                    current_test = None
                continue

            # accumulate error output lines
            if current_test is not None:
                error_lines.append(line)

    # flush last test
    if current_test is not None:
        out[current_test] = "OK"

    return out


def classify(status: str) -> str:
    if status == "OK":
        return "OK"
    if status == "SKIPPED":
        return "SKIPPED"
    return "FAIL"


def main() -> None:
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        sys.exit(f"Usage: {sys.argv[0]} <quickjs.json> [test262.out]")

    ours = load_ours(sys.argv[1])
    theirs = load_theirs(sys.argv[2] if len(sys.argv) == 3 else "test262.out")

    all_tests = sorted(set(ours) | set(theirs), key=sort_key)

    mismatches: list[tuple[str, str, str]] = []  # (test, our_detail, their_class)
    skips: list[tuple[str, str, str]] = []

    for test in all_tests:
        o, t = ours.get(test), theirs.get(test)
        oc = classify(o) if o else "MISSING"
        tc = classify(t) if t else "MISSING"

        if tc == "SKIPPED":
            continue
        if oc == "SKIPPED":
            continue

        if oc != tc:
            detail = o[:120] if oc == "FAIL" and o else oc
            their_detail = t[:120] if tc == "FAIL" and t else tc
            entry = (test, detail, their_detail)
            if oc == "MISSING" or tc == "MISSING":
                skips.append(entry)
            else:
                mismatches.append(entry)

    print(f"Loaded {len(ours)} tests (ours), {len(theirs)} tests (theirs)")

    if mismatches:
        print(f"\n=== Test mismatches ({len(mismatches)}) ===")
        for test, detail, their_detail in mismatches:
            print(f"{test}: \"{detail}\" vs \"{their_detail}\"")
    else:
        print("\nNo test mismatches.")

    if skips:
        print(f"\n=== Missing in one side ({len(skips)}) ===")
        for test, detail, their_detail in skips:
            print(f"{test}: \"{detail}\" vs \"{their_detail}\"")


if __name__ == "__main__":
    main()
