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


ENGINE = "brimstone"


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


def find_test262_dir(cli_value: str | None) -> Path:
    candidates = []
    if cli_value:
        candidates.append(Path(cli_value))
    candidates.extend(
        [
            Path("/src/tests/test262/test262/test"),
            Path.cwd() / "third_party/test262/test",
        ]
    )
    for candidate in candidates:
        if candidate.is_dir():
            return candidate
    raise SystemExit(f"test262 dir not found: {candidates[0] if candidates else 'N/A'}")


def iter_test_paths(test262_dir: Path) -> list[str]:
    tests: list[str] = []
    for path in sorted(test262_dir.rglob("*.js")):
        if "_FIXTURE" in path.name:
            continue
        rel = path.relative_to(test262_dir).as_posix()
        tests.append(f"test/{rel}")
    return tests


def strip_jsonc_comments(text: str) -> str:
    return re.sub(r"//.*\n", "\n", text)


def build_path_matcher(globs: list[str]) -> re.Pattern[str]:
    if not globs:
        return re.compile(r"^(?!)$")
    parts = [re.escape(item).replace(r"\*", ".*") for item in globs]
    return re.compile(rf"^({'|'.join(parts)})$")


def load_ignored_matchers(path: Path) -> dict[str, re.Pattern[str]]:
    raw = path.read_text(encoding="utf-8")
    data = json.loads(strip_jsonc_comments(raw))
    if not isinstance(data, dict):
        raise SystemExit(f"expected object in {path}")

    out: dict[str, re.Pattern[str]] = {}
    for key in ("known_failures", "unimplemented", "non_standard"):
        section = data.get(key)
        if not isinstance(section, dict):
            out[key] = build_path_matcher([])
            continue
        tests = section.get("tests")
        globs = [item for item in tests if isinstance(item, str)] if isinstance(tests, list) else []
        out[key] = build_path_matcher(globs)
    return out


def normalize_saved_path(path: str) -> str:
    if path.startswith("<test262>/"):
        path = path[len("<test262>/") :]
    if path.startswith("test/"):
        return path
    return f"test/{path}"


def load_result_paths(path: Path) -> set[str]:
    data = load_json(path)
    if not isinstance(data, list):
        raise SystemExit(f"expected JSON array in {path}")
    results: set[str] = set()
    for item in data:
        if isinstance(item, str):
            results.add(normalize_saved_path(item))
    return results


def conv_tests(
    all_tests: list[str],
    succeeded: set[str],
    failed: set[str],
    ignored_matchers: dict[str, re.Pattern[str]],
) -> dict[str, str]:
    known = set(all_tests)
    unknown = sorted((succeeded | failed) - known)
    if unknown:
        raise SystemExit(f"result path not found in test262 tree: {unknown[0]}")

    tests: dict[str, str] = {}
    for path in all_tests:
        rel = path[len("test/") :] if path.startswith("test/") else path
        if path in succeeded:
            tests[path] = "PASS"
        elif path in failed:
            if ignored_matchers["known_failures"].match(rel):
                tests[path] = "SKIP: known_failures"  # skipped but reported as failed
            elif ignored_matchers["unimplemented"].match(rel):
                tests[path] = "SKIP: unimplemented"  # skipped but reported as failed
            else:
                tests[path] = "FAIL"
        elif ignored_matchers["non_standard"].match(rel):
            tests[path] = "SKIP"
        else:
            tests[path] = "SKIP"
    return tests


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/brimstone", type=Path)
    parser.add_argument("--test262-dir", default="tests/test262/test262", type=Path)
    parser.add_argument("failed", default="test262_failed.json", type=Path)
    parser.add_argument("success", default="test262_success.json", type=Path)
    parser.add_argument("ignored", default="tests/test262/ignored_tests.jsonc", type=Path)
    args = parser.parse_args()

    test262_dir = find_test262_dir(args.test262_dir)
    if not args.ignored.is_file():
        raise SystemExit(f"ignored tests file not found: {args.ignored}")

    succeeded = load_result_paths(args.success)
    failed = load_result_paths(args.failed)
    overlap = succeeded & failed
    if overlap:
        sample = sorted(overlap)[0]
        raise SystemExit(f"test present in both success and failed files: {sample}")

    converted = {
        "note": "Converted from brimstone-test output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(test262_dir=test262_dir),
        "tests": conv_tests(
            iter_test_paths(test262_dir / 'test'),
            succeeded,
            failed,
            load_ignored_matchers(args.ignored),
        ),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
