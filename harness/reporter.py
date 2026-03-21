# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import json
import os
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Any

from .config import EngineConfig
from .frontmatter import EXTRA_TAGS, TEST262_FLAGS, test262_features_yaml
from .runner import RunResult, Verdict
from .util import get_git_revision


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
        d = {"ok": self.passed, "fail": self.failed, "skip": self.skipped}
        return {k: v for k, v in d.items() if v}


# ── Tag helpers ───────────────────────────────────────────────────────────────

_EDITION_RE = re.compile(r"^es(\d+|next)$")
_NON_FEATURE_TAGS = TEST262_FLAGS | EXTRA_TAGS
# Tags excluded from the per-tag report (too noisy / always present).
_REPORT_EXCLUDE_TAGS = frozenset({"test262", "strict", "sloppy"})


def _split_tags(tags: frozenset[str]) -> tuple[str | None, frozenset[str], frozenset[str]]:
    """Extract (edition_tag, feature_tags, misc_tags) from a full tag set.

    The edition tag is the single esN/esYYYY/esnext tag (or None).
    Features are tags that aren't flags, extra tags, or includes:*.
    Misc tags are everything else (flags, includes:*, es5id, etc.)
    excluding test262/strict/sloppy and the edition tag.
    """
    edition = None
    features: list[str] = []
    misc: list[str] = []
    for t in tags:
        if _EDITION_RE.match(t):
            edition = t
        elif t not in _NON_FEATURE_TAGS and not t.startswith("includes:"):
            features.append(t)
        elif t not in _REPORT_EXCLUDE_TAGS:
            misc.append(t)
    return edition, frozenset(features), frozenset(misc)


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

_INLINE_DICT_KEYS = frozenset({"ok", "ok_percent", "fail", "skip", "strict", "sloppy"})

def _is_inline_json(value: Any) -> bool:
    return isinstance(value, dict) and bool(value) and set(value.keys()) <= _INLINE_DICT_KEYS


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
        if not value or all(isinstance(v, (int, float, str)) for v in value):
            return json.dumps(value)
        items = [f'{inner}{_format_json_value(v, indent + 1)}' for v in value]
        return "[\n" + ",\n".join(items) + "\n" + pad + "]"
    return json.dumps(value)


def _build_test_statuses(results: list[RunResult]) -> dict[str, Any]:
    """Build per-test status map, collapsing identical mode results."""
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
            statuses[fp] = {run.mode or run.run_id or "": run.verdict_message() for run in runs}
    return statuses


# ── Reporter ──────────────────────────────────────────────────────────────────

_VerdictMap = dict[str, Verdict]


