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
from functools import lru_cache
from pathlib import Path
from typing import Any, ClassVar, Iterator

import yaml
SafeLoader: Any = getattr(yaml, "CSafeLoader", yaml.SafeLoader)

_SCRIPT_DIR = Path(__file__).parent.resolve()

from lib import (
    Classifier,
    EngineConfig,
    ErrorType,
    RunResult,
    Runner,
    Verdict,
    iterate_js_files,
    expand_template_literals,
)

DEFAULT_TEST262_DIR = (_SCRIPT_DIR.parent / "third_party" / "test262").resolve()
DEFAULT_TIMEOUT_SEC = 10.0
INTL402_SKIP_PATHS = ("test/intl402", "test/staging/Intl402")
FEATURES_PATH = _SCRIPT_DIR / "lib" / "features.yml"

_REL_SPECIFIER_RE = re.compile(
    r"""(?:"""
    r"""from\s*['"](\.[^'"]+)['"]"""          # import/export ... from '...'
    r"""|import\s+['"](\.[^'"]+)['"]"""       # import '...' (side-effect)
    r"""|import\s*\(\s*['"](\.[^'"]+)['"]"""  # dynamic import('...')
    r"""|importValue\s*\(\s*['"](\.[^'"]+)['"]"""  # ShadowRealm importValue
    r""")"""
)

def _load_features_by_ecmascript_edition() -> dict[str, list[str]]:
    with FEATURES_PATH.open("r", encoding="utf-8") as f:
        data = yaml.load(f, Loader=SafeLoader)

    if not isinstance(data, dict):
        raise TypeError(f"{FEATURES_PATH} must contain a mapping")

    editions: dict[str, list[str]] = {}
    for edition, features in data.items():
        if not isinstance(edition, str):
            raise TypeError(f"{FEATURES_PATH} contains a non-string edition key: {edition!r}")
        if not isinstance(features, list) or not all(isinstance(feature, str) for feature in features):
            raise TypeError(f"{FEATURES_PATH} entry {edition!r} must be a list of strings")
        editions[edition] = features
    return editions


FEATURES_BY_ECMASCRIPT_EDITION = _load_features_by_ecmascript_edition()

# Reverse map: feature -> edition key
FEATURE_TO_ECMASCRIPT_EDITION: dict[str, str] = {}
for _edition, _feats in FEATURES_BY_ECMASCRIPT_EDITION.items():
    for _f in _feats:
        FEATURE_TO_ECMASCRIPT_EDITION.setdefault(_f, _edition)


@dataclasses.dataclass
class Frontmatter:
    """Parsed test262 YAML frontmatter."""
    description: str = ""
    includes: list[str] = dataclasses.field(default_factory=list)
    flags: set[str] = dataclasses.field(default_factory=set)
    features: set[str] = dataclasses.field(default_factory=set)
    negative_phase: str | None = None
    negative_type: str | None = None
    locale: list[str] = dataclasses.field(default_factory=list)
    es5id: str | None = None
    es6id: str | None = None
    _FRONTMATTER_RE: ClassVar[re.Pattern[str]] = re.compile(r"/\*---\n(.*?)\n---\*/", re.DOTALL)

    @classmethod
    def parse(cls, source_text: str) -> "Frontmatter":
        """Parse YAML frontmatter given the source code of a test262 test."""
        m = cls._FRONTMATTER_RE.search(source_text.replace("\r\n", "\n").replace("\r", "\n"))
        if not m:
            return cls()

        data = yaml.load(m.group(1), Loader=SafeLoader)
        negative = data.get("negative") or {}

        return cls(
            description=data.get("description", "") or "",
            includes=list(data.get("includes") or []),
            flags=set(data.get("flags") or []),
            features=set(data.get("features") or []),
            negative_phase=negative.get("phase"),
            negative_type=negative.get("type"),
            locale=list(data.get("locale") or []),
            es5id=str(data["es5id"]) if data.get("es5id") else None,
            es6id=str(data["es6id"]) if data.get("es6id") else None,
        )


