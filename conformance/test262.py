#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import concurrent.futures
import itertools
import os
import re
import shlex
import shutil
import sys
import tempfile
import time
from pathlib import Path
from typing import Any, Iterator

from lib import (
    Assembler,
    Annotator,
    EngineConfig,
    Frontmatter,
    Reporter,
    RunResult,
    Runner,
    Scenario,
    Verdict,
    iterate_js_files,
)
from lib.probe import PROBES, probe_engine

SCRIPT_DIR = Path(__file__).parent.resolve()
DEFAULT_TEST262_DIR = (SCRIPT_DIR.parent / "third_party" / "test262").resolve()
DEFAULT_TIMEOUT_SEC = 10.0
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
        include_features: set[str] | None = None,
        skip_features: set[str] | None = None,
    ) -> None:
        self.engine = engine
        self.test262_dir = assembler.test262_dir
        self.assembler = assembler
        self.runner = Runner(engine)
        self.annotator = Annotator(engine)
        self.timeout_sec = timeout_sec
        self.mode = mode
        self.include_features = include_features
        self.skip_features = skip_features
        self._jobs = max(1, jobs)
        self._shared_tmp = Path(tempfile.mkdtemp(prefix="t262-"))

    def run(self, tests: Iterator[str], *, on_test_result: Any = None) -> None:
        """Submit test files to worker pool, delivering results via callback.

        Callback signature: on_test_result(results: list[RunResult]).
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
        source = test_path.read_text(encoding="utf-8", errors="replace")
        fm = Frontmatter.parse(source)
        tags = fm.tags()

        if self.include_features and not (tags & self.include_features):
            missing = self.include_features - tags
            return [RunResult(
                run_id=rel_path, test_path=str(test_path),
                verdict=Verdict.SKIPPED, error_message=f"missing features: {', '.join(sorted(missing))}",
                tags=tags,
            )]
        if self.skip_features:
            blocked = tags & self.skip_features
            if blocked:
                return [RunResult(
                    run_id=rel_path, test_path=str(test_path),
                    verdict=Verdict.SKIPPED, error_message=f"skip features: {', '.join(sorted(blocked))}",
                    tags=tags,
                )]

        return [
            self._execute_one(Scenario(
                test_path=test_path, test_content=source, rel_path=rel_path,
                fm=fm, mode=mode, tags=fm.tags(mode),
            ))
            for mode in fm.modes() if self.mode == "all" or self.mode == mode
        ]

    def _execute_one(self, scenario: Scenario) -> RunResult:
        """Execute engine on an assembled scenario, classify result."""
        is_module = "module" in scenario.fm.flags
        is_negative = bool(scenario.fm.negative_type)
        is_async = "async" in scenario.fm.flags
        ok_pattern: str | None = Assembler.SCRIPT_EXECUTION_FINISHED_MARKER
        if is_negative or "raw" in scenario.fm.flags:
            ok_pattern = None

        staged = self.assembler.stage(scenario, temp_dir=self._shared_tmp)

        try:
            run = self.runner.run_command(
                self.engine.argv(staged.script_path, tags=scenario.tags),
                run_id=scenario.display_id(),
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

def main() -> None:
    p = argparse.ArgumentParser(
        description="Run test262 conformance suite against a JavaScript engine.",
        usage="%(prog)s [opts] engine [tests]",
    )
    p.add_argument("engine", help="Engine binary path or a shell command (e.g. /dist/v8, node, 'node --js-staging')")
    p.add_argument("tests", nargs="*",
                  help=("Test files/dirs globs relative to test262 root. "
                        "Glob matching a directory selects all *.js files recursively. "
                        "May use ** globs, e.g. test/**/Temporal to match all Temporal subdirs."))
    p.add_argument("-f", "--features", action="append", default=[], metavar="LIST",
                   help=("Only run tests which have one of these features/tags (comma-separated). "
                         "You can filter for frontmatter features/flags/fields and esNNNN tags "
                         "(highest ES edition of any feature)"))
    p.add_argument("--skip-features", action="append", default=[], metavar="LIST",
                   help="Skip tests which have any of these features/tags (comma-separated)")
    p.add_argument("-j", "--jobs", type=int, default=os.cpu_count(), metavar="N",
                   help=f"Run N jobs in parallel (default: {os.cpu_count()})")
    p.add_argument("-m", "--mode", choices=["all", "strict", "sloppy"], metavar="MODE", default="all",
                   help="Run only strict (-m strict) or sloppy (-m sloppy) mode scenarios (default: all)")
    p.add_argument("-o", "--output", metavar="FILE",
                   help="Output file (for test results or -E)")
    p.add_argument("--output-format", choices=["auto", "simple", "json"], default="auto", metavar="FMT",
                   help="Output format: 'simple' (one line per test), 'json', 'auto' (detect from extension, default)")
    p.add_argument("-t", "--timeout", type=float, default=DEFAULT_TIMEOUT_SEC, metavar="SEC",
                   help=f"Timeout for each test in seconds (default: {DEFAULT_TIMEOUT_SEC})")
    p.add_argument("-v", "--verbose", action="count", default=0, help="Increase verbosity")
    p.add_argument("--config", help="Force a specific config entry from configs.yml (normally inferred from binary basename)")
    p.add_argument("--exclude", action="append", default=[], metavar="GLOB",
                   help="Exclude test paths matching the pattern")
    p.add_argument("--no-annex-b", action="store_true", default=False,
                   help="Exclude test/annexB tests")
    p.add_argument("--no-intl", action="store_true", default=False,
                   help="Exclude " + " and ".join(INTL402_SKIP_PATHS) + " tests")
    p.add_argument("--no-staging", action="store_true", default=False,
                   help="Exclude test/staging tests")
    p.add_argument("--limit", type=int, default=0, metavar="N",
                   help="Stop after running N tests")
    p.add_argument("--no-probe", action="store_true", default=False,
                   help="Skip engine probing before test run")
    p.add_argument("-E", action="store_true", dest="emit",
                   help="Preprocess a single test and write it to stdout or -o FILE")
    p.add_argument("--save-compiled", metavar="DIR",
                   help="Save assembled test scripts to this directory")
    p.add_argument("--test262-dir", metavar="DIR", default=str(DEFAULT_TEST262_DIR),
                   help=f"Root of test262 repository (default: {DEFAULT_TEST262_DIR})")
    args = p.parse_args()

    if args.output_format == "auto":
        args.output_format = "json" if (args.output and args.output.endswith(".json")) else "simple"

    wall_start = time.monotonic()

    engine = EngineConfig.load(args.engine, config_name=args.config)
    engine.resolve()

    if args.verbose:
        argv_display = engine.argv("<file>", tags=frozenset({"test262"}))
        print(f"Command: {shlex.join(argv_display[:-1])} <file>", file=sys.stderr)

    test262_dir = Path(args.test262_dir).resolve()
    if not test262_dir.exists():
        sys.exit(f"test262 dir not found: {test262_dir}")
    if not (test262_dir / "harness").exists():
        sys.exit(f"harness dir not found: {test262_dir / 'harness'}")

    assembler = Assembler(engine, test262_dir, verbose=args.verbose, save_compiled=args.save_compiled)
    if args.emit:
        assembler.emit_preprocessed(args.tests, mode=args.mode, output=args.output)
        return

    reporter = Reporter(engine, verbose=args.verbose, test262=True, test262_dir=test262_dir)

    # Probe engine and harness capabilities
    if not args.no_probe and args.output and args.output_format == "json":
        for name, result in probe_engine(engine, test262_dir, jobs=args.jobs):
            reporter.add_probe_result(name, result, total=len(PROBES))
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
    if args.limit:
        tests = itertools.islice(tests, args.limit)

    include_features = {f for item in args.features for f in item.split(",") if f} or None
    if args.skip_features:
        skip_features = {f for item in args.skip_features for f in item.split(",") if f} or None
    else:
        skip_features = set(engine.test262_skip_features) or None

    executor = Executor(
        engine, assembler,
        jobs=args.jobs,
        timeout_sec=args.timeout,
        mode=args.mode,
        include_features=include_features,
        skip_features=skip_features,
    )

    try:
        executor.run(tests, on_test_result=reporter.add_file)
    except KeyboardInterrupt:
        reporter.clear_progress()
        print("\nInterrupted")
        sys.exit(130)

    reporter.clear_progress()

    if not reporter.results:
        print("No runnable tests")
        sys.exit(0)

    wall_sec = time.monotonic() - wall_start
    fail_count = reporter.print_summary(wall_sec=wall_sec)

    if args.output:
        reporter.write(args.output, output_format=args.output_format, wall_sec=wall_sec)


if __name__ == "__main__":
    main()
