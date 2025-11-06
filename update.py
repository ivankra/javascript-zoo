#!/usr/bin/env python3
#
# - Parses engines/*.md, parsers/*.md files, extracting structured metadata.
# - Reformats them: sorts/aligns metadata, updates <span class="shields">...</span> blocks.
# - Merges with build/benchmarking/github data
# - Updates engines.json, engines.js (JSONP)
# - Regenerates tables in .md files indicated by <!-- update.py: ... --> markup
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

import argparse
import glob
import html
import json
import os
import os.path
import re
import requests
import sys
import time

from bench.data import kBenchData
from dataclasses import dataclass, field
from typing import Any, Dict, List, Tuple, Optional, Union

ARCH_LIST = ['arm64', 'amd64']

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--github',
        nargs='?',
        metavar='TOKEN',
        const='',
        help=('Fetch GitHub metadata. Optionally, provide API token from '
              'GitHub Settings > Developer settings > Personal access tokens'),
    )
    parser.add_argument('-m', '--format-markdown', action='store_true', help="Reformat metadata in markdown files.")

    args = parser.parse_args()

    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    conformance_data = do_conformance_data()
    engines_data = do_engine_data(args, 'engine', 'engines/*.md', 'engines.json', conformance_data)
    parsers_data = do_engine_data(args, 'parser', 'parsers/*.md', None, conformance_data)

    # Update files with dynamically-generated index tables
    update_tables('README.md', engines_data)
    update_tables('parsers/README.md', parsers_data)
    update_tables('parsers/acorn.md', engines_data)

def do_conformance_data():
    kangax_map = json.loads(open('features/kangax-map.json').read())
    kangax_groups = {}
    kangax_weights = {}

    for i in range(2):
        for key, filename in kangax_map.items():
            m = re.match(r'^(.*) \((tiny|small|medium|large)\) > .*', key)
            if not m:
                kangax_weights[filename] = 1
            else:
                group = m[1]
                if i == 0:
                    kangax_groups.setdefault(group, []).append(filename)
                else:
                    group_weight = {'tiny': 1, 'small': 2, 'medium': 4, 'large': 8}[m[2]]
                    kangax_weights[filename] = group_weight / len(kangax_groups[group])

    conformance_data = {}  # engine => lines
    line_re = re.compile('^(([^:/]+)/([^:]+)): (.+)$')

    for filename in glob.glob("features/results/*.txt"):
        engine = os.path.basename(filename).removesuffix('.txt')
        engine = engine.removesuffix('_full')
        assert engine not in conformance_data

        tests = []
        dir_pass = {}
        dir_total = {}
        failing_by_dir = {}
        crashes = 0
        crashes_by_dir = {}

        for line in open(filename):
            m = line_re.match(line.rstrip())
            assert m, (filename, line)

            test = {
                'test': m[1],
                'dir': m[2],
                'weight': kangax_weights.get(m[1], 1),
                'result': m[4],
            }
            tests.append(test)

            dir_total[test['dir']] = dir_total.get(test['dir'], 0) + test['weight']
            if test['result'] == 'OK':
                dir_pass[test['dir']] = dir_pass.get(test['dir'], 0) + test['weight']
            else:
                failing_by_dir.setdefault(test['dir'], []).append(test)

            if test['result'].startswith('crashed'):
                crashes += 1
                crashes_by_dir[test['dir']] = crashes_by_dir.get(test['dir'], 0) + 1

        conformance_scores = {}
        for dir_name, dir_weight in dir_total.items():
            conformance_scores[dir_name] = round(dir_pass.get(dir_name, 0) / dir_total[dir_name], 4)

        def agg_score(name, dir_regex):
            p, q = 0, 0
            for dir_name, dir_weight in dir_total.items():
                if re.match(dir_regex, dir_name):
                    p += dir_pass.get(dir_name, 0)
                    q += dir_total.get(dir_name, 0)
            if q > 0:
                conformance_scores[name] = round(p / q, 4)

        agg_score('es1_5', '^es[1-5]$')
        agg_score('kangax-es2016plus', '^kangax-es20..$')

        conformance_data[engine] = {
            'tests': tests,
            'failing_by_dir': failing_by_dir,
            'crashes': crashes,
            'crashes_by_dir': crashes_by_dir,
            'conformance_results_path': filename,
            'conformance_scores': conformance_scores,  # kangax weighted
        }

    return conformance_data

