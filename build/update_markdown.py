#!/usr/bin/env python3
# Updates markdown pages in the repository:
#   - Sorts and aligns the metadata list
#   - Regenerates <span class="shields">...</span> blocks
#   - Regenerates Conformance sections from data/
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

import argparse
import difflib
import html
import importlib.util
import re
import sys
from pathlib import Path
from typing import Any, List, Optional, Tuple

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from harness.data import Report, StatsDict
from harness.frontmatter import test262_features_yaml
from build.parse_markdown import (
    METADATA_MAP,
    MDItem,
    MDParse,
    parse_markdown,
    discover_files,
)


def sort_metadata(content: str, filename: str) -> Optional[str]:
    """Sort metadata list and align key column. Returns new content, or None if unchanged."""
    parsed = parse_markdown(filename)
    if not parsed.items:
        return None

    order = {k: i for i, k in enumerate(METADATA_MAP.keys())}

    lhs_width = max(
        (
            4 + item.indent + item.text.index(": ")
            for item in parsed.items
            if ": " in item.text
        ),
        default=14,
    )
    lhs_width = max(lhs_width, 14)
    lhs_width = min(lhs_width, 32)

    def format_items(children: List[Any], indent: str = "") -> List[str]:
        children.sort(key=lambda it: order.get(it.map_key, 10000 + it.line_no))
        result = []
        for item in children:
            if ": " in item.text:
                key, _, value = item.text.partition(": ")
                lhs = f"{indent}* {key}: ".ljust(lhs_width)
                result.append(lhs + value.lstrip() + "\n")
            else:
                result.append(f"{indent}* {item.text}\n")
            result.extend(format_items(item.children, indent + "  "))
        return result

    lines = content.splitlines(keepends=True)
    reformatted = format_items(parsed.top)
    start = parsed.items[0].line_no
    end = parsed.items[-1].line_no + 1
    new_lines = lines[:start] + reformatted + lines[end:]

    new = "".join(new_lines)
    return new if new != content else None


def shields_html(url: str, is_root: bool) -> str:
    """Return shields HTML for a github/gitlab/codeberg repo URL, or ''."""
    m = re.match(
        r"https?://(github\.com|gitlab\.com|codeberg\.org)/([^/]+)/([^/]+?)(?:\.git)?/?$",
        url,
    )
    if not m:
        return ""

    host, user, repo = m[1], m[2], m[3]
    if host == "github.com":
        svc, extra = "github", ""
    elif host == "gitlab.com":
        svc, extra = "gitlab", ""
    else:
        svc, extra = "gitea", f"&gitea_url=https://{host}"

    tag = "div" if is_root else "span"
    imgs = f'<img src="https://img.shields.io/{svc}/stars/{user}/{repo}?label=&style=flat-square{extra}" alt="Stars" title="Stars">'
    imgs += f'<img src="https://img.shields.io/{svc}/last-commit/{user}/{repo}?label=&style=flat-square{extra}" alt="Last commit" title="Last commit">'
    return f'<{tag} class="shields">{imgs}</{tag}>'


def update_shields(content: str, filename: str) -> Optional[str]:
    """Regenerate shield badges. Returns new content, or None if unchanged."""
    path = Path(filename)
    is_root = path.name == "README.md" and path.parent.parent == REPO_ROOT
    lines = content.splitlines(keepends=True)

    shields_pat = r'(<(?:div|span) class="shields">.*?</(?:div|span)>)'

    for i, line in enumerate(lines):
        for url, sep, old in re.findall(
            r"""(https?://[^()>"' ]+)([()>"' ]*)""" + shields_pat, line
        ):
            new = shields_html(url, is_root)
            if new:
                lines[i] = lines[i].replace(url + sep + old, url + sep + new)

        for prefix, url, suffix, sep, old in re.findall(
            r"""(\[[^\]]+\]\()([^) ]+)(\))([ ]*)""" + shields_pat, lines[i]
        ):
            new = shields_html(url, is_root)
            if new:
                lines[i] = lines[i].replace(
                    prefix + url + suffix + sep + old, prefix + url + suffix + sep + new
                )

    new = "".join(lines)
    return new if new != content else None


