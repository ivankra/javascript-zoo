#!/usr/bin/env python3
"""Aggregate and compare benchmark results from JSON files."""

import argparse
import json
import sys
from pathlib import Path
from math import sqrt


def calc_stats(values):
    """Calculate mean, SEM, and median for a list of values."""
    if not values:
        return None, None, None

    n = len(values)
    mean = sum(values) / n
    median = sorted(values)[n // 2] if n % 2 else (sorted(values)[n//2 - 1] + sorted(values)[n//2]) / 2

    if n > 1:
        variance = sum((x - mean) ** 2 for x in values) / (n - 1)
        sem = sqrt(variance) / sqrt(n)
    else:
        sem = 0

    return mean, sem, median


def aggregate_file_stats(filepath, field='score', use_median=False):
    """Aggregate statistics from a single JSON file into column-major format.

    Returns: {column_name: {test_name: formatted_value}}
    """
    with open(filepath) as f:
        data = json.load(f)

    col_name = str(Path(filepath)) #.name
    results = {col_name: {}}

    for test_name, test_data in data.get('benchmarks', {}).items():
        if field in test_data:
            mean, sem, median = calc_stats(test_data[field])
            if mean is not None:
                if use_median:
                    results[col_name][test_name] = f"{median:.2f}"
                else:
                    results[col_name][test_name] = f"{mean:.2f} ± {sem:.2f}"

    return results


def add_percent_improvement(table_data, col1, col2, file1_path=None, file2_path=None, field='score'):
    """Add derived columns showing percent improvement and p-values from col1 to col2."""
    if col1 not in table_data or col2 not in table_data:
        return

    table_data['%'] = {}

    # Try to import scipy for p-value calculations
    has_scipy = False
    try:
        from scipy import stats
        has_scipy = True
    except ImportError:
        pass

    # Load raw data if scipy is available and file paths provided
    raw_data1 = None
    raw_data2 = None
    if has_scipy and file1_path and file2_path:
        try:
            with open(file1_path) as f:
                raw_data1 = json.load(f).get('benchmarks', {})
            with open(file2_path) as f:
                raw_data2 = json.load(f).get('benchmarks', {})

            table_data['p_welch'] = {}
            table_data['p_mwu'] = {}
        except Exception:
            has_scipy = False  # Disable p-values if we can't load data

    for test_name in table_data[col1]:
        if test_name in table_data[col2]:
            # Extract mean values (handle "mean ± sem" format)
            val1_str = table_data[col1][test_name].split(' ± ')[0]
            val2_str = table_data[col2][test_name].split(' ± ')[0]

            try:
                val1 = float(val1_str)
                val2 = float(val2_str)
                if val1 != 0:
                    improvement = ((val2 - val1) / val1) * 100
                    table_data['%'][test_name] = f"{improvement:+.2f}%"

                    # Calculate p-values if scipy is available
                    if has_scipy and raw_data1 and raw_data2:
                        if test_name in raw_data1 and test_name in raw_data2:
                            if field in raw_data1[test_name] and field in raw_data2[test_name]:
                                values1 = raw_data1[test_name][field]
                                values2 = raw_data2[test_name][field]

                                if len(values1) > 1 and len(values2) > 1:
                                    # T-test (parametric, Welch's t-test - doesn't assume equal variance)
                                    _, p_welch = stats.ttest_ind(values1, values2, equal_var=False)
                                    table_data['p_welch'][test_name] = f"{p_welch:.4f}" + ('*' if p_welch < 0.05 else '')

                                    # Mann-Whitney U test (non-parametric)
                                    _, p_mwu = stats.mannwhitneyu(values1, values2, alternative='two-sided')
                                    table_data['p_mwu'][test_name] = f"{p_mwu:.4f}" + ('*' if p_mwu < 0.05 else '')
            except ValueError:
                pass


def aggregate_single_file_multi_fields(filepath, use_median=False):
    """Special case: aggregate both score and rss_mb for a single file."""
    with open(filepath) as f:
        data = json.load(f)

    table_data = {}

    # First column: N (sample size)
    table_data['N'] = {}
    for test_name, test_data in data.get('benchmarks', {}).items():
        # Use score or rss_mb to get N, whichever is available
        for field in ['score', 'rss_mb']:
            if field in test_data:
                table_data['N'][test_name] = str(len(test_data[field]))
                break

    # Score: show both avg and median
    for field_name in ['score']:
        for stat_type in ['avg ± sem', 'median'] if not use_median else ['median']:
            if stat_type == 'avg ± sem':
                col_name = f"{field_name}_avg"
            else:
                col_name = f"{field_name}_{stat_type}"
            table_data[col_name] = {}

            for test_name, test_data in data.get('benchmarks', {}).items():
                if field_name in test_data:
                    mean, sem, median = calc_stats(test_data[field_name])
                    if mean is not None:
                        if stat_type == 'median' or use_median:
                            table_data[col_name][test_name] = f"{median:.2f}"
                        else:
                            table_data[col_name][test_name] = f"{mean:.2f} ± {sem:.2f}"

    # RSS: show only avg
    field_name = 'rss_mb'
    col_name = 'rss_avg'
    table_data[col_name] = {}
    for test_name, test_data in data.get('benchmarks', {}).items():
        if field_name in test_data:
            mean, sem, median = calc_stats(test_data[field_name])
            if mean is not None:
                if use_median:
                    table_data[col_name][test_name] = f"{median:.2f}"
                else:
                    table_data[col_name][test_name] = f"{mean:.2f} ± {sem:.2f}"

    # Add cores_avg column: cores = (user + sys) / real
    table_data['cores_avg'] = {}
    for test_name, test_data in data.get('benchmarks', {}).items():
        if all(field in test_data for field in ['user', 'sys', 'real']):
            # Calculate cores for each sample
            cores_values = []
            for i in range(len(test_data['user'])):
                if i < len(test_data['sys']) and i < len(test_data['real']):
                    real_val = test_data['real'][i]
                    if real_val > 0:
                        cores = (test_data['user'][i] + test_data['sys'][i]) / real_val
                        cores_values.append(cores)

            if cores_values:
                mean, sem, median = calc_stats(cores_values)
                table_data['cores_avg'][test_name] = f"{mean:.2f} ± {sem:.2f}"

    return table_data


def format_table(table_data):
    """Format column-major data as a markdown table."""
    if not table_data:
        return ""

    # Get all test names (rows) - preserve order from first column
    all_tests = []
    seen = set()
    for col_data in table_data.values():
        for test in col_data.keys():
            if test not in seen:
                all_tests.append(test)
                seen.add(test)

    if not all_tests:
        return ""

    # Column names
    columns = list(table_data.keys())

    # Calculate column widths
    col_widths = {}
    col_widths['Test'] = max(len('Test'), max(len(t) for t in all_tests))

    for col in columns:
        max_width = len(col)
        for test in all_tests:
            if test in table_data[col]:
                max_width = max(max_width, len(table_data[col][test]))
        col_widths[col] = max_width

    # Build table
    lines = []

    # Header
    header = '| ' + 'Test'.ljust(col_widths['Test']) + ' | '
    header += ' | '.join(col.ljust(col_widths[col]) for col in columns) + ' |'
    lines.append(header)

    # Separator
    sep = '|' + '-' * (col_widths['Test'] + 2) + '|'
    sep += '|'.join('-' * (col_widths[col] + 2) for col in columns) + '|'
    lines.append(sep)

    # Data rows
    for test in all_tests:
        row = '| ' + test.ljust(col_widths['Test']) + ' | '
        values = []
        for col in columns:
            val = table_data[col].get(test, '')
            values.append(val.ljust(col_widths[col]))
        row += ' | '.join(values) + ' |'
        lines.append(row)

    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(description='Aggregate and compare benchmark results from JSON files')
    parser.add_argument('files', nargs='+', help='JSON files to process')
    parser.add_argument('-r', '--rss', action='store_true',
                        help='Use rss_mb field instead of score')
    parser.add_argument('-f', '--field', type=str,
                        help='Use specific field name')
    parser.add_argument('-m', '--median', action='store_true',
                        help='Show median instead of avg ± SEM')

    args = parser.parse_args()

    field = 'score'
    if args.rss:
        field = 'rss_mb'
    elif args.field:
        field = args.field

    if len(args.files) == 1:
        table_data = aggregate_single_file_multi_fields(args.files[0], args.median)
    else:
        table_data = {}
        for filepath in args.files:
            file_stats = aggregate_file_stats(filepath, field, args.median)
            table_data.update(file_stats)

        if len(args.files) == 2:
            col_names = list(table_data.keys())
            add_percent_improvement(table_data, col_names[0], col_names[1],
                                   args.files[0], args.files[1], field)

    print(format_table(table_data))


if __name__ == '__main__':
    main()
