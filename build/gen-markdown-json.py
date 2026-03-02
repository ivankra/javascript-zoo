#!/usr/bin/env python3
# Generates dist/markdown.json - markdown content bundle for the SPA app.
#
# Format: {"<key>": {"url": "<github-url>", "title": "...", "body": "..."}, ...}
#
# Key is the URL fragment (#key) used to open the markdown page in the app:
#   engines/<engine>/README.md        -> "<engine>"
#   engines/<engine>/<engine>_*.md    -> "<engine>_<variant>"
#   parsers/<parser>/README.md        -> "parsers/<parser>"
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

import glob
import json
import os
import sys

GITHUB_BASE = 'https://github.com/ivankra/javascript-zoo/blob/master/'


def extract_title(content: str) -> str:
    for line in content.splitlines():
        if line.startswith('# '):
            return line[2:].strip()
    return ''


def strip_title(content: str) -> str:
    lines = content.split('\n')
    if lines and lines[0].startswith('# '):
        lines = lines[1:]
        if lines and lines[0] == '':
            lines = lines[1:]
    return '\n'.join(lines)


def add_entry(result, key, entry):
    if key in result:
        sys.exit(f'Error: duplicate key {key!r}')
    result[key] = entry


def collect(result, top_dir, key_prefix=''):
    for sub_dir in sorted(glob.glob(f'{top_dir}/*')):
        if not os.path.isdir(sub_dir):
            continue
        name = os.path.basename(sub_dir)

        readme = os.path.join(sub_dir, 'README.md')
        if os.path.exists(readme):
            content = open(readme, encoding='utf-8').read()
            add_entry(result, f'{key_prefix}{name}', {
                'url': f'{GITHUB_BASE}{top_dir}/{name}/README.md',
                'title': extract_title(content),
                'body': strip_title(content),
            })

        for path in sorted(glob.glob(os.path.join(sub_dir, f'{name}_*.md'))):
            key = os.path.basename(path).removesuffix('.md')
            content = open(path, encoding='utf-8').read()
            add_entry(result, f'{key_prefix}{key}', {
                'url': f'{GITHUB_BASE}{top_dir}/{name}/{os.path.basename(path)}',
                'title': extract_title(content),
                'body': strip_title(content),
            })


def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(repo_root)

    result = {}
    collect(result, 'engines')
    collect(result, 'parsers', key_prefix='parsers/')

    os.makedirs('dist', exist_ok=True)
    with open('dist/markdown.json', 'w', encoding='utf-8') as fp:
        json.dump(result, fp, ensure_ascii=False, indent=2, sort_keys=True)

    print(f'Written dist/markdown.json ({len(result)} entries)')


if __name__ == '__main__':
    main()
