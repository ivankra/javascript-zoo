#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import concurrent.futures
import dataclasses
import itertools
import json
import os
import re
import shlex
import shutil
import sys
import tempfile
import time
from functools import lru_cache
from pathlib import Path
from typing import Any, Iterator

from lib import (
    Classifier,
    EngineConfig,
    ErrorType,
    FEATURES_BY_ECMASCRIPT_EDITION,
    _FEATURE_TO_EDITION_STR,
    Frontmatter,
    Reporter,
    RunResult,
    Runner,
    Verdict,
    expand_template_literals,
    iterate_js_files,
)

SCRIPT_DIR = Path(__file__).parent.resolve()
DEFAULT_TEST262_DIR = (SCRIPT_DIR.parent / "third_party" / "test262").resolve()
DEFAULT_TIMEOUT_SEC = 10.0
INTL402_SKIP_PATHS = ("test/intl402", "test/staging/Intl402")

_REL_SPECIFIER_RE = re.compile(
    r"""(?:"""
    r"""from\s*['"](\.[^'"]+)['"]"""          # import/export ... from '...'
    r"""|import\s+['"](\.[^'"]+)['"]"""       # import '...' (side-effect)
    r"""|import\s*\(\s*['"](\.[^'"]+)['"]"""  # dynamic import('...')
    r"""|importValue\s*\(\s*['"](\.[^'"]+)['"]"""  # ShadowRealm importValue
    r""")"""
)


def emit_preprocessed_test(
    tests: list[str],
    test262_dir: Path,
    assembler: Assembler,
    *,
    mode: str = "all",
    output: str | None = None,
) -> None:
    """Emit one assembled test to stdout or a file."""
    if len(tests) != 1:
        sys.exit("-E requires exactly one test path")

    emit_tests = list(itertools.islice(
        iterate_js_files(tests, root=test262_dir),
        2,
    ))
    if not emit_tests:
        sys.exit(f"no tests matched: {tests[0]}")
    if len(emit_tests) != 1:
        sys.exit(f"-E requires exactly one matched test, got multiple for: {tests[0]}")

    rel_path = emit_tests[0]
    test_path = test262_dir / rel_path
    source = test_path.read_text(encoding="utf-8", errors="replace")
    fm = Frontmatter.parse(source)
    scenarios = [s for s in fm.scenarios() if mode == "all" or mode == s]
    if not scenarios:
        sys.exit(f"no runnable scenario for mode {mode!r}: {rel_path}")
    scenario = scenarios[0]

    assembled = assembler.assemble(Case(
        test_path=test_path,
        rel_path=rel_path,
        source=source,
        fm=fm,
        scenario=scenario,
    ), tags=fm.tags())
    if output:
        Path(output).write_text(assembled, encoding="utf-8")
    else:
        sys.stdout.write(assembled)


@dataclasses.dataclass
class Case:
    """One test × scenario to execute (file already read)."""
    test_path: Path
    rel_path: str
    source: str
    fm: Frontmatter
    scenario: str  # sloppy, strict, module, raw

    @property
    def case_id(self) -> str:
        if self.scenario in ("strict", "sloppy") and "onlyStrict" not in self.fm.flags and "noStrict" not in self.fm.flags:
            return f"{self.rel_path}@{self.scenario}"
        else:
            return f"{self.rel_path}"


@dataclasses.dataclass
class StagedScript:
    """Result of Assembler.stage(): where to find the script and how to clean up."""
    script_path: Path
    cwd: Path
    # Directory to rmtree on cleanup, or None for single-file cleanup.
    tmp_dir: Path | None = None

    def cleanup(self) -> None:
        if self.tmp_dir is not None:
            shutil.rmtree(self.tmp_dir, ignore_errors=True)
        else:
            try:
                os.unlink(self.script_path)
            except OSError:
                pass