def add_missing_shields(content: str, filename: str) -> Optional[str]:
    """Add shield badges for repo URLs that don't already have them. Returns new content, or None if unchanged."""
    path = Path(filename)
    is_root = path.name == "README.md" and path.parent.parent == REPO_ROOT
    lines = content.splitlines(keepends=True)
    changed = False

    shields_pat = r'<(?:div|span) class="shields">.*?</(?:div|span)>'
    url_pat = r'https?://(?:github\.com|gitlab\.com|codeberg\.org)/[^\s()>"\']*'

    for i, line in enumerate(lines):
        insertions: dict[int, str] = {}  # insert_pos -> shield html

        # Markdown links [text](url) — repo URL delimited by closing paren
        for m in re.finditer(r"\[[^\]]*\]\((" + url_pat + r")\)", line):
            pos = m.end()
            if not re.match(r"\s*" + shields_pat, line[pos:]):
                sh = shields_html(m.group(1), is_root)
                if sh:
                    insertions[pos] = sh

        # Plain URLs not inside markdown-link parens
        for m in re.finditer(url_pat, line):
            if m.start() > 0 and line[m.start() - 1] == "(":
                continue  # already handled as part of a markdown link
            pos = m.end()
            if not re.match(r'[()>"\']*\s*' + shields_pat, line[pos:]):
                sh = shields_html(m.group(0), is_root)
                if sh:
                    insertions.setdefault(pos, sh)

        if insertions:
            new_line = line
            for pos in sorted(insertions, reverse=True):
                new_line = new_line[:pos] + insertions[pos] + new_line[pos:]
            lines[i] = new_line
            changed = True

    if not changed:
        return None
    return "".join(lines)


def format_fmt(pct, prec=0) -> str:
    if isinstance(pct, StatsDict):
        total = pct.passed + pct.failed + pct.skipped
        pct = pct.passed / total * 100.0 if total else None
    if pct is None:
        return "0%"
    if pct <= 0:
        return "0%"
    if pct >= 100.0:
        return "100%"
    pct = min(pct, 100 - 10 ** -prec)
    return f"{pct:.{prec}f}".removesuffix(".0") + "%"


def format_frac(stats) -> str:
    if isinstance(stats, StatsDict):
        total = stats.passed + stats.failed + stats.skipped
        p = stats.passed / total * 100.0 if total else None
        return f"{format_fmt(p, prec=1)} ({stats.passed}/{total})"
    return format_fmt(stats, prec=1)


def load_reports(engine_name: str, is_readme: bool = False) -> tuple[dict, dict]:
    """Return (reports, sources) where sources maps suite → filename. Check sources[suite].endswith('_exp.json')."""
    reports: dict[str, Report] = {}
    sources: dict[str, str] = {}
    for suite in ["es1-5", "compat-table", "test262"]:
        base = REPO_ROOT / "data" / suite
        # _exp.json takes priority; for readme also prefer *_full/*_262 builds
        candidates = [f"{engine_name}_exp.json"]
        if is_readme:
            candidates += [f"{engine_name}_full.json", f"{engine_name}_262.json"]
        candidates.append(f"{engine_name}.json")
        for candidate in candidates:
            p = base / candidate
            if p.exists():
                reports[suite] = Report.load(p)
                sources[suite] = candidate
                break
    return reports, sources


def _failing_tests(report: Report, dir_prefix: str) -> List[tuple]:
    """Return (test_path, verdict) pairs for failing tests under dir_prefix."""
    return [
        (k, v)
        for k, v in report.tests.items()
        if k.startswith(dir_prefix + "/") and v != "PASS"
    ]


def _format_dir_item(
    name: str, stats, failing: List[tuple], conf_link_prefix: str
) -> List[str]:
    """Format one <li> for a conformance directory."""
    pct_str = format_frac(stats)
    pct = stats.pass_percent if isinstance(stats, StatsDict) else stats
    if not failing or pct is None or pct == 100.0:
        return [f"<li>{name}: {pct_str}</li>\n"]
    if pct < 50.0:
        return [f"<li>{name}: {pct_str}</li>\n"]
    # Show up to 20 failing tests in a <pre> block
    lines = [f"<li>{name}: {pct_str}<pre>\n"]
    for i, (test_path, verdict) in enumerate(failing):
        if i >= 20:
            lines.append("...\n")
            break
        basename = test_path.split("/")[-1]
        link = f"{conf_link_prefix}/{test_path}"
        verdict_esc = html.escape(str(verdict), quote=False)
        lines.append(f'<a href="{link}">{basename}</a>: {verdict_esc}\n')
    lines.append("</pre></li>\n")
    return lines