def scenarios_for(fm: Frontmatter, mode: str = "all") -> tuple[str, ...]:
    """Expand frontmatter flags into concrete execution scenarios."""
    flags = fm.flags
    res: tuple[str, ...]
    if "raw" in flags:
        res = ("raw",)
    elif "module" in flags:
        res = ("module",)
    elif "onlyStrict" in flags:
        res = ("strict",)
    elif "noStrict" in flags:
        res = ("sloppy",)
    else:
        res = ("strict", "sloppy")
    if mode == "all":
        return res
    else:
        return tuple([s for s in res if mode == s])


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
    test_path = test262_dir / "test" / rel_path
    source = test_path.read_text(encoding="utf-8", errors="replace")
    fm = Frontmatter.parse(source)
    scenarios = scenarios_for(fm, mode)
    if not scenarios:
        sys.exit(f"no runnable scenario for mode {mode!r}: {rel_path}")
    scenario = scenarios[0]

    assembled = assembler.assemble(Case(
        test_path=test_path,
        rel_path=rel_path,
        source=source,
        fm=fm,
        scenario=scenario,
    ), tags=fm.features | {f"includes:{i}" for i in fm.includes} | {"test262"})
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

    def run(self, tests: Iterator[str], *, on_test_result: Any = None) -> tuple[list[RunResult], int]:
        """Submit test files to worker pool, collect and return results.

        Each worker reads the file, parses frontmatter, expands scenarios,
        assembles, executes, and classifies — all in parallel.

        Returns (results, n_skipped).
        """
        results: list[RunResult] = []
        n_skipped = 0

        try:
            with concurrent.futures.ProcessPoolExecutor(max_workers=self._jobs) as pool:
                futs: dict[concurrent.futures.Future[list[RunResult] | None], None] = {}
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
                            futs[pool.submit(self._process_file, rel_path)] = None

                        if not futs:
                            break

                        done, _ = concurrent.futures.wait(
                            futs,
                            return_when=concurrent.futures.FIRST_COMPLETED,
                        )
                        for fut in done:
                            futs.pop(fut)
                            file_results = fut.result()
                            if file_results is None:
                                n_skipped += 1
                                if on_test_result:
                                    on_test_result([])
                                continue
                            if on_test_result:
                                on_test_result(file_results)
                            results.extend(file_results)
                except KeyboardInterrupt:
                    for f in futs:
                        f.cancel()
                    raise
        finally:
            shutil.rmtree(self._shared_tmp, ignore_errors=True)
        results.sort(key=lambda r: r.run_id or "")
        return results, n_skipped

    def _process_file(self, rel_path: str) -> list[RunResult] | None:
        """Read file, parse frontmatter, expand scenarios, execute each.

        Returns None if the file was skipped by feature filter,
        [] if it had no applicable scenarios for the current mode.
        """
        test_path = self.test262_dir / rel_path
        source = test_path.read_text(encoding="utf-8", errors="replace")
        fm = Frontmatter.parse(source)

        if fm.es5id:
            fm.features.add("es5id")
        if fm.es6id:
            fm.features.add("es6id")

        if self.include_features and not (fm.features & self.include_features):
            return None
        if self.skip_features and (fm.features & self.skip_features):
            return None

        return [
            self._execute_one(Case(
                test_path=test_path, rel_path=rel_path, source=source,
                fm=fm, scenario=scenario,
            ))
            for scenario in scenarios_for(fm, self.mode)
        ]

    def _execute_one(self, case: Case) -> RunResult:
        """Execute engine on an assembled test, classify result."""
        is_module = case.scenario == "module"
        is_negative = bool(case.fm.negative_type)
        is_async = "async" in case.fm.flags
        expect_finished = not is_negative and case.scenario != "raw"

        tags = case.fm.features | {f"includes:{i}" for i in case.fm.includes} | {"test262"}
        if is_module:
            tags.add("module")
        if is_negative:
            tags.add("negative")
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
            return run
        finally:
            staged.cleanup()

    def _check_negative(self, fm: Frontmatter, run: RunResult) -> None:
        """Post-classify check for negative tests. Mutates run in place."""
        if run.error_type in (ErrorType.TIMEOUT, ErrorType.CRASHED):
            return  # leave classify()'s verdict intact

        if fm.negative_phase in ("parse", "resolution"):
            if run.error_type is None:
                run.verdict = Verdict.FAILED
                run.error_type = ErrorType.NEGATIVE
                run.error_message = "negative test did not fail"
                return

        if run.error_type is not None:
            expected = ErrorType.from_js_error(fm.negative_type) if fm.negative_type else None
            if expected is not None:
                if run.error_type != expected:
                    run.verdict = Verdict.FAILED
                    run.error_type = ErrorType.NEGATIVE
                    run.error_message = f"expected {fm.negative_type}, got {run.error_type.value}"
                    return
            else:
                # Type not in ErrorType enum (e.g. "EarlyError"): raw string search in output
                if not fm.negative_type or not re.search(rf'\b{re.escape(fm.negative_type)}\b', run.combined_output()):
                    run.verdict = Verdict.FAILED
                    run.error_type = ErrorType.NEGATIVE
                    run.error_message = f"expected {fm.negative_type}, not found in output"
                    return
        else:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.NEGATIVE
            run.error_message = "expected error not thrown"
            return

        run.verdict = Verdict.OK
        run.error_type = None
        run.error_message = None