def do_engine_data(args, kind, md_glob, json_file, conformance_data):
    orig_row_by_id = {}
    if json_file and os.path.exists(json_file):
        with open(json_file, 'r') as fp:
            for row in json.load(fp):
                orig_row_by_id[row['id']] = row

    rows = []

    for filename in sorted(glob.glob(md_glob)):
        if re.search('(_|README.md)', filename):
            continue

        if os.isatty(1):
            print(f'\033[1K\r{filename} ', end='', flush=True)

        name = os.path.basename(filename).removesuffix('.md')

        row = orig_row_by_id.get(name, {})
        row['id'] = name

        process_md(row, kind, filename=filename, args=args)
        process_github(row, kind, args=args)

        # Variants metadata are only used as base template in process_dist/process_bench()
        # If there's no built binary / benchmark data for a variant, it will be ignored.
        if kind == 'engine':
            variants_metadata = {}
            for variant_filename in sorted(glob.glob(f'engines/{name}_*.md')):
                variant = os.path.basename(variant_filename)[len(name)+1:-3]
                variants_metadata[variant] = {
                    'engine': name,
                    'variant': variant,
                }
                if os.isatty(1):
                    print(f'\033[1K\r{variant_filename} ', end='', flush=True)
                process_md(variants_metadata[variant], kind, filename=variant_filename, args=args)
                del variants_metadata[variant]['title']

            row['bench'] = {}
            process_dist(row, variants_metadata=variants_metadata)
            process_bench(row, variants_metadata=variants_metadata)

            bench = row.pop('bench')
            #row = {k: row[k] for k in sorted(row.keys())}
            if bench:
                row['bench'] = [bench[k] for k in sorted(bench.keys())]

        base_name = name.split('_')[0]
        conf = None
        if name in conformance_data:
            conf = conformance_data[name]
            row['spec_conformance'] = conf['conformance_scores']
        elif base_name in conformance_data:
            conf = conformance_data[base_name]
            row['spec_conformance'] = conf['conformance_scores']

        if args.format_markdown:
            update_md(filename, row, conf)

        rows.append(row)

    if os.isatty(1):
        print('\033[1K\rOK', flush=True)

    if json_file:
        with open(json_file, 'w') as fp:
            json.dump(rows, fp, ensure_ascii=False, indent=2, sort_keys=False)

        # JSONP for ease of importing in .html
        with open(json_file.replace('.json', '.js'), 'w') as fp:
            fp.write('// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov\n')
            fp.write('// SPDX-License-Identifier: MIT\n')
            fp.write(f'const jsz_{kind}s = ')
            json.dump(rows, fp, ensure_ascii=False, indent=2, sort_keys=False)

    return rows

@dataclass
class MDParse:
    title: str = ''    # page title
    summary: str = ''  # first paragraph
    metadata: List['MDItem'] = field(default_factory=list)  # flattened
    tree: List['MDItem'] = field(default_factory=list)     # tree

@dataclass
class MDItem:
    line_no: int
    text: str     # full line without indent and leading *
    indent: int   # spaces count
    tree: List['MDItem'] = field(default_factory=list)    # subitems tree
    map_key: str = ''             # key into METADATA_MAP, /-separated titles
    key: Union[str, None] = None    # JSON key
    value: Union[str, None] = None  # JSON value

# Map from metadata field names in Markdown files to metadata JSON keys
# For nested fields, names are concatenated with slash.
# Order of entries here us used to sort the list during reformatting.
METADATA_MAP = {
    'Homepage': 'homepage',
    'NPM': 'npm',

    # Source code
    'Repository': 'repository',
    'GitHub': 'github',    # if github not the main repo
    'Sources': 'sources',  # if no official repository
    'LOC': 'loc',
    'Language': 'language',
    'License': 'license',

    'Org': 'org',
    'Standard': 'standard',  # TODO eval(), proper tail calls, etc; ES5, ES6 etc exceptions/notes
    'Years': 'years',

    # Related engines
    'Ancestor': 'ancestors',
    'Ancestors': 'ancestors',
    'Fork': 'forks',
    'Forks': 'forks',
    'Predecessor': 'predecessors',
    'Predecessors': 'predecessors',
    'Successor': 'successors',
    'Successors': 'successors',

    # Technical properties
    'Type': 'type',
    'Features': 'features',
    'Parser': 'parser',
    'Runtime platform': 'platform',
    'Interpreter': 'interpreter',
    'JIT': 'jit',
    'GC': 'gc',
    'Regex engine': 'regex',
    'DLL': 'dll',
}

