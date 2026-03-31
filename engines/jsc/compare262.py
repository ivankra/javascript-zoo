#!/usr/bin/env python3
"""Compare our test262 JSON against JSC/WebKit test262 expectations.

Usage: compare262.py <ours.json> [expectations.yaml]

Generate ours:
  ./conformance/test262.py -o conformance/jsc.json ./dist/arm64/jsc

If expectations.yaml is not provided and doesn't exist next to this script, it
will be downloaded from:
  https://raw.githubusercontent.com/WebKit/WebKit/main/JSTests/test262/expectations.yaml

The script also loads sibling JSC metadata files:
  - config.yaml
  - test262-Revision.txt
"""

from __future__ import annotations

import json
import re
import sys
import urllib.request
from pathlib import Path
from typing import Any

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from harness.frontmatter import Frontmatter

REMOTE_BASE = "https://raw.githubusercontent.com/WebKit/WebKit/main/JSTests/test262/"
EXPECTATIONS_FILE = "expectations.yaml"
CONFIG_FILE = "config.yaml"
REVISION_FILE = "test262-Revision.txt"
DEFAULT_EXPECTATIONS = Path(__file__).with_name(EXPECTATIONS_FILE)


def sort_key(s: str) -> list[object]:
    parts = re.split(r"(\d+)", s)
    return [int(p) if i % 2 else p.lower() for i, p in enumerate(parts)]


def download(url: str, dest: Path) -> None:
    print(f"Downloading {url} ...", file=sys.stderr)
    urllib.request.urlretrieve(url, dest)
    print(f"Saved to {dest}", file=sys.stderr)


def ensure_side_file(directory: Path, name: str, *, required: bool = False) -> Path | None:
    path = directory / name
    if path.exists():
        return path
    if required:
        download(REMOTE_BASE + name, path)
        return path
    try:
        download(REMOTE_BASE + name, path)
        return path
    except Exception:
        return None


def load_ours(path: str) -> dict[str, str | dict[str, str]]:
    data = json.load(open(path))
    out: dict[str, str | dict[str, str]] = {}
    for test, val in data.get("tests", {}).items():
        if isinstance(val, str):
            out[test] = val
            continue
        if not isinstance(val, dict):
            continue
        by_mode = {str(k): str(v) for k, v in sorted(val.items())}
        messages = list(by_mode.values())
        out[test] = messages[0] if messages and len(set(messages)) == 1 else by_mode
    return out


def extract_our_test262_revision(path: str) -> str | None:
    data = json.load(open(path))
    rev = data.get("test262", {}).get("revision")
    return rev if isinstance(rev, str) and rev else None


def extract_jsc_test262_revision(path: Path | None) -> str | None:
    if not path or not path.exists():
        return None
    rev_re = re.compile(r"^test262 revision:\s*([0-9a-f]{8,40})\s*$")
    with path.open(encoding="utf-8") as f:
        for line in f:
            m = rev_re.match(line.strip())
            if m:
                return m.group(1)
    return None


def load_yaml(path: Path) -> Any:
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def normalize_mode(mode: str) -> str:
    return {"default": "sloppy", "strict mode": "strict"}.get(mode, mode)


def normalize_text(text: str) -> str:
    text = text.strip()
    text = re.sub(r"^Test262:AsyncTestFailure:Test262Error:\s*Test262Error:\s*", "AsyncTestFailure: ", text)
    text = re.sub(r"^Error:\s+", "", text)
    return text


def texts_match(actual: str, expected: str) -> bool:
    if actual == expected:
        return True
    if len(actual) >= 20 and len(expected) >= 20:
        return actual[:20] == expected[:20]
    return False


def normalize_expectation(entry: Any) -> str | dict[str, str] | None:
    if entry is None:
        return None
    if isinstance(entry, str):
        return normalize_text(entry)
    if not isinstance(entry, dict):
        return normalize_text(str(entry))
    by_mode = {
        normalize_mode(str(mode)): normalize_text(str(message))
        for mode, message in entry.items()
        if isinstance(message, str) and normalize_mode(str(mode)) in {"sloppy", "strict"}
    }
    if not by_mode:
        return None
    messages = list(by_mode.values())
    return messages[0] if len(set(messages)) == 1 else by_mode


def expected_mode_message(expected: str | dict[str, str] | None, mode: str) -> str:
    if expected is None:
        return "OK"
    if isinstance(expected, str):
        return expected
    if mode == "strict" and "strict" in expected:
        return expected["strict"]
    if "sloppy" in expected:
        return expected["sloppy"]
    if "strict" in expected:
        return expected["strict"]
    return "OK"


