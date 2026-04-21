#!/usr/bin/env python3
# Rhino's checked-in test262.properties is not a full result log. It contains
# only non-passing entries, with directory rollups and mode markers such as
# "strict" / "non-strict". See Rhino's parser/generator in
# tests/src/test/java/org/mozilla/javascript/tests/Test262SuiteTest.java.
#
# This converter reconstructs the repo's full per-test output by joining that
# file with the current test262 tree.
#
# Another omission is Rhino's built-in runtime skip policy for unsupported
# features plus module/async tests. Those rules live in
# Test262SuiteTest.UNSUPPORTED_FEATURES and test262SuiteValues(); we source the
# unsupported-feature set from Rhino Java and reapply that policy while
# enumerating tests.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import json
import re
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ENGINE = "rhino"
TEST262_SUITE_JAVA = Path("tests/src/test/java/org/mozilla/javascript/tests/Test262SuiteTest.java")
TEST262_PROPERTIES = Path("tests/testsrc/test262.properties")
TEST262_DIR = Path("tests/test262")
STATUS_TOKENS = (
    "compiled-non-strict",
    "interpreted-non-strict",
    "compiled-strict",
    "interpreted-strict",
    "non-strict",
    "strict",
    "compiled",
    "interpreted",
)
STATS_RE = re.compile(r"^\d+/\d+ \(\d+(?:\.\d+)?%\)$")
UNSUPPORTED_RE = re.compile(r"^\{unsupported:\s*\[.*\]\}$")
UNSUPPORTED_FEATURES_DECL_RE = re.compile(
    r"static\s+final\s+Set<String>\s+UNSUPPORTED_FEATURES\s*="
    r"\s*new\s+HashSet<>\(\s*Arrays\.asList\((?P<body>.*?)\)\s*\)\s*;",
    re.DOTALL,
)
JAVA_STRING_RE = re.compile(r'"((?:[^"\\]|\\.)*)"')


@dataclass(frozen=True)
class TestInfo:
    run_sloppy: bool
    run_strict: bool
    skipped_by_runtime: bool


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


def java_unescape(value: str) -> str:
    try:
        return bytes(value, "utf-8").decode("unicode_escape")
    except UnicodeDecodeError as exc:
        raise SystemExit(f"unsupported Java string escape in Rhino source: {value!r}") from exc


def load_unsupported_features(src_dir: Path) -> set[str]:
    source_path = src_dir / TEST262_SUITE_JAVA
    if not source_path.is_file():
        raise SystemExit(f"Rhino Test262SuiteTest.java not found: {source_path}")

    source = source_path.read_text(encoding="utf-8", errors="strict")
    match = UNSUPPORTED_FEATURES_DECL_RE.search(source)
    if match is None:
        raise SystemExit(
            "failed to locate UNSUPPORTED_FEATURES declaration in "
            f"{source_path}; expected Arrays.asList(...) initializer"
        )

    body = match.group("body")
    strings = [java_unescape(item) for item in JAVA_STRING_RE.findall(body)]
    if not strings:
        raise SystemExit(f"UNSUPPORTED_FEATURES declaration is empty in {source_path}")

    stripped = JAVA_STRING_RE.sub("", body)
    if re.search(r"[A-Za-z0-9_]", stripped):
        raise SystemExit(
            "unexpected non-string tokens in Rhino UNSUPPORTED_FEATURES declaration in "
            f"{source_path}"
        )

    return set(strings)


def extract_frontmatter(source: str) -> str:
    start = source.find("/*---")
    if start == -1:
        return ""
    end = source.find("---*/", start + 5)
    if end == -1:
        return ""
    return source[start + 5 : end]


def strip_yaml_comment(line: str) -> str:
    hash_pos = line.find("#")
    return line if hash_pos == -1 else line[:hash_pos]


def unquote(value: str) -> str:
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1]
    return value