class Assembler:
    """Prepares runnable test262 scripts and module trees.

    Takes care of adding harness and prelude code.

    For module/dynamic-import tests: creates an isolated
    temp dir mirroring the test262 layout for module resolution.
    """

    def __init__(self, engine: EngineConfig, test262_dir: Path, *, verbose: bool = False) -> None:
        self.test262_dir = test262_dir
        self.harness_dir = test262_dir / "harness"
        self.preludes = engine.prelude

    def assemble(self, case: Case, *, tags: set[str] = set()) -> str:
        """Compose the runnable script for one scenario.

        *tags* gates conditional preludes ({"tag": ...} entries).
        """

        # "raw" tests may not be modified
        if case.scenario == "raw":
            return case.source

        pieces: list[str] = []

        # Order is dictated test262's INTERPRETING.md

        # 1. "use strict"; (if strict scenario; must be file-initial)
        if case.scenario == "strict":
            pieces.append('"use strict";\n')
        elif case.scenario == "sloppy":
            # Add it commented-out to avoid line number drift between cases
            pieces.append('//"use strict";\n')

        # 2. Engine prelude(s)
        for p in self.preludes:
            if (p.tag is None or p.tag in tags) and p.code:
                pieces.append(p.code)

        # 3. harness/assert.js + harness/sta.js
        # 4. harness/doneprintHandle.js (if async)
        # 5. Metadata includes in the order listed
        harness = ["assert.js", "sta.js"]
        if "async" in case.fm.flags:
            harness.append("doneprintHandle.js")
        harness.extend(name for name in case.fm.includes if name not in harness)
        pieces.extend(self._read_harness(name) for name in harness)

        # 6. Test source body
        pieces.append(case.source)

        # 7. Marker to indicate that control flow reached end of the test script
        if not case.fm.negative_type:
            # Separate "FINISHED" to prevent a false positive
            # in case an engine just dumps the source
            pieces.append(f'print("{case.case_id}: FIN" + "ISHED");\n')

        return "\n".join(pieces)

    def stage(self, case: Case, *, temp_dir: Path, save_compiled: Path | None = None, tags: set[str] = set()) -> StagedScript:
        """Assemble and write script to disk, staging module trees if needed."""
        assembled = self.assemble(case, tags=tags)

        if save_compiled is not None:
            dst = save_compiled / f"{case.rel_path}.{case.scenario}.js"
            dst.parent.mkdir(parents=True, exist_ok=True)
            dst.write_text(assembled, encoding="utf-8")

        needs_module_tree = (
            case.scenario == "module"
            or "dynamic-import" in case.fm.features
        )

        if not needs_module_tree:
            # Simple case: single file in shared temp dir.
            script_path = temp_dir / f"t262-temp-{os.getpid()}-{id(assembled)}.js"
            script_path.write_bytes(assembled.encode("utf-8"))
            return StagedScript(script_path=script_path, cwd=Path(os.getcwd()))

        tmp_root = Path(tempfile.mkdtemp(prefix="t262-mod-"))
        entry_dst = tmp_root / case.rel_path
        entry_dst.parent.mkdir(parents=True, exist_ok=True)
        entry_dst.write_text(assembled, encoding="utf-8")

        visited: set[str] = {case.rel_path}
        self._copy_deps_recursive(
            tmp_root, case.test_path.parent, case.source, visited,
        )
        self._copy_fixture_siblings(tmp_root, case.test_path.parent, visited)

        pkg = tmp_root / "package.json"
        if not pkg.exists():
            pkg.write_text('{"type": "module"}\n', encoding="utf-8")

        return StagedScript(script_path=entry_dst, cwd=tmp_root, tmp_dir=tmp_root)

    @lru_cache(maxsize=100)
    def _read_harness(self, name: str) -> str:
        p = self.harness_dir / name
        source = p.read_text(encoding="utf-8", errors="replace")
        # Expand template literals in harness code for ES5 engines
        if "`" in source:
            source = expand_template_literals(source)
        return source

    def _copy_deps_recursive(
        self,
        dst_root: Path,
        base_dir: Path,
        source: str,
        visited: set[str],
    ) -> None:
        test_dir = self.test262_dir
        for spec in self._extract_relative_deps(source):
            dep_path = (base_dir / spec).resolve()
            try:
                dep_rel = str(dep_path.relative_to(test_dir))
            except ValueError:
                continue
            if dep_rel in visited:
                continue
            visited.add(dep_rel)
            if not dep_path.exists():
                continue

            dst = dst_root / dep_rel
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(dep_path, dst)

            try:
                dep_src = dep_path.read_text(encoding="utf-8", errors="replace")
                self._copy_deps_recursive(dst_root, dep_path.parent, dep_src, visited)
            except Exception as e:
                print(f"warning: skipping deps of {dep_path}: {e}", file=sys.stderr)

    def _extract_relative_deps(self, source: str) -> list[str]:
        """Extract relative module specifiers from JS source."""
        seen: set[str] = set()
        deps: list[str] = []
        for m in _REL_SPECIFIER_RE.finditer(source):
            spec = m.group(1) or m.group(2) or m.group(3) or m.group(4)
            if spec and spec not in seen:
                seen.add(spec)
                deps.append(spec)
        return deps

    def _copy_fixture_siblings(self, dst_root: Path, base_dir: Path, visited: set[str]) -> None:
        """Copy sibling fixture files for computed import specifiers."""
        test_dir = self.test262_dir
        for dep_path in base_dir.iterdir():
            if not dep_path.is_file() or "_FIXTURE" not in dep_path.name:
                continue
            try:
                dep_rel = str(dep_path.resolve().relative_to(test_dir))
            except ValueError:
                continue
            if dep_rel in visited:
                continue
            visited.add(dep_rel)
            dst = dst_root / dep_rel
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(dep_path, dst)


