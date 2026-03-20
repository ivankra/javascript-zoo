# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import json
import os
import sys
from collections import Counter
from pathlib import Path
from typing import Any

from .config import EngineConfig
from .runner import RunResult, Verdict


# ── Stats ─────────────────────────────────────────────────────────────────────

@dataclasses.dataclass
class Stats:
    """Aggregated pass/fail/skip counts."""
    total: int = 0
    passed: int = 0
    failed: int = 0
    skipped: int = 0

    def add(self, verdict: Verdict | None) -> None:
        self.total += 1
        if verdict is Verdict.OK:
            self.passed += 1
        elif verdict is Verdict.FAILED:
            self.failed += 1
        else:
            self.skipped += 1

    def to_dict(self) -> dict[str, int]:
        d = {"pass": self.passed, "fail": self.failed, "skip": self.skipped}
        return {k: v for k, v in d.items() if v}


# ── Dir stats (flat, for JSON output) ────────────────────────────────────────

def _build_dir_stats(results: list[RunResult]) -> dict[str, dict[str, int]]:
    """Build flat dir-path -> stats dict from results (deduped by file)."""
    def worst(a: Verdict | None, b: Verdict | None) -> Verdict | None:
        if a is Verdict.FAILED or b is Verdict.FAILED: return Verdict.FAILED
        if a is Verdict.OK or b is Verdict.OK: return Verdict.OK
        return b

    file_verdicts: dict[str, Verdict | None] = {}
    for run in results:
        fp = (run.run_id or "").split("@")[0]
        file_verdicts[fp] = worst(file_verdicts.get(fp), run.verdict)

    dir_stats: dict[str, Stats] = {}
    for file_path, verdict in file_verdicts.items():
        d = os.path.dirname(file_path)
        if d not in dir_stats:
            dir_stats[d] = Stats()
        dir_stats[d].add(verdict)

    return {d: s.to_dict() for d, s in sorted(dir_stats.items()) if d}


# ── Formatting helpers ────────────────────────────────────────────────────────

def format_summary_line(
    label: str,
    ok: int,
    fail: int,
    skip: int = 0,
    *,
    use_color: bool = False,
) -> str:
    """Format a summary line: label and counts, with optional ANSI color."""
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


def format_output_line(run: RunResult) -> str:
    """Format one terse line for text output."""
    return f"{run.run_id}: {run.verdict_message()}"


# ── JSON formatting ──────────────────────────────────────────────────────────

def _is_inline_json(value: Any) -> bool:
    return isinstance(value, dict) and bool(value) and all(isinstance(v, int) for v in value.values())


def _format_json_value(value: Any, indent: int) -> str:
    """Recursively format JSON; stats dicts go on one line, everything else indented."""
    pad = "  " * indent
    inner = "  " * (indent + 1)
    if isinstance(value, dict):
        if not value or _is_inline_json(value):
            return json.dumps(value)
        items = [f'{inner}{json.dumps(k)}: {_format_json_value(v, indent + 1)}'
                 for k, v in value.items()]
        return "{\n" + ",\n".join(items) + "\n" + pad + "}"
    if isinstance(value, list):
        if not value:
            return "[]"
        items = [f'{inner}{_format_json_value(v, indent + 1)}' for v in value]
        return "[\n" + ",\n".join(items) + "\n" + pad + "]"
    return json.dumps(value)


def _build_test_statuses(results: list[RunResult]) -> dict[str, Any]:
    """Build per-test status map, collapsing identical scenario results."""
    file_runs: dict[str, list[RunResult]] = {}
    for run in sorted(results, key=lambda r: r.run_id or ""):
        fp = (run.run_id or "").split("@")[0]
        file_runs.setdefault(fp, []).append(run)
    statuses: dict[str, Any] = {}
    for fp, runs in sorted(file_runs.items()):
        messages = [run.verdict_message() for run in runs]
        if len(set(messages)) == 1:
            statuses[fp] = messages[0]
        else:
            statuses[fp] = {run.scenario or run.run_id or "": run.verdict_message() for run in runs}
    return statuses


