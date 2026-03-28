#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import concurrent.futures
import itertools
import os
import random
import re
import shlex
import shutil
import sys
import tempfile
import time
from pathlib import Path
from typing import Any, Iterator

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from harness import (
    Assembler,
    Annotator,
    EngineConfig,
    FilterExpr,
    Frontmatter,
    Reporter,
    RunResult,
    Runner,
    Scenario,
    Tags,
    Verdict,
    iterate_js_files,
)
from harness.util import HelpFormatter

from harness import probe as test262_probe

DEFAULT_TEST262_DIR = (REPO_ROOT / "third_party" / "test262").resolve()
DEFAULT_TIMEOUT_SEC = 60.0
INTL402_SKIP_PATHS = ["test/intl402", "test/staging/Intl402"]
STAGING_SKIP_PATHS = ["test/staging"]
ANNEX_B_SKIP_PATHS = ["test/annexB"]


class Executor:
    """Executes and classifies test262 scenarios via a process pool."""

    def __init__(
        self,
        engine: EngineConfig,
        assembler: Assembler,
        *,
        jobs: int = 4,
        timeout_sec: float = DEFAULT_TIMEOUT_SEC,
        mode: str = "all",
        filter_expr: FilterExpr | None = None,
    ) -> None:
        self.engine = engine
        self.test262_dir = assembler.test262_dir
        self.assembler = assembler
        self.runner = Runner(engine)
        self.annotator = Annotator(engine)
        self.timeout_sec = timeout_sec
        self.mode = mode
        self.filter_expr = filter_expr
        self._jobs = max(1, jobs)
        self._shared_tmp = Path(tempfile.mkdtemp(prefix="t262-"))

    def run(self, tests: Iterator[str], *, on_test_result: Any = None, on_test_submit: Any = None) -> None:
        """Submit test files to worker pool, delivering results via callback.

        Callback signature: on_test_result(results: list[RunResult]).
        on_test_submit(rel_path: str) is called in discovery order as tests are submitted.
        """
        try:
            with concurrent.futures.ProcessPoolExecutor(max_workers=self._jobs) as pool:
                futs: dict[concurrent.futures.Future[list[RunResult]], str] = {}
                test_iter = iter(tests)
                exhausted = False

                try:
                    while True:
                        while not exhausted and len(futs) < self._jobs * 3:
                            try:
                                rel_path = next(test_iter)
                            except StopIteration:
                                exhausted = True
                                break
                            if on_test_submit:
                                on_test_submit(rel_path)
                            futs[pool.submit(self._process_file, rel_path)] = rel_path

                        if not futs:
                            break

                        done, _ = concurrent.futures.wait(
                            futs,
                            return_when=concurrent.futures.FIRST_COMPLETED,
                        )
                        for fut in done:
                            futs.pop(fut)
                            file_results = fut.result()
                            if on_test_result:
                                on_test_result(file_results)
                except KeyboardInterrupt:
                    for f in futs:
                        f.cancel()
                    raise
        finally:
            shutil.rmtree(self._shared_tmp, ignore_errors=True)

    def _process_file(self, rel_path: str) -> list[RunResult]:
        """Read file, parse frontmatter, expand modes, execute each.

        Returns a single SKIPPED RunResult if filtered by features,
        [] if no applicable modes.
        """
        test_path = self.test262_dir / rel_path
        # Binary read to preserve CR/CRLF line endings verbatim, e.g.
        # Function/prototype/toString/line-terminator-normalisation-CR.js
        source = test_path.read_bytes().decode("utf-8", errors="replace")
        fm = Frontmatter.parse(source)

        tags = Tags.test262(fm, rel_path=rel_path)

        if self.filter_expr and not self.filter_expr(tags):
            return [RunResult(
                run_id=rel_path, test_id=rel_path, test_path=str(test_path),
                verdict=Verdict.SKIPPED, error_message="filtered out",
                tags=tags,
            )]

        results: list[RunResult] = []
        for mode in fm.modes():
            if self.mode != "all" and self.mode != mode:
                continue
            mt = tags.clone()
            mt.add("mode", mode)
            results.append(self._execute_one(Scenario(
                test_path=test_path, test_content=source, rel_path=rel_path,
                fm=fm, mode=mode, tags=mt,
            )))
        return results

    def _execute_one(self, scenario: Scenario) -> RunResult:
        """Execute engine on an assembled scenario, classify result."""
        is_module = "module" in scenario.fm.flags
        is_negative = bool(scenario.fm.negative_type)
        is_async = "async" in scenario.fm.flags
        ok_pattern: str | None = Assembler.SCRIPT_EXECUTION_FINISHED_MARKER
        if is_negative or "raw" in scenario.fm.flags:
            ok_pattern = None

        staged = self.assembler.stage(scenario, temp_dir=self._shared_tmp)
        if scenario.tags is None:
            scenario.tags = Tags()
        for used in staged.used:
            scenario.tags.add("uses", used)

        try:
            run = self.runner.run_command(
                self.engine.argv(staged.script_path, tags=scenario.tags),
                run_id=scenario.run_id(),
                test_id=scenario.rel_path,
                test_path=str(scenario.test_path),
                script_path=str(staged.script_path),
                timeout_sec=self.timeout_sec,
                cwd=str(staged.cwd),
            )

            self.annotator.classify(
                run,
                expect_async=is_async,
                ok_pattern=ok_pattern,
                negative_phase=scenario.fm.negative_phase if is_negative else None,
                negative_type=scenario.fm.negative_type if is_negative else None,
            )

            run.mode = scenario.mode
            run.tags = scenario.tags
            return run
        finally:
            staged.cleanup()