class Executor:
    """Executes and classifies test262 cases via a process pool."""

    def __init__(
        self,
        engine: EngineConfig,
        assembler: Assembler,
        *,
        jobs: int = 4,
        timeout_sec: float = DEFAULT_TIMEOUT_SEC,
        save_compiled: Path | None = None,
        mode: str = "all",
        include_features: set[str] | None = None,
        skip_features: set[str] | None = None,
    ) -> None:
        self.engine = engine
        self.test262_dir = assembler.test262_dir
        self.assembler = assembler
        self.runner = Runner(engine)
        self.classifier = Classifier(engine)
        self.timeout_sec = timeout_sec
        self.save_compiled = save_compiled
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
        """Read file, parse frontmatter, expand scenarios, execute each.

        Returns a single SKIPPED RunResult if filtered by features,
        [] if it had no applicable scenarios for the current mode.
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
                features=frozenset(fm.features),
            )]
        if self.skip_features:
            blocked = tags & self.skip_features
            if blocked:
                return [RunResult(
                    run_id=rel_path, test_path=str(test_path),
                    verdict=Verdict.SKIPPED, error_message=f"skip features: {', '.join(sorted(blocked))}",
                    features=frozenset(fm.features),
                )]

        return [
            self._execute_one(Case(
                test_path=test_path, rel_path=rel_path, source=source,
                fm=fm, scenario=scenario,
            ))
            for scenario in fm.scenarios() if self.mode == "all" or self.mode == scenario
        ]

    def _execute_one(self, case: Case) -> RunResult:
        """Execute engine on an assembled test, classify result."""
        is_module = case.scenario == "module"
        is_negative = bool(case.fm.negative_type)
        is_async = "async" in case.fm.flags
        expect_finished = not is_negative and case.scenario != "raw"

        tags = case.fm.tags()
        staged = self.assembler.stage(case, temp_dir=self._shared_tmp, save_compiled=self.save_compiled, tags=tags)
        try:
            run = self.runner.run_command(
                self.engine.argv(
                    staged.script_path,
                    tags=tags,
                ),
                run_id=case.case_id,
                test_path=str(case.test_path),
                script_path=str(staged.script_path),
                timeout_sec=self.timeout_sec,
                cwd=str(staged.cwd),
            )

            if is_negative:
                self.classifier.classify(run, expect_async=is_async)
                self._check_negative(case.fm, run)
            else:
                ok_pattern = (
                    rf"{re.escape(case.case_id)}: FINISHED" if expect_finished else None
                )
                self.classifier.classify(
                    run,
                    expect_async=is_async,
                    ok_pattern=ok_pattern,
                )

            run.features = frozenset(case.fm.features)
            run.scenario = case.scenario
            return run
        finally:
            staged.cleanup()

    def _check_negative(self, fm: Frontmatter, run: RunResult) -> None:
        """Post-classify check for negative tests. Mutates run in place."""
        if run.error_type in (ErrorType.TIMEOUT, ErrorType.CRASHED, ErrorType.OOM):
            return  # leave classify()'s verdict intact

        if fm.negative_phase in ("parse", "resolution"):
            if run.error_type is None:
                run.verdict = Verdict.FAILED
                run.error_type = ErrorType.NEGATIVE
                run.error_message = "negative test did not fail"
                return

        if run.error_type is not None:
            expected = ErrorType.from_js_error(fm.negative_type) if fm.negative_type else None
            assert expected is not None
            if run.error_type != expected and run.error_type != ErrorType.EXIT:
                orig_err = run.verdict_message()
                run.error_message = f"expected {fm.negative_type} (got: {orig_err})"
                run.verdict = Verdict.FAILED
                run.error_type = ErrorType.NEGATIVE
                return
        else:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.NEGATIVE
            run.error_message = "expected error not thrown"
            return

        run.verdict = Verdict.OK
        run.error_type = None
        run.error_message = None


def main() -> None:
    p = argparse.ArgumentParser(
        description="Run test262 conformance suite against a JavaScript engine.",
        usage="%(prog)s [opts] engine [test globs]",
    )
    p.add_argument("engine", help="Engine binary path or name")
    p.add_argument("tests", nargs="*", help="Test paths/dirs/globs relative to test262/test")
    p.add_argument("--config", help="Force a specific config entry from config.yml")
    p.add_argument("-j", "--jobs", type=int, default=os.cpu_count(), metavar="N",
                   help=f"Run N jobs in parallel (default: {os.cpu_count()})")
    p.add_argument("-o", "--output", metavar="FILE",
                   help="Output file (for test results or -E)")
    p.add_argument("-t", "--timeout", type=float, default=DEFAULT_TIMEOUT_SEC, metavar="SEC",
                   help="Timeout for each test in seconds")
    p.add_argument("-f", "--features", action="append", default=[], metavar="LIST",
                   help="Only run tests requiring these features (comma-separated)")
    p.add_argument("-m", "--mode", choices=["all", "strict", "sloppy", "raw", "module"], default="all",
                   help="Run only tests with this mode")
    p.add_argument("-v", "--verbose", action="count", default=0, help="Increase verbosity")
    p.add_argument("--exclude", action="append", default=[], metavar="GLOB",
                   help="Exclude test paths matching the pattern")
    p.add_argument("--no-intl", action="store_false", dest="intl", default=True,
                   help="Exclude Intl402 tests (i.e. --exclude={" + ",".join(INTL402_SKIP_PATHS) + "})")
    p.add_argument("--intl", action="store_true", dest="intl", help=argparse.SUPPRESS)
    p.add_argument("--limit", type=int, default=0, help="Run at most N test files")
    p.add_argument("--skip-features", action="append", default=[], metavar="LIST",
                   help="Skip tests requiring these features (comma-separated)")
    p.add_argument("--output-format", choices=["auto", "simple", "json"], default="auto",
                   help="Output format (default: auto, detect from extension)")
    p.add_argument("-E", action="store_true", dest="emit",
                   help="Emit a single preprocessed test to stdout or -o FILE")
    p.add_argument("--save-compiled", metavar="DIR",
                   help="Save assembled test scripts to directory")
    p.add_argument("--test262-dir", metavar="DIR", default=str(DEFAULT_TEST262_DIR),
                   help=f"Root of test262 repo (default: {DEFAULT_TEST262_DIR})")
    args = p.parse_args()

    engine = EngineConfig.load(args.engine, config_name=args.config)
    engine.resolve()
    if args.verbose:
        argv_display = engine.argv("<file>", tags={"test262"})
        print(f"Command: {shlex.join(argv_display[:-1])} <file>", file=sys.stderr)
    test262_dir = Path(args.test262_dir).resolve()
    if not test262_dir.exists():
        sys.exit(f"test262 dir not found: {test262_dir}")
    if not (test262_dir / "harness").exists():
        sys.exit(f"harness dir not found: {test262_dir / 'harness'}")
    assembler = Assembler(engine, test262_dir, verbose=args.verbose)

    save_compiled = Path(args.save_compiled) if args.save_compiled else None
    if save_compiled:
        save_compiled.mkdir(parents=True, exist_ok=True)

    if args.emit:
        emit_preprocessed_test(
            args.tests,
            test262_dir,
            assembler,
            mode=args.mode,
            output=args.output,
        )
        return

    # Stage 1: discover test paths (no file I/O)
    exclude_pats: list[re.Pattern[str]] = [re.compile(pat.replace("*", ".*")) for pat in args.exclude]
    if not args.intl:
        exclude_pats.extend(re.compile(re.escape(s)) for s in INTL402_SKIP_PATHS)

    test_root = test262_dir
    tests = iterate_js_files(
        args.tests or ["test"], root=test_root,
        exclude_re=[re.compile("_FIXTURE")] + exclude_pats,
    )
    if args.limit:
        tests = itertools.islice(tests, args.limit)

    # Stage 2: read, parse, assemble, execute, classify (all in process pool)
    include_features = {f for item in args.features for f in item.split(",") if f} or None
    if args.skip_features:
        skip_features = {f for item in args.skip_features for f in item.split(",") if f} or None
    else:
        skip_features = set(engine.test262_skip_features) or None

    reporter = Reporter(
        engine,
        verbose=args.verbose,
        test262=True,
        editions_order=list(FEATURES_BY_ECMASCRIPT_EDITION.keys()),
        features_by_edition=FEATURES_BY_ECMASCRIPT_EDITION,
        feature_to_edition=_FEATURE_TO_EDITION_STR,
    )

    executor = Executor(
        engine, assembler,
        jobs=args.jobs,
        timeout_sec=args.timeout,
        save_compiled=save_compiled,
        mode=args.mode,
        include_features=include_features,
        skip_features=skip_features,
    )

    wall_start = time.monotonic()
    try:
        executor.run(tests, on_test_result=reporter.add_file)
    except KeyboardInterrupt:
        reporter.clear_progress()
        print("\nInterrupted")
        sys.exit(130)

    reporter.clear_progress()

    if not reporter.results:
        print("No runnable scenarios")
        sys.exit(0)

    wall_sec = time.monotonic() - wall_start
    fail_count = reporter.print_summary(wall_sec=wall_sec)

    if args.output:
        reporter.write(args.output, output_format=args.output_format)


if __name__ == "__main__":
    main()
