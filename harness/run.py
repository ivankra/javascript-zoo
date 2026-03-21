#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import concurrent.futures
import os
import re
import sys
import tempfile
import time
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from harness import Annotator, EngineConfig, Reporter, RunResult, Runner, Verdict, version_sort_key, iterate_js_files

CONFORMANCE_DIR = REPO_ROOT / "conformance"
PRELUDE_CONSOLE_JS = REPO_ROOT / "harness/prelude-console.js"
TIMEOUT_SEC = 10.0


def run_one(
    runner: Runner,
    annotator: Annotator,
    cfg: EngineConfig,
    test_path: Path,
    test_id: str,
) -> RunResult:
    """Run a single conformance test, return RunResult."""
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
            cfg.argv(PRELUDE_CONSOLE_JS, test_path),
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
    annotator.classify(run, ok_pattern=ok_pattern, fail_pattern=fail_pattern,
                     strip_line_prefix=f"{test_id}: ")
    return run


def main() -> None:
    parser = argparse.ArgumentParser(description="Run conformance suites for a JS engine.")
    parser.add_argument("engine", help="Engine binary path or name")
    parser.add_argument("suites", nargs="*", help="Suite dirs/globs (default: from config)")
    parser.add_argument("-o", "--output", help="Write results to file")
    parser.add_argument("-j", "--jobs", type=int, help="Parallel jobs (default: from config)")
    parser.add_argument("-v", "--verbose", action="count", default=0, help="Increase verbosity")
    parser.add_argument("-t", "--timeout", type=float, default=TIMEOUT_SEC)
    parser.add_argument("--output-format", choices=["auto", "simple", "json"], default="auto",
                        help="Output format (default: auto, detect from extension)")
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
    annotator = Annotator(cfg)
    reporter = Reporter(cfg, verbose=args.verbose)
    multi_dir = len(set(os.path.dirname(rel) for rel in tests)) >= 2
    if multi_dir:
        reporter.set_expected_dirs(tests)

    wall_start = time.monotonic()
    with concurrent.futures.ProcessPoolExecutor(max_workers=jobs) as pool:
        futs = {
            pool.submit(run_one, runner, annotator, cfg, CONFORMANCE_DIR / rel, rel): rel
            for rel in tests
        }
        for fut in concurrent.futures.as_completed(futs):
            run = fut.result()
            reporter.add_file([run])
            if not args.verbose and multi_dir:
                reporter.print_completed_dirs()

    reporter.clear_progress()

    # Flush any dir summaries not yet printed (verbose mode defers them to the end).
    if multi_dir:
        reporter.print_completed_dirs(header=args.verbose >= 1)

    wall_sec = time.monotonic() - wall_start
    reporter.print_summary(wall_sec=wall_sec)

    if args.output:
        reporter.write(args.output, output_format=args.output_format)


if __name__ == "__main__":
    main()
