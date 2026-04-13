#!/usr/bin/env python3
# Fetches GitHub metadata, updates data/github.json.
# Uses GitHub token from GH_TOKEN/GITHUB_TOKEN env vars if available.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path

try:
    import requests
except ModuleNotFoundError:
    requests = None  # type: ignore[assignment]

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from build.parse_markdown import discover_files, parse_markdown_to_json

GITHUB_URL_RE = re.compile(r"https?://github\.com/([^/]+)/([^/]+?)(?:\.git)?/?$")


def _parse_github_url(url: str) -> tuple | None:
    """Return (canonical_url, owner, repo) or None if not a GitHub repo URL."""
    m = GITHUB_URL_RE.match(url)
    if not m:
        return None
    owner, repo = m[1], m[2]
    return f"https://github.com/{owner}/{repo}.git", owner, repo


def collect_repos(files: list) -> dict:
    """Scan markdown files and return {canonical_url: (owner, repo)} for all GitHub repos."""
    repos: dict = {}
    for filename in files:
        try:
            row = parse_markdown_to_json(filename)
        except Exception as e:
            print(f"Warning: {filename}: {e}", file=sys.stderr)
            continue

        for field in ("repository", "github", "sources"):
            url = row.get(field)
            if not url or not isinstance(url, str):
                continue
            parsed = _parse_github_url(url)
            if parsed:
                canonical, owner, repo = parsed
                repos[canonical] = (owner, repo)

    return repos


def fetch_repo(owner: str, repo: str, token: str | None) -> dict | None:
    """Fetch stars, forks, and contributor count from the GitHub API."""
    headers = {"Accept": "application/vnd.github+json"}
    if token:
        headers["Authorization"] = f"token {token}"

    api_url = f"https://api.github.com/repos/{owner}/{repo}"

    time.sleep(0.1)
    resp = requests.get(api_url, headers=headers)
    if resp.status_code != 200:
        print(f"Warning: {api_url}: HTTP {resp.status_code}", file=sys.stderr)
        return None

    data = resp.json()

    # Contributors count via the Link header pagination trick
    contributors_url = f"{api_url}/contributors?per_page=1&anon=true"
    time.sleep(0.1)
    resp2 = requests.get(contributors_url, headers=headers)
    contributors = 0
    if resp2.status_code == 200:
        link_header = resp2.headers.get("Link", "")
        if 'rel="last"' in link_header:
            m = re.search(r"page=(\d+)>; rel=\"last\"", link_header)
            if m:
                contributors = int(m.group(1))
        else:
            body = resp2.json()
            contributors = len(body) if body else 0
    elif resp2.status_code not in (403, 404):
        print(f"Warning: {contributors_url}: HTTP {resp2.status_code}", file=sys.stderr)

    data["contributors_count"] = contributors
    return data


def main() -> None:
    parser = argparse.ArgumentParser(description="Update github.json")
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
        default=str(REPO_ROOT / "data" / "github.json"),
        help="Output file (default: data/github.json).",
    )
    args = parser.parse_args()

    if requests is None:
        print(
            "Error: 'requests' library is not installed. Run: pip install requests",
            file=sys.stderr,
        )
        sys.exit(1)

    token = os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if token:
        print("Using GitHub token from environment.", file=sys.stderr)

    files = discover_files(args.paths or [REPO_ROOT / "engines", REPO_ROOT / "parsers"])
    repos = collect_repos(files)

    print(f"Found {len(repos)} GitHub repositories.", file=sys.stderr)

    # Seed result from existing output file so we only fetch missing entries.
    result: dict = {}
    output_path = Path(args.output)
    if output_path.exists():
        try:
            result = json.loads(output_path.read_text(encoding="utf-8"))
            print(
                f"Loaded {len(result)} existing entries from {args.output}.",
                file=sys.stderr,
            )
        except Exception as e:
            print(f"Warning: could not read {args.output}: {e}", file=sys.stderr)

    missing = {k: v for k, v in repos.items() if k not in result}
    print(
        f"{len(missing)} new / {len(repos) - len(missing)} already cached.",
        file=sys.stderr,
    )

    def write_output() -> None:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        tmp = output_path.with_suffix(".tmp")
        tmp.write_text(
            json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
            encoding="utf-8",
        )
        tmp.replace(output_path)

    last_save = time.monotonic()
    try:
        for i, (canonical, (owner, repo)) in enumerate(sorted(missing.items()), 1):
            print(f"[{i}/{len(missing)}] {owner}/{repo}", file=sys.stderr)
            data = fetch_repo(owner, repo, token)
            if data is not None:
                result[canonical] = data
            if time.monotonic() - last_save >= 10:
                write_output()
                last_save = time.monotonic()
                print(f"Saved ({len(result)} entries).", file=sys.stderr)
    except KeyboardInterrupt:
        write_output()
        print(
            f"\nInterrupted. Saved {len(result)} entries to {args.output}.",
            file=sys.stderr,
        )
        sys.exit(130)

    write_output()
    print(f"Written {args.output} ({len(result)} entries).", file=sys.stderr)


if __name__ == "__main__":
    main()
