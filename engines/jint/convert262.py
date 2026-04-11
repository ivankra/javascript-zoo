#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Any


ENGINE = "jint"
TRX_NS = {"trx": "http://microsoft.com/schemas/VisualStudio/TeamTest/2010"}
TRX_NAME_RE = re.compile(r'\("([^"]+)",(True|False)\)$')


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


def conv_test262(*, rev: str | None) -> dict[str, str]:
    return {"revision": rev} if rev else {}


def parse_trx_name(name: str) -> tuple[str, str] | None:
    match = TRX_NAME_RE.search(name)
    if not match:
        return None
    path, strict = match.groups()
    return (f"test/{path}" if not path.startswith("test/") else path, "strict" if strict == "True" else "sloppy")


def normalize_outcome(outcome: str) -> str:
    if outcome == "Passed":
        return "PASS"
    if outcome in {"NotExecuted", "Skipped"}:
        return "SKIP"
    return "FAIL"


def collapse_modes(values: dict[str, str]) -> str | dict[str, str]:
    preferred = {k: v for k, v in values.items() if k in {"sloppy", "strict"}}
    if preferred:
        if len(preferred) == 1:
            return next(iter(preferred.values()))
        unique = set(preferred.values())
        if len(unique) == 1:
            return next(iter(unique))
        return dict(sorted(preferred.items()))
    unique = set(values.values())
    if len(unique) == 1:
        return next(iter(unique))
    return dict(sorted(values.items()))


def conv_tests(path: Path) -> dict[str, str | dict[str, str]]:
    root = ET.parse(path).getroot()
    per_mode: dict[str, dict[str, str]] = {}

    for result in root.findall(".//trx:UnitTestResult", TRX_NS):
        test_name = result.attrib.get("testName", "")
        parsed = parse_trx_name(test_name)
        if parsed is None:
            continue
        key, mode = parsed
        per_mode.setdefault(key, {})[mode] = normalize_outcome(result.attrib.get("outcome", ""))

    return {key: collapse_modes(values) for key, values in sorted(per_mode.items())}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/jint", type=Path)
    parser.add_argument("--test262-rev")
    parser.add_argument("input", default="test262.trx", type=Path)

    args = parser.parse_args()
    binary_json_path = args.binary.with_suffix(".json")

    converted = {
        "note": "Converted from Jint.Tests.Test262 TRX output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(rev=args.test262_rev),
        "tests": conv_tests(args.input),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
