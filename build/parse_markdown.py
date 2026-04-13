#!/usr/bin/env python3
# Parses markdown pages in the repository, extracting structured
# metadata to a JSON output file.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

import argparse
import html
import json
import os
import re
import sys
from pathlib import Path

from dataclasses import dataclass, field
from typing import Callable, Dict, List, Optional, Union

REPO_ROOT = Path(__file__).resolve().parent.parent
MARKDOWN_LINKS_BASE = "https://github.com/ivankra/javascript-zoo/blob/master/"


def strip_markdown_links(text):
    return re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", text).strip()


def extract_first_url(text: str) -> str:
    m = re.search(r"\[[^\]]+\]\((https?://[^)\s]+)\)", text)
    if m:
        return m[1]
    m = re.search(r'https?://[^)\s<>"\']+', text)
    if m:
        return m[0]
    return text.strip()


def extract_abbr_title(text: str) -> str:
    m = re.search(r"""<abbr\b[^>]*\btitle=(["'])(.*?)\1""", text)
    if not m:
        return ""
    return html.unescape(m[2]).strip()


def extract_loc_command(text: str) -> str:
    cmd = extract_abbr_title(text)
    if cmd:
        return cmd
    m = re.search(r"""\[[^\]]+\]\(\s*[^ )]+(?:\s+"([^"]*)")\s*\)""", text)
    if m:
        return html.unescape(m[1]).strip()
    m = re.search(r"`([^`]+)`", text)
    if m:
        return m[1].strip()
    return ""


def extract_loc_value(text: str) -> str:
    m = re.search(r"""\[([0-9][0-9,]*)\]\(\s*[^ )]+(?:\s+"[^"]*")?\s*\)""", text)
    if m:
        return m[1]
    return strip_html(text)


def strip_shields(text):
    return re.sub(
        r"""(<(?:div|span) class="shields">.*?</(?:div|span)>)""", "", text
    ).strip()


def strip_html(text):
    return re.sub("<[^<]+?>", "", text).strip()


def strip_brackets(text: str) -> str:
    return re.sub(r" +\([^()]+\)", " ", text).strip()


def strip_brackets2(text: str) -> str:
    return re.sub(r" +\(.+\)", " ", text).strip()


def simplify_license(s):
    if not s:
        return s
    s = s.strip()
    if not s:
        return s
    s = re.sub("BSD-([0-9])-Clause(-Clear)?", r"BSD-\1", s)
    s = re.sub("-([0-9.]+)-only", r"-\1", s)
    s = re.sub("-([0-9.]+)-or-later", r"-\1+", s)
    s = re.sub(" *( OR| AND|,) *", "/", s)
    s = re.sub(" WITH[^,/]*", "", s)
    s = re.sub("Apache[-0-9.+]*/LGPL[-0-9.+]*", "Apache/LGPL", s)
    s = re.sub("Apache[-0-9.+]*/MIT", "Apache/MIT", s)
    s = re.sub("MPL[-0-9.+]*/GPL[-0-9.+]*/LGPL[-0-9.+]*", "MPL/GPL/LGPL", s)
    s = re.sub("Artistic[-0-9.+A-Za-z]*/GPL[-0-9.+]+", "Artistic/GPL", s)
    return s


def maybe_parse_int(text: str) -> Union[str, int]:
    if text:
        try:
            return int(text.replace(",", ""))
        except ValueError:
            return text
    return text


@dataclass
class MDMapping:
    json_key: str
    simplify: List[Callable] = field(default_factory=list)
    detailed: Optional[str] = None  # output key for the raw value; None = don't emit


@dataclass
class MDItem:
    line_no: int  # 0-based index into file lines
    indent: int  # spaces before '*'
    text: str  # everything after '* ', stripped
    map_key: str  # METADATA_MAP lookup key (slash-joined for nested)
    children: List["MDItem"] = field(default_factory=list)
    mapping: Optional[MDMapping] = None
    json_key: Optional[str] = None
    detailed_value: Optional[str] = None
    simplified_value: Optional[str] = None


@dataclass
class MDParse:
    title: str
    summary: str
    items: List[MDItem] = field(default_factory=list)  # flat, all items
    top: List[MDItem] = field(default_factory=list)  # tree roots only


