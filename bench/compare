#!/usr/bin/env python3
# Aggregate and compare benchmark results from JSON files.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

import argparse
import json
import math
import os
import re
import subprocess
import sys

from pathlib import Path
from typing import Any

# scipy is optional, only needed for p-value computations
try:
    from scipy import stats
    from scipy.stats import trimboth
    HAS_SCIPY = True
except ImportError:
    HAS_SCIPY = False

ANSI_REGEX = re.compile(r'\x1b\[[0-9;]*m')
ANSI_RED = '\x1b[31m'
ANSI_GREEN = '\x1b[32m'
ANSI_RESET = '\x1b[0m'


def trim_values(values: list[float], trim_prop: float) -> list[float]:
    """Trim values from both ends.

    Args:
        values: List of values to trim
        trim_prop: Proportion to trim from each end [0, 0.5)

    Returns: Trimmed list of values
    """

    if trim_prop == 0:
        return values

    # Use scipy if available for consistency
    if HAS_SCIPY:
        return trimboth(values, trim_prop).tolist()

    n = len(values)
    k = int(n * trim_prop)
    if k > 0 and n > 2 * k:
        return list(sorted(values))[k:-k]
    else:
        return values


AggValue = float | tuple[float, float] | None


def aggregate_values(values: list[float],
                     agg_type: str = 'avg',
                     trim: float = 0,
                     return_mean_with_sem: bool = True) -> AggValue:
    """Aggregate a list of float values.

    Args:
        values: List of values to aggregate
        agg_type: Aggregation type - 'avg', 'median', or 'max'
        trim: Trim proportion [0, 0.5) for outlier removal, 0 for no trimming
    """

    if not values:
        return None

    if trim > 0:
        values = trim_values(values, trim)
        assert len(values) > 0, "trimming removed all samples"

    n = len(values)
    if agg_type == 'median':
        values = list(sorted(values))
        return values[n // 2]
        #return ((values[n // 2] if n % 2 else (values[n // 2 - 1] + values[n // 2]) / 2))
    elif agg_type == 'max':
        return max(values)
    else:
        assert agg_type == 'avg'
        mean = sum(values) / n
        if n > 1 and return_mean_with_sem:
            variance = sum((x - mean) ** 2 for x in values) / (n - 1)
            sem = math.sqrt(variance) / math.sqrt(n)
            return (mean, sem)
        return mean


def format_value(val: str | AggValue) -> str:
    if val is None or val != val:
        return ''
    elif isinstance(val, int) or (isinstance(val, float) and abs(val - round(val)) < 1e-6):
        return f'{val:.0f}'
    elif isinstance(val, float):
        return f'{val:.2f}'
    elif isinstance(val, tuple):
        return f'{format_value(val[0])} ± {val[1]:.2f}'
    else:
        assert type(val) is str
        return val


def format_table(table: dict[str, dict[str, Any]], transpose: bool = False) -> str:
    """Format string table as markdown.

    Args:
        table: {row_name: {column_name: any}}
        transpose: If True, flip rows and columns

    Returns: Markdown table string
    """

    if not table:
        return "<empty table>"

    # Drop file extensions for files in current directory to reduce clutter
    # Else show full path
    for row_name in table:
        table[row_name] = {
            re.sub(r'^([^/]+)\.(bench|json)?$', r'\1', col_name): col
            for (col_name, col) in table[row_name].items()
        }

    # Maybe transpose the table
    if transpose:
        columns = list(table.keys())
        transposed = {}
        for row_name, row_data in table.items():
            for col_name, val in row_data.items():
                if col_name == 'Benchmark':
                    continue
                if col_name not in transposed:
                    transposed[col_name] = {c: None for c in columns}
                transposed[col_name][row_name] = val
        table = transposed
        columns = ['File'] if '%' not in transposed else ['']
    else:
        columns = ['Benchmark']

    col_widths = {}
    rows = []

    # Convert all cells to string, compute columns widths
    for row_name, row in table.items():
        row = {col: format_value(val) for (col, val) in row.items()}

        if columns[0] not in row:  # add_color may have added it already
            row[columns[0]] = row_name

        rows.append(row)

        for col, val in row.items():
            if col not in col_widths:
                if col not in columns:
                    columns.append(col)
                col_widths[col] = len(col)

            val = ANSI_REGEX.sub('', val)
            col_widths[col] = max(col_widths[col], len(val))

    if not rows or not columns:
        return ""

    def pad_with_ansi(s: str, width: int) -> str:
        """Pad string to width, accounting for ANSI escape codes."""
        visible_len = len(ANSI_REGEX.sub('', s))
        padding = width - visible_len
        return s + ' ' * padding if padding > 0 else s

    lines = [
        '| ' + ' | '.join(col.ljust(col_widths[col]) for col in columns) + ' |',
        '|' + '|'.join('-' * (col_widths[col] + 2) for col in columns) + '|'
    ]

    for row in rows:
        values = [pad_with_ansi(row.get(col, ''), col_widths[col]) for col in columns]
        lines.append('| ' + ' | '.join(values) + ' |')

    return '\n'.join(lines)



def load_json(path: str) -> dict[str, dict[str, list[float]]]:
    """Load benchmark data from JSON file.

    Returns: {benchmark: {field: [values]}}
    """

    for cand in [path, path + '.bench']:
        if os.path.exists(cand):
            with open(cand, 'rb') as f:
                if f.read(1) == b'{':
                    if path != cand:
                        path = cand
                    break

    with open(path) as f:
        data = json.load(f)

    assert 'benchmarks' in data, f"{path}: missing 'benchmarks' key"
    benchmarks = data['benchmarks']
    assert isinstance(benchmarks, dict), f"{path}: 'benchmarks' must be a dict"

    for name, fields in benchmarks.items():
        assert isinstance(fields, dict), f"{path}: 'benchmarks.{name}' must be a dict"
        for field, values in list(fields.items()):
            if not isinstance(values, list):
                del fields[field]

    return data


def json_to_table(json_data: dict[str, dict[str, dict[str, list[float]]]],
                  field: str = 'score',
                  agg_type: str = 'avg',
                  trim: float = 0) -> dict[str, dict[str, AggValue]]:
    """Convert JSON data to markdown table format.

    Args:
        json_data: {path: {benchmark: {field: [values]}}}
        field: Field name to extract
        agg_type: Aggregation type
        trim: Trim proportion [0, 0.5) for outlier removal, 0 for no trimming

    Returns: {benchmark: {path: AggValue}}
    """

    table: dict[str, dict[str, AggValue]] = {}
    for path, benchmarks in json_data.items():
        for benchmark, fields in benchmarks.items():
            if field in fields:
                if benchmark not in table:
                    table[benchmark] = {}
                table[benchmark][path] = aggregate_values(fields[field], agg_type, trim)
    return table


def single_file_table(benchmarks: dict[str, dict[str, list[float]]],
                      agg_type: str = 'avg',
                      trim: float = 0) -> dict[str, dict[str, str | AggValue]]:
    """Create table for single file with multiple fields.

    Args:
        benchmarks: {benchmark: {field: [values]}}
        agg_type: Aggregation type
        trim: Trim proportion [0, 0.5) for outlier removal, 0 for no trimming

    Returns: {benchmark: {column: str | AggValue}}
    """

    table: dict[str, dict[str, str | AggValue]] = {}

    for benchmark, fields in benchmarks.items():
        table[benchmark] = {}

        # N (sample size) - show trimmed count if trimming is active
        col_name = 'trimmed_N' if trim > 0 else 'N'
        for field in ['score', 'rss_mb']:
            if field in fields:
                if trim > 0:
                    trimmed = trim_values(fields[field], trim)
                    table[benchmark][col_name] = str(len(trimmed))
                else:
                    table[benchmark][col_name] = str(len(fields[field]))
                break

        if 'score' in fields:
            table[benchmark][f'score_{agg_type}'] = aggregate_values(fields['score'], agg_type=agg_type, trim=trim)

        if 'rss_mb' in fields:
            table[benchmark][f'rss_{agg_type}'] = aggregate_values(fields['rss_mb'], agg_type=agg_type, trim=trim)

        if all(f in fields for f in ['user', 'sys', 'real']):
            assert len(fields['user']) == len(fields['sys']) == len(fields['real']), \
                f"{benchmark}: timing arrays (user, sys, real) must have equal length"

            cores_values = []
            for i in range(len(fields['user'])):
                real_val = fields['real'][i]
                if real_val > 0:
                    cores = (fields['user'][i] + fields['sys'][i]) / real_val
                    cores_values.append(cores)

            table[benchmark][f'cores_{agg_type}'] = aggregate_values(cores_values, agg_type=agg_type, trim=trim)

    return table


def add_gmean(table: dict[str, dict[str, str | AggValue]]) -> None:
    """Add geometric mean row to the table (in row-major format)."""

    if len(table) <= 1:
        return

    gmean_row: dict[str, str | AggValue] = {}

    columns = set()
    for row in table.values():
        columns |= set(row.keys())

    for col in columns:
        values = []
        for row_data in table.values():
            val = row_data.get(col)
            if val is None or val == '':
                continue
            # Extract mean from tuples (mean, sem)
            if isinstance(val, tuple):
                val = val[0]
            if isinstance(val, (int, float)) and val > 0:
                values.append(val)

        if values:
            log_sum = sum(math.log(v) for v in values)
            gmean_row[col] = math.exp(log_sum / len(values))

    if gmean_row:
        table['gmean'] = gmean_row


def add_color_p(table: dict[str, dict[str, str | AggValue]]) -> None:
    """Add ANSI color codes based on p-value significance and % improvement."""

    for row_name, row_data in table.items():
        color = None

        # Only apply colors if p-value column has a significance marker.
        # Determine color based on the sign of % column.
        if any(col.startswith('p_') and isinstance(val, str) and val.endswith('*')
               for col, val in row_data.items()):
            pct_val = row_data.get('%')
            if isinstance(pct_val, str):
                if pct_val.startswith('-'):
                    color = ANSI_RED
                elif pct_val.startswith('+'):
                    color = ANSI_GREEN

        if color is None:
            continue

        row_data['Benchmark'] = f"{color}{row_name}{ANSI_RESET}"

        for col in row_data.keys():
            if col == '%':
                val = row_data[col]
                if isinstance(val, str):
                    row_data[col] = f"{color}{val}{ANSI_RESET}"


def add_color_max(table: dict[str, dict[str, str | AggValue]]) -> None:
    """Add ANSI color codes to highlight max (green) and min (red) values."""

    EPS = 1e-3

    for row_name, row_data in table.items():
        max_val = None
        min_val = None

        for col, val in row_data.items():
            numeric_val = None
            if isinstance(val, tuple):
                numeric_val = val[0]
            elif isinstance(val, (int, float)):
                numeric_val = val
            else:
                continue

            if max_val is None or numeric_val > max_val:
                max_val = numeric_val
            if min_val is None or numeric_val < min_val:
                min_val = numeric_val

        if max_val is None or min_val is None or abs(max_val - min_val) <= EPS:
            continue

        # Color all values within EPS of max/min
        for col, val in row_data.items():
            numeric_val = None
            if isinstance(val, tuple):
                numeric_val = val[0]
            elif isinstance(val, (int, float)):
                numeric_val = val
            else:
                continue

            formatted_val = format_value(val)
            if abs(numeric_val - max_val) <= EPS:
                row_data[col] = f"{ANSI_GREEN}{formatted_val}{ANSI_RESET}"
            elif abs(numeric_val - min_val) <= EPS:
                row_data[col] = f"{ANSI_RED}{formatted_val}{ANSI_RESET}"


def add_comparison(table: dict[str, dict[str, str | AggValue]],
                   json_data: dict[str, dict[str, dict[str, list[float]]]],
                   field: str,
                   pvalue_type: str | None,
                   agg_type: str = 'avg',
                   trim: float = 0) -> None:
    """Add comparison columns (% improvement and p value) to table for two files.

    Args:
        table: {benchmark: {column: str}} - table to add comparison columns to
        json_data: {path: {benchmark: {field: [values]}}} - must have exactly 2 files
        field: Field name to compare
        pvalue_type: Type of p-value test - 'welch', 'mwu', 'paired', 'yuen', or None to skip
        agg_type: Aggregation type
        trim: Trim proportion [0, 0.5) for outlier removal, 0 for no trimming
    """

    if not HAS_SCIPY and pvalue_type is not None:
        print("Warning: scipy not available, skipping p-value calculations", file=sys.stderr)
        pvalue_type = None

    assert len(json_data) == 2, 'add_comparison requires exactly 2 files'
    assert 0 <= trim < 0.5, f'trim must be in [0, 0.5), got {trim}'
    assert trim == 0 or pvalue_type in [None, 'yuen'], '--trim can only be used with --p-value=yuen'

    files = list(json_data.keys())
    file1, file2 = files[0], files[1]

    for benchmark in json_data[file1]:
        if (benchmark not in json_data[file2] or
            field not in json_data[file1][benchmark] or
            field not in json_data[file2][benchmark]):
            continue

        values1 = json_data[file1][benchmark][field]
        values2 = json_data[file2][benchmark][field]

        if not values1 or not values2:
            continue

        # Calculate % improvement and determine sample sizes
        trimmed1 = trim_values(values1, trim)
        trimmed2 = trim_values(values2, trim)
        assert len(trimmed1) > 0 and len(trimmed2) > 0, \
            f"{benchmark}: trimming removed all samples"

        n1, n2 = len(trimmed1), len(trimmed2)

        mean1 = aggregate_values(trimmed1, agg_type=agg_type, return_mean_with_sem=False)
        mean2 = aggregate_values(trimmed2, agg_type=agg_type, return_mean_with_sem=False)

        if isinstance(mean1, float) and isinstance(mean2, float) and mean1 > 0:
            improvement = ((mean2 - mean1) / mean1) * 100
            table[benchmark]['%'] = f"{improvement:+.2f}%"

        # Calculate p-value (only if scipy is available)
        if HAS_SCIPY and pvalue_type is not None and len(values1) > 1 and len(values2) > 1:
            assert agg_type == 'avg'
            if pvalue_type == 'welch':
                assert trim == 0, "Welch's t-test does not support trimming (use --p-value=yuen)"
                _, pval = stats.ttest_ind(values1, values2, equal_var=False)
            elif pvalue_type == 'mwu':
                assert trim == 0, "Mann-Whitney U does not support trimming (use --p-value=yuen)"
                _, pval = stats.mannwhitneyu(values1, values2, alternative='two-sided')
            elif pvalue_type == 'paired':
                assert trim == 0, "Paired t-test does not support trimming"
                if len(values1) != len(values2):
                    print(f"Warning: {benchmark} has unequal sample sizes ({len(values1)} vs {len(values2)}), skipping paired test",
                          file=sys.stderr)
                    continue
                _, pval = stats.ttest_rel(values1, values2)
            elif pvalue_type == 'yuen':
                # Yuen's test: scipy handles trimming internally
                _, pval = stats.ttest_ind(values1, values2, equal_var=False, trim=trim)

            table[benchmark][f'p_{pvalue_type}'] = f"{pval:.4f}" + ('*' if pval < 0.05 else '')

        col_name = 'trimmed_N' if trim > 0 else 'N'
        if n1 == n2:
            table[benchmark][col_name] = str(n1)
        else:
            table[benchmark][col_name] = f"{n1}/{n2}"

    # Add % for geometric mean row if it exists
    if 'gmean' in table:
        val1 = table['gmean'].get(file1)
        val2 = table['gmean'].get(file2)
        if isinstance(val1, (int, float)) and isinstance(val2, (int, float)) and val1 != 0:
            improvement = ((val2 - val1) / val1) * 100
            table['gmean']['%'] = f"{improvement:+.2f}%"


def is_paired(paths: list[str]) -> bool:
    """Check if all files have the same timestamp (indicating paired benchmarks)."""

    times = []
    for path in paths:
        try:
            times.append(load_json(path)['time'])
        except:
            return False

    return len(times) > 0 and len(set(times)) == 1


def main():
    parser = argparse.ArgumentParser(description='Aggregate and compare benchmark results from JSON files')
    parser.add_argument('files', nargs='+', help='JSON files to process')
    parser.add_argument('-f', '--field', type=str,
                        help='use specific field name')
    parser.add_argument('--rss', action='store_true',
                        help='use rss_mb field instead of score')
    parser.add_argument('-m', '--median', action='store_true',
                        help='show median instead of avg ± SEM')
    parser.add_argument('-M', '--max', action='store_true',
                        help='show max instead of avg ± SEM')
    parser.add_argument('-p', '--p-value', dest='pvalue', type=str,
                        choices=['welch', 'mwu', 'paired', 'yuen'],
                        help='statistical test for 2-file comparison. By default: '
                        'Yuen with --trim, paired t-test if inputs have same timestamps '
                        '(indicating parallel runs), else Welch\'s t-test.')
    parser.add_argument('-T', '--transpose', action='store_true',
                        help='flip rows and columns in the output table')
    parser.add_argument('--trim', type=float, metavar='PROPORTION', default=None,
                        help='trim proportion [0, 0.5) for outlier removal (default: 0)')
    parser.add_argument('--color', action='store_true',
                        help='always use color (by default enabled if stdout is a TTY)')
    parser.add_argument('-l', '--less', action='store_true',
                        help='enable color output and pipe through less')

    args = parser.parse_args()

    field = 'score'
    if args.rss:
        field = 'rss_mb'
    elif args.field:
        field = args.field

    agg_type = 'avg'
    if args.median:
        agg_type = 'median'
    elif args.max:
        agg_type = 'max'

    pvalue_type = args.pvalue
    if pvalue_type is not None and not (agg_type == 'avg' and len(args.files) == 2):
        sys.exit('p-values only available for comparing means in 2 files')

    trim = args.trim
    if trim is None:
        if pvalue_type == 'yuen':
            trim = 0.2
            print("Using default trim=0.2 for Yuen's test", file=sys.stderr)
        else:
            trim = 0

    assert 0 <= trim < 0.5, f"--trim must be in range [0, 0.5), got {trim}"

    if len(args.files) == 1:
        benchmarks = load_json(args.files[0])['benchmarks']
        table = single_file_table(benchmarks, agg_type=agg_type, trim=trim)
    else:
        json_data = {path: load_json(path)['benchmarks'] for path in args.files}
        table = json_to_table(json_data, field=field, agg_type=agg_type, trim=trim)

    add_gmean(table)

    if len(args.files) == 2:
        # Autodetect appropriate statistical test for 2-file comparison
        if agg_type == 'avg' and len(args.files) == 2 and pvalue_type is None and HAS_SCIPY:
            if args.trim:
                pvalue_type = 'yuen'
            elif is_paired(args.files):
                pvalue_type = 'paired'
            else:
                pvalue_type = 'welch'

        add_comparison(table, json_data, field=field, pvalue_type=pvalue_type, agg_type=agg_type, trim=trim)

    if args.color or args.less or os.isatty(1):
        if len(args.files) == 2:
            add_color_p(table)
        elif len(args.files) >= 3:
            add_color_max(table)

    output = format_table(table, transpose=args.transpose)

    if args.less:
        proc = subprocess.Popen(['less', '-FRS'], stdin=subprocess.PIPE, text=True)
        proc.communicate(input=output)
    else:
        print(output)


if __name__ == '__main__':
    main()