def _format_summary_line(
    label: str,
    ok: int,
    fail: int,
    skip: int = 0,
    *,
    use_color: bool = False,
) -> str:
    """Format a summary line label and counts, with optional ANSI color."""
    if use_color:
        if fail == 0:
            label = f"\033[1;32m{label}\033[0m"
        else:
            pct = ok * 100 // (ok + fail) if (ok + fail) else 0
            color = "\033[1;33m" if pct > 50 else "\033[1;31m"
            label = f"{color}{label}\033[0m"

    if fail == 0:
        counts = f"{ok} passed"
    else:
        counts = f"{ok}/{ok + fail} ({ok * 100 / (ok + fail):.2f}%) passed, {fail} failed"
    if skip:
        counts += f"; {skip} skipped"
    return f"{label}: {counts}"


def _edition_feature_summary(results: list[RunResult], *, use_color: bool = False) -> str:
    """Build per-edition/feature test counts; omit editions/features with no results."""

    def worst(a: Verdict | None, b: Verdict) -> Verdict:
        if a is Verdict.FAILED or b is Verdict.FAILED: return Verdict.FAILED
        if a is Verdict.OK or b is Verdict.OK: return Verdict.OK
        return Verdict.SKIPPED

    def counts(d: dict[str, Verdict]) -> tuple[int, int, int]:
        ok = sum(1 for v in d.values() if v is Verdict.OK)
        fail = sum(1 for v in d.values() if v is Verdict.FAILED)
        skip = sum(1 for v in d.values() if v is Verdict.SKIPPED)
        return ok, fail, skip

    # Per-feature: test_path -> worst verdict across scenarios
    feature_tests: dict[str, dict[str, Verdict]] = {}
    other_tests: dict[str, Verdict] = {}
    for r in results:
        key = r.test_path or r.run_id or "?"
        v = r.verdict or Verdict.FAILED
        if r.features:
            for f in r.features:
                d = feature_tests.setdefault(f, {})
                d[key] = worst(d.get(key), v)
        else:
            other_tests[key] = worst(other_tests.get(key), v)

    if not feature_tests and not other_tests:
        return ""

    # Per-edition: union of test paths from member features (worst verdict)
    edition_tests: dict[str, dict[str, Verdict]] = {}
    for f, d in feature_tests.items():
        ed = edition_tests.setdefault(FEATURE_TO_ECMASCRIPT_EDITION.get(f, "esnext"), {})
        for key, v in d.items():
            ed[key] = worst(ed.get(key), v)

    lines = ["Summary by edition/feature:"]
    for edition in list(FEATURES_BY_ECMASCRIPT_EDITION.keys()) + ["esnext"]:
        ed = edition_tests.get(edition) or {}
        if not ed:
            continue
        ok, fail, skip = counts(ed)
        lines.append(f"  {_format_summary_line(edition, ok, fail, skip, use_color=use_color)}")

        feats = FEATURES_BY_ECMASCRIPT_EDITION.get(edition, [])
        if edition == "esnext":
            feats = sorted(f for f in feature_tests if f not in FEATURE_TO_ECMASCRIPT_EDITION)
        for f in feats:
            d = feature_tests.get(f) or {}
            if not d:
                continue
            ok, fail, skip = counts(d)
            lines.append(f"    {_format_summary_line(f, ok, fail, skip, use_color=use_color)}")

    if other_tests:
        ok, fail, skip = counts(other_tests)
        lines.append(f"  {_format_summary_line('other', ok, fail, skip, use_color=use_color)}")

    return "\n".join(lines)


