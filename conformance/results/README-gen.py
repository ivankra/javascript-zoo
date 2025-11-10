#!/usr/bin/env python3
# Generates README.md with rankings

import glob
import html
import json
import os
import re

from collections import defaultdict

# TODO move to shared library
def get_kangax_weights():
    kangax_map = json.loads(open('../gen-kangax.json').read())['map']
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

    return kangax_weights

def make_column(data, kangax_weights, total_re, pass_re=': OK$'):
    res = []
    pass_re = re.compile(pass_re)
    total_re = re.compile(total_re)
    line_re = re.compile('^(([^:/]+)/([^:]+)): (.+)$')

    for engine, lines in data.items():
        total_u = 0
        total_w = 0
        passed_u = 0
        passed_w = 0

        for line in lines:
            if re.search(total_re, line):

                m = line_re.match(line.rstrip())
                assert m, (filename, line)

                total_u += 1
                total_w += kangax_weights.get(m[1], 1)

                if re.search(pass_re, line):
                    passed_u += 1
                    passed_w += kangax_weights.get(m[1], 1)

        res.append({
            'total_u': total_u,
            'total_w': total_w,
            'passed_u': passed_u,
            'passed_w': passed_w,
            'pct_u': (passed_u * 100 / total_u) if total_u > 0 else 0,
            'pct_w': (passed_w * 100 / total_w) if total_w > 0 else 0,
            'engine': engine,
        })

    return res

def gen_table(column_data):
    height = max(len(c) for c in column_data.values())
    table = [['<td>'] * (len(column_data)) for _ in range(height)]

    total_pct = None
    if 'Total' in column_data:
        # Correct totals for engines that didn't run through the whole test-suites
        total_u_max = max(item['total_u'] for item in column_data['Total'])
        total_w_max = max(item['total_w'] for item in column_data['Total'])
        for item in column_data['Total']:
            item['total_u'] = total_u_max
            item['total_w'] = total_w_max
            item['pct_u'] = (item['passed_u'] * 100 / item['total_u']) if item['total_u'] > 0 else 0
            item['pct_w'] = (item['passed_w'] * 100 / item['total_w']) if item['total_w'] > 0 else 0

        # Use total% as a tie-breaker for sorting engines
        total_pct = {item['engine']: item['pct_u'] for item in column_data['Total']}

    for c, (ctitle, cdata) in enumerate(column_data.items()):
        weighted = ctitle in ['ES6', 'ES2016+', 'Next']

        cdata.sort(key=lambda x: [
            -x['pct_w' if weighted else 'pct_u'],
            0 if not total_pct else -total_pct.get(x['engine'], 0),
            x['engine']
        ])

        for r, item in enumerate(cdata):
            if item['passed_u'] == 0 and ctitle == 'Crashes':
                break

            fmt = '', ''
            if item['passed_u'] == item['total_u'] and item['passed_u'] > 0:
                fmt = '<b>', '</b>'

            pct = item['pct_w' if weighted else 'pct_u']
            if pct < 100 and pct > 99.9:
                pct = 99.9
            if pct > 0 and pct < 0.1:
                pct = 0.1
            pct = '%.1f%%' % pct
            if pct == '100.0%': pct = '100%'
            if pct == '0.0%': pct = '0%'

            engine = item["engine"]
            if os.path.exists(f'../../engines/{engine}.md'):
                engine = f'<a href="../../engines/{engine}.md">{engine}</a>'
            elif os.path.exists(f'../../engines/{engine.split("_")[0]}.md'):
                engine = f'<a href="../../engines/{engine.split("_")[0]}.md">{engine}</a>'

            if ctitle == 'Crashes':
                table[r][c] = (
                    f'<td title="Total count of crashed tests"><nobr>{fmt[0]}{item["passed_u"]}&nbsp;{engine}{fmt[1]}</nobr>'
                )
            else:
                ww = ', weighted per compat-table' if weighted else ''
                table[r][c] = (
                    f'<td title="{item["passed_u"]}/{item["total_u"]} passed{ww}">'
                    f'<nobr>{fmt[0]}{pct}&nbsp;{engine}{fmt[1]}</nobr>'
                )

    html = [
        '<table>\n<tr>' +
        ''.join(['<th>%s</th>' % name for name in column_data.keys()]) + '</tr>\n'
    ]
    for row in table:
        if all(cell == '<td>' for cell in row): break
        html += ['<tr>' + ''.join(cell for cell in row if cell) + '</tr>\n']
    if len(html) > 20:
        html += ['<tr>' + ''.join(['<th>%s</th>' % name for name in column_data.keys()]) + '</tr>\n']
    html += ['</table>\n']
    return ''.join(html)

def main():
    data = {}  # engine => lines

    for filename in glob.glob("*.txt"):
        engine = filename.removesuffix('.txt')
        engine = engine.removesuffix('_full')
        data[engine] = [l.rstrip() for l in open(filename) if not l.startswith('Metadata:')]

    kangax_weights = get_kangax_weights()

    def col(*r):
        return make_column(data, kangax_weights, *r)

    with open('README.md', 'w', encoding='utf-8') as f:
        f.write('# Rankings\n\n')
        f.write("Engines ranked by percentage of passing tests (weighted percentage for compat-table's test suite):\n\n")
        f.write(gen_table({
            'Total': col('.*'),
            'ES1-ES5': col('^es[1-5]/'),
            'ES6': col('^kangax-es6/'),
            'ES2016+': col('^kangax-es20../'),
        }))
        f.write(gen_table({
            'Next': col('^kangax-next/.*'),
            'Intl': col('^kangax-intl/.*'),
            'Crashes': col('.*', ': crashed'),
        }))

    print('Generated README.md')

if __name__ == "__main__":
    main()