# ── Reporter ──────────────────────────────────────────────────────────────────

_FeatureTests = dict[str, dict[str, Verdict]]
_VerdictMap = dict[str, Verdict]


class Reporter:
    """Accumulates test results; prints summaries and writes output files.

    Works for both simple conformance runs and test262 with edition/feature
    breakdown.  Pass edition taxonomy to enable per-edition/feature reporting.

    Optionally tracks per-directory progress for streaming dir summaries
    (call set_expected_dirs() before adding results, then
    print_completed_dirs() after each add()).
    """

    def __init__(
        self,
        engine: EngineConfig,
        *,
        verbose: int = 0,
        test262: bool = False,
        editions_order: list[str] | None = None,
        features_by_edition: dict[str, list[str]] | None = None,
        feature_to_edition: dict[str, str] | None = None,
    ) -> None:
        self._engine = engine
        self._verbose = verbose
        self._use_color = sys.stdout.isatty()
        self._test262 = test262
        self._results: list[RunResult] = []
        # Per-file and per-scenario (run) progress counters.
        self._file_counts: Counter[Verdict] = Counter()
        self._scenario_counts: Counter[Verdict] = Counter()
        self._editions_order: list[str] = list(editions_order or [])
        self._features_by_edition: dict[str, list[str]] = dict(features_by_edition or {})
        self._feature_to_edition: dict[str, str] = dict(feature_to_edition or {})
        self._wall_sec: float = 0
        # Dir progress tracking (initialized by set_expected_dirs)
        self._dir_order: list[str] | None = None
        self._dir_total: Counter[str] | None = None
        self._dir_done: Counter[str] | None = None
        self._dir_passed: Counter[str] | None = None
        self._dir_failed_tests: dict[str, list[str]] | None = None
        self._dir_next_index: int = 0

    @property
    def results(self) -> list[RunResult]:
        return self._results

    def set_expected_dirs(self, test_ids: list[str]) -> None:
        """Set up per-directory progress tracking from the ordered test ID list.

        Call this before add() to enable print_completed_dirs().
        """
        self._dir_order = []
        seen: set[str] = set()
        for tid in test_ids:
            d = os.path.dirname(tid)
            if d not in seen:
                self._dir_order.append(d)
                seen.add(d)
        self._dir_total = Counter(os.path.dirname(tid) for tid in test_ids)
        self._dir_done = Counter()
        self._dir_passed = Counter()
        self._dir_failed_tests = {d: [] for d in self._dir_order}
        self._dir_next_index = 0

    def add(self, run: RunResult) -> None:
        """Record one completed run.

        Verbose output levels (set via constructor):
          -v  (1): print every result (failures highlighted)
          -vv (2): same, plus stdout/stderr on failures
        """
        self._results.append(run)
        # Inline per-test output
        if self._verbose >= 1:
            t = f" {run.metrics.real_time * 1000:.2f}ms" if run.metrics.real_time else ""
            if run.verdict is Verdict.FAILED:
                msg = f"{run.run_id}: {run.verdict_message()[:120]}{t}"
                if self._use_color:
                    msg = f"\033[1;31m{msg}\033[0m"
                print(msg, flush=True)
                if self._verbose >= 2:
                    run.print_streams()
            else:
                print(f"{run.run_id}: {run.verdict.value if run.verdict else '?'}{t}", flush=True)
        # Dir progress tracking
        if self._dir_done is not None:
            run_id = run.run_id or ""
            fp = run_id.split("@")[0]
            d = os.path.dirname(fp)
            self._dir_done[d] += 1
            if run.verdict is Verdict.OK:
                self._dir_passed[d] += 1
            else:
                base = fp.split("/", 1)[1] if "/" in fp else fp
                self._dir_failed_tests[d].append(base)

    def add_file(self, runs: list[RunResult]) -> None:
        """Record all runs from a single test file and update progress counters.

        Prints a progress line to stderr when not in verbose mode and stderr is a TTY.
        """
        for run in runs:
            self.add(run)
            self._scenario_counts[run.verdict or Verdict.FAILED] += 1

        if any(r.verdict is Verdict.SKIPPED for r in runs):
            self._file_counts[Verdict.SKIPPED] += 1
        elif any(r.verdict is Verdict.FAILED for r in runs):
            self._file_counts[Verdict.FAILED] += 1
        else:
            self._file_counts[Verdict.OK] += 1

        if self._verbose < 1 and sys.stderr.isatty():
            fc = self._file_counts
            line = f"Tests: {fc[Verdict.OK]} passed, {fc[Verdict.FAILED]} failed"
            if fc[Verdict.SKIPPED]:
                line += f", {fc[Verdict.SKIPPED]} skipped"
            if self._test262:
                sc = self._scenario_counts
                line += f" (runs: {sc[Verdict.OK]} passed, {sc[Verdict.FAILED]} failed)"
            print(f"\r\033[K{line}", end="", file=sys.stderr, flush=True)

    def clear_progress(self) -> None:
        """Clear the progress line from stderr, if one was printed."""
        if self._verbose < 1 and sys.stderr.isatty() and sum(self._file_counts.values()):
            print("\r\033[K", end="", file=sys.stderr, flush=True)

    def print_completed_dirs(self, *, header: bool = False) -> None:
        """Print summary lines for any dirs that just became complete, in order.

        Requires set_expected_dirs() to have been called first.
        When header=True, prints "Summary by directory:" header and 2-space indent.
        """
        if self._dir_order is None:
            return
        # Check if there's anything to print before clearing progress.
        if (
            self._dir_next_index < len(self._dir_order)
            and self._dir_done[self._dir_order[self._dir_next_index]]
                == self._dir_total[self._dir_order[self._dir_next_index]]
        ):
            self.clear_progress()
        first = True
        while (
            self._dir_next_index < len(self._dir_order)
            and self._dir_done[self._dir_order[self._dir_next_index]]
                == self._dir_total[self._dir_order[self._dir_next_index]]
        ):
            if header and first and self._dir_next_index == 0:
                print("Summary by directory:", flush=True)
            first = False
            d = self._dir_order[self._dir_next_index]
            self._dir_next_index += 1
            ok = self._dir_passed[d]
            fail = self._dir_total[d] - ok
            line = format_summary_line(d, ok, fail, use_color=self._use_color)
            if fail:
                failed_text = " ".join(self._dir_failed_tests[d])
                if failed_text and len(failed_text) < 60:
                    line += f"; {failed_text}"
            print(f"  {line}" if header else line, flush=True)

    # ── Internal helpers ──────────────────────────────────────────────────────

    def _file_verdicts(self) -> dict[str, Verdict | None]:
        """Compute per-file worst verdict (deduplicating across scenarios)."""
        fv: dict[str, Verdict | None] = {}
        for run in self._results:
            fp = (run.run_id or "").split("@")[0]
            prev = fv.get(fp)
            if prev is Verdict.FAILED or run.verdict is Verdict.FAILED:
                fv[fp] = Verdict.FAILED
            elif prev is Verdict.OK or run.verdict is Verdict.OK:
                fv[fp] = Verdict.OK
            else:
                fv[fp] = run.verdict
        return fv

    def _build_feature_data(self) -> tuple[_FeatureTests, _FeatureTests, _VerdictMap]:
        """Compute (feature_tests, edition_tests, other_tests) from accumulated results."""
        def worst(a: Verdict | None, b: Verdict) -> Verdict:
            if a is Verdict.FAILED or b is Verdict.FAILED: return Verdict.FAILED
            if a is Verdict.OK or b is Verdict.OK: return Verdict.OK
            return Verdict.SKIPPED

        feature_tests: _FeatureTests = {}
        other_tests: _VerdictMap = {}
        for r in self._results:
            key = r.test_path or r.run_id or "?"
            v = r.verdict or Verdict.FAILED
            if r.features:
                for f in r.features:
                    d = feature_tests.setdefault(f, {})
                    d[key] = worst(d.get(key), v)
            else:
                other_tests[key] = worst(other_tests.get(key), v)

        edition_tests: _FeatureTests = {}
        for f, d in feature_tests.items():
            ed = edition_tests.setdefault(self._feature_to_edition.get(f, "esnext"), {})
            for key, v in d.items():
                ed[key] = worst(ed.get(key), v)

        return feature_tests, edition_tests, other_tests

    def _editions_features_json(
        self,
        feature_tests: _FeatureTests,
        edition_tests: _FeatureTests,
        other_tests: _VerdictMap,
    ) -> tuple[dict[str, dict[str, int]], dict[str, dict[str, int]]]:
        def to_stats(d: _VerdictMap) -> dict[str, int]:
            s = Stats()
            for v in d.values():
                s.add(v)
            return s.to_dict()

        editions: dict[str, dict[str, int]] = {}
        features: dict[str, dict[str, int]] = {}
        for edition in self._editions_order + ["esnext"]:
            ed = edition_tests.get(edition) or {}
            if not ed:
                continue
            editions[edition] = to_stats(ed)
            feats = self._features_by_edition.get(edition, [])
            if edition == "esnext":
                feats = sorted(f for f in feature_tests if f not in self._feature_to_edition)
            for f in feats:
                d = feature_tests.get(f) or {}
                if d:
                    features[f] = to_stats(d)
        if other_tests:
            features["other"] = to_stats(other_tests)
        return editions, features

    def _edition_report(
        self,
        feature_tests: _FeatureTests,
        edition_tests: _FeatureTests,
        other_tests: _VerdictMap,
    ) -> str:
        if not feature_tests and not other_tests:
            return ""
        uc = self._use_color

        def counts(d: _VerdictMap) -> tuple[int, int, int]:
            ok = sum(1 for v in d.values() if v is Verdict.OK)
            fail = sum(1 for v in d.values() if v is Verdict.FAILED)
            skip = sum(1 for v in d.values() if v is Verdict.SKIPPED)
            return ok, fail, skip

        lines = ["Summary by edition/feature:"]
        for edition in self._editions_order + ["esnext"]:
            ed = edition_tests.get(edition) or {}
            if not ed:
                continue
            lines.append(f"  {format_summary_line(edition, *counts(ed), use_color=uc)}")
            feats = self._features_by_edition.get(edition, [])
            if edition == "esnext":
                feats = sorted(f for f in feature_tests if f not in self._feature_to_edition)
            for f in feats:
                d = feature_tests.get(f) or {}
                if d:
                    lines.append(f"    {format_summary_line(f, *counts(d), use_color=uc)}")
        if other_tests:
            lines.append(f"  {format_summary_line('other', *counts(other_tests), use_color=uc)}")
        return "\n".join(lines)

    def _to_json(self) -> str:
        results = self._results
        engine = self._engine

        fv = self._file_verdicts()
        test_stats = Stats()
        for v in fv.values():
            test_stats.add(v)

        scenario_stats: dict[str, Stats] = {}
        for run in results:
            if run.scenario:
                if run.scenario not in scenario_stats:
                    scenario_stats[run.scenario] = Stats()
                scenario_stats[run.scenario].add(run.verdict)

        if self._editions_order:
            ft, et, ot = self._build_feature_data()
            editions, features = self._editions_features_json(ft, et, ot)
        else:
            editions, features = {}, {}

        peak_rss_kb = max((r.metrics.max_rss_kb or 0) for r in results) if results else 0

        summary: dict[str, Any] = {
            "tests": test_stats.to_dict(),
        }
        if scenario_stats:
            summary["scenarios"] = {s: ss.to_dict() for s, ss in sorted(scenario_stats.items())}
        if editions:
            summary["editions"] = editions
        if features:
            summary["features"] = features
        summary["dirs"] = _build_dir_stats(results)
        if self._wall_sec:
            summary["total_time_s"] = round(self._wall_sec, 3)
        if peak_rss_kb:
            summary["peak_rss_mb"] = round(peak_rss_kb / 1024, 1)
        if engine.build_metadata:
            summary["metadata"] = engine.build_metadata

        data: dict[str, Any] = {
            "summary": summary,
            "tests": _build_test_statuses(results),
        }
        return _format_json_value(data, 0) + "\n"

    def _to_text(self) -> str:
        lines: list[str] = []
        if self._engine.build_metadata:
            lines.append(f"Metadata: {json.dumps(self._engine.build_metadata, ensure_ascii=False, separators=(',', ':'))}")
        lines.extend(format_output_line(r) for r in self._results)
        return "\n".join(lines) + "\n" if lines else ""

    # ── Public output ─────────────────────────────────────────────────────────

    def write(self, path: str | Path, *, output_format: str = "auto", wall_sec: float = 0) -> None:
        """Write results to file. Format: "json", "simple", or "auto" (detect from extension).

        Written atomically via a temp file + os.replace().
        """
        if wall_sec:
            self._wall_sec = wall_sec
        path = Path(path)
        use_json = (output_format == "json") or (output_format != "simple" and path.suffix == ".json")
        out = self._to_json() if use_json else self._to_text()
        tmp = path.with_suffix(path.suffix + ".tmp")
        try:
            tmp.write_text(out, encoding="utf-8")
            os.replace(tmp, path)
        except Exception:
            try:
                tmp.unlink()
            except OSError:
                pass
            raise
        print(f"Results written to {path}")

    def print_summary(
        self,
        *,
        wall_sec: float = 0,
    ) -> int:
        """Print failure list, optional breakdowns, and summary line. Returns fail count."""
        self._wall_sec = wall_sec
        results = self._results
        engine_name = self._engine.name
        use_color = self._use_color

        fv = self._file_verdicts()
        test_ok = sum(1 for v in fv.values() if v is Verdict.OK)
        test_fail = sum(1 for v in fv.values() if v is Verdict.FAILED)
        n_skipped = sum(1 for v in fv.values() if v is Verdict.SKIPPED)

        # Failure recap (suppressed when verbose already printed them inline)
        failed = [r for r in results if r.verdict is Verdict.FAILED]
        if failed and self._verbose < 1:
            print(f"\nFailures ({len(failed)}):")
            for r in failed[:100]:
                msg = f"{r.run_id or '?'}: {r.verdict_message()[:120]}"
                if use_color:
                    msg = f"\033[31m{msg}\033[0m"
                print(f"  {msg}")
            if len(failed) > 100:
                print(f"  ... and {len(failed) - 100} more")
            print()

        if self._editions_order:
            ft, et, ot = self._build_feature_data()
            edition_table = self._edition_report(ft, et, ot)
            if edition_table:
                print(edition_table)
                print()

        peak_rss_kb = max((r.metrics.max_rss_kb or 0) for r in results) if results else 0

        if results or n_skipped:
            total = test_ok + test_fail
            if test_fail:
                line = (
                    f"{engine_name}: {test_ok}/{total} tests passed "
                    f"({test_ok * 100 / total:.2f}%), "
                    f"{test_fail} failed"
                )
            else:
                line = f"{engine_name}: all {test_ok} tests passed"
            if n_skipped:
                line += f", {n_skipped} skipped"
            if wall_sec:
                line += f", wall time: {wall_sec:.3f}s"
            if peak_rss_kb:
                line += f", peak RSS: {peak_rss_kb / 1024:.1f}MB"
        else:
            line = f"{engine_name}: no tests were run"
        print(line)

        return len(failed)
