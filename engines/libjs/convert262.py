#!/usr/bin/env python3
# LibJS --per-file-output format:
# {
#   "duration" : 19.11539,
#   "results" : {
#      "test/annexB/built-ins/Array/from/iterator-method-emulates-undefined.js" : "PASSED",
#      ...
#      "test/built-ins/Atomics/wait/bigint/false-for-timeout.js" : "TODO_ERROR",
#      "test/built-ins/Atomics/wait/bigint/nan-for-timeout.js" : "HARNESS_ERROR",
#      "test/staging/sm/types/8.12.5-01.js" : "PASSED",
#      "test/staging/source-phase-imports/import-source-source-text-module.js" : "FAILED",
#      "test/staging/top-level-await/tla-hang-entry.js" : "PROCESS_ERROR"
#   }
# }
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path
from typing import Any


ENGINE = "libjs"
STATUS_MAP = {
    "PASSED": "PASS",
    "FAILED": "FAIL",
    "HARNESS_ERROR": "FAIL: HARNESS",
    "PROCESS_ERROR": "CRASH",
    "TODO_ERROR": "FAIL: TODO",
    "SKIPPED": "SKIP",
}


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


def normalize_status(status: str) -> str:
    try:
        return STATUS_MAP[status]
    except KeyError as exc:
        raise SystemExit(f"unsupported libjs test262 status: {status!r}") from exc


def conv_tests(path: Path) -> dict[str, str]:
    data = load_json(path)
    if not isinstance(data, dict):
        raise SystemExit(f"expected JSON object in {path}")
    results = data.get("results")
    if not isinstance(results, dict):
        raise SystemExit(f"missing results object in {path}")

    out: dict[str, str] = {}
    for test, status in results.items():
        if not isinstance(test, str) or not isinstance(status, str):
            raise SystemExit(f"unsupported libjs result entry: {test!r} -> {status!r}")
        out[test if test.startswith("test/") else f"test/{test}"] = normalize_status(status)
    return out


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/libjs", type=Path)
    parser.add_argument("--test262-dir", default="/src/test262", type=Path)
    parser.add_argument("input", default="/dist/libjs.test262.log", type=Path)
    args = parser.parse_args()
    binary_json_path = args.binary.with_suffix(".json")

    converted = {
        "note": "Converted from libjs-test262 --per-file-output's json",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(test262_dir=args.test262_dir),
        "tests": conv_tests(args.input),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