def parse_inline_list(text: str) -> list[str]:
    text = text.strip()
    if not (text.startswith("[") and text.endswith("]")):
        return []
    inner = text[1:-1].strip()
    if not inner:
        return []
    return [unquote(item.strip()) for item in inner.split(",") if item.strip()]


def parse_metadata_lists(frontmatter: str) -> dict[str, list[str]]:
    out = {"flags": [], "features": []}
    current_key: str | None = None
    current_indent = 0

    for raw_line in frontmatter.splitlines():
        line = strip_yaml_comment(raw_line).rstrip()
        if not line.strip():
            continue
        indent = len(line) - len(line.lstrip(" "))
        stripped = line.strip()

        if current_key is not None and indent > current_indent and stripped.startswith("- "):
            out[current_key].append(unquote(stripped[2:].strip()))
            continue
        current_key = None

        match = re.match(r"^(flags|features):\s*(.*)$", stripped)
        if match is None:
            continue
        key, rest = match.groups()
        if rest.startswith("["):
            out[key].extend(parse_inline_list(rest))
        elif rest.startswith("- "):
            out[key].append(unquote(rest[2:].strip()))
        elif rest == "":
            current_key = key
            current_indent = indent

    return out


def iter_test_info(
    test262_dir: Path,
    *,
    unsupported_features: set[str],
) -> tuple[dict[str, TestInfo], dict[str, list[str]]]:
    test_root = test262_dir / "test"
    if not test_root.is_dir():
        raise SystemExit(f"test262 test dir not found: {test_root}")
    tests: dict[str, TestInfo] = {}
    by_parent: dict[str, list[str]] = {}

    for path in sorted(test_root.rglob("*.js")):
        if "_FIXTURE" in path.name:
            continue
        rel = path.relative_to(test_root).as_posix()
        by_parent.setdefault(str(Path(rel).parent).replace("\\", "/"), []).append(rel)

        metadata = parse_metadata_lists(
            extract_frontmatter(path.read_text(encoding="utf-8", errors="replace"))
        )
        flags = set(metadata["flags"])
        features = set(metadata["features"])

        run_sloppy = "onlyStrict" not in flags or "raw" in flags
        run_strict = "noStrict" not in flags and "raw" not in flags
        skipped_by_runtime = bool(features & unsupported_features) or "module" in flags or "async" in flags
        tests[rel] = TestInfo(
            run_sloppy=run_sloppy,
            run_strict=run_strict,
            skipped_by_runtime=skipped_by_runtime,
        )

    return tests, by_parent


def parse_file_status(rest: str) -> str | None:
    rest = rest.strip()
    if not rest:
        return ""
    if UNSUPPORTED_RE.match(rest):
        return "unsupported"
    if rest.startswith("{"):
        end = rest.find("}")
        if end != -1:
            token = rest[: end + 1]
            if UNSUPPORTED_RE.match(token):
                return "unsupported"
            return token
    for token in STATUS_TOKENS:
        if rest == token or rest.startswith(token + " "):
            return token
    return ""


def fail_modes_for_token(token: str | None, info: TestInfo) -> set[str]:
    out: set[str] = set()
    if token is None:
        return out
    if token in {"", "compiled", "interpreted"}:
        if info.run_sloppy:
            out.add("sloppy")
        if info.run_strict:
            out.add("strict")
        return out
    if token in {"non-strict", "compiled-non-strict", "interpreted-non-strict"}:
        if info.run_sloppy:
            out.add("sloppy")
        return out
    if token in {"strict", "compiled-strict", "interpreted-strict"}:
        if info.run_strict:
            out.add("strict")
        return out
    if token.startswith("{") and token.endswith("}"):
        for part in token[1:-1].split(","):
            out |= fail_modes_for_token(part.strip(), info)
        return out
    raise SystemExit(f"unsupported Rhino status token: {token!r}")


