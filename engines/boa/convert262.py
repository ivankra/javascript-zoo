#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


ENGINE = "boa"
RESULT_MAP = {
    "O": "PASS",
    "I": "SKIP",
    "F": "FAIL",
    "P": "FAIL",
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


def conv_test262(*, log_data: dict[str, Any]) -> dict[str, str]:
    revision = ""
    if not revision:
        revision = str(log_data.get("u") or "").strip()
    if not revision:
        raise SystemExit(f"missing test262 revision in log file")
    return {"revision": revision}


def normalize_result(code: str) -> str:
    try:
        return RESULT_MAP[code]
    except KeyError as exc:
        raise SystemExit(f"unsupported boa test262 result code: {code!r}") from exc


def normalize_test_path(path: str) -> str:
    return path if path.startswith("test/") else f"test/{path}"


def normalize_value(value: Any) -> str | dict[str, str]:
    if isinstance(value, str):
        return normalize_result(value)
    if isinstance(value, dict):
        normalized = {str(mode): normalize_result(str(result)) for mode, result in value.items()}
        unique = set(normalized.values())
        if len(unique) == 1:
            return next(iter(unique))
        return dict(sorted(normalized.items()))
    raise SystemExit(f"unsupported boa test262 result payload: {value!r}")


def conv_tests(root: dict[str, Any]) -> dict[str, str | dict[str, str]]:
    tests: dict[str, str | dict[str, str]] = {}

    def walk(suite: dict[str, Any], prefix: str = "") -> None:
        name = str(suite.get("n") or "")
        current = f"{prefix}/{name}" if prefix else name
        for test in suite.get("t", []):
            test_name = str(test["n"])
            path = normalize_test_path(f"{current}/{test_name}.js")
            tests[path] = normalize_value(test["r"])
        for child in suite.get("s", []):
            walk(child, current)

    walk(root)
    return tests


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/boa", type=Path)
    parser.add_argument("input", default="test-results/latest.json", type=Path)
    args = parser.parse_args()

    log_data = load_json(args.input)
    if not isinstance(log_data, dict):
        raise SystemExit(f"expected JSON object in {args.input}")

    root = log_data.get("r")
    if not isinstance(root, dict):
        raise SystemExit(f"missing result tree in {args.input}")

    converted = {
        "note": "Converted from boa_tester's latest.json output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(log_data=log_data),
        "tests": conv_tests(root),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