def parse_filter_expr(parser: argparse.ArgumentParser, filter_parts: list[str]) -> FilterExpr | None:
    """Build and validate the combined --filter expression once."""
    if not filter_parts:
        return None

    expr = "|".join(filter_parts)
    filter_expr = FilterExpr(expr)
    try:
        filter_expr(set())
    except SyntaxError as e:
        parser.error(f"--filter={expr!r}: {e.msg}")
    return filter_expr


def parse_rusage_mode(value: str) -> str:
    if value in ("all", "no"):
        return value
    if re.fullmatch(r"top(\d+)", value):
        return value
    raise argparse.ArgumentTypeError(f"invalid rusage mode: {value!r}; expected topN, all, or no")


def main() -> None:
    p = argparse.ArgumentParser(
        description="Run test262 conformance suite against a JavaScript engine.",
        usage="%(prog)s [opts] engine [tests]",
        formatter_class=HelpFormatter,
    )
    p.add_argument("engine", help="Engine binary path or a shell command (e.g. /dist/v8, node, 'node --js-staging')")
    p.add_argument("tests", nargs="*", help="""
        Test files/dirs globs relative to test262 root. Glob matching
        a directory selects all *.js files recursively. May use ** globs,
        e.g. test/**/Temporal to match all Temporal subdirs.""")
    p.add_argument("-c", "--config", help="Force a specific config entry from config.yml (normally inferred from binary basename)")
    p.add_argument("-f", "--filter", action="append", default=[], metavar="EXPR", help="""
        Boolean expression with parenthesis, NOT ("!" / "~"), AND ("&"),
        OR ("|" / ",", lowest precedence) over "[<namespace>:]<tag>"
        booleans indicating tag presence. Examples: "Temporal" or
        "features:Temporal" (select all Temporal tests), "~Atomics"
        (exclude features:Atomics tests), "es6&Map" (all edition:es6
        tests with features:Map). Multiple flags are joined with OR.""")
    p.add_argument("-j", "--jobs", type=int, default=os.cpu_count(), metavar="N",
                   help=f"Run N jobs in parallel (default: {os.cpu_count()})")
    p.add_argument("-l", "--limit", type=int, default=0, metavar="N",
                   help="Stop after running N tests")
    p.add_argument("-m", "--mode", choices=["all", "strict", "sloppy"], metavar="MODE", default="all",
                   help="Run only strict (-m strict) or sloppy (-m sloppy) mode scenarios (default: all)")
    p.add_argument("-o", "--output", metavar="FILE",
                   help="Output file (for test results or -E)")
    p.add_argument("-t", "--timeout", type=float, default=DEFAULT_TIMEOUT_SEC, metavar="SEC",
                   help=f"Timeout for each test in seconds (default: {DEFAULT_TIMEOUT_SEC})")
    p.add_argument("-v", "--verbose", action="count", default=0, help="Increase verbosity")
    p.add_argument("-E", action="store_true", dest="preprocess",
                   help="Preprocess a single test and write it to stdout or -o FILE")
    p.add_argument("-O", "--stage-dir", metavar="DIR",
                   help="Stage preprocessed test files with dependencies in DIR and keep it after run")
    p.add_argument("--exclude", action="append", default=[], metavar="GLOB",
                   help="Exclude test paths matching the pattern")
    p.add_argument("--no-annex-b", action="store_true", default=False,
                   help="Exclude test/annexB tests")
    p.add_argument("--no-intl", action="store_true", default=False,
                   help="Exclude " + " and ".join(INTL402_SKIP_PATHS) + " tests")
    p.add_argument("--no-staging", action="store_true", default=False,
                   help="Exclude test/staging tests")
    p.add_argument("--json", action=argparse.BooleanOptionalAction, default=None, dest="report_json",
                   help="Enable JSON output (default: enabled if -o *.json)")
    p.add_argument("--report-tests", action=argparse.BooleanOptionalAction, default=None,
                   help="Report results grouped by test file, collapsing strict/sloppy when identical (default)")
    p.add_argument("--report-scenarios", action="store_true", default=False, dest="report_runs",
                   help="Report results per scenario (one entry per each strict/sloppy mode run)")
    p.add_argument("--report-rusage", metavar="MODE", type=parse_rusage_mode, default="top10",
                   help="Report tests resource usage in json: topN, all, or no (default: top10)")
    p.add_argument("--no-report-rusage", action="store_const", const="no", dest="report_rusage",
                   help=argparse.SUPPRESS)
    p.add_argument("--shuffle", action="store_true", default=False,
                   help="Randomize test execution order")
    p.add_argument("--no-probe", action="store_true", default=False,
                   help="Skip engine probing before test run")
    p.add_argument("--test262-dir", metavar="DIR", default=str(DEFAULT_TEST262_DIR),
                   help=f"Root of test262 repository (default: {DEFAULT_TEST262_DIR})")
    args = p.parse_args()
    filter_expr = parse_filter_expr(p, args.filter)

    wall_start = time.monotonic()

    engine = EngineConfig.load(args.engine, config_name=args.config)
    engine.resolve()

    test262_dir = Path(args.test262_dir).resolve()
    if not test262_dir.exists():
        sys.exit(f"test262 dir not found: {test262_dir}")
    if not (test262_dir / "harness").exists():
        sys.exit(f"harness dir not found: {test262_dir / 'harness'}")

    assembler = Assembler(engine, test262_dir, verbose=args.verbose, stage_dir=args.stage_dir)
    if args.preprocess:
        assembler.emit_preprocessed(args.tests, mode=args.mode, output=args.output)
        return

    reporter = Reporter(
        engine,
        output_file=args.output,
        verbose=args.verbose,
        test262=True,
        test262_dir=test262_dir,
        report_rusage=args.report_rusage,
        report_json=args.report_json,
        report_tests=args.report_tests,
        report_runs=args.report_runs,
    )

    # Probe engine and harness capabilities
    if not args.no_probe and args.output and reporter.is_json_output():
        for name, result in test262_probe.probe_engine(engine, test262_dir, jobs=args.jobs):
            reporter.add_probe_result(name, result)
        reporter.clear_progress()

    # Discover test paths (no file I/O)
    exclude_pats: list[re.Pattern[str]] = [re.compile(pat.replace("*", ".*")) for pat in args.exclude]
    if args.no_intl:
        exclude_pats.extend(re.compile(re.escape(s)) for s in INTL402_SKIP_PATHS)
    if args.no_staging:
        exclude_pats.extend(re.compile(re.escape(s)) for s in STAGING_SKIP_PATHS)
    if args.no_annex_b:
        exclude_pats.extend(re.compile(re.escape(s)) for s in ANNEX_B_SKIP_PATHS)

    test_root = test262_dir
    tests = iterate_js_files(
        args.tests or ["test"], root=test_root,
        exclude_re=[re.compile("_FIXTURE")] + exclude_pats,
    )
    if args.shuffle:
        tests = list(tests)
        random.shuffle(tests)
    if args.limit:
        tests = itertools.islice(tests, args.limit)

    if filter_expr is None and engine.test262_filter:
        filter_expr = parse_filter_expr(p, [engine.test262_filter])

    executor = Executor(
        engine, assembler,
        jobs=args.jobs,
        timeout_sec=args.timeout,
        mode=args.mode,
        filter_expr=filter_expr,
    )

    try:
        executor.run(tests, on_test_result=reporter.add_file, on_test_submit=reporter.note_test)
    except KeyboardInterrupt:
        reporter.clear_progress()
        print("\nInterrupted")
        sys.exit(130)

    reporter.clear_progress()

    if not reporter.results:
        print("No runnable tests")
        sys.exit(0)

    wall_sec = time.monotonic() - wall_start
    reporter.print_summary(wall_sec=wall_sec)

    if args.output:
        reporter.write(wall_sec=wall_sec)


if __name__ == "__main__":
    main()
