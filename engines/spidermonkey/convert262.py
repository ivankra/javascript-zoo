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


ENGINE = "spidermonkey_full"


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


def conv_tests(path: Path) -> dict[str, str]:
    if not path.exists():
        return {}

    # Automation line format:
    # LABEL | test262/path/test.js | (args: "...") [| message] [| (SKIP)] [| (TIMEOUT)] [time s]
    # Examples:
    # TEST-PASS | test262/annexB/built-ins/Array/from/iterator-method-emulates-undefined.js | (args: "") [0.0 s]
    # TEST-UNEXPECTED-PASS | test262/annexB/built-ins/Function/createdynfn-no-line-terminator-html-close-comment-body.js | (args: "") [0.0 s]
    # TEST-KNOWN-FAIL | test262/annexB/language/function-code/block-decl-func-skip-arguments.js | (args: "") [0.0 s]
    line_re = re.compile(r"^(?P<label>TEST-\S+(?:\s+\([^)]+\))*)\s*\|\s*(?P<path>\S[^|]*?)\s*\|(?P<rest>.*)$")
    out: dict[str, str] = {}

    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        m = line_re.match(line)
        if not m:
            continue

        # jstests.py emits paths relative to js/src/tests/, so test262 tests
        # look like "test262/built-ins/...". Strip the "test262/" prefix and
        # add the canonical "test/" prefix used by all other converters.
        test_path = m.group("path").strip()
        if test_path.startswith("test262/"):
            test_path = test_path[len("test262/"):]
        if not test_path.startswith("test/"):
            test_path = f"test/{test_path}"

        label = m.group("label").strip()
        rest = m.group("rest")

        if "(SKIP)" in rest:
            result = "SKIP"
        elif "(TIMEOUT)" in rest:
            result = "TIMEOUT"
        elif label in ("TEST-PASS", "TEST-UNEXPECTED-PASS"):
            result = "PASS"
        elif label == "TEST-KNOWN-FAIL":
            result = "FAIL"
        elif label == "TEST-UNEXPECTED-FAIL":
            result = "FAIL: unexpected"
        else:
            sys.exit(f"Unknown label '{label}' in line: {line}")
        out[test_path] = result

    if not out:
        sys.exit(f"no test results found in {path}")

    return dict(sorted(out.items()))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/spidermonkey", type=Path)
    parser.add_argument("--test262-rev")
    parser.add_argument("input", default="test262.log", type=Path)

    args = parser.parse_args()

    converted = {
        "note": "Converted from SpiderMonkey's jstests.py --format=automation output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": {
            "revision": args.test262_rev
        },
        "tests": conv_tests(args.input),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
