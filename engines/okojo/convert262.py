#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any


ENGINE = "okojo"


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


def conv_tests(data: dict[str, Any]) -> dict[str, str]:
    entries = data.get("e", [])
    if not entries:
        raise SystemExit("no entries found in input file")

    noise_re = re.compile(r"^(?:strict|sloppy):\s*(?:JavaScript throw:\s*)?|^JavaScript throw:\s*")
    out: dict[str, str] = {}
    for entry in entries:
        p = entry.get("p")
        s = entry.get("s")
        if not isinstance(p, str) or not isinstance(s, int):
            continue
        key = p if p.startswith("test/") else f"test/{p}"
        # tools/Test262Runner/IncrementalProgressStoreCodec.cs DecodeStatus()
        if s == 1:
            out[key] = "PASS"
        elif s == 2:
            m = entry.get("m", "")
            if m:
                msg = noise_re.sub("", str(m).splitlines()[0]).strip()
                out[key] = f"FAIL: {msg}"[:200] if msg else "FAIL"
            else:
                out[key] = "FAIL"
        elif s == 3:
            k = entry.get("k", "")
            out[key] = f"SKIP: {k}"[:200] if k else "SKIP"
        # s == 0 is "not-yet" (test not run) — omit from output

    return dict(sorted(out.items()))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/okojo", type=Path)
    parser.add_argument("--test262-rev")
    parser.add_argument("input", default="TEST262_PROGRESS_INCREMENTAL.json", type=Path)

    args = parser.parse_args()

    data = load_json(args.input)
    if not isinstance(data, dict):
        raise SystemExit(f"expected JSON object in {args.input}")

    converted = {
        "note": "Converted from Okojo Test262Runner TEST262_PROGRESS_INCREMENTAL.json output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": {"revision": args.test262_rev},
        "tests": conv_tests(data),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