METADATA_MAP: Dict[str, MDMapping] = {
    "Homepage": MDMapping(
        "homepage", simplify=[strip_html, extract_first_url, strip_brackets]
    ),
    "NPM": MDMapping("npm"),
    "Repository": MDMapping(
        "repository", simplify=[strip_html, extract_first_url, strip_brackets]
    ),
    "Branch": MDMapping(
        "branch", simplify=[strip_html, strip_markdown_links, strip_brackets]
    ),
    "GitHub": MDMapping(
        "github",
        simplify=[strip_html, extract_first_url, strip_brackets],
        detailed="github_detailed",
    ),
    "Sources": MDMapping("sources"),
    "LOC": MDMapping(
        "loc", simplify=[extract_loc_value, strip_brackets2, maybe_parse_int]
    ),
    "Language": MDMapping(
        "language", simplify=[strip_brackets], detailed="language_detailed"
    ),
    "License": MDMapping(
        "license",
        simplify=[strip_brackets, simplify_license],
        detailed="license_detailed",
    ),
    "Org": MDMapping("org"),
    "Standard": MDMapping(
        "standard", simplify=[strip_brackets], detailed="standard_detailed"
    ),
    "Years": MDMapping("years"),
    "Ancestor": MDMapping("ancestors", simplify=[strip_markdown_links, strip_brackets]),
    "Ancestors": MDMapping(
        "ancestors", simplify=[strip_markdown_links, strip_brackets]
    ),
    "Fork": MDMapping("forks", simplify=[strip_markdown_links, strip_brackets]),
    "Forks": MDMapping("forks", simplify=[strip_markdown_links, strip_brackets]),
    "Predecessor": MDMapping(
        "predecessors", simplify=[strip_markdown_links, strip_brackets]
    ),
    "Predecessors": MDMapping(
        "predecessors", simplify=[strip_markdown_links, strip_brackets]
    ),
    "Successor": MDMapping(
        "successors", simplify=[strip_markdown_links, strip_brackets]
    ),
    "Successors": MDMapping(
        "successors", simplify=[strip_markdown_links, strip_brackets]
    ),
    "Type": MDMapping("type"),
    "Features": MDMapping("features"),
    "Parser": MDMapping(
        "parser",
        simplify=[strip_markdown_links, strip_brackets],
        detailed="parser_detailed",
    ),
    "Runtime platform": MDMapping(
        "platform",
        simplify=[strip_markdown_links, strip_brackets],
        detailed="platform_detailed",
    ),
    "Interpreter": MDMapping(
        "interpreter",
        simplify=[strip_markdown_links, strip_brackets],
        detailed="interpreter_detailed",
    ),
    "JIT": MDMapping("jit"),
    "GC": MDMapping(
        "gc", simplify=[strip_markdown_links, strip_brackets], detailed="gc_detailed"
    ),
    "Regex engine": MDMapping(
        "regex",
        simplify=[strip_markdown_links, strip_brackets],
        detailed="regex_detailed",
    ),
    "DLL": MDMapping("dll"),
}