def print_summary(
    results: list[RunResult],
    engine_name: str,
    *,
    n_skipped: int = 0,
    verbose: bool = False,
    use_color: bool = False,
) -> int:
    """Print failure list and summary line. Returns fail count."""
    scenario_counts: dict[str, int] = {}
    test_verdicts: dict[str, Verdict] = {}
    for r in results:
        key = r.verdict.value if r.verdict else "unknown"
        scenario_counts[key] = scenario_counts.get(key, 0) + 1
        test_key = r.test_path or r.run_id or "?"
        verdict = r.verdict or Verdict.FAILED
        prev = test_verdicts.get(test_key)
        if prev is Verdict.FAILED or verdict is Verdict.FAILED:
            test_verdicts[test_key] = Verdict.FAILED
        else:
            test_verdicts[test_key] = Verdict.OK

    failed = [r for r in results if r.verdict is Verdict.FAILED]
    if failed and not verbose:
        print(f"\nFailures ({len(failed)}):")
        for r in failed[:100]:
            msg = f"{r.run_id or '?'}: {r.verdict_message()[:120]}"
            if use_color:
                msg = f"\033[31m{msg}\033[0m"
            print(f"  {msg}")
        if len(failed) > 100:
            print(f"  ... and {len(failed) - 100} more")

    scenario_ok = scenario_counts.get("ok", 0)
    fail_count = scenario_counts.get("failed", 0)
    test_ok = sum(1 for verdict in test_verdicts.values() if verdict is Verdict.OK)
    test_fail = sum(1 for verdict in test_verdicts.values() if verdict is Verdict.FAILED)

    edition_table = _edition_feature_summary(results, use_color=use_color)
    if edition_table:
        print(edition_table)

    if results or n_skipped:
        line = (
            f"{engine_name}: {test_ok}/{test_ok+test_fail} tests passed "
            f"({test_ok * 100 / (test_ok + test_fail):.2f}%), "
            f"{test_fail} failed, {n_skipped} skipped. "
        )
    else:
        line = f"{engine_name}: no tests were run"

    print(line)

    return fail_count


def format_output_line(run: RunResult) -> str:
    """Format one terse line for --output."""
    return f"{run.run_id}: {run.verdict_message()}"


def expand_edition_aliases(features: set[str]) -> set[str]:
    """Expand ES edition aliases (es5, es6, es2015..es2025) to their feature sets."""
    result: set[str] = set()
    for f in features:
        edition_features = FEATURES_BY_ECMASCRIPT_EDITION.get(f)
        if edition_features is not None:
            result.update(edition_features)
        else:
            result.add(f)
    return result


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

    use_color = sys.stdout.isatty()

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
    include_features = expand_edition_aliases({f for item in args.features for f in item.split(",") if f}) or None
    if args.skip_features:
        skip_features = expand_edition_aliases({f for item in args.skip_features for f in item.split(",") if f}) or None
    else:
        skip_features = set(engine.test262_skip_features) or None

    progress_tests = [0, 0, 0]  # [ok, fail, skip]
    progress_scenarios = [0, 0]  # [ok, fail]
    is_tty = sys.stderr.isatty()

    def on_test_result(file_results: list[RunResult]) -> None:
        if args.verbose:
            for run in file_results:
                t = f" {run.metrics.real_time:.2f}s" if run.metrics.real_time else ""
                if run.verdict is Verdict.FAILED:
                    msg = f"{run.run_id}: {run.verdict_message()[:120]}{t}"
                    if use_color:
                        msg = f"\033[1;31m{msg}\033[0m"
                    print(msg, flush=True)
                    if args.verbose >= 3:
                        run.print_streams()
                elif args.verbose >= 2:
                    print(f"{run.run_id}: {run.verdict.value if run.verdict else '?'}{t}", flush=True)
        if not file_results:
            progress_tests[2] += 1
            return
        for run in file_results:
            if run.verdict is Verdict.OK:
                progress_scenarios[0] += 1
            elif run.verdict is Verdict.FAILED:
                progress_scenarios[1] += 1
        if any(run.verdict is Verdict.FAILED for run in file_results):
            progress_tests[1] += 1
        else:
            progress_tests[0] += 1
        if not args.verbose and is_tty:
            print(
                f"\rTests: {progress_tests[0]} passed, {progress_tests[1]} failed, {progress_tests[2]} skipped " +
                f"(runs: {progress_scenarios[0]} passed, {progress_scenarios[1]} failed)",
                end="", file=sys.stderr, flush=True
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

    try:
        results, n_skipped = executor.run(tests, on_test_result=on_test_result)
    except KeyboardInterrupt:
        if is_tty and not args.verbose:
            print("\r\033[K", end="", file=sys.stderr, flush=True)
        print("\nInterrupted")
        sys.exit(130)

    if is_tty and not args.verbose:
        print("\r\033[K", end="", file=sys.stderr, flush=True)

    if not results:
        print("No runnable scenarios")
        sys.exit(0)

    fail_count = print_summary(
        results, engine.name,
        n_skipped=n_skipped, verbose=args.verbose, use_color=use_color,
    )

    if args.output:
        lines = [format_output_line(r) for r in results]
        Path(args.output).write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Results written to {args.output}")


if __name__ == "__main__":
    main()