class Reporter:
    """Accumulates test results; prints summaries and writes output files.

    Works for both simple conformance runs and test262 with edition/feature
    breakdown.  Pass editions_order to enable per-edition/feature reporting.

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
        test262_dir: Path | None = None,
        probes: dict[str, str] | None = None,
    ) -> None:
        self._engine = engine
        self._verbose = verbose
        self._use_color = sys.stdout.isatty()
        self._test262 = test262
        self._test262_revision = get_git_revision(test262_dir) if test262_dir else None
        self._results: list[RunResult] = []
        # Per-file and per-mode (run) progress counters.
        self._file_counts: Counter[Verdict] = Counter()
        self._mode_counts: Counter[Verdict] = Counter()
        self._editions_order: list[str] = list(test262_features_yaml().keys()) if test262 else []
        self._wall_sec: float = 0
        # Dir progress tracking (initialized by set_expected_dirs)
        self._dir_order: list[str] = []
        self._dir_total: Counter[str] = Counter()
        self._dir_done: Counter[str] = Counter()
        self._dir_passed: Counter[str] = Counter()
        self._dir_failed_tests: dict[str, list[str]] = {}
        self._dir_next_index: int = 0
        self._probes = probes

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
        if self._dir_order:
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
            self._mode_counts[run.verdict or Verdict.FAILED] += 1

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
                sc = self._mode_counts
                line += f" (runs: {sc[Verdict.OK]} passed, {sc[Verdict.FAILED]} failed)"
            print(f"\r\033[K{line}", end="", file=sys.stderr, flush=True)

    def clear_progress(self) -> None:
        """Clear the progress line from stderr, if one was printed."""
        if self._verbose < 1 and sys.stderr.isatty():
            if sum(self._file_counts.values()) or self._probes:
                print("\r\033[K", end="", file=sys.stderr, flush=True)

    def add_probe_result(self, name: str, result: str) -> None:
        """Record one probe result, printing progress to stderr."""
        if self._probes is None:
            self._probes = {}
        self._probes[name] = result
        ok = result == "OK"
        if self._verbose >= 1:
            status = "OK" if ok else f"FAIL ({result})"
            print(f"probe {name}: {status}", file=sys.stderr, flush=True)
        elif sys.stderr.isatty():
            n_done = len(self._probes)
            n_ok = sum(1 for v in self._probes.values() if v == "OK")
            n_fail = n_done - n_ok
            msg = f"Probes: {n_done} ({n_ok} ok, {n_fail} failed)" if n_fail else f"Probes: {n_done} ok"
            print(f"\r\033[K{msg}", end="", file=sys.stderr, flush=True)

    def print_completed_dirs(self, *, header: bool = False) -> None:
        """Print summary lines for any dirs that just became complete, in order.

        Requires set_expected_dirs() to have been called first.
        When header=True, prints "Summary by directory:" header and 2-space indent.
        """
        if not self._dir_order:
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
        """Compute per-file worst verdict (deduplicating across modes)."""
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

    def _build_tag_data(self) -> tuple[
        dict[str, _VerdictMap],             # edition -> {test -> verdict}
        dict[str, dict[str, _VerdictMap]],  # edition -> feature -> {test -> verdict}
        dict[str, _VerdictMap],             # feature -> {test -> verdict} (flat)
        _VerdictMap,                        # N/A (no edition, no features)
        dict[str, _VerdictMap],             # misc tag -> {test -> verdict}
    ]:
        def worst(a: Verdict | None, b: Verdict) -> Verdict:
            if a is Verdict.FAILED or b is Verdict.FAILED: return Verdict.FAILED
            if a is Verdict.OK or b is Verdict.OK: return Verdict.OK
            return Verdict.SKIPPED

        edition_tests: dict[str, _VerdictMap] = {}
        edition_feature_tests: dict[str, dict[str, _VerdictMap]] = {}
        feature_tests: dict[str, _VerdictMap] = {}
        no_feature_tests: _VerdictMap = {}
        misc_tag_tests: dict[str, _VerdictMap] = {}

        for r in self._results:
            key = (r.run_id or "?").split("@")[0]
            v = r.verdict or Verdict.FAILED
            edition, features, misc = _split_tags(r.tags)

            if edition:
                d = edition_tests.setdefault(edition, {})
                d[key] = worst(d.get(key), v)

            for f in features:
                d = feature_tests.setdefault(f, {})
                d[key] = worst(d.get(key), v)
                if edition:
                    d = edition_feature_tests.setdefault(edition, {}).setdefault(f, {})
                    d[key] = worst(d.get(key), v)

            for t in misc:
                d = misc_tag_tests.setdefault(t, {})
                d[key] = worst(d.get(key), v)

            if not edition and not features:
                no_feature_tests[key] = worst(no_feature_tests.get(key), v)

        return edition_tests, edition_feature_tests, feature_tests, no_feature_tests, misc_tag_tests

    def _tags_json(
        self,
        edition_tests: dict[str, _VerdictMap],
        edition_feature_tests: dict[str, dict[str, _VerdictMap]],
        feature_tests: dict[str, _VerdictMap],
        no_feature_tests: _VerdictMap,
        misc_tag_tests: dict[str, _VerdictMap],
    ) -> tuple[
        dict[str, dict[str, int]],  # editions
        dict[str, dict[str, int]],  # edition_features
        dict[str, dict[str, int]],  # features
        dict[str, dict[str, int]],  # tags (misc)
    ]:
        """Build editions/edition_features/features/tags dicts for JSON output."""
        def to_stats(d: _VerdictMap) -> dict[str, int]:
            s = Stats()
            for v in d.values():
                s.add(v)
            return s.to_dict()

        editions_order = self._editions_order + ["esnext"]

        editions: dict[str, dict[str, int]] = {}
        for edition in editions_order:
            ed = edition_tests.get(edition)
            if ed:
                editions[edition] = to_stats(ed)

        edition_features: dict[str, dict[str, int]] = {}
        for edition in editions_order:
            for f in sorted(edition_feature_tests.get(edition, {})):
                edition_features[f"{edition}/{f}"] = to_stats(edition_feature_tests[edition][f])

        features: dict[str, dict[str, int]] = {}
        for f in sorted(feature_tests):
            features[f] = to_stats(feature_tests[f])
        if no_feature_tests:
            features["N/A"] = to_stats(no_feature_tests)

        tags: dict[str, dict[str, int]] = {}
        for t in sorted(misc_tag_tests):
            tags[t] = to_stats(misc_tag_tests[t])

        return editions, edition_features, features, tags

    def _edition_report(
        self,
        edition_tests: dict[str, _VerdictMap],
        edition_feature_tests: dict[str, dict[str, _VerdictMap]],
        no_feature_tests: _VerdictMap,
    ) -> str:
        uc = self._use_color

        def counts(d: _VerdictMap) -> tuple[int, int, int]:
            ok = sum(1 for v in d.values() if v is Verdict.OK)
            fail = sum(1 for v in d.values() if v is Verdict.FAILED)
            skip = sum(1 for v in d.values() if v is Verdict.SKIPPED)
            return ok, fail, skip

        def all_skipped(d: _VerdictMap) -> bool:
            return all(v is Verdict.SKIPPED for v in d.values())

        lines = ["Summary by edition/feature:"]
        any_data = False
        for edition in self._editions_order + ["esnext"]:
            ed = edition_tests.get(edition)
            if not ed or all_skipped(ed):
                continue
            any_data = True
            lines.append(f"  {format_summary_line(edition, *counts(ed), use_color=uc)}")
            feat_map = edition_feature_tests.get(edition, {})
            for f in sorted(feat_map):
                if not all_skipped(feat_map[f]):
                    lines.append(f"    {format_summary_line(f, *counts(feat_map[f]), use_color=uc)}")
        if no_feature_tests and not all_skipped(no_feature_tests):
            any_data = True
            lines.append(f"  {format_summary_line('N/A', *counts(no_feature_tests), use_color=uc)}")
        return "\n".join(lines) if any_data else ""

    def _to_json(self) -> str:
        results = self._results
        engine = self._engine

        fv = self._file_verdicts()
        test_stats = Stats()
        for v in fv.values():
            test_stats.add(v)

        mode_stats: dict[str, Stats] = {}
        for run in results:
            if run.mode:
                if run.mode not in mode_stats:
                    mode_stats[run.mode] = Stats()
                mode_stats[run.mode].add(run.verdict)

        if self._editions_order:
            et, eft, ft, nft, mt = self._build_tag_data()
            j_editions, j_edition_features, j_features, j_tags = self._tags_json(et, eft, ft, nft, mt)
        else:
            j_editions = j_edition_features = j_features = j_tags = {}

        per_test_rss: dict[str, float] = {}
        per_test_time: dict[str, float] = {}
        for r in results:
            key = (r.run_id or "?").split("@")[0]
            rss = r.metrics.max_rss_kb or 0
            if rss > per_test_rss.get(key, 0):
                per_test_rss[key] = rss
            t = r.metrics.real_time or 0
            if t > per_test_time.get(key, 0):
                per_test_time[key] = t

        top_rss = sorted(per_test_rss.items(), key=lambda x: -x[1])[:20]
        top_rss = [(path, kb) for path, kb in top_rss if kb]

        top_time = sorted(per_test_time.items(), key=lambda x: -x[1])[:20]
        top_time = [(path, t) for path, t in top_time if t]

        def add_ok_percent(d: dict[str, int]) -> dict[str, Any]:
            total = d.get("ok", 0) + d.get("fail", 0)
            if total:
                return {**d, "ok_percent": round(100.0 * d.get("ok", 0) / total, 3)}
            return d

        summary: dict[str, Any] = {
            "tests": add_ok_percent(test_stats.to_dict()),
        }
        if mode_stats:
            summary["modes"] = {s: ss.to_dict() for s, ss in sorted(mode_stats.items())}
        if j_editions:
            summary["editions"] = {k: add_ok_percent(v) for k, v in j_editions.items()}
        if j_edition_features:
            summary["edition_features"] = j_edition_features
        if j_features:
            summary["features"] = j_features
        if j_tags:
            summary["tags"] = j_tags
        summary["dirs"] = _build_dir_stats(results)

        peak_rss_kb = max((r.metrics.max_rss_kb or 0) for r in results) if results else 0

        metrics: dict[str, Any] = {}
        if self._wall_sec:
            metrics["total_time_s"] = round(self._wall_sec, 3)
        if peak_rss_kb:
            metrics["peak_rss_mb"] = round(peak_rss_kb / 1024, 1)
        if top_time:
            metrics["test_time_s"] = {path: round(t, 3) for path, t in top_time}
        if top_rss:
            metrics["test_rss_mb"] = {path: round(kb / 1024, 1) for path, kb in top_rss}

        data: dict[str, Any] = {}
        if engine.build_metadata:
            data["binary"] = engine.build_metadata
        if self._probes is not None:
            data["harness"] = dict(sorted(self._probes.items()))
        if self._test262_revision:
            data["test262_revision"] = self._test262_revision
        data["summary"] = summary
        data["tests"] = _build_test_statuses(results)
        if metrics:
            data["metrics"] = metrics
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
            max_failures = 50
            for r in failed[:max_failures]:
                msg = f"{r.run_id or '?'}: {r.verdict_message()[:120]}"
                if use_color:
                    msg = f"\033[31m{msg}\033[0m"
                print(f"  {msg}")
            if len(failed) > max_failures:
                print(f"  ... and {len(failed) - max_failures} more")
            print()

        if self._editions_order:
            et, eft, _ft, nft, _mt = self._build_tag_data()
            edition_table = self._edition_report(et, eft, nft)
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
