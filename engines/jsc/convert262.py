#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

import yaml


ENGINE = "jsc"


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


def normalize_mode(mode: str) -> str:
    return {
        "default": "sloppy",
        "strict mode": "strict",
    }.get(mode, mode)


def scenario_value(entry: dict[str, Any]) -> str:
    result = str(entry.get("result") or "")
    if result == "skip":
        return "SKIP"
    if result.endswith("pass"):
        return "PASS"

    error = str(entry.get("error") or "").strip()
    if error:
        return error

    output = str(entry.get("output") or "").strip()
    if output.startswith("Exception: "):
        output = output[len("Exception: "):]
    return output or "FAIL"


def collapse_test_values(values: dict[str, str]) -> str | dict[str, str]:
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


def load_yaml_entries(path: Path) -> list[dict[str, Any]]:
    with path.open(encoding="utf-8") as f:
        data = yaml.safe_load(f)
    if not isinstance(data, list):
        raise SystemExit(f"expected YAML list in {path}")
    out: list[dict[str, Any]] = []
    for item in data:
        if isinstance(item, dict):
            out.append(item)
    return out


def conv_tests(entries: list[dict[str, Any]]) -> dict[str, str | dict[str, str]]:
    grouped: dict[str, dict[str, str]] = {}
    for entry in entries:
        path = entry.get("path")
        mode = entry.get("mode")
        if not isinstance(path, str) or not isinstance(mode, str):
            continue
        grouped.setdefault(path, {})[normalize_mode(mode)] = scenario_value(entry)

    return {
        path: collapse_test_values(values)
        for path, values in grouped.items()
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/jsc", type=Path)
    parser.add_argument("--test262-rev")
    parser.add_argument("input", default="test262-results/results.yaml", type=Path)
    args = parser.parse_args()
    binary_json_path = args.binary.with_suffix(".json")

    converted = {
        "note": "Converted from JSC test262-runner's YAML output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(rev=args.test262_rev),
        "tests": conv_tests(load_yaml_entries(args.input)),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