MARKDOWN_LINKS_BASE = 'https://github.com/ivankra/javascript-zoo/blob/main/'

def parse_md_metadata(filename) -> MDParse:
    lines = [s.rstrip() for s in open(filename).readlines()] + ['']
    no = 0

    # First line must have page title: '# Title'
    assert len(lines) >= 3 and lines[0].startswith('# ') and lines[1] == '', f'{filename}: missing title'
    parsed = MDParse(title=lines[0][1:].strip())
    no += 2

    # First paragraph must be a short description.
    assert no < len(lines) and len(lines[no].strip()) > 0 and not lines[no].strip().startswith('*'), f'{filename}: missing summary paragraph'
    parsed.summary = ''
    while no < len(lines) and lines[no] and not lines[no].strip().startswith('*'):
        parsed.summary += ' ' + lines[no].strip()
        no += 1
    parsed.summary = parsed.summary.strip()

    assert lines[no].strip() == '', f'{filename}:{no}: {lines[no]} - expected blank line'
    no += 1

    assert lines[no].startswith('* '), f'{filename}:{no}: {lines[no]} - expected metadata list'
    parsed.metadata = []

    # Parse metadata list
    while no < len(lines) and lines[no]:
        assert lines[no].strip().startswith('* '), f'{filename}:{no}: {lines[no]} - expected metadata list line'

        indent = lines[no].index('*')
        assert indent % 2 == 0, f'{filename}:{no}: {lines[no]} - bad indent'

        text = lines[no][indent+1:].strip()
        no += 1

        item = MDItem(
            line_no=no,
            text=text,
            indent=indent,
            map_key=re.sub(': .*', '', text).strip(),
        )

        parent = parsed
        while indent > 0:
            assert len(parsed.tree) > 0, str(parsed)
            parent = parsed.tree[-1]
            indent -= 2

        if parent is not parsed:
            item.map_key = parent.map_key + '/' + item.map_key

        parent.tree.append(item)
        parsed.metadata.append(item)

        item.key = METADATA_MAP.get(item.map_key)
        if item.key is not None and ': ' in text:
            item.value = text[text.index(': ')+1:].strip()

    return parsed

def write_md_metadata(filename, parsed=None):
    """Sort metadata list in markdown file."""

    if parsed is None:
        parsed = parse_md_metadata(filename)

    metadata_order = {k: i for (i, k) in enumerate(METADATA_MAP.keys())}

    lhs_width = max(4 + node.indent + node.text.index(': ') for node in parsed.metadata if ': ' in node.text)
    lhs_width = max(lhs_width, 14)
    lhs_width = min(lhs_width, 32)

    def rec(node, indent=''):
        if node is not parsed:
            if ': ' in node.text:
                title = node.text[:node.text.index(': ')]
                lhs = f'{indent}* {title}: '
                if len(lhs) < lhs_width:
                    lhs += ' ' * (lhs_width - len(lhs))
                yield lhs + node.text[node.text.index(': ')+1:].lstrip() + '\n'
            else:
                yield f'{indent}* {node.text}\n'
            indent += '  '

        node.tree.sort(key=lambda item: metadata_order.get(item.map_key, 1000 + item.line_no))

        for ch in node.tree:
            yield from rec(ch, indent)

    reformatted = list(rec(parsed))

    lines = open(filename).readlines()
    orig_lines = list(lines)

    start = min(item.line_no-1 for item in parsed.metadata)
    end = max(item.line_no for item in parsed.metadata)
    lines = lines[:start] + reformatted + lines[end:]

    if lines == orig_lines:
        return

    with open(filename, 'w') as fp:
        fp.writelines(lines)