def format_conformance(engine_name: str, reports: dict, sources: dict) -> List[str]:
    lines: List[str] = ["## Conformance\n", "\n"]

    # ES1-ES5
    if report := reports.get("es1-5"):
        if es15 := report.summary.get("es1-5"):
            headline = f"ES1-ES5: {format_fmt(es15)}"
            lines += [f"<details><summary>{headline}</summary><ul>\n"]
            for dir_key, label in [("es1", "ES1"), ("es3", "ES3"), ("es5", "ES5")]:
                if stats := report.dirs.get(dir_key):
                    failing = _failing_tests(report, dir_key)
                    lines += _format_dir_item(
                        label, stats, failing, "../../conformance"
                    )
            lines += ["</ul></details>\n"]

    # compat-table
    if report := reports.get("compat-table"):
        if es6 := report.summary.get("es6"):
            parts = [f"ES6 {format_fmt(es6.weighted_pass_percent)}"]
            if s := report.summary.get("es2016+"):
                parts.append(f"ES2016+ {format_fmt(s.weighted_pass_percent)}")
            if s := report.summary.get("esnext"):
                parts.append(f"Next {format_fmt(s.weighted_pass_percent)}")
            if s := report.summary.get("intl"):
                parts.append(f"Intl {format_fmt(s.weighted_pass_percent)}")
            headline = "compat-table: " + ", ".join(parts)

            lines += ["\n", f"<details><summary>{headline}</summary><ul>\n"]

            def _ct_sort_key(k):
                # es5 → 5, es6 → 6, es2016 → 2016, next → 9998, intl → 9999
                s = k.removeprefix("compat-table/")
                if s == "next":
                    return 9998
                if s == "intl":
                    return 9999
                m = re.match(r"^es(\d+)$", s)
                return int(m[1]) if m else 10000

            ct_dirs = sorted(
                ((k, v) for k, v in report.dirs.items() if re.match(r"^compat-table/", k)),
                key=lambda x: _ct_sort_key(x[0]),
            )
            for dir_key, stats in ct_dirs:
                short = dir_key.removeprefix("compat-table/")
                name = {"next": "Next", "intl": "Intl"}.get(short) or short.upper()
                failing = _failing_tests(report, dir_key)
                lines += _format_dir_item(
                    name, stats.weighted_pass_percent, failing, "../../conformance"
                )
            lines += ["</ul></details>\n"]

    # test262
    if report := reports.get("test262"):
        if all_s := report.summary.get("all"):
            parts = []
            for key, label in [
                ("ex-staging-intl-annexb-esnext", "main"),
                ("staging", "staging"),
                ("annexb", "annexB"),
                ("esnext", "Next"),
                ("intl", "Intl"),
            ]:
                if s := report.summary.get(key):
                    parts.append(f"{label} {format_fmt(s, prec=1)}")
            headline = f"test262: {format_fmt(all_s, prec=1)}"
            if parts:
                headline += ", " + ", ".join(parts)
            lines += ["\n", f"<details><summary>{headline}</summary>\n"]

            # Single <ul> containing summary items, editions, N/A, and other tags
            lines.append("<ul>\n")

            if sources.get("test262", "").endswith("_exp.json"):
                lines.append("<li>Experimental flags were enabled.</li>\n")

            # Summary items
            if s := report.summary.get("all"):
                lines.append("<li>Overall: %s</li>\n" % format_frac(report.summary['all']))
            if s := report.summary.get("ex-staging-intl-annexb-esnext"):
                lines.append(
                    "<li>Excluding staging, annexB, Next and Intl: %s</li>\n" %
                    format_frac(report.summary['ex-staging-intl-annexb-esnext'])
                )
            lines.append(
                "<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>\n"
            )

            # Editions + features
            feat_yaml = test262_features_yaml()
            known_features: set[str] = set()
            for ed_feats in feat_yaml.values():
                known_features.update(ed_feats)

            # All editions in a single collapsed <li>
            edition_lines = []
            edition_order = ["es5", "es6"] + list(
                sorted(
                    tag.removeprefix("edition:")
                    for tag in report.tags.keys()
                    if tag.startswith("edition:es20")
                )
            )

            def _format_edition_item(
                label: str, pct: Any, feats: List[Tuple[str, StatsDict]]
            ) -> List[str]:
                pct_str = format_frac(pct)
                if not feats:
                    return [f"<li>{label}: {pct_str}</li>\n"]
                result = [f"<li>{label}: {pct_str}<pre>\n"]
                for feat, feat_stats in feats:
                    result.append(f"{feat}: {format_frac(feat_stats)}\n")
                result.append("</pre></li>\n")
                return result

            for ed in edition_order:
                ed_stats = report.tags.get(f"edition:{ed}")
                if not ed_stats:
                    continue
                feats: List[Tuple[str, StatsDict]] = [
                    (feat, s)
                    for feat in feat_yaml.get(ed, [])
                    if (s := report.tags.get(f"features:{feat}")) is not None
                ]
                edition_lines += _format_edition_item(ed.upper(), ed_stats, feats)

            # Next edition: features not in features.yml
            esnext_feats: List[Tuple[str, StatsDict]] = sorted(
                (k[len("features:") :], v)
                for k, v in report.tags.items()
                if k.startswith("features:")
                and k[len("features:") :] not in known_features
                and k != "features:N/A"
            )
            esnext_stats = report.tags.get("edition:esnext")
            if esnext_stats or esnext_feats:
                edition_lines += _format_edition_item(
                    "Next", esnext_stats, esnext_feats
                )

            # Edition N/A always last (no features)
            if na_stats := report.tags.get("edition:N/A"):
                edition_lines.append(
                    f"<li>N/A: {format_frac(na_stats)}</li>\n"
                )

            if edition_lines:
                # lines.append('<li><details><summary>By edition/feature</summary><ul>\n')
                lines.extend(edition_lines)
                # lines.append('</ul></details></li>\n')

            # # Other tags: non-edition, non-features (flags, includes, mode, ref, field, ...)
            # other_tags = sorted(
            #     (k, v) for k, v in r.tags.items()
            #     if not k.startswith('edition:') and not k.startswith('features:')
            # )
            # if other_tags:
            #     lines.append('<li><details><summary>By tags</summary><pre>\n')
            #     for k, v in other_tags:
            #         lines.append(f'{k}: {format_pct(v)}\n')
            #     lines.append('</pre></details></li>\n')

            lines.append("</ul>\n")
            lines.append("</details>\n")

    return lines


