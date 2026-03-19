#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import concurrent.futures
import json
import os
import re
import sys
import tempfile
from collections import Counter
from pathlib import Path

from lib import Arbiter, EngineConfig, RunResult, Runner, Verdict, version_sort_key, iterate_js_files

CONFORMANCE_DIR = Path(__file__).parent.resolve()
VAR_CONSOLE_LOG_JS = CONFORMANCE_DIR / "lib/var-console-log.js"
TIMEOUT_SEC = 10.0


def run_one(
    runner: Runner,
    arbiter: Arbiter,
    cfg: EngineConfig,
    test_path: Path,
    test_id: str,
) -> tuple[str, str, RunResult]:
    """Run a single conformance test, return (test_id, status_text)."""
    console_log = cfg.console_log or ["console.log"]
    if type(console_log) is str:
        console_log = [console_log]

    if "console.log" in console_log:
        run = runner.run_command(
            cfg.argv(test_path),
            run_id=test_id,
            test_path=str(test_path),
            script_path=str(test_path),
        )
    elif "print" in console_log and cfg.multiple_scripts_with_shared_realm is True:
        # Engine accepts multiple script files with shared environment
        # between them, so we can just tell it to load a preamble file.
        run = runner.run_command(
            cfg.argv(VAR_CONSOLE_LOG_JS, test_path),
            run_id=test_id,
            test_path=str(test_path),
            script_path=str(test_path),
        )
    else:
        source = test_path.read_text(encoding="utf-8", errors="replace")
        source = source.replace("console.log", console_log[0])
        with tempfile.TemporaryDirectory(prefix="conf-") as td:
            patched = Path(td) / test_path.name
            patched.write_text(source, encoding="utf-8")
            run = runner.run_command(
                cfg.argv(patched),
                run_id=test_id,
                test_path=str(test_path),
                script_path=str(patched),
            )

    ok_pattern = rf"{re.escape(test_path.name)}: OK"
    fail_pattern = rf"{re.escape(test_path.name)}: (?:failed|exception)"
    arbiter.classify(run, ok_pattern=ok_pattern, fail_pattern=fail_pattern,
                     strip_line_prefix=f"{test_id}: ")
    return test_id, run.verdict_message(), run


def format_dir_summary(
    test_dir: str,
    *,
    total: int,
    passed: int,
    failed_tests: list[str],
    width: int,
    use_color: bool,
) -> str:
    label = f"{test_dir}:"
    failed = total - passed

    if failed:
        pct = passed * 100 // total if total else 0
        if use_color:
            color = "\033[1;33m" if pct > 50 else "\033[1;31m"
            label = f"{color}{label}\033[0m" + " " * (width - len(label))
        else:
            label = f"{label:<{width}}"
        line = f"{label} {passed}/{total} ({pct}%) passed, {failed} failed"
        failed_text = " ".join(failed_tests)
        if failed_text and len(failed_text) < 60:
            line += f"; {failed_text}"
        return line

    if use_color:
        label = f"\033[1;32m{label}\033[0m" + " " * (width - len(label))
    else:
        label = f"{label:<{width}}"
    return f"{label} {passed} passed"