# Parse markdown file and populate/update fields in row dict for that engine
def process_md(row, kind, filename, args):
    parsed = parse_md_metadata(filename)

    # Drop existing keys that are recomputed from .md
    drop_keys = sum([[k, k + '_note', k + '_short'] for k in METADATA_MAP.values()], [])
    drop_keys += ['loc_command', 'summary']
    for k in drop_keys:
        if k in row:
            del row[k]

    row['title'] = row.get('title', parsed.title)
    row['summary'] = strip_markdown_links(parsed.summary)
    row['markdown_page'] = f'{MARKDOWN_LINKS_BASE}{kind}s/{os.path.basename(filename)}'

    for item in parsed.metadata:
        if item.key is None or item.value is None: continue
        row[item.key] = strip_html_tags(item.value)

    # Split up some "text (note)" keys
    for key in list(row.keys()):
        val = row[key]
        if key in ['summary', 'sources', 'tech'] or type(val) != str or ' (' not in val:
            continue

        if key in ['loc', 'license', 'language', 'repository', 'github', 'parser', 'runtime']:
            m = re.match(r'((?:[^ ][(]|[^(])+) \((.*)\)$', val)

            assert m, (key, val)
            row[key] = strip_markdown_links(m[1])
            row[key + '_note'] = m[2]

            if key == 'loc':
                mm = re.match(r'^`(cloc [^`]+)`(.*)$', m[2])
                if mm:
                    row['loc_command'] = mm[1]
                    if mm[2] == '':
                        del row['loc_note']
        elif key not in ['standard', 'type', 'jit', 'vm']:
            print(f'Unprocessed note in {key}: {val}')

    if row.get('parser') and '[' in row['parser']:
        row['parser'] = strip_markdown_links(row['parser']).lower()

    # license_abbr
    if row.get('license'):
        s = row['license']
        s = re.sub('BSD-([0-9])-Clause(-Clear)?', r'BSD-\1', s)
        s = re.sub('-([0-9.]+)-only', r'-\1', s)
        s = re.sub('-([0-9.]+)-or-later', r'-\1+', s)
        s = re.sub(' *( OR| AND|,) *', '/', s)
        s = re.sub(' WITH[^,/]*', '', s)
        #s = re.sub('Apache[-0-9.+]', 'Apache', s)
        s = re.sub('Apache[-0-9.+]*/LGPL[-0-9.+]*', 'Apache/LGPL', s)
        s = re.sub('Apache[-0-9.+]*/MIT', 'Apache/MIT', s)
        s = re.sub('MPL[-0-9.+]*/GPL[-0-9.+]*/LGPL[-0-9.+]*', 'MPL/GPL/LGPL', s)
        s = re.sub('Artistic[-0-9.+A-Za-z]*/GPL[-0-9.+]+', 'Artistic/GPL', s)
        row['license_abbr'] = s

    # Integer keys
    for key in ['loc']:
        if key in row:
            row[key] = int(row[key])

# Populate fields with github data
def process_github(row, kind, args):
    gh_repo_url = row.get('github', row.get('repository', row.get('sources')))
    if not gh_repo_url:
        return

    m = re.match('https?://github.com/([^/]+)/([^/]+?)(.git)?$', gh_repo_url)
    if not m:
        return

    owner = m[1]
    repo = m[2]

    api_url = f"https://api.github.com/repos/{owner}/{repo}"
    cache_filename = f'.cache/github/{row["id"]}.json'
    os.makedirs(f'.cache/github', exist_ok=True)

    if os.path.exists(cache_filename):
        with open(cache_filename) as fp:
            github_data = json.load(fp)
    elif args.github is not None:
        time.sleep(0.25)

        headers = {}
        if args.github != '':
            headers = {'Authorization': f'token {args.github}'}

        response = requests.get(api_url, headers=headers)
        if response.status_code != 200:
            print(f'{api_url}: {response.status_code}')
            return

        github_data = response.json()

        with open(cache_filename, 'w') as fp:
            json.dump(github_data, fp, ensure_ascii=False, indent=2, sort_keys=True)
    else:
        return

    row['github_stars'] = github_data['stargazers_count']
    row['github_forks'] = github_data['forks_count']

# Populate row.bench from dist/arch/engine-variant.json
def process_dist(row, variants_metadata):
    engine = row['id']

    for arch in ARCH_LIST:
        for filename in glob.glob(f'dist/{arch}/{engine}.json') + \
                        glob.glob(f'dist/{arch}/{engine}_*.json'):
            with open(filename, 'r') as fp:
                dist_json = json.load(fp)

            assert dist_json.pop('engine') == engine, f'Expected {filename} to have engine: {engine}'

            assert dist_json.get('arch', arch) == arch
            dist_json['arch'] = arch

            variant = dist_json.get('variant', '')
            assert filename.endswith(variant + '.json')

            row['bench'][f'{arch}/{engine}/{variant}'] = merge_jsons(
                variants_metadata.get(variant), dist_json)