def parse_markdown(filename: str) -> MDParse:
    lines = Path(filename).read_text(encoding="utf-8").splitlines() + [""]
    no = 0

    assert len(lines) >= 3 and lines[0].startswith("# ") and lines[1] == "", (
        f"{filename}: missing title"
    )
    title = lines[0][1:].strip()
    no += 2

    assert (
        no < len(lines) and lines[no].strip() and not lines[no].strip().startswith("*")
    ), f"{filename}: missing summary paragraph"
    summary_parts = []
    while no < len(lines) and lines[no] and not lines[no].strip().startswith("*"):
        summary_parts.append(lines[no].strip())
        no += 1
    summary = " ".join(summary_parts)

    assert lines[no].strip() == "", (
        f"{filename}:{no}: {lines[no]!r} - expected blank line"
    )
    no += 1
    assert lines[no].startswith("* "), (
        f"{filename}:{no}: {lines[no]!r} - expected metadata list"
    )

    parsed = MDParse(title=title, summary=summary)
    stack: List[MDItem] = []  # tracks open parents by depth

    while no < len(lines) and lines[no]:
        assert lines[no].strip().startswith("* "), (
            f"{filename}:{no}: {lines[no]!r} - expected metadata list line"
        )

        indent = lines[no].index("*")
        assert indent % 2 == 0, f"{filename}:{no}: {lines[no]!r} - bad indent"
        text = lines[no][indent + 1 :].strip()
        no += 1

        map_key = re.sub(": .*", "", text).strip()
        del stack[indent // 2 :]
        if stack:
            map_key = stack[-1].map_key + "/" + map_key

        mapping = METADATA_MAP.get(map_key)
        item = MDItem(
            line_no=no - 1,
            indent=indent,
            text=text,
            map_key=map_key,
            mapping=mapping,
            json_key=mapping.json_key if mapping else None,
        )

        if item.json_key is not None and ": " in text:
            item.detailed_value = strip_shields(text[text.index(": ") + 1 :].strip())
        if mapping and item.detailed_value is not None:
            v = item.detailed_value
            for fn in mapping.simplify:
                v = fn(v.strip() if isinstance(v, str) else v)
            item.simplified_value = v

        (stack[-1].children if stack else parsed.top).append(item)
        stack.append(item)
        parsed.items.append(item)

    return parsed


def parse_markdown_to_json(filename: str) -> dict:
    path = Path(filename).resolve()
    rel_path = path.relative_to(REPO_ROOT).as_posix()
    kind = "parser" if "parsers" in path.parts else "engine"
    name = path.parent.name if path.name == "README.md" else path.stem

    parsed = parse_markdown(filename)

    row: dict = {"id": name, "kind": kind}
    if "_" in name:
        engine, variant = name.split("_", 1)
        row["engine"] = engine
        row["variant"] = variant
    row["title"] = parsed.title
    row["summary"] = strip_markdown_links(parsed.summary)
    row["jsz_url"] = f"{MARKDOWN_LINKS_BASE}{rel_path}"

    for item in parsed.items:
        if item.json_key is None or item.detailed_value is None:
            continue
        row[item.json_key] = item.simplified_value
        if item.json_key == "loc":
            loc_command = extract_loc_command(item.detailed_value)
            if loc_command:
                row["loc_command"] = loc_command
        if (
            item.mapping
            and item.mapping.detailed
            and item.simplified_value != item.detailed_value
        ):
            row[item.mapping.detailed] = item.detailed_value

    return row


def _rglob_dir(root: Path) -> List[str]:
    # If root has subdirectories, treat it as a collection: skip files directly
    # inside it (e.g. engines/README.md) and only include files one level deeper.
    has_subdirs = any(
        s.is_dir() and not s.name.startswith((".", "_")) for s in root.iterdir()
    )
    min_depth = 2 if has_subdirs else 1
    return sorted(
        str(p)
        for p in root.rglob("*.md")
        if p.name != "index.md"
        and len(p.relative_to(root).parts) >= min_depth
        and not any(part.startswith((".", "_")) for part in p.relative_to(root).parts)
    )


def discover_files(paths: List[str]) -> List[str]:
    files = []
    for p in [Path(s).resolve() for s in paths]:
        if p.is_dir():
            files.extend(_rglob_dir(p))
        else:
            files.append(str(p))
    return files


def extract_title(content: str) -> str:
    for line in content.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return ""


def strip_title(content: str) -> str:
    lines = content.split("\n")
    if lines and lines[0].startswith("# "):
        lines = lines[1:]
        if lines and lines[0] == "":
            lines = lines[1:]
    return "\n".join(lines)


def file_to_content_entry(filename: str) -> tuple[str, dict]:
    path = Path(filename).resolve()
    rel_path = path.relative_to(REPO_ROOT).as_posix()
    kind = "parser" if "parsers" in path.parts else "engine"
    name = path.parent.name if path.name == "README.md" else path.stem
    key = ("parsers/" if kind == "parser" else "") + name

    content = path.read_text(encoding="utf-8")
    return key, {
        "url": f"{MARKDOWN_LINKS_BASE}{rel_path}",
        "title": extract_title(content),
        "body": strip_title(content),
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Parse markdown pages in the repository"
    )
    parser.add_argument(
        "paths",
        nargs="*",
        metavar="PATH",
        help="Files or directories to process (default: all engines + parsers).",
    )
    parser.add_argument(
        "-o",
        "--output",
        metavar="FILE",
        help="Write main JSON output to FILE instead of stdout.",
    )
    parser.add_argument(
        "--bundle",
        metavar="FILE",
        help="Also write markdown content bundle JSON to FILE.",
    )
    args = parser.parse_args()

    files = discover_files(args.paths or [REPO_ROOT / "engines", REPO_ROOT / "parsers"])

    rows: List[dict] = []
    bundle: dict = {}
    for path in files:
        try:
            rows.append(parse_markdown_to_json(path))
        except Exception as e:
            print(f"Warning: {path}: {e}", file=sys.stderr)
        if args.bundle:
            try:
                key, entry = file_to_content_entry(path)
                if key in bundle:
                    print(
                        f"Warning: {path}: duplicate content key {key!r}",
                        file=sys.stderr,
                    )
                else:
                    bundle[key] = entry
            except Exception as e:
                print(f"Warning: {path}: content entry: {e}", file=sys.stderr)

    if args.output:
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        with open(args.output, "w", encoding="utf-8") as f:
            json.dump(rows, f, ensure_ascii=False, indent=2)
            f.write("\n")
    else:
        json.dump(rows, sys.stdout, ensure_ascii=False, indent=2)
        sys.stdout.write("\n")

    if args.bundle:
        Path(args.bundle).parent.mkdir(parents=True, exist_ok=True)
        with open(args.bundle, "w", encoding="utf-8") as f:
            json.dump(bundle, f, ensure_ascii=False, indent=2, sort_keys=True)
            f.write("\n")
        print(f"Generated {args.bundle}", file=sys.stderr)


if __name__ == "__main__":
    main()
