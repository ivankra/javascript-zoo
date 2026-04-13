#!/usr/bin/env python3
# Merges data/{markdown.json,github.json,bench/*/*.json} into data/engines.json.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

import argparse
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
ARCH_LIST = ["arm64", "amd64"]
GITHUB_URL_RE = re.compile(r"https?://github\.com/([^/]+)/([^/]+?)(?:\.git)?/?$")


def _github_canonical(url: str) -> str | None:
    m = GITHUB_URL_RE.match(url)
    if not m:
        return None
    return f"https://github.com/{m[1]}/{m[2]}.git"


def summarize_scores(scores: list) -> str:
    n = len(scores)
    scores = sorted(scores)
    median = scores[n // 2]
    mean = sum(scores) / n
    if n == 1:
        return f"N={n} median={median} mean={mean:.0f} max={max(scores)}"
    sd = (sum((x - mean) ** 2 for x in scores) / (n - 1)) ** 0.5
    sem = sd / n ** 0.5
    return f"N={n} median={median} mean={mean:.2f}±{sem:.2f} max={max(scores)}"


def process_bench_file(path: Path) -> tuple[str, dict] | None:
    """Return (engine, metadata+scores) for one bench file, or None to skip."""
    data = json.loads(path.read_text(encoding="utf-8"))
    meta = dict(data.get("metadata", {}))

    engine = meta.pop("engine", None)
    if not engine:
        return None

    # Infer variant from top-level 'binary' key (metadata may omit it)
    binary = data.get("binary", "")
    if binary == engine:
        variant = ""
    elif binary.startswith(engine + "_"):
        variant = binary[len(engine) + 1:]
    else:
        variant = meta.get("variant") or ""

    if variant in ("full", "262"):  # only used for conformance
        return None

    if variant:
        meta["variant"] = variant
    if variant == "jitless":
        meta["jit"] = ""

    for col, entry in sorted(data.get("benchmarks", {}).items()):
        if not isinstance(entry, dict):
            continue
        if entry.get("score"):
            scores = sorted(entry["score"])
            meta[col] = scores[len(scores) // 2]
            meta[col + "_detailed"] = summarize_scores(scores)
        elif entry.get("error"):
            meta[col + "_error"] = entry["error"]

    return engine, meta


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate data/engines.json")
    parser.add_argument(
        "-o", "--output",
        metavar="FILE",
        default=str(REPO_ROOT / "data" / "engines.json"),
        help="Output file (default: data/engines.json).",
    )
    parser.add_argument(
        "--markdown",
        metavar="FILE",
        default=str(REPO_ROOT / "data" / "markdown.json"),
    )
    parser.add_argument(
        "--github",
        metavar="FILE",
        default=str(REPO_ROOT / "data" / "github.json"),
    )
    args = parser.parse_args()

    # --- markdown ---
    md_rows: list[dict] = json.loads(Path(args.markdown).read_text(encoding="utf-8"))
    by_id: dict[str, dict] = {r["id"]: r for r in md_rows}

    # --- github ---
    github_data: dict = {}
    gh_path = Path(args.github)
    if gh_path.exists():
        github_data = json.loads(gh_path.read_text(encoding="utf-8"))

    for row in md_rows:
        for field in ("repository", "github", "sources"):
            url = row.get(field)
            if not url or not isinstance(url, str):
                continue
            canonical = _github_canonical(url)
            if canonical and canonical in github_data:
                gh = github_data[canonical]
                row["github_stars"] = gh.get("stargazers_count", 0)
                row["github_forks"] = gh.get("forks_count", 0)
                row["github_contributors"] = gh.get("contributors_count", 0)
                break

    # --- bench ---
    # engine_id -> list of bench dicts (one per arch/variant combination)
    engine_bench: dict[str, list[dict]] = {}
    bench_root = REPO_ROOT / "data" / "bench"
    for arch in ARCH_LIST:
        arch_dir = bench_root / arch
        if not arch_dir.is_dir():
            continue
        for bench_file in sorted(arch_dir.glob("*.json")):
            result = process_bench_file(bench_file)
            if result is None:
                continue
            engine, meta = result
            if engine not in by_id:
                print(f"Warning: {bench_file.name}: unknown engine {engine!r}", file=sys.stderr)
                continue

            # Merge variant-specific markdown fields (e.g. v8_jitless overrides jit)
            variant = meta.get("variant") or ""
            variant_id = f"{engine}_{variant}" if variant else None
            if variant_id and variant_id in by_id:
                variant_row = by_id[variant_id]
                for k, v in variant_row.items():
                    if k not in ("id", "kind", "engine", "variant", "title", "summary", "jsz_url"):
                        meta.setdefault(k, v)

            # Drop fields that duplicate the engine row (keeps bench entries lean)
            engine_row = by_id[engine]
            for k in list(meta.keys()):
                if k in engine_row and meta[k] == engine_row[k]:
                    del meta[k]

            engine_bench.setdefault(engine, []).append(meta)

    # --- assemble output: engine rows only, no variants ---
    output = []
    for row in md_rows:
        if row.get("kind") != "engine":
            continue
        if row.get("variant"):
            continue
        out = dict(row)
        bench = engine_bench.get(row["id"])
        if bench:
            out["bench"] = bench
        output.append(out)

    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    tmp = out_path.with_suffix(".tmp")
    tmp.write_text(
        json.dumps(output, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    tmp.replace(out_path)
    print(f"Written {args.output} ({len(output)} engines).", file=sys.stderr)


if __name__ == "__main__":
    main()