def actual_mode_message(actual: str | dict[str, str] | None, mode: str) -> str:
    if actual is None:
        return "MISSING"
    if isinstance(actual, str):
        return normalize_text(actual)
    value = actual.get(mode, "MISSING")
    return value if value == "MISSING" else normalize_text(value)


def mode_matches(actual: str | dict[str, str] | None, expected: str | dict[str, str] | None, mode: str) -> bool:
    return texts_match(actual_mode_message(actual, mode), expected_mode_message(expected, mode))


def load_frontmatter_modes(test: str) -> tuple[str, ...]:
    source_path = Path("third_party/test262") / test
    try:
        return Frontmatter.parse(source_path.read_text(encoding="utf-8")).modes()
    except FileNotFoundError:
        return ("strict", "sloppy")


def load_skips(path: Path | None) -> tuple[set[str], tuple[str, ...], set[str]]:
    if not path or not path.exists():
        return set(), (), set()
    data = load_yaml(path) or {}
    skip = data.get("skip") or {}
    files = {str(p) for p in (skip.get("files") or [])}
    paths = tuple(str(p).rstrip("/") for p in (skip.get("paths") or []))
    features = {str(f) for f in (skip.get("features") or [])}
    return files, paths, features


def is_skipped(test: str, skip_files: set[str], skip_paths: tuple[str, ...], skip_features: set[str]) -> bool:
    if test in skip_files:
        return True
    if any(test == p or test.startswith(f"{p}/") for p in skip_paths):
        return True
    if not skip_features:
        return False
    source_path = Path("third_party/test262") / test
    try:
        fm = Frontmatter.parse(source_path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return False
    return bool(fm.features & skip_features)


def render(value: str | dict[str, str]) -> str:
    if isinstance(value, str):
        return value
    return json.dumps(value, ensure_ascii=False, sort_keys=True)


def classify_actual(actual: str | dict[str, str] | None) -> str:
    if actual is None:
        return "MISSING"
    if isinstance(actual, str):
        return "OK" if actual == "OK" else "FAIL"
    return "OK" if all(v == "OK" for v in actual.values()) else "FAIL"


def main() -> None:
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        sys.exit(f"Usage: {sys.argv[0]} <ours.json> [expectations.yaml]")

    expectations_path = Path(sys.argv[2]) if len(sys.argv) == 3 else DEFAULT_EXPECTATIONS
    if not expectations_path.exists():
        if len(sys.argv) == 3:
            sys.exit(f"File not found: {expectations_path}")
        download(REMOTE_BASE + EXPECTATIONS_FILE, expectations_path)

    side_dir = expectations_path.parent
    config_path = ensure_side_file(side_dir, CONFIG_FILE)
    revision_path = ensure_side_file(side_dir, REVISION_FILE)

    ours = load_ours(sys.argv[1])
    our_rev = extract_our_test262_revision(sys.argv[1])
    expectations_raw = load_yaml(expectations_path) or {}
    expectations = {
        str(test): normalize_expectation(entry)
        for test, entry in expectations_raw.items()
    }
    skip_files, skip_paths, skip_features = load_skips(config_path)
    jsc_rev = extract_jsc_test262_revision(revision_path)

    mismatches: list[tuple[str, str, str]] = []
    skips: list[tuple[str, str, str]] = []

    for test in sorted(ours, key=sort_key):
        actual = ours.get(test)
        if actual is None:
            continue

        if is_skipped(test, skip_files, skip_paths, skip_features):
            detail = render(actual)
            skips.append((test, detail, "SKIP"))
            continue

        expected = expectations.get(test)
        modes = load_frontmatter_modes(test)
        if all(mode_matches(actual, expected, mode) for mode in modes):
            continue

        if expected is None and classify_actual(actual) == "OK":
            continue

        expected_render = "OK" if expected is None else render(expected)
        mismatches.append((test, render(actual), expected_render))

    print(
        f"Loaded {len(ours)} tests (ours), "
        f"{len(expectations)} expectations, {len(skip_files) + len(skip_paths) + len(skip_features)} skip rules"
    )
    if our_rev or jsc_rev:
        marker = "MISMATCH" if our_rev and jsc_rev and our_rev != jsc_rev else "match"
        print(f"test262 revisions: {marker} ours={our_rev or '?'} jsc={jsc_rev or '?'}")

    print(f"\n=== Mismatches ({len(mismatches)}) ===")
    for test, actual, expected in mismatches:
        print(f'{test}: "{actual}" vs "{expected}"')

    print(f"\n=== Skips ({len(skips)}) ===")
    for test, actual, expected in skips:
        print(f'{test}: "{actual}" vs {expected}')


if __name__ == "__main__":
    main()
