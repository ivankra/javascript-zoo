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


ENGINE = "hermes"
RESULT_RE = re.compile(r"RESULT:\s*(\{.*\})")


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


def normalize_test_name(name: str) -> str:
    value = name.strip()
    if "::" in value:
        value = value.split("::", 1)[1].strip()
    if value.startswith("test/"):
        return value
    return f"test/{value}"


def map_result(code: str, msg: str, output: str) -> str:
    if code == "TEST_PASSED":
        return "PASS"
    if code in {"TEST_SKIPPED", "TEST_PERMANENTLY_SKIPPED"}:
        return "SKIP"

    failure = (msg or "").strip()
    if failure.startswith("FAIL:"):
        failure = failure[5:].strip()
    if not failure:
        failure = (output or "").strip()
    if not failure:
        failure = f"FAIL: {code}"
    return failure


def conv_tests(path: Path) -> dict[str, str]:
    out: dict[str, str] = {}
    for raw_line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        match = RESULT_RE.search(raw_line)
        if not match:
            continue
        row = json.loads(match.group(1))
        if not isinstance(row, dict):
            continue
        test_name = row.get("test")
        code = row.get("code")
        msg = row.get("msg", "")
        output = row.get("output", "")
        if not isinstance(test_name, str) or not isinstance(code, str):
            continue
        out[normalize_test_name(test_name)] = map_result(code, str(msg), str(output))
    if not out:
        raise SystemExit(f"no RESULT rows found in {path}")
    return out


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/hermes", type=Path)
    parser.add_argument("--test262-dir", default="/src/test262", type=Path)
    parser.add_argument("input", default="test262.log", type=Path)
    args = parser.parse_args()
    binary_json_path = args.binary.with_suffix(".json")

    converted = {
        "note": "Converted from Hermes test_runner output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(test262_dir=args.test262_dir),
        "tests": conv_tests(args.input),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