# Populate row.bench from benchmarking data in bench/data.py
def process_bench(row, variants_metadata):
    engine = row['id']

    for bench_json in kBenchData:
        if bench_json['engine'] != engine: continue

        head_cols = ['arch', 'variant', 'binary_size', 'revision', 'revision_date', 'version']
        bench_json = {k: bench_json[k] for k in head_cols + sorted(bench_json.keys()) if k in bench_json}

        assert bench_json.pop('engine') == engine
        arch = bench_json['arch']
        variant = bench_json.get('variant', '')

        for col in sorted(bench_json.keys()):
            if type(bench_json[col]) is not dict: continue
            if 'scores' not in bench_json[col]: continue
            scores = bench_json[col]['scores']
            scores = list(sorted(scores))
            assert len(scores) >= 1
            bench_json[col] = scores[len(scores) // 2]
            bench_json[col + '_note'] = summarize_scores(scores)

        if variant == 'jitless':
            bench_json['jit'] = ''

        row['bench'][f'{arch}/{engine}/{variant}'] = merge_jsons(
            variants_metadata.get(variant), bench_json)

def merge_jsons(*jsons):
    res = {}
    for json in jsons:
        if json is not None:
            res.update(json)
    return res

def summarize_scores(scores):
    n = len(scores)
    median = list(sorted(scores))[n // 2]
    mean = sum(scores) / n
    if n == 1:
        return f'N={n} median={median} mean={mean:.0f} max={max(scores)}'
    sd = (sum([(x - mean)**2 for x in scores]) / (n - 1.0)) ** 0.5
    sem = sd / (n ** 0.5)
    return f'N={n} median={median} mean={mean:.2f}±{sem:.2f} max={max(scores)}'

def update_tables(filename, data):
    update_md_shields(filename)

    data = format_table_columns(filename, data)

    original_lines = []
    transformed_lines = []

    with open(filename) as fp:
        skip_till_end = False
        for line in fp:
            original_lines.append(line)

            if skip_till_end:
                m = re.match('^<!-- end of generated table .*-->$', line.strip())
                if m:
                    skip_till_end = False
                continue

            transformed_lines.append(line)

            # Evaluate snippet of python code in .md to get a list of generated lines.
            # Snippet should filter 'data' and call format_table().

            m = re.match(r'^<!-- update.py: (format_table\(.*\)) -->$', line.strip())
            if m:
                for line in eval(m[1]):
                    assert type(line) is str and line.endswith('\n'), line
                    transformed_lines.append(line)
                skip_till_end = True

    assert not skip_till_end, '%s: missing "<!-- end of generated table -->" marker' % filename

    if original_lines != transformed_lines:
        with open(filename, 'w') as fp:
            fp.write(''.join(transformed_lines))

# Add extra columns for displaying the data in .md file
def format_table_columns(filename, data):
    pinned = 'v8 spidermonkey jsc'.split()
    res = []

    for row in data:
        row = dict(row)
        res.append(row)

        std = row.get('standard') or ''
        std = re.sub(r' *\(≈ *ES.\)', '', std)
        std = re.sub(r'^(ES[^( ]*) *\(.*\)', r'\1*', std)
        std = re.sub(r' *\(.*\)', r'', std).strip()
        std = std.replace('+*', '*')
        std = std.replace('*', '<sup>*</sup>')
        if std:
            row['standard_abbr'] = std

        loc = row.get('loc')
        if loc:
            if loc >= 1000000: loc = '%.1fM' % (loc / 1000000.0)
            elif loc >= 10000: loc = '%.0fK' % (loc / 1000.0)
            elif loc >= 1000: loc = '%.1fK' % (loc / 1000.0)
            row['loc_abbr'] = str(loc)

        lang = row.get('language', '')
        lang = re.sub(', .*', '', lang)
        row['language_abbr'] = lang

        if row.get('id') in pinned:
            row['sort_key'] = 'A%02d' % pinned.index(row['id'])
        else:
            row['sort_key'] = ' '.join([
                lang.replace('TypeScript', 'JavaScript').replace('C++', 'C'),
                '%06d' % (999998 - row.get('github_stars', -1)),
                row.get('id', '').lower(),
            ])

        repo_link = row.get('github', row.get('repository', ''))
        repo_text = ''
        if not repo_link and row.get('homepage', '').startswith('http'):
            repo_link = row['homepage']
        if repo_link:
            repo_text = get_domain(repo_link) or 'link'
        m = re.match('https?://github.com/([^/]+)/([^/]+?)(.git)?$', repo_link)
        if m:
            repo_text = f'{m[1]}/{m[2]}'
        if re.match(r'https?://github.com/.*\.git$', repo_link):
            repo_link = repo_link[:-4]

        shields = None
        if repo_link:
            shields = get_shields_for_repo(repo_link, 'README.md').strip()

        markdown_page_rel = os.path.relpath(
            row['markdown_page'].removeprefix(MARKDOWN_LINKS_BASE),
            os.path.dirname(filename))

        row['engine_link'] = f'[{row["title"]}]({markdown_page_rel})'
        if shields:
            row['engine_link'] += f'<br>[{shields}]({repo_link})'
        elif repo_link:
            # Non-breaking hyphen (<nobr> stripped by github).
            # Force the column to be wide enough to not wrap images.
            row['engine_link'] += f'<br>([{repo_text}]({repo_link}))'.replace('[brent-', '[brent‑')

    res.sort(key=lambda row: row['sort_key'])
    return res

# columns = {title: column id}
def format_table(data, columns):
    lines = [
        '| %s |\n' % (' | '.join(columns.keys())),
        '|---' * len(columns) + '|\n',
    ]

    for row in data:
        values = [str(row.get(c, '')) for c in columns.values()]
        lines.append('| %s |\n' % (' | '.join(values)))

    lines.append('<!-- end of generated table (%d rows) -->\n' % len(data))
    return lines

def update_md(filename, data, conformance):
    parsed = parse_md_metadata(filename)
    write_md_metadata(filename, parsed)
    update_md_shields(filename)
    if conformance:
        update_conformance(filename, conformance)

def update_md_shields(filename):
    """Updates <span class="shields">...</span> tags in .md file."""

    lines = open(filename).readlines()
    orig_lines = list(lines)

    for i, line in enumerate(lines):
        matches = re.findall(r'''(https?://[^()>"' ]+)([()>"' ]*)(<(?:div|span) class="shields">.*?</(?:div|span)>)''', line)
        for url, sep, old in matches:
            shields = get_shields_for_repo(url, filename)
            if shields:
                lines[i] = lines[i].replace(url + sep + old, url + sep + shields)

    if lines == orig_lines:
        return

    with open(filename, 'w') as fp:
        fp.writelines(lines)

def get_shields_for_repo(repo_link, filename):
    m = re.match(r'https?://(github\.com|gitlab\.com|codeberg.org)/([^/]+)/([^/]+?)(.git)?/?$', repo_link)
    if not m:
        return ''

    extra = ''
    if m[1] == 'github.com':
        svc = 'github'
    elif m[1] == 'gitlab.com':
        svc = 'gitlab'
    else:
        svc = 'gitea'
        extra = '&gitea_url=https://' + m[1]

    user = m[2]
    repo = m[3]

    html = f'<img src="https://img.shields.io/{svc}/stars/{user}/{repo}?label=&style=flat-square{extra}" alt="Stars" title="Stars">'
    html += f'<img src="https://img.shields.io/{svc}/last-commit/{user}/{repo}?label=&style=flat-square{extra}" alt="Last commit" title="Last commit">'

    if filename == 'README.md':
        return '<div class="shields">' + html + '</div>'
    else:
        return '<span class="shields">' + html + '</span>'

def update_conformance(filename, conformance):
    assert conformance is not None

    orig_lines = open(filename).readlines()
    lines = []
    skip = False

    features_lines = [
        '## Conformance\n',
        '\n',
    ]

    def format_score(score):
        return '100%' if score == 1 else '%.0f%%' % (min(score, 0.99) * 100)

    conformance_scores = conformance['conformance_scores']
    sections = {}

    if 'es1_5' in conformance_scores:
        headline = 'ES1-ES5: ' + format_score(conformance_scores['es1_5'])
        sections[headline] = ['es1', 'es3', 'es5']

    if 'kangax-es6' in conformance_scores:
        headline = 'compat-table: ES6 ' + format_score(conformance_scores['kangax-es6'])
        if 'kangax-es2016plus' in conformance_scores:
            headline += ', ES2016+ ' + format_score(conformance_scores['kangax-es2016plus'])
        if 'kangax-next' in conformance_scores:
            headline += ', Next ' + format_score(conformance_scores['kangax-next'])
        if 'kangax-intl' in conformance_scores:
            headline += ', Intl ' + format_score(conformance_scores['kangax-intl'])
        sections[headline] = (
            ['kangax-es6'] +
            [s for s in conformance_scores if re.match('^kangax-es20..$', s)] +
            ['kangax-next', 'kangax-intl']
        )

    for section_headline, section_dirs in sections.items():
        section_dirs = [s for s in section_dirs if s in conformance_scores]
        if len(section_dirs) == 0:
            continue

        if features_lines[-1] != '\n':
            features_lines += ['\n']
        features_lines += [
            f'<details><summary>{section_headline}</summary><ul>\n'
        ]

        show_full_link = None

        for dir_name in section_dirs:
            name = dir_name.replace('kangax-', '')
            name = name.replace('es', 'ES')
            name = name.replace('intl', 'Intl')
            name = name.replace('next', 'Next')

            failing_tests = conformance['failing_by_dir'].get(dir_name, [])
            score = conformance_scores[dir_name]
            score_str = format_score(score)

            crashes = str(conformance['crashes_by_dir'].get(dir_name, ''))
            if crashes and crashes != '0':
                if crashes == '1':
                    crashes = f', <b>{crashes} crash</b>'
                elif crashes >= '2':
                    crashes = f', <b>{crashes} crashes</b>'

            if score == 1:
                assert len(failing_tests) == 0
                features_lines += [f'<li>{name}: {score_str}</li>\n']
            elif score < 0.5:
                features_lines += [f'<li>{name}: {score_str}{crashes}<br>\n']
            else:
                features_lines += [
                    f'<li>{name}: {score_str}{crashes}<pre>\n'
                ]

                for i, test in enumerate(failing_tests):
                    if i > 20:
                        show_full_link = True
                        features_lines += ['...\n']
                        break
                    else:
                        basename = os.path.basename(test['test'])
                        link = '../features/' + test['test']
                        result = html.escape(test['result'], quote=False)
                        features_lines += [f'<a href="{link}">{basename}</a>: {result}\n']

                features_lines += ['</pre></li>\n']

        if show_full_link:
            link = '../' + conformance['conformance_results_path']
            features_lines += [f'<li><a href="{link}">Full results</a></li>\n']

        features_lines += ['</ul></details>\n']

    if conformance['crashes'] > 0:
        crashes = str(conformance['crashes'])
        if crashes == '1':
            crashes += ' crash'
        else:
            crashes += ' crashes'
        features_lines += ['\n', '💥' + f' **{crashes} during testing**\n']

    for i, line in enumerate(orig_lines):
        if skip:
            if line.startswith('#'):
                lines.append(line)
                skip = False
        elif line == features_lines[0] or line == '## ECMAScript features\n':
            lines.extend(features_lines)
            skip = True
            features_lines = None
        else:
            lines.append(line)

    if features_lines is not None:
        if lines[-1] != '\n':
            lines.append('\n')
        lines.extend(features_lines)

    if lines == orig_lines:
        return

    with open(filename, 'w') as fp:
        fp.writelines(lines)

def get_domain(url):
    m = re.match('^https?://?([^/]+).*', url)
    if m:
        host = m[1]
        if host.count('.') > 1:
            return '.'.join(host.split('.')[-2:])
        return host

def strip_markdown_links(text):
    return re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text).strip()

def strip_html_tags(text):
    return re.sub('<[^<]+?>', '', text).strip()

def escape_markdown(text: str, extra: str = "") -> str:
    chars = r'\\`*_{}\[\]()#+\-\.\!|<>~'
    if extra:
        extra_esc = re.escape(extra)
        chars = chars + extra_esc

    return re.sub(r"([" + chars + r"])", r"\\\1", text)

if __name__ == '__main__':
    main()
