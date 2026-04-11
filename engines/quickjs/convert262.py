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


QUICKJS_TEST_RE = re.compile(r"^\d+: (test262/test/\S+)(?P<tail>.*)$")
QUICKJS_NG_ERROR_RE = re.compile(
    r"^(test262/test/.+?\.js):\d+: (?:(strict mode): )?(?P<message>.*)$"
)
FRONTMATTER_RE = re.compile(r"/\*---\n(.*?)\n---\*/", re.DOTALL)


def load_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def conv_binary(path: Path, engine: str) -> dict[str, Any]:
    data: dict[str, Any] = {"engine": engine}
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


def collapse_modes(values: dict[str, str]) -> str | dict[str, str]:
    scenarios = [mode for mode in ("sloppy", "strict") if mode in values]
    if not scenarios:
        return "FAIL"
    first = values[scenarios[0]]
    if all(values[mode] == first for mode in scenarios[1:]):
        return first
    return {mode: values[mode] for mode in scenarios}


def quickjs_active_modes(flags: list[str]) -> list[str]:
    if "module" in flags or "raw" in flags:
        return ["sloppy"]
    if "@noStrict" in flags or "noStrict" in flags:
        return ["sloppy"]
    if "@onlyStrict" in flags or "onlyStrict" in flags:
        return ["strict"]
    return ["sloppy", "strict"]


def quickjs_first_message(lines: list[str]) -> str:
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith("at "):
            continue
        if stripped.startswith("strict mode: "):
            stripped = stripped.removeprefix("strict mode: ").strip()
        return stripped or "FAIL"
    return "FAIL"


def quickjs_finalize_result(flags: list[str], failures: dict[str, str]) -> str | dict[str, str]:
    modes = quickjs_active_modes(flags)
    if len(modes) == 1:
        return failures.get(modes[0], "PASS")
    values = {mode: failures.get(mode, "PASS") for mode in modes}
    return collapse_modes(values)


def conv_quickjs(path: Path) -> dict[str, str | dict[str, str]]:
    results: dict[str, str | dict[str, str]] = {}
    current_path: str | None = None
    current_flags: list[str] = []
    current_lines: list[str] = []
    current_failures: dict[str, str] = {}

    def flush_current() -> None:
        nonlocal current_path, current_flags, current_lines, current_failures
        if current_path is None:
            return
        results[current_path] = quickjs_finalize_result(current_flags, current_failures)
        current_path = None
        current_flags = []
        current_lines = []
        current_failures = {}

    for raw_line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        match = QUICKJS_TEST_RE.match(raw_line)
        if match:
            flush_current()
            test_path = match.group(1).removeprefix("test262/")
            flags = match.group("tail").strip().split()
            if flags and flags[-1] == "SKIPPED":
                results[test_path] = "SKIP"
                continue
            current_path = test_path
            current_flags = flags
            current_lines = []
            current_failures = {}
            continue

        if raw_line == "  FAILED":
            if current_path is None:
                continue
            mode = "sloppy"
            if current_lines and current_lines[0].strip().startswith("strict mode: "):
                mode = "strict"
            current_failures[mode] = quickjs_first_message(current_lines)
            current_lines = []
            continue

        if current_path is not None:
            current_lines.append(raw_line)

    flush_current()
    return results


def resolve_config(path_str: str) -> Path:
    candidate = Path(path_str)
    if candidate.exists():
        return candidate
    fallback = Path.cwd() / path_str
    if fallback.exists():
        return fallback
    raise SystemExit(f"config file not found: {path_str}")


def parse_list_value(raw: str) -> list[str]:
    raw = raw.strip()
    if not raw.startswith("[") or not raw.endswith("]"):
        return []
    body = raw[1:-1].strip()
    if not body:
        return []
    return [item.strip() for item in body.split(",") if item.strip()]


def extract_yaml_list(frontmatter: str, key: str) -> list[str]:
    lines = frontmatter.splitlines()
    out: list[str] = []
    for index, line in enumerate(lines):
        if not line.startswith(f"{key}:"):
            continue
        rest = line.partition(":")[2].strip()
        if rest:
            return parse_list_value(rest)
        for nested in lines[index + 1 :]:
            if not nested.startswith((" ", "\t")):
                break
            stripped = nested.strip()
            if stripped.startswith("- "):
                out.append(stripped[2:].strip())
        return out
    return out


def extract_frontmatter(path: Path) -> str:
    text = path.read_text(encoding="utf-8", errors="replace")
    match = FRONTMATTER_RE.search(text)
    return match.group(1) if match else ""


