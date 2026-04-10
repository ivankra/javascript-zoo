#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import itertools
import os
import re
import shlex
import shutil
import sys
import tempfile
from pathlib import Path
from typing import Any, Callable, Iterable, cast

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from harness import (
    Assembler,
    Annotator,
    EngineConfig,
    FileDiscovery,
    FilterExpr,
    Frontmatter,
    PoolExecutor,
    PoolWorker,
    Reporter,
    RunResult,
    Runner,
    Scenario,
    Tags,
    Verdict,
)
from harness.util import HelpFormatter

from harness import probe as test262_probe

DEFAULT_TEST262_DIR = (REPO_ROOT / "third_party" / "test262").resolve()
INTL402_SKIP_PATHS = ["test/intl402", "test/staging/Intl402"]
STAGING_SKIP_PATHS = ["test/staging"]
ANNEX_B_SKIP_PATHS = ["test/annexB"]


class Test262Worker(PoolWorker):
    def __init__(
        self,
        engine: EngineConfig,
        assembler: Assembler,
        mode: str,
        filter_expr: FilterExpr | None,
        shared_tmp: Path,
        on_spawn: Callable[[int], None],
    ) -> None:
        super().__init__(on_spawn)
        self.engine = engine
        self.assembler = assembler
        self.runner = Runner(engine, on_spawn=on_spawn)
        self.annotator = Annotator(engine)
        self.mode = mode
        self.filter_expr = filter_expr
        self.shared_tmp = shared_tmp

    def run(self, task: Any) -> list[RunResult]:
        rel_path = cast(str, task)
        test_path = self.assembler.test262_dir / rel_path
        source = test_path.read_bytes().decode("utf-8", errors="replace")
        fm = Frontmatter.parse(source)

        tags = Tags.test262(fm, rel_path=rel_path)

        if self.filter_expr and not self.filter_expr(tags):
            return [RunResult(
                run_id=rel_path, test_id=rel_path, test_path=str(test_path),
                verdict_type=Verdict.SKIP, verdict_detail="filtered out",
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
        is_negative = bool(scenario.fm.negative_type)
        is_async = "async" in scenario.fm.flags
        pass_pattern: str | None = Assembler.SCRIPT_EXECUTION_FINISHED_MARKER
        if is_negative or "raw" in scenario.fm.flags:
            pass_pattern = None

        staged = self.assembler.stage(scenario, temp_dir=self.shared_tmp)
        if scenario.tags is None:
            scenario.tags = Tags()
        for ref in staged.references:
            scenario.tags.add("ref", ref)

        max_attempts = 1
        if scenario.rel_path in self.engine.flaky_tests:
            max_attempts = self.engine.flaky_attempts

        try:
            for _attempt in range(max_attempts):
                run = self.runner.run_command(
                    self.engine.argv(staged.script_path, tags=scenario.tags),
                    run_id=scenario.run_id(),
                    test_id=scenario.rel_path,
                    test_path=str(scenario.test_path),
                    script_path=str(staged.script_path),
                    cwd=str(staged.cwd),
                )

                self.annotator.classify(
                    run,
                    expect_async=is_async,
                    pass_pattern=pass_pattern,
                    negative_phase=scenario.fm.negative_phase if is_negative else None,
                    negative_type=scenario.fm.negative_type if is_negative else None,
                )

                if run.is_passed():
                    break

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
    p.add_argument("-i", "--input", metavar="FILE",
                   help="Read test globs from FILE (one per line, blank lines and #-comments ignored)")
    p.add_argument("-j", "--jobs", type=int, default=None, metavar="N",
                   help=f"Run N jobs in parallel (default: {os.cpu_count()})")
    p.add_argument("-l", "--limit", type=int, default=0, metavar="N",
                   help="Stop after running N tests")
    p.add_argument("-m", "--mode", choices=["all", "strict", "sloppy"], metavar="MODE", default="all",
                   help="Run only strict (-m strict) or sloppy (-m sloppy) mode scenarios (default: all)")
    p.add_argument("-o", "--output", metavar="FILE",
                   help="Output file (for test results or -E)")
    p.add_argument("--output-rusage", metavar="FILE",
                   help="Write the rusage JSON payload to FILE and store its path in the main report")
    p.add_argument("--output-tags", metavar="FILE",
                   help="Write per-test tags map to FILE")
    p.add_argument("-t", "--timeout", type=float,  metavar="SEC",
                   help=f"Per-scenario timeout in seconds")
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
    p.add_argument("--report-rusage", metavar="MODE", default="top10",
                   help="Report tests resource usage in json: top<N>, all, or no (default: top10)")
    p.add_argument("--no-report-rusage", action="store_const", const="no", dest="report_rusage",
                   help=argparse.SUPPRESS)
    p.add_argument("--report-dirs", action="store_true",
                   help="Include per-directory stats in JSON output")
    p.add_argument("--progress", type=int, default=0, metavar="N",
                   help="Print progress every N tests (default: 1 if TTY else never)")
    p.add_argument("--shuffle", action="store_true", default=False,
                   help="Randomize test execution order")
    p.add_argument("--no-probe", action="store_true", default=False,
                   help="Skip engine probing before test run")
    p.add_argument("--test262-dir", metavar="DIR", default=str(DEFAULT_TEST262_DIR),
                   help=f"Root of test262 repository (default: {DEFAULT_TEST262_DIR})")
    args = p.parse_args()
    filter_expr = parse_filter_expr(p, args.filter)

    if args.input:
        with open(args.input) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    args.tests.append(line)

    cfg = EngineConfig.load(args.engine, config_name=args.config)
    cfg.resolve()
    if args.timeout is not None:
        cfg.timeout_sec = args.timeout

    test262_dir = Path(args.test262_dir).resolve()
    if not test262_dir.exists():
        sys.exit(f"test262 dir not found: {test262_dir}")
    if not (test262_dir / "harness").exists():
        sys.exit(f"harness dir not found: {test262_dir / 'harness'}")

    assembler = Assembler(cfg, test262_dir, verbose=args.verbose, stage_dir=args.stage_dir)
    if args.preprocess:
        assembler.emit_preprocessed(args.tests, mode=args.mode, output=args.output)
        return

    # Start file discovery in background thread (while probes run)
    exclude_pats: list[re.Pattern[str]] = [re.compile(pat.replace("*", ".*")) for pat in args.exclude]
    if args.no_intl:
        exclude_pats.extend(re.compile(re.escape(s)) for s in INTL402_SKIP_PATHS)
    if args.no_staging:
        exclude_pats.extend(re.compile(re.escape(s)) for s in STAGING_SKIP_PATHS)
    if args.no_annex_b:
        exclude_pats.extend(re.compile(re.escape(s)) for s in ANNEX_B_SKIP_PATHS)

    discovery = FileDiscovery(
        args.tests or ["test"], root=test262_dir,
        exclude_re=[re.compile("_FIXTURE")] + exclude_pats,
        shuffle=args.shuffle,
        background=True,
    )
    items = ((rel_path, rel_path) for rel_path in itertools.islice(discovery, args.limit or None))

    reporter = Reporter(
        cfg,
        discovery=discovery,
        output_file=args.output,
        output_rusage_file=args.output_rusage,
        output_tags_file=args.output_tags,
        verbose=args.verbose,
        test262=True,
        test262_dir=test262_dir,
        report_rusage=args.report_rusage,
        report_json=args.report_json,
        report_tests=args.report_tests,
        report_runs=args.report_runs,
        report_dirs=args.report_dirs,
        progress_every=args.progress,
    )

    # Probe engine and harness capabilities (discovery runs in parallel)
    if not args.no_probe and args.output and reporter.is_json_output():
        for name, result in test262_probe.probe_engine(cfg, test262_dir, jobs=args.jobs):
            reporter.add_probe_result(name, result)
            if name == "assert.throws" and result != "PASS":
                assembler.fix_assert_throws = True
                reporter.clear_progress()
                print("fix_assert_throws = True", flush=True);
        reporter.clear_progress()

    if filter_expr is None and cfg.test262_filter:
        filter_expr = parse_filter_expr(p, [cfg.test262_filter])

    shared_tmp = Path(tempfile.mkdtemp(prefix="t262-"))

    pool = PoolExecutor(
        max_workers=cfg.job_count(flag=args.jobs),
        worker_cls=Test262Worker,
        worker_args=(cfg, assembler, args.mode, filter_expr, shared_tmp),
    )

    try:
        for file_results in pool.imap(items, on_started=reporter.test_started):
            reporter.test_completed(file_results)
    except KeyboardInterrupt:
        sys.exit("\nAborted")
    finally:
        pool.stop()
        shutil.rmtree(shared_tmp, ignore_errors=True)

    reporter.clear_progress()

    if not reporter.results:
        print("No runnable tests")
        sys.exit(0)

    reporter.print_summary()

    if args.output:
        reporter.write()
    if args.output_tags:
        reporter.write_tags()


if __name__ == "__main__":
    main()
