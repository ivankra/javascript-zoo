#!/usr/bin/env python3
import re, glob, html
from collections import defaultdict

def make_column(data, total_re, pass_re=': OK$'):
    res = []
    pass_re = re.compile(pass_re)
    total_re = re.compile(total_re)

    for engine, lines in data.items():
        total = 0
        passed = 0
        for line in lines:
            if re.search(total_re, line):
                total += 1
                if re.search(pass_re, line):
                    passed+= 1

        res.append({
            'passed': passed,
            'total': total,
            'pct': (passed * 100 / total) if total > 0 else 0,
            'engine': engine,
        })

    res.sort(key=lambda x: [-x['pct'], x['engine']])

    return res

def gen_table(column_data):
    height = max(len(c) for c in column_data.values())
    table = [['<td>'] * (len(column_data)) for _ in range(height)]

    for c, (ctitle, cdata) in enumerate(column_data.items()):
        for i, item in enumerate(cdata):
            if item['passed'] == 0 and ctitle == 'Crashes':
                break

            fmt = '', ''
            if item['passed'] == item['total'] and item['passed'] > 0:
                fmt = '<b>', '</b>'

            pct = item['pct']
            if pct < 100 and pct > 99.9:
                pct = 99.9
            pct = ('%.1f' % pct).replace('100.0', '100')

            table[i][c] = (
                f'<td title="{item["passed"]}/{item["total"]}">'
                f'<nobr>{fmt[0]}{pct}%&nbsp;{item["engine"]}{fmt[1]}</nobr>'
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

def gen_table2(column_data):
    height = max(len(c) for c in column_data.values())
    table = [['<td>'] * (2*len(column_data)) for _ in range(height)]

    for c, (ctitle, cdata) in enumerate(column_data.items()):
        i = 0
        while i < len(cdata):
            j = i + 1
            while j < len(cdata) and abs(cdata[j]['pct'] - cdata[i]['pct']) < 0.001:
                j += 1

            engines = [x['engine'] for x in cdata[i:j]]
            engines.sort()

            if cdata[i]['passed'] == 0 and ctitle == 'Crashes':
                break

            if ctitle == 'Crashes':
                table[i][2*c+0] = '<td rowspan=%d title="%d/%d">%d' % (
                    j-i, cdata[i]['passed'], cdata[i]['total'], cdata[i]['passed'])
                fmt = '', ''
            else:
                if cdata[i]['passed'] == 0:
                    fmt = '<s>', '</s>'
                elif cdata[i]['passed'] == cdata[i]['total']:
                    fmt = '<b>', '</b>'
                else:
                    fmt = '', ''
                table[i][2*c+0] = '<td rowspan=%d title="%d/%d">%.1f%%' % (
                    j-i, cdata[i]['passed'], cdata[i]['total'], cdata[i]['pct'])
            for k in range(i+1, j):
                table[k][2*c+0] = None
            for k in range(len(engines)):
                table[i+k][2*c+1] = '<td>%s%s%s' % (fmt[0], engines[k], fmt[1])

            i = j

    html = ['<table>\n<tr>' + ''.join(['<th colspan=2>%s</th>' % name for name in column_data.keys()]) + '</tr>\n']
    for row in table:
        if all(cell == '<td>' for cell in row): break
        html += ['<tr>' + ''.join(cell for cell in row if cell) + '</tr>\n']
    if len(html) > 20:
        html += ['<tr>' + ''.join(['<th colspan=2>%s</th>' % name for name in column_data.keys()]) + '</tr>\n']
    html += ['</table>\n']
    return ''.join(html)

def main():
    data = {}  # engine => lines

    for filename in glob.glob("*.txt"):
        engine = filename.removesuffix('.txt')
        engine = engine.removesuffix('_full')
        data[engine] = [l.rstrip() for l in open(filename)]

    with open('README.md', 'w', encoding='utf-8') as f:
        f.write('# Rankings\n\n')
        f.write('Engines ranked by the number of passing tests:\n\n')
        f.write(gen_table({
            'Total': make_column(data, '.*'),
            'ES1-ES5': make_column(data, '^es[1-5]/'),
            'ES6': make_column(data, '^kangax-es6/'),
            'ES2016+': make_column(data, '^kangax-es20../'),
        }))
        f.write(gen_table({
            'Intl': make_column(data, '^kangax-intl/.*'),
            'Crashes': make_column(data, '.*', ': crashed'),
        }))
        f.write('\n[One large table with all rankings](table.md)\n')

    with open('table.md', 'w', encoding='utf-8') as f:
        f.write('# Rankings\n\n')
        f.write(gen_table({
            'ES1': make_column(data, '^es1/.*'),
            'ES3': make_column(data, '^es3/.*'),
            'ES5': make_column(data, '^es5/.*'),
            'ES6': make_column(data, '^kangax-es6/.*'),
            'ES2016': make_column(data, '^kangax-es2016/.*'),
            'ES2017': make_column(data, '^kangax-es2017/.*'),
            'ES2018': make_column(data, '^kangax-es2018/.*'),
            'ES2019': make_column(data, '^kangax-es2019/.*'),
            'ES2020': make_column(data, '^kangax-es2020/.*'),
            'ES2021': make_column(data, '^kangax-es2021/.*'),
            'ES2022': make_column(data, '^kangax-es2022/.*'),
            'ES2023': make_column(data, '^kangax-es2023/.*'),
            'ES2024': make_column(data, '^kangax-es2024/.*'),
            'ES2025': make_column(data, '^kangax-es2025/.*'),
            'Intl': make_column(data, '^kangax-intl/.*'),
            'Crashes': make_column(data, '.*', ': crashed'),
        }))

if __name__ == "__main__":
    main()