def main() -> None:
    parser = argparse.ArgumentParser(description="Run conformance suites for a JS engine.")
    parser.add_argument("engine", help="Engine binary path or name")
    parser.add_argument("suites", nargs="*", help="Suite dirs/globs (default: from config)")
    parser.add_argument("-o", "--output", help="Write results to file")
    parser.add_argument("-j", "--jobs", type=int, help="Parallel jobs (default: from config)")
    parser.add_argument("-v", "--verbose", action="count", default=0, help="Increase verbosity")
    parser.add_argument("-t", "--timeout", type=float, default=TIMEOUT_SEC)
    args = parser.parse_args()

    cfg = EngineConfig.load(args.engine)
    cfg.timeout_sec = args.timeout
    jobs = args.jobs if args.jobs is not None else cfg.conformance_jobs

    # Resolve test files from suites or config defaults.
    suites = args.suites or list(cfg.conformance_suite)
    tests = list(iterate_js_files(suites, root=CONFORMANCE_DIR))
    if not tests:
        sys.exit(f"No conformance tests found for patterns: {suites}")

    runner = Runner(cfg)
    arbiter = Arbiter(cfg)
    use_color = sys.stdout.isatty()
    dir_names = []
    dir_names_set = set()
    for rel in tests:
        dir_name = os.path.dirname(rel)
        if dir_name not in dir_names_set:
            dir_names.append(dir_name)
            dir_names_set.add(dir_name)
    dir_width = max(len(test_dir) for test_dir in dir_names) + 1
    by_dir_total = Counter(os.path.dirname(rel) for rel in tests)
    by_dir_done: Counter[str] = Counter()
    by_dir_passed: Counter[str] = Counter()
    by_dir_failed_tests: dict[str, list[str]] = {test_dir: [] for test_dir in dir_names}
    next_dir_index = 0

    results_by_test: dict[str, tuple[str, str, RunResult]] = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=jobs) as pool:
        futs = {
            pool.submit(run_one, runner, arbiter, cfg, CONFORMANCE_DIR / rel, rel): rel
            for rel in tests
        }
        for fut in concurrent.futures.as_completed(futs):
            test_id, status, run = fut.result()
            results_by_test[test_id] = (test_id, status, run)
            test_dir = os.path.dirname(test_id)
            by_dir_done[test_dir] += 1
            if status == Verdict.OK.value:
                by_dir_passed[test_dir] += 1
            else:
                short_test_id = test_id.split("/", 1)[1] if "/" in test_id else test_id
                by_dir_failed_tests[test_dir].append(short_test_id)
            if args.verbose:
                is_ok = status == Verdict.OK.value
                if not is_ok:
                    line = f"{test_id}: {status}"
                    if use_color:
                        line = f"\033[1;31m{line}\033[0m"
                    print(line, flush=True)
                    if args.verbose >= 3:
                        run.print_streams()
                elif args.verbose >= 2:
                    print(f"{test_id}: {Verdict.OK.value}", flush=True)
            elif len(by_dir_total) >= 2 and by_dir_done[test_dir] == by_dir_total[test_dir]:
                while (
                    next_dir_index < len(dir_names)
                    and by_dir_done[dir_names[next_dir_index]] == by_dir_total[dir_names[next_dir_index]]
                ):
                    done_dir = dir_names[next_dir_index]
                    print(
                        format_dir_summary(
                            done_dir,
                            total=by_dir_total[done_dir],
                            passed=by_dir_passed[done_dir],
                            failed_tests=by_dir_failed_tests[done_dir],
                            width=dir_width,
                            use_color=use_color,
                        ),
                        flush=True,
                    )
                    next_dir_index += 1

    results = [results_by_test[rel] for rel in tests]

    # Write output file (compatible with run.sh format).
    if args.output:
        out = Path(args.output)
        lines: list[str] = []
        if cfg.build_metadata:
            lines.append(f"Metadata: {json.dumps(cfg.build_metadata, ensure_ascii=False, separators=(',', ':'))}")
        lines.extend(f"{name}: {status}" for name, status, _ in results)
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")

    total = len(results)
    passed = sum(1 for _, s, _ in results if s == Verdict.OK.value)
    failed = total - passed
    failed_results = [(test_id, status) for test_id, status, _ in results if status != Verdict.OK.value]

    if failed_results and args.verbose >= 2:
        print("-" * 79)
        print("All failed tests:\n" + " ".join(test_id for test_id, _ in failed_results) + "\n")

    if args.verbose and len(by_dir_total) >= 2:
        print("Summary per each directory:")
        for test_dir in dir_names:
            print(
                format_dir_summary(
                    test_dir,
                    total=by_dir_total[test_dir],
                    passed=by_dir_passed[test_dir],
                    failed_tests=by_dir_failed_tests[test_dir],
                    width=dir_width,
                    use_color=use_color,
                )
            )
        print('')

    if failed:
        pct = passed * 100 // total if total else 0
        summary = f"{passed}/{total} ({pct}%) passed, {failed} failed"
    else:
        summary = f"All {passed} tests passed"
    print(summary)


if __name__ == "__main__":
    main()
