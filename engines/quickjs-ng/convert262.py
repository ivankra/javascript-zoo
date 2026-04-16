#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path
from typing import Any


def load_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def conv_binary(path: Path) -> dict[str, Any]:
    data: dict[str, Any] = {"engine": "quickjs-ng"}
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


def conv_tests(path: Path) -> dict[str, str | dict[str, str]]:
    report_re = re.compile(r"^TEST-(?P<status>PASS|FAIL|SKIP)\t(?P<path>.+?\.js)(?:\t(?P<mode>sloppy|strict))?$")
    tests: dict[str, str | dict[str, str] | dict[str, str]] = {}

    for raw_line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        match = report_re.match(raw_line)
        if not match:
            continue
        raw_path = match.group("path").strip()
        assert raw_path.startswith("test262/test/"), raw_path
        test_path = raw_path.removeprefix("test262/")
        status = match.group("status")
        if status == "SKIP":
            tests[test_path] = "SKIP"
            continue
        mode = match.group("mode")
        current = tests.get(test_path)
        if not isinstance(current, dict):
            current = {}
            tests[test_path] = current
        current[mode] = status

    out: dict[str, str | dict[str, str]] = {}
    for test_path, values in tests.items():
        if not isinstance(values, dict):
            out[test_path] = values
        elif values.get("sloppy") == values.get("strict"):
            out[test_path] = values["sloppy"]
        elif "strict" not in values:
            out[test_path] = values["sloppy"]
        elif "sloppy" not in values:
            out[test_path] = values["strict"]
        else:
            out[test_path] = {"sloppy": values["sloppy"], "strict": values["strict"]}
    return out


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/quickjs-ng", type=Path)
    parser.add_argument("--test262-dir", default="test262", type=Path)
    parser.add_argument("input", default="test262.log", type=Path)
    args = parser.parse_args()

    if not args.input.exists():
        sys.exit(f"{args.input} doesn't exist")

    converted = {
        "note": "Converted from QuickJS-NG run-test262 output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(test262_dir=args.test262_dir),
        "tests": conv_tests(args.input),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
