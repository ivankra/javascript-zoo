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
INTL402_SKIP_PATHS = ["test/intl402", "test/staging/Intl402"]
STAGING_SKIP_PATHS = ["test/staging"]
ANNEX_B_SKIP_PATHS = ["test/annexB"]

_REL_SPECIFIER_RE = re.compile(
    r"""(?:"""
    r"""from\s*['"](\.[^'"]+)['"]"""          # import/export ... from '...'
    r"""|import\s+['"](\.[^'"]+)['"]"""       # import '...' (side-effect)
    r"""|import\s*\(\s*['"](\.[^'"]+)['"]"""  # dynamic import('...')
    r"""|importValue\s*\(\s*['"](\.[^'"]+)['"]"""  # ShadowRealm importValue
    r""")"""
)


@dataclasses.dataclass
class Scenario:
    """One test × mode combination to execute (file already read)."""
    test_path: Path          # absolute path to the test file
    test_content: str        # original test source code
    rel_path: str            # path relative to test262 root
    fm: Frontmatter          # parsed YAML frontmatter
    mode: str                # "strict" or "sloppy"
    tags: frozenset[str] = frozenset()  # precomputed fm.tags()

    def display_id(self) -> str:
        if len(self.fm.modes()) > 1:
            return f"{self.rel_path}@{self.mode}"
        return self.rel_path


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

    def __init__(self, engine: EngineConfig, test262_dir: Path, *, verbose: bool = False, save_compiled: str | None = None) -> None:
        self.test262_dir = test262_dir
        self.harness_dir = test262_dir / "harness"
        self.preludes = engine.prelude
        self.save_compiled = Path(save_compiled) if save_compiled else None
        if self.save_compiled:
            self.save_compiled.mkdir(parents=True, exist_ok=True)

    def assemble(self, scenario: Scenario) -> str:
        """Compose the runnable script for one scenario."""

        # "raw" tests may not be modified
        if "raw" in scenario.fm.flags:
            return scenario.test_content

        pieces: list[str] = []

        # Order is dictated test262's INTERPRETING.md

        # 1. "use strict"; (if strict mode)
        if scenario.mode == "strict":
            pieces.append('"use strict";\n')
        elif scenario.mode == "sloppy":
            # Add it commented-out to avoid line number drift between modes
            pieces.append('//"use strict";\n')

        # 2. Engine prelude(s)
        for p in self.preludes:
            if (p.tag is None or p.tag in scenario.tags) and p.code:
                pieces.append(p.code)

        # 3. harness/assert.js + harness/sta.js
        # 4. harness/doneprintHandle.js (if async)
        # 5. Metadata includes in the order listed
        harness = ["assert.js", "sta.js"]
        if "async" in scenario.fm.flags:
            harness.append("doneprintHandle.js")
        harness.extend(name for name in scenario.fm.includes if name not in harness)
        pieces.extend(self._read_harness(name) for name in harness)

        # 6. Test source body
        pieces.append(scenario.test_content)

        # 7. Marker to indicate that control flow reached end of the test script
        if not scenario.fm.negative_type:
            # Separate marker with + against false positives when engine just dumps the source
            pieces.append(f'\nprint("ScriptExec"+"utionFinished");\n')

        return "\n".join(pieces)

    SCRIPT_EXECUTION_FINISHED_MARKER = "ScriptExecutionFinished"

    def stage(self, scenario: Scenario, *, temp_dir: Path) -> StagedScript:
        """Assemble and write script to disk, staging module trees if needed."""
        assembled = self.assemble(scenario)

        if self.save_compiled is not None:
            dst = self.save_compiled / f"{scenario.rel_path}.{scenario.mode}.js"
            dst.parent.mkdir(parents=True, exist_ok=True)
            dst.write_text(assembled, encoding="utf-8")

        needs_module_tree = (
            "module" in scenario.fm.flags
            or "dynamic-import" in scenario.fm.features
        )

        if not needs_module_tree:
            script_path = temp_dir / f"t262-temp-{os.getpid()}-{id(assembled)}.js"
            script_path.write_bytes(assembled.encode("utf-8"))
            return StagedScript(script_path=script_path, cwd=Path(os.getcwd()))

        tmp_root = Path(tempfile.mkdtemp(prefix="t262-mod-"))
        entry_dst = tmp_root / scenario.rel_path
        entry_dst.parent.mkdir(parents=True, exist_ok=True)
        entry_dst.write_text(assembled, encoding="utf-8")

        visited: set[str] = {scenario.rel_path}
        self._copy_deps_recursive(
            tmp_root, scenario.test_path.parent, scenario.test_content, visited,
        )
        self._copy_fixture_siblings(tmp_root, scenario.test_path.parent, visited)

        pkg = tmp_root / "package.json"
        if not pkg.exists():
            pkg.write_text('{"type": "module"}\n', encoding="utf-8")

        return StagedScript(script_path=entry_dst, cwd=tmp_root, tmp_dir=tmp_root)

    def emit_preprocessed(self, tests: list[str], *, mode: str = "all", output: str | None = None) -> None:
        """Emit one assembled test to stdout or a file."""
        if len(tests) != 1:
            sys.exit("-E requires exactly one test path")

        emit_tests = list(itertools.islice(
            iterate_js_files(tests, root=self.test262_dir),
            2,
        ))
        if not emit_tests:
            sys.exit(f"no tests matched: {tests[0]}")
        if len(emit_tests) != 1:
            sys.exit(f"-E requires exactly one matched test, got multiple for: {tests[0]}")

        rel_path = emit_tests[0]
        test_path = self.test262_dir / rel_path
        source = test_path.read_text(encoding="utf-8", errors="replace")
        fm = Frontmatter.parse(source)
        modes = [m for m in fm.modes() if mode == "all" or mode == m]
        if not modes:
            sys.exit(f"no runnable mode for {mode!r}: {rel_path}")

        assembled = self.assemble(Scenario(
            test_path=test_path,
            test_content=source,
            rel_path=rel_path,
            fm=fm,
            mode=modes[0],
            tags=fm.tags(modes[0]),
        ))
        if output:
            Path(output).write_text(assembled, encoding="utf-8")
        else:
            sys.stdout.write(assembled)

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
        self.classifier = Classifier(engine)
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
        expect_finished = not is_negative and "raw" not in scenario.fm.flags

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

            if is_negative:
                self.classifier.classify(run, expect_async=is_async)
                self._check_negative(scenario.fm, run)
            else:
                ok_pattern = (Assembler.SCRIPT_EXECUTION_FINISHED_MARKER if expect_finished else None)
                self.classifier.classify(run, expect_async=is_async, ok_pattern=ok_pattern)

            run.mode = scenario.mode
            run.tags = scenario.tags
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
    p.add_argument("-E", action="store_true", dest="emit",
                   help="Preprocess a single test and write it to stdout or -o FILE")
    p.add_argument("--save-compiled", metavar="DIR",
                   help="Save assembled test scripts to this directory")
    p.add_argument("--test262-dir", metavar="DIR", default=str(DEFAULT_TEST262_DIR),
                   help=f"Root of test262 repository (default: {DEFAULT_TEST262_DIR})")
    args = p.parse_args()

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

    # Stage 1: discover test paths (no file I/O)
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
        test262_dir=test262_dir,
    )

    executor = Executor(
        engine, assembler,
        jobs=args.jobs,
        timeout_sec=args.timeout,
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
        print("No runnable tests")
        sys.exit(0)

    wall_sec = time.monotonic() - wall_start
    fail_count = reporter.print_summary(wall_sec=wall_sec)

    if args.output:
        reporter.write(args.output, output_format=args.output_format)


if __name__ == "__main__":
    main()