def parse_properties(
    path: Path,
    tests: dict[str, TestInfo],
    by_parent: dict[str, list[str]],
) -> tuple[set[str], dict[str, set[str]]]:
    skipped_tests: set[str] = set()
    failed_modes: dict[str, set[str]] = {}
    current_section: str | None = None
    current_skip = False

    for raw_line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        if not raw_line.strip() or raw_line.lstrip().startswith(("#", "!")):
            continue

        if raw_line[0].isspace():
            if current_section is None:
                raise SystemExit("encountered indented entry before a Rhino top-level section")
            entry = raw_line.strip()
            entry_path, _, rest = entry.partition(" ")
            full_path = f"{current_section}/{entry_path}"

            if current_skip:
                continue
            if entry_path.endswith(".js"):
                if full_path not in tests:
                    continue
                token = parse_file_status(rest)
                if token == "unsupported":
                    skipped_tests.add(full_path)
                    continue
                failed_modes.setdefault(full_path, set()).update(
                    fail_modes_for_token(token, tests[full_path])
                )
                continue

            for child in by_parent.get(full_path, []):
                failed_modes.setdefault(child, set()).update(
                    fail_modes_for_token("", tests[child])
                )
            continue

        entry = raw_line.strip()
        current_skip = entry.startswith("~")
        if current_skip:
            entry = entry[1:].lstrip()
        current_section = entry.split()[0]

        if current_skip:
            prefix = current_section + "/"
            for rel in tests:
                if rel.startswith(prefix):
                    skipped_tests.add(rel)

    return skipped_tests, failed_modes


def render_result(info: TestInfo, *, skipped: bool, failed_modes: set[str]) -> str | dict[str, str]:
    per_mode: dict[str, str] = {}

    if info.run_sloppy:
        per_mode["sloppy"] = "SKIP" if skipped else ("FAIL" if "sloppy" in failed_modes else "PASS")
    if info.run_strict:
        per_mode["strict"] = "SKIP" if skipped else ("FAIL" if "strict" in failed_modes else "PASS")

    if not per_mode:
        raise SystemExit("test had no Rhino execution modes")
    if len(per_mode) == 1:
        return next(iter(per_mode.values()))
    if len(set(per_mode.values())) == 1:
        return next(iter(per_mode.values()))
    return per_mode


def conv_tests(
    rhino_src_dir: Path,
    test262_dir: Path,
    *,
    unsupported_features: set[str],
) -> dict[str, str | dict[str, str]]:
    properties_path = rhino_src_dir / TEST262_PROPERTIES
    if not properties_path.is_file():
        raise SystemExit(f"Rhino test262.properties not found: {properties_path}")

    tests, by_parent = iter_test_info(test262_dir, unsupported_features=unsupported_features)
    skipped_tests, failed_by_test = parse_properties(properties_path, tests, by_parent)

    rendered: dict[str, str | dict[str, str]] = {}
    for rel, info in sorted(tests.items()):
        key = f"test/{rel}"
        skipped = rel in skipped_tests or info.skipped_by_runtime
        rendered[key] = render_result(
            info,
            skipped=skipped,
            failed_modes=failed_by_test.get(rel, set()),
        )
    return rendered


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="/dev/stdout", type=Path)
    parser.add_argument("-b", "--binary", default="/dist/rhino", type=Path)
    parser.add_argument("src_dir", nargs="?", default=".", type=Path)
    args = parser.parse_args()

    unsupported_features = load_unsupported_features(args.src_dir)
    test262_dir = args.src_dir / TEST262_DIR
    converted = {
        "note": "Converted from Rhino test262.properties output",
        "binary": conv_binary(args.binary.with_suffix(".json")),
        "test262": conv_test262(test262_dir=test262_dir),
        "tests": conv_tests(
            args.src_dir,
            test262_dir,
            unsupported_features=unsupported_features,
        ),
    }

    rendered = json.dumps(converted, ensure_ascii=True, indent=2) + "\n"
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