def parse_config(path: Path) -> tuple[set[str], set[str], list[str]]:
    enabled: set[str] = set()
    skipped: set[str] = set()
    excludes: list[str] = []
    section = ""

    for raw_line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        line = raw_line.strip()
        if not line or line.startswith(("#", ";")):
            continue
        if line.startswith("[") and line.endswith("]"):
            section = line[1:-1]
            continue
        if section == "features":
            name, _, raw_value = line.partition("=")
            value = raw_value.strip()
            name = name.strip()
            if not value or value == "yes" or value == "!tcc":
                enabled.add(name)
            else:
                skipped.add(name)
        elif section == "exclude":
            excludes.append(line)

    return enabled, skipped, excludes


def is_excluded(test_path: str, excludes: list[str]) -> bool:
    matched_exclude = -1
    matched_include = -1
    raw_path = f"test262/{test_path}"
    for entry in excludes:
        target = entry
        include = False
        if target.startswith("!"):
            include = True
            target = target[1:]
        matches = raw_path.startswith(target) if target.endswith("/") else (raw_path == target)
        if not matches:
            continue
        if include:
            matched_include = max(matched_include, len(target))
        else:
            matched_exclude = max(matched_exclude, len(target))
    return matched_exclude > matched_include


def quickjs_ng_modes(flags: set[str]) -> list[str]:
    if "module" in flags or "raw" in flags or "noStrict" in flags:
        return ["sloppy"]
    if "onlyStrict" in flags:
        return ["strict"]
    return ["sloppy", "strict"]


def parse_quickjs_ng_errors(path: Path) -> dict[str, dict[str, str]]:
    out: dict[str, dict[str, str]] = {}
    for raw_line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        match = QUICKJS_NG_ERROR_RE.match(raw_line)
        if not match:
            continue
        test_path = match.group(1).removeprefix("test262/")
        mode = "strict" if match.group(2) else "sloppy"
        out.setdefault(test_path, {})[mode] = match.group("message").strip() or "FAIL"
    return out


def conv_quickjs_ng(
    test262_dir: Path,
    enabled_features: set[str],
    skipped_features: set[str],
    excludes: list[str],
    errors: dict[str, dict[str, str]],
) -> dict[str, str | dict[str, str]]:
    tests: dict[str, str | dict[str, str]] = {}

    for file_path in sorted(test262_dir.rglob("*.js")):
        if "_FIXTURE" in file_path.name:
            continue
        test_path = f"test/{file_path.relative_to(test262_dir).as_posix()}"
        if is_excluded(test_path, excludes):
            continue

        frontmatter = extract_frontmatter(file_path)
        flags = set(extract_yaml_list(frontmatter, "flags"))
        features = extract_yaml_list(frontmatter, "features")

        if any(feature in skipped_features or feature not in enabled_features for feature in features):
            tests[test_path] = "SKIP"
            continue

        modes = quickjs_ng_modes(flags)
        failure_map = errors.get(test_path, {})
        if len(modes) == 1:
            tests[test_path] = failure_map.get(modes[0], "PASS")
            continue
        tests[test_path] = collapse_modes({mode: failure_map.get(mode, "PASS") for mode in modes})

    for test_path, failure_map in errors.items():
        if test_path not in tests:
            tests[test_path] = collapse_modes(failure_map)
    return tests


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-e", "--engine", choices=["quickjs", "quickjs-ng"], default="quickjs")
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/quickjs", type=Path)
    parser.add_argument("--test262-dir", default="test262", type=Path)
    parser.add_argument("--config", default="test262.conf", type=Path)
    parser.add_argument("input", default="test262_report.txt", type=Path)
    args = parser.parse_args()
    engine = args.engine
    binary_json_path = args.binary.with_suffix(".json")

    if engine == "quickjs":
        note = "Converted from QuickJS test262_report.txt"
        tests = conv_quickjs(args.input)
    else:
        note = "Converted from QuickJS-NG test262_errors.txt"
        config_path = resolve_config(args.config)
        enabled, skipped, excludes = parse_config(config_path)
        tests = conv_quickjs_ng(
            args.test262_dir / "test",
            enabled,
            skipped,
            excludes,
            parse_quickjs_ng_errors(args.input),
        )

    converted = {
        "note": note,
        "binary": conv_binary(binary_json_path, engine),
        "test262": conv_test262(test262_dir=args.test262_dir),
        "tests": tests,
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
