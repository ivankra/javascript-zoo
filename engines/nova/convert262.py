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


ENGINE = "nova"
RESULT_RE = re.compile(r"^RESULT:\s+(.+?):\s+([A-Za-z_]+)\s*$")
STATUS_MAP = {
    "Pass": "PASS",
    "Fail": "FAIL",
    "Crash": "CRASH",
    "Timeout": "TIMEOUT",
    "Unresolved": "UNRESOLVED",
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


def find_test262_dir(cli_value: str) -> Path | None:
    candidate = Path(cli_value)
    if candidate.is_dir():
        return candidate
    return None


def iter_test_paths(test262_dir: Path) -> list[str]:
    out: list[str] = []
    for path in sorted(test262_dir.rglob("*.js")):
        if "_FIXTURE" in path.name:
            continue
        out.append(f"test/{path.relative_to(test262_dir).as_posix()}")
    return out


def normalize_path(path: str) -> str:
    value = path.strip().strip('"')
    if value.startswith("test/"):
        return value
    return f"test/{value}"


def map_status(status: str) -> str:
    return STATUS_MAP.get(status, f"FAIL: {status}")


def parse_log(path: Path) -> dict[str, str]:
    results: dict[str, str] = {}
    for raw_line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        match = RESULT_RE.match(raw_line.strip())
        if not match:
            continue
        test_path = normalize_path(match.group(1))
        results[test_path] = map_status(match.group(2))
    if not results:
        raise SystemExit(f"no RESULT rows found in {path}")
    return results


def conv_tests(log_results: dict[str, str], test262_dir: Path | None) -> dict[str, str]:
    if test262_dir is None:
        return dict(sorted(log_results.items()))
    all_paths = sorted(set(iter_test_paths(test262_dir)) | set(log_results))
    return {path: log_results.get(path, "SKIP") for path in all_paths}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/nova", type=Path)
    parser.add_argument("--test262-dir", default="tests/test262", type=Path)
    parser.add_argument("input", default="test262.log", type=Path)
    args = parser.parse_args()

    converted = {
        "note": "Converted from Nova test262 runner RESULT lines",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(test262_dir=Path(args.test262_dir)),
        "tests": conv_tests(parse_log(args.input), args.test262_dir / "test"),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