def update_conformance(
    content: str, filename: str, engine_name: str, is_readme: bool = False
) -> Optional[str]:
    """Regenerate Conformance section. Returns new content, or None if unchanged."""
    reports, sources = load_reports(engine_name, is_readme=is_readme)
    if not reports:
        return None

    new_section = format_conformance(engine_name, reports, sources)
    lines = content.splitlines(keepends=True)

    start = next(
        (i for i, l in enumerate(lines) if l.rstrip() == "## Conformance"), None
    )
    if start is not None:
        end = next(
            (i for i in range(start + 1, len(lines)) if lines[i].startswith("## ")),
            len(lines),
        )
        while end > start and not lines[end - 1].strip():
            end -= 1
        new_lines = lines[:start] + new_section + lines[end:]
    else:
        if lines and lines[-1].strip():
            new_section = ["\n"] + new_section
        new_lines = lines + new_section

    new = "".join(new_lines)
    return new if new != content else None


def update_markdown(
    filename: str, dry_run: bool = False, diff: bool = False, add_shields: bool = False
) -> None:
    path = Path(filename)
    is_readme = path.name == "README.md"
    name = path.parent.name if is_readme else path.stem
    kind = "parser" if "parsers" in path.parts else "engine"

    orig = path.read_text(encoding="utf-8")
    content = orig
    changed = []

    if (new := sort_metadata(content, filename)) is not None:
        content = new
        changed.append("sorted")
    if add_shields and (new := add_missing_shields(content, filename)) is not None:
        content = new
        changed.append("shields+")
    if (new := update_shields(content, filename)) is not None:
        content = new
        changed.append("shields")
    if (
        kind == "engine"
        and (new := update_conformance(content, filename, name, is_readme=is_readme))
        is not None
    ):
        content = new
        changed.append("conformance")

    if not changed:
        return

    if diff:
        sys.stdout.writelines(
            difflib.unified_diff(
                orig.splitlines(keepends=True),
                content.splitlines(keepends=True),
                fromfile=filename,
                tofile=filename,
            )
        )
    elif dry_run:
        print(f"{filename}: {', '.join(changed)}")
    else:
        path.write_text(content, encoding="utf-8")
        print(f"{filename}: {', '.join(changed)}")


def main():
    parser = argparse.ArgumentParser(
        description="Update markdown pages in the repository"
    )
    parser.add_argument(
        "paths",
        nargs="*",
        metavar="PATH",
        help="Files or directories to update (default: all engines + parsers).",
    )
    parser.add_argument(
        "-n",
        "--dry-run",
        action="store_true",
        help="Show one-line summary of changes without writing files.",
    )
    parser.add_argument(
        "-d",
        "--diff",
        action="store_true",
        help="Show unified diff of changes without writing files.",
    )
    parser.add_argument(
        "--add-shields",
        action="store_true",
        help="Add shield badges for repo URLs that don't already have them.",
    )
    args = parser.parse_args()

    files = discover_files(args.paths or [REPO_ROOT / "engines", REPO_ROOT / "parsers"])

    for path in files:
        try:
            update_markdown(
                path, dry_run=args.dry_run, diff=args.diff, add_shields=args.add_shields
            )
        except Exception as e:
            print(f"Warning: {path}: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()
