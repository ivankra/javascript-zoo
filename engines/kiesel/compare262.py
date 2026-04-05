#!/usr/bin/env python3
"""Compare test262 results: our harness JSON vs test262.fyi data.

Generate ours:
  ./harness/test262.py -o data/test262/kiesel.json /dist/kiesel

test262.fyi data is cloned from https://github.com/test262-fyi/data.git (gh-pages)
into <repo>/third_party/test262-fyi-data/ on first run.
"""
import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
DEFAULT_DATA_DIR = REPO_ROOT / "third_party" / "test262-fyi-data"
DEFAULT_OURS = REPO_ROOT / "data" / "test262"
DATA_REPO = "https://github.com/test262-fyi/data.git"


def sort_key(s: str) -> list:
    parts = re.split(r'(\d+)', s)
    return [int(p) if i % 2 else p.lower() for i, p in enumerate(parts)]


def ensure_data(data_dir: Path) -> None:
    if data_dir.exists():
        return
    print(f"Cloning {DATA_REPO} into {data_dir} ...", file=sys.stderr)
    subprocess.check_call(
        ["git", "clone", "--depth=1", "--branch=gh-pages",
         DATA_REPO, str(data_dir)],
        stdout=sys.stderr,
    )
    print(f"Done.", file=sys.stderr)


def load_ours(path: str) -> tuple[dict[str, str], dict[str, str | None]]:
    data = json.loads(Path(path).read_text())
    binary = data.get("binary") or {}
    revisions: dict[str, str | None] = {
        # Compare source revisions, not binary hashes.
        "engine": binary.get("revision") or binary.get("version"),
        "test262": (data.get("test262") or {}).get("revision"),
    }
    out: dict[str, str] = {}
    for test, val in data.get("tests", {}).items():
        if isinstance(val, str):
            out[test] = val
        elif isinstance(val, dict):
            out[test] = next((v for v in val.values() if v != "OK"), "OK")
    return out, revisions


def load_theirs(engine: str, data_dir: Path) -> tuple[dict[str, str], dict[str, str | None]]:
    """Walk leaf JSON files to collect per-test pass/fail for engine."""
    revision_file = data_dir / "engines.json"
    engine_rev = None
    if revision_file.exists():
        engines = json.loads(revision_file.read_text())
        if engine not in engines:
            known = ", ".join(sorted(engines))
            sys.exit(f"Unknown test262.fyi engine: {engine}. Known engines: {known}")
        engine_rev = engines.get(engine)

    test262_rev = None
    t262_file = data_dir / "test262.json"
    if t262_file.exists():
        test262_rev = json.loads(t262_file.read_text()).get("revision")

    out: dict[str, str] = {}

    def walk(json_path: Path) -> None:
        data = json.loads(json_path.read_text())
        for name, info in sorted(data.get("files", {}).items()):
            if name.endswith(".js"):
                total = info["total"]
                eng_count = info.get("engines", {}).get(engine, 0)
                out[name] = "OK" if eng_count == total else "FAIL"
            else:
                # Subdirectory — find corresponding JSON
                sub = data_dir / (name + ".json")
                if sub.exists():
                    walk(sub)

    # Walk top-level dirs from index.json
    index = data_dir / "index.json"
    data = json.loads(index.read_text())
    for name in sorted(data.get("files", {})):
        sub = data_dir / (name + ".json")
        if sub.exists():
            walk(sub)

    return out, {"engine": engine_rev, "test262": test262_rev}


def resolve_ours_path(path: str, engine: str) -> Path:
    candidate = Path(path)
    if candidate.is_dir():
        return candidate / f"{engine}.json"
    return candidate


def main() -> None:
    description, _, epilog = (__doc__ or "").partition("\n\n")
    parser = argparse.ArgumentParser(
        description=description,
        epilog=epilog,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("ours", nargs="?",
                        default=str(DEFAULT_OURS),
                        help=f"Our harness JSON file or directory; directories resolve to <engine>.json (default: {DEFAULT_OURS})")
    parser.add_argument("data_dir", nargs="?",
                        default=str(DEFAULT_DATA_DIR),
                        help=f"test262.fyi data dir (default: {DEFAULT_DATA_DIR})")
    parser.add_argument("-e", "--engine", default="kiesel",
                        help="test262.fyi engine (default: kiesel)")
    args = parser.parse_args()
    ours_path = resolve_ours_path(args.ours, args.engine)
    data_dir = Path(args.data_dir)
    user_provided_data_dir = args.data_dir != str(DEFAULT_DATA_DIR)

    if not os.path.exists(ours_path):
        sys.exit(f"File not found: {ours_path}")

    if user_provided_data_dir:
        if not data_dir.exists():
            sys.exit(f"File not found: {data_dir}")
    else:
        ensure_data(data_dir)

    ours, our_rev = load_ours(str(ours_path))
    theirs_raw, their_rev = load_theirs(args.engine, data_dir)

    # Normalize paths: ours has "test/" prefix, theirs doesn't
    theirs: dict[str, str] = {}
    for k, v in theirs_raw.items():
        theirs[f"test/{k}"] = v

    def rev_match(a: str, b: str) -> bool:
        n = min(len(a), len(b))
        return a[:n] == b[:n]

    for key in ("engine", "test262"):
        ov = our_rev.get(key)
        tv = their_rev.get(key) if their_rev else None
        if ov and tv:
            match = "MATCH" if rev_match(ov, tv) else "MISMATCH"
            print(f"{key} revision: {match} (ours: {str(ov)[:12]}, theirs: {str(tv)[:12]})")
        elif ov or tv:
            print(f"{key} revision: ours={ov or 'N/A'}, theirs={tv or 'N/A'}")

    all_tests = sorted(set(ours) | set(theirs), key=sort_key)
    count_match = "MATCH" if len(ours) == len(theirs) else "MISMATCH"
    print(f"Tests: {count_match} (ours: {len(ours)}, theirs: {len(theirs)})")

    test_mm: list[tuple[str, str, str]] = []

    for test in all_tests:
        o, t = ours.get(test), theirs.get(test)
        oc = ("OK" if o == "OK" else "FAIL") if o else "MISSING"
        tc = t if t else "MISSING"

        if oc != tc:
            detail = o[:120] if oc == "FAIL" and o else oc
            test_mm.append((test, detail, tc))

    if test_mm:
        print(f"\n=== Test mismatches ({len(test_mm)}) ===")
        for test, detail, tc in test_mm:
            print(f"{test}: \"{detail}\" vs {tc}")
    else:
        print("\nNo test mismatches.")


if __name__ == "__main__":
    main()
