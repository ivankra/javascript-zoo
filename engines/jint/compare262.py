#!/usr/bin/env python3
"""Compare test262 results: our harness JSON vs Jint.Tests.Test262 TRX output.

Usage: compare262.py <ours.json> <trx.log>

Generate ours:
  ./harness/test262.py -o jint.json dist/arm64/jint

Generate trx.log (in Jint repo):
  dotnet test Jint.Tests.Test262/Jint.Tests.Test262.csproj -c Release --logger "trx;LogFileName=trx.log"
  # produces Jint.Tests.Test262/TestResults/trx.log
"""

import argparse
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


def classify(value: str) -> str:
    return "OK" if value == "OK" else "FAIL"


def sort_key(value: str) -> list[object]:
    parts = re.split(r"(\d+)", value)
    return [int(part) if i % 2 else part.lower() for i, part in enumerate(parts)]


def load_json(path: Path) -> tuple[dict[str, str], dict[str, str]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    statuses: dict[str, str] = {}
    details: dict[str, str] = {}

    for raw_path, result in data.get("tests", {}).items():
        test_path = raw_path[5:] if raw_path.startswith("test/") else raw_path

        if isinstance(result, str):
            statuses[test_path] = classify(result)
            details[test_path] = result
            continue

        if isinstance(result, dict):
            values = {mode: str(mode_result) for mode, mode_result in result.items()}
            statuses[test_path] = "FAIL" if any(classify(value) == "FAIL" for value in values.values()) else "OK"
            details[test_path] = json.dumps(values, ensure_ascii=False, sort_keys=True)
            continue

        raise ValueError(f"Unsupported result shape for {raw_path!r}: {type(result).__name__}")

    return statuses, details


TRX_NAME_RE = re.compile(r'\("([^"]+)",(True|False)\)$')
TRX_NS = {"trx": "http://microsoft.com/schemas/VisualStudio/TeamTest/2010"}


def parse_trx_name(name: str) -> tuple[str, str] | None:
    match = TRX_NAME_RE.search(name)
    if not match:
        return None

    path, strict = match.groups()
    return path, ("strict" if strict == "True" else "sloppy")


def load_trx(path: Path) -> tuple[dict[str, str], dict[str, str]]:
    root = ET.parse(path).getroot()
    per_mode: dict[str, dict[str, str]] = {}

    for result in root.findall(".//trx:UnitTestResult", TRX_NS):
        parsed = parse_trx_name(result.attrib["testName"])
        if parsed is None:
            continue

        key, mode = parsed
        outcome = result.attrib["outcome"]
        per_mode.setdefault(key, {})[mode] = outcome

    statuses: dict[str, str] = {}
    details: dict[str, str] = {}
    for key, outcomes in per_mode.items():
        statuses[key] = "FAIL" if any(outcome != "Passed" for outcome in outcomes.values()) else "OK"
        unique = sorted(set(outcomes.values()))
        if len(unique) == 1:
            details[key] = unique[0]
        else:
            details[key] = json.dumps(outcomes, ensure_ascii=False, sort_keys=True)

    return statuses, details


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("jint_json", help="Path to jint.json")
    parser.add_argument(
        "trx",
        nargs="?",
        default="Jint.Tests.Test262/TestResults/trx.log",
        metavar="trx.log",
        help="Path to TRX file (default: Jint.Tests.Test262/TestResults/trx.log)",
    )
    args = parser.parse_args()

    json_statuses, json_details = load_json(Path(args.jint_json))
    trx_statuses, trx_details = load_trx(Path(args.trx))

    mismatches: list[str] = []
    skips: list[str] = []
    for key in sorted(set(json_statuses) & set(trx_statuses), key=sort_key):
        if json_statuses[key] != trx_statuses[key]:
            line = f"test/{key}: {json_details[key]} vs {trx_details[key]}"
            if trx_details[key] in {"NotExecuted", "Skipped"}:
                skips.append(line)
            else:
                mismatches.append(line)

    if not mismatches and not skips:
        print("OK")
        return 0

    for line in mismatches:
        print(line)

    if skips:
        if mismatches:
            print()
        print("=== skips ===")
        for line in skips:
            print(line)
    return 1


if __name__ == "__main__":
    sys.exit(main())
