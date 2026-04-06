# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import json
import multiprocessing
import multiprocessing.managers
import os
import queue
import re
import shutil
import sys
import time
from datetime import UTC, datetime
from collections import Counter
from collections.abc import Callable
from pathlib import Path
from typing import TYPE_CHECKING, Any

from .config import EngineConfig
from .frontmatter import test262_features_yaml
from .tags import FilterExpr, Tags
from .runner import RunResult, Verdict
from .util import get_git_revision, version_sort_key

if TYPE_CHECKING:
    from .util import FileDiscovery


@dataclasses.dataclass
class Stats:
    """Aggregated pass/fail/skip counts with optional weighted tracking."""
    total: int = 0
    passed: int = 0
    failed: int = 0
    skipped: int = 0
    weighted_pass: float = 0.0
    weighted_total: float = 0.0
    weighted_count: int = 0

    def add(self, verdict: Verdict | None, weight: float | None = None) -> None:
        self.total += 1
        if verdict is Verdict.OK:
            self.passed += 1
        elif verdict is Verdict.FAILED:
            self.failed += 1
        else:
            self.skipped += 1
        if weight is not None:
            self.weighted_count += 1
            self.weighted_total += weight
            if verdict is Verdict.OK:
                self.weighted_pass += weight

    def merge(self, other: Stats) -> None:
        self.total += other.total
        self.passed += other.passed
        self.failed += other.failed
        self.skipped += other.skipped
        self.weighted_pass += other.weighted_pass
        self.weighted_total += other.weighted_total
        self.weighted_count += other.weighted_count

    def has_weight_for_every_test(self) -> bool:
        """True if all non-skipped files have explicit weights (no mix)."""
        return self.weighted_count > 0 and self.weighted_count == self.passed + self.failed

    def weighted_pass_percent(self) -> float | None:
        if self.has_weight_for_every_test():
            return round(100.0 * self.weighted_pass / self.weighted_total, 3) if self.weighted_total else 0.0
        return None

    def to_dict(self, percent: bool = False) -> dict[str, int | float]:
        d: dict[str, int | float] = {}
        if self.passed:
            d["pass"] = self.passed
        if self.failed:
            d["fail"] = self.failed
        if self.skipped:
            d["skip"] = self.skipped
        total = self.passed + self.failed + self.skipped
        if percent and total:
            d["pass_percent"] = round(100.0 * self.passed / total, 3)
        if percent and self.has_weight_for_every_test():
            d["weight"] = round(self.weighted_total, 3)
            wpct = self.weighted_pass_percent()
            assert wpct is not None
            d["weighted_pass_percent"] = wpct
        return d


def format_summary_line(
    label: str,
    ok: int,
    fail: int,
    skip: int = 0,
    *,
    use_color: bool = False,
    weighted_pass_percent: float | None = None,
) -> str:
    """Format a summary line: label and counts, with optional ANSI color."""
    if use_color:
        if ok + fail == 0:
            label = f"\033[1;33m{label}\033[0m"
        elif fail == 0:
            label = f"\033[1;32m{label}\033[0m"
        else:
            pct = ok * 100 // (ok + fail)
            color = "\033[1;33m" if pct >= 50 else "\033[1;31m"
            label = f"{color}{label}\033[0m"
    if fail == 0:
        counts = f"{ok} passed"
    else:
        pct_str = f"{ok * 100 / (ok + fail):.2f}%"
        if weighted_pass_percent is not None:
            pct_str += f", weighted: {weighted_pass_percent:.2f}%"
        counts = f"{ok}/{ok + fail} ({pct_str}) passed, {fail} failed"
    if skip:
        counts += f"; {skip} skipped"
    return f"{label}: {counts}"

def group_run_results(
    results: list[RunResult],
    test_order: list[str],
    group_by: str = "test_id",
) -> dict[str, Any]:
    """Group run results into test or scenario status maps."""
    if group_by == "test_id" or test_order:
        for run in results:
            if run.test_id is None:
                raise ValueError("run result missing test_id")

    ordered = results
    if test_order:
        n = len(test_order)
        order_map = {test_id: i for i, test_id in enumerate(test_order)}
        ordered = sorted(results, key=lambda r: (
            order_map.get(r.test_id or "", n),
            getattr(r, group_by) or "",
        ))

    grouped: dict[str, list[RunResult]] = {}
    for run in ordered:
        grouped.setdefault(getattr(run, group_by) or "", []).append(run)
    if group_by == "run_id":
        return {
            scenario_id: runs[-1].verdict_message()
            for scenario_id, runs in grouped.items()
        }

    statuses: dict[str, Any] = {}
    for fp, runs in grouped.items():
        messages = [run.verdict_message() for run in runs]
        if len(set(messages)) == 1:
            statuses[fp] = messages[0]
        else:
            by_mode = {run.mode or run.run_id or "": run.verdict_message() for run in runs}
            statuses[fp] = dict(sorted(by_mode.items()))
    return statuses


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
        discovery: FileDiscovery | None = None,
        output_file: str | Path | None = None,
        output_tags_file: str | Path | None = None,
        verbose: int = 0,
        test262: bool = False,
        test262_dir: Path | None = None,
        probes: dict[str, str] | None = None,
        report_rusage: str = "no",
        report_json: bool | None = None,
        report_tests: bool | None = None,
        report_runs: bool | None = None,
        report_dirs: bool = False,
        progress_every: int = 0,
    ) -> None:
        self._engine = engine
        self._discovery = discovery
        self._verbose = verbose
        self._progress_every = progress_every
        self._use_color = sys.stdout.isatty()
        self._test262 = test262
        self._test262_revision = get_git_revision(test262_dir) if test262_dir else None
        self._started_at = datetime.now(UTC)
        self._results: list[RunResult] = []
        # Per-file and per-mode (run) progress counters.
        self._file_counts: Counter[Verdict] = Counter()
        self._mode_counts: Counter[Verdict] = Counter()
        self._editions_order: list[str] = list(test262_features_yaml().keys()) if test262 else []
        # Currently in-flight tests: test_id -> monotonic start time.
        # Progress bar shows the most recently started entry.
        self._in_flight: dict[str, float] = {}
        self._last_completed: str | None = None
        # Manager + queue for workers to signal actual test start times.
        self._mp_manager: multiprocessing.managers.SyncManager | None = None
        self._started_queue: Any | None = None
        self._progress_dirty = False
        # dict used as ordered set (Python 3.7+ insertion order); values unused.
        self._input_order: dict[str, int] = {}
        # Dir progress tracking (initialized by set_expected_dirs)
        self._dir_order: list[str] = []
        self._dir_total: Counter[str] = Counter()
        self._dir_done: Counter[str] = Counter()
        self._dir_passed: Counter[str] = Counter()
        self._dir_failed_tests: dict[str, list[str]] = {}
        self._dir_stats: dict[str, Stats] = {}
        self._dir_next_index: int = 0
        self._probes = probes
        if report_rusage in ("all", "no"):
            self._report_rusage_mode, self._report_rusage_top_n = report_rusage, 0
        else:
            m = re.fullmatch(r"top(\d+)", report_rusage)
            if not m:
                raise ValueError(f"invalid rusage mode: {report_rusage!r}")
            self._report_rusage_mode, self._report_rusage_top_n = "top", int(m.group(1))
        self._output_file = Path(output_file) if output_file is not None else None
        self._output_tags_file = Path(output_tags_file) if output_tags_file is not None else None
        self._report_json = report_json if report_json is not None else bool(
            self._output_file and self._output_file.suffix == ".json"
        )
        self._report_tests = report_tests if report_tests is not None else True
        self._report_runs = report_runs if report_runs is not None else False
        if not self._report_json and self._report_tests and self._report_runs:
            raise ValueError("text output cannot include both tests and runs; use --report-json or disable one")
        if not self._report_json and not self._report_tests and not self._report_runs:
            raise ValueError("text output must include either tests or runs")
        self._report_dirs = report_dirs

    @staticmethod
    def _format_timestamp(ts: datetime) -> str:
        return ts.strftime("%Y-%m-%d %H:%M:%S UTC")

    @property
    def results(self) -> list[RunResult]:
        return self._results

    def is_json_output(self) -> bool:
        return self._report_json

    def _test_order(self) -> list[str]:
        """Return ordered test IDs from discovery or manual note_test calls."""
        if self._discovery is not None:
            return self._discovery.files
        return list(self._input_order)

    def note_test(self, test_id: str) -> None:
        """Record a test ID in discovery order (before results arrive)."""
        if self._discovery is not None:
            return
        if test_id not in self._input_order:
            self._input_order[test_id] = len(self._input_order)

    @property
    def started_queue(self) -> Any:
        """A picklable queue for worker processes to signal test start.

        Workers should call queue.put(test_id) at the beginning of
        execution.  The main process drains these in add_file() to
        update _in_flight with accurate timestamps.
        """
        if self._started_queue is None:
            self._mp_manager = multiprocessing.Manager()
            self._started_queue = self._mp_manager.Queue()
        return self._started_queue

    def _drain_started_queue(self) -> None:
        """Drain the started_queue into _in_flight."""
        q = self._started_queue
        if q is None:
            return
        while True:
            try:
                self._in_flight[q.get_nowait()] = time.monotonic()
            except queue.Empty:
                break

    def set_expected_dirs(self, test_ids: list[str] | None = None) -> None:
        """Set up per-directory progress tracking from the ordered test ID list.

        Call this before add() to enable print_completed_dirs().
        If test_ids is None, uses discovery files (requires discovery.done).
        """
        if test_ids is None:
            test_ids = self._test_order()
        for tid in test_ids:
            self.note_test(tid)
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
        self._dir_stats = {d: Stats() for d in self._dir_order}
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
            t = f" {run.rusage.real_time * 1000:.2f}ms" if run.rusage.real_time else ""
            if run.verdict is Verdict.FAILED:
                msg = f"{run.run_id}: {run.verdict_message()[:120]}{t}"
                if self._use_color:
                    msg = f"\033[1;31m{msg}\033[0m"
                print(msg, flush=True)
                if self._verbose >= 2:
                    run.print_streams()
            else:
                print(f"{run.run_id}: {run.verdict.value if run.verdict else '?'}{t}", flush=True)
                if self._verbose >= 3:
                    run.print_streams()
        # Dir progress tracking
        if self._dir_order:
            assert run.test_id is not None
            fp = run.test_id
            d = os.path.dirname(fp)
            self._dir_done[d] += 1
            self._dir_stats[d].add(run.verdict, run.weight)
            if run.verdict is Verdict.OK:
                self._dir_passed[d] += 1
            else:
                self._dir_failed_tests[d].append(os.path.basename(fp))

    def add_file(self, runs: list[RunResult]) -> None:
        """Record all runs from a single test file and update progress counters.

        Prints a progress line to stderr when not in verbose mode and stderr is a TTY.
        """
        self._drain_started_queue()
        for run in runs:
            self.add(run)
            self._mode_counts[run.verdict or Verdict.FAILED] += 1

        if runs:
            test_id = runs[0].test_id or runs[0].run_id or ""
            self._last_completed = test_id
            self._in_flight.pop(test_id, None)

        if any(r.verdict is Verdict.SKIPPED for r in runs):
            self._file_counts[Verdict.SKIPPED] += 1
        elif any(r.verdict is Verdict.FAILED for r in runs):
            self._file_counts[Verdict.FAILED] += 1
        else:
            self._file_counts[Verdict.OK] += 1

        if self._verbose < 1:
            n_done = sum(self._file_counts.values())
            if self._progress_every:
                if n_done % self._progress_every == 0:
                    if sys.stderr.isatty():
                        self._print_progress()
                    else:
                        print(self._progress_line(), file=sys.stderr, flush=True)
            elif sys.stderr.isatty():
                self._print_progress()

    @staticmethod
    def _truncate_left(text: str, width: int) -> str:
        if len(text) <= width:
            return text
        return "\u2026" + text[-(width - 1):] if width > 1 else "\u2026"

    def _progress_line(self) -> str:
        fc = self._file_counts
        n_done = fc[Verdict.OK] + fc[Verdict.FAILED] + fc[Verdict.SKIPPED]
        d = self._discovery
        if d is not None and d.done and d.count > 0:
            pct = n_done * 100 // d.count
            prefix = f"[{pct}%]"
        else:
            prefix = f"[{n_done}]"
        line = f"{prefix} {fc[Verdict.OK]} passed, {fc[Verdict.FAILED]} failed"
        if fc[Verdict.SKIPPED]:
            line += f", {fc[Verdict.SKIPPED]} skipped"
        show_id = None
        if self._in_flight:
            show_id = max(self._in_flight, key=self._in_flight.__getitem__)
        elif self._last_completed:
            # -j 1 or fast tests: worker finishes before main drains the queue,
            # so _in_flight is empty; fall back to the last completed test.
            show_id = self._last_completed
        if show_id:
            cols = shutil.get_terminal_size((80, 24)).columns
            avail = cols - len(line) - 3  # " | "
            if avail >= 10:
                line += f" | {self._truncate_left(show_id, avail)}"
        return line

    def _print_progress(self) -> None:
        print(f"\r\033[K{self._progress_line()}", end="", file=sys.stderr, flush=True)
        self._progress_dirty = True

    def clear_progress(self) -> None:
        """Clear the progress line from stderr, if one was printed."""
        if self._verbose < 1 and sys.stderr.isatty():
            if self._progress_dirty or self._probes:
                print("\r\033[K", end="", file=sys.stderr, flush=True)
                self._progress_dirty = False

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
            self._progress_dirty = True

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
            line = format_summary_line(d, ok, fail, use_color=self._use_color,
                                       weighted_pass_percent=self._dir_stats[d].weighted_pass_percent())
            prefix = "  " if header else ""
            if fail:
                failed_text = " ".join(self._dir_failed_tests[d])
                candidate = f"{prefix}{line} ({failed_text})"
                cols = shutil.get_terminal_size((80, 24)).columns
                if len(candidate) <= cols:
                    line += f" ({failed_text})"
            print(f"{prefix}{line}", flush=True)

    _INLINE_DICT_KEYS = frozenset({
        "pass", "pass_percent", "weight", "weighted_pass_percent", "fail",
        "skip", "strict", "sloppy", "if", "then", "else", "shell", "user_time",
        "sys_time", "real_time", "max_rss_kb", "io_in_blocks", "io_out_blocks",
        "ctx_switches_voluntary", "ctx_switches_involuntary"
    })
    _INLINE_VALUE_KEYS = frozenset({"console_log"})

    @staticmethod
    def _is_inline_json(value: Any) -> bool:
        if not isinstance(value, dict) or not value:
            return False
        return set(value.keys()) <= Reporter._INLINE_DICT_KEYS

    @staticmethod
    def format_json_value(value: Any, indent: int = 0) -> str:
        """Recursively format JSON; stats dicts go on one line, everything else indented."""
        pad = "  " * indent
        inner = "  " * (indent + 1)
        if isinstance(value, dict):
            if not value or Reporter._is_inline_json(value):
                return json.dumps(value)
            items = [
                f'{inner}{json.dumps(k)}: {json.dumps(v) if k in Reporter._INLINE_VALUE_KEYS else Reporter.format_json_value(v, indent + 1)}'
                for k, v in value.items()
            ]
            return "{\n" + ",\n".join(items) + "\n" + pad + "}"
        if isinstance(value, list):
            items = [f'{inner}{Reporter.format_json_value(v, indent + 1)}' for v in value]
            return "[\n" + ",\n".join(items) + "\n" + pad + "]"
        return json.dumps(value)

    def _file_verdicts(self) -> dict[str, Verdict | None]:
        """Compute per-file worst verdict (deduplicating across modes)."""
        fv: dict[str, Verdict | None] = {}
        for run in self._results:
            assert run.test_id is not None
            fp = run.test_id
            prev = fv.get(fp)
            if prev is Verdict.FAILED or run.verdict is Verdict.FAILED:
                fv[fp] = Verdict.FAILED
            elif prev is Verdict.OK or run.verdict is Verdict.OK:
                fv[fp] = Verdict.OK
            else:
                fv[fp] = run.verdict
        return fv

    def _file_weights(self) -> dict[str, float]:
        """Collect per-file weights (first non-None weight per test_id)."""
        fw: dict[str, float] = {}
        for run in self._results:
            if run.test_id and run.weight is not None and run.test_id not in fw:
                fw[run.test_id] = run.weight
        return fw

    def _build_tag_stats(self, fw: dict[str, float] | None = None) -> dict[str, Stats]:
        """Aggregate per-file worst verdict for each fully-qualified tag."""
        if fw is None:
            fw = {}
        # Collect per-file worst verdict per tag.
        tag_file_verdicts: dict[str, dict[str, Verdict]] = {}
        for r in self._results:
            if not isinstance(r.tags, Tags):
                continue
            assert r.test_id is not None
            key = r.test_id
            v = r.verdict or Verdict.FAILED
            for qt in r.tags:
                fv = tag_file_verdicts.setdefault(qt, {})
                prev = fv.get(key)
                if prev is Verdict.FAILED or v is Verdict.FAILED:
                    fv[key] = Verdict.FAILED
                elif prev is Verdict.OK or v is Verdict.OK:
                    fv[key] = Verdict.OK
                else:
                    fv[key] = v

        result: dict[str, Stats] = {}
        for qt, file_verdicts in tag_file_verdicts.items():
            s = Stats()
            for fp, v in file_verdicts.items():
                s.add(v, fw.get(fp))
            result[qt] = s
        return result

    def _summary_json(self, tag_stats: dict[str, Stats], fv: dict[str, Verdict | None], fw: dict[str, float]) -> dict[str, Any]:
        """Build summary totals."""
        file_tags: dict[str, Tags] = {}
        for r in self._results:
            if r.test_id and isinstance(r.tags, Tags) and r.test_id not in file_tags:
                file_tags[r.test_id] = r.tags

        def total(filter_expr: str | None = None) -> dict[str, int | float]:
            filt = FilterExpr(filter_expr)
            stats = Stats()
            for fp, verdict in fv.items():
                tags = file_tags.get(fp)
                if tags is None or not filt(tags):
                    continue
                stats.add(verdict, fw.get(fp))
            return stats.to_dict(percent=True)

        result: dict[str, Any] = {}
        result["all"] = total()

        if self._test262:
            result["esnext"] = total("edition:esnext")
            result["intl"] = total("test/intl402 | test/staging/Intl402")
            result["staging"] = total("test/staging")
            result["annexb"] = total("test/annexB")
            ex = "test/intl402 | test/staging/Intl402"
            result["ex-intl"] = total(f"~({ex})")
            result["ex-staging"] = total(f"~test/staging")
            ex += "|test/staging";   result["ex-staging-intl"] = total(f"~({ex})")
            ex += "|test/annexB";    result["ex-staging-intl-annexb"] = total(f"~({ex})")
            ex += "|edition:esnext"; result["ex-staging-intl-annexb-esnext"] = total(f"~({ex})")
            ex += "|ref:$262";       result["ex-staging-intl-annexb-esnext-$262"] = total(f"~({ex})")
        else:
            result["es1-5"] = total("dir:es1 | dir:es3 | dir:es5")
            result["es6"] = total("dir:compat-table/es6")
            es2016_dirs = sorted(tag for tag in tag_stats if tag.startswith("dir:compat-table/es20"))
            if es2016_dirs:
                result["es2016+"] = total(" | ".join(es2016_dirs))
            result["esnext"] = total("dir:compat-table/next")
            result["intl"] = total("dir:compat-table/intl")

        return {k: v for k, v in result.items() if v}

    def _tags_stats_json(self, tag_stats: dict[str, Stats]) -> dict[str, Any]:
        """Build reportable tag stats: {qualified_tag: stats} version-sorted."""
        result: dict[str, Any] = {}
        for qt in sorted(tag_stats, key=version_sort_key):
            assert ":" in qt, f"tag must be namespaced: {qt!r}"
            if qt.startswith("file:"):
                continue
            if qt.startswith("dir:"):
                continue
            result[qt] = tag_stats[qt].to_dict(percent=True)
        return result

    def _dirs_json(self, tag_stats: dict[str, Stats]) -> dict[str, Any]:
        """Build dir stats: {path: stats} without the dir: prefix."""
        dirs: dict[str, Any] = {}
        for qt in sorted(tag_stats, key=version_sort_key):
            if qt.startswith("dir:"):
                dirs[qt.removeprefix("dir:")] = tag_stats[qt].to_dict(percent=True)
        return dirs

    def _edition_report(self) -> str:
        """Text summary by edition, with per-feature breakdown."""
        tag_stats = self._build_tag_stats()
        uc = self._use_color
        features_yaml = test262_features_yaml()

        # All features listed in features.yml (to detect unlisted ones).
        all_known_features = {f for feats in features_yaml.values() for f in feats}

        editions_order = self._editions_order + ["esnext"]

        lines = ["Summary by edition / feature (note: feature stats aggregate across all editions):"]
        any_data = False
        skipped = Stats()
        for edition in editions_order:
            s = tag_stats.get(f"edition:{edition}")
            if not s or s.total == s.skipped:
                if s:
                    skipped.merge(s)
                continue
            any_data = True
            lines.append(f"  {format_summary_line(edition, s.passed, s.failed, s.skipped, use_color=uc)}")
            # Show es5id/es6id field stats under their edition
            field = {"es5": "es5id", "es6": "es6id"}.get(edition)
            if field:
                fs = tag_stats.get(f"field:{field}")
                if fs and fs.total > fs.skipped:
                    lines.append(f"    {format_summary_line(field, fs.passed, fs.failed, fs.skipped, use_color=uc)}")
            features = list(features_yaml.get(edition, []))
            # For esnext: also show features not listed in features.yml.
            if edition == "esnext":
                unlisted = sorted(
                    qt.removeprefix("features:")
                    for qt in tag_stats
                    if qt.startswith("features:") and qt.removeprefix("features:") not in ("", "N/A") and qt.removeprefix("features:") not in all_known_features
                )
                features.extend(unlisted)
            for feat in features:
                fs = tag_stats.get(f"features:{feat}")
                if not fs or fs.total == fs.skipped:
                    continue
                lines.append(f"    {format_summary_line(feat, fs.passed, fs.failed, fs.skipped, use_color=uc)}")

        # Tests with no known edition
        na = tag_stats.get("edition:N/A")
        if na:
            if na.total > na.skipped:
                any_data = True
                lines.append(f"  {format_summary_line('N/A', na.passed, na.failed, na.skipped, use_color=uc)}")
            else:
                skipped.merge(na)
        if skipped.total > 0:
            any_data = True
            lines.append(f"  {format_summary_line('skipped', skipped.passed, skipped.failed, skipped.skipped, use_color=uc)}")

        return "\n".join(lines) if any_data else ""

    def to_json(self) -> str:
        """Format results as JSON with summary, per-test/per-scenario statuses, and rusage."""
        results = self._results
        engine = self._engine
        finished_at = datetime.now(UTC)

        rusage: dict[str, Any] = {}
        if self._report_rusage_mode == "top":
            run_rss: list[tuple[str, int]] = [
                (r.run_id or "", r.rusage.max_rss_kb) for r in results if r.rusage.max_rss_kb is not None
            ]
            run_rss.sort(key=lambda x: (-x[1], x[0]))
            run_wall_time: list[tuple[str, float]] = [
                (r.run_id or "", r.rusage.real_time) for r in results if r.rusage.real_time is not None
            ]
            run_wall_time.sort(key=lambda x: (-x[1], x[0]))

            run_rss = run_rss[:self._report_rusage_top_n]
            run_wall_time = run_wall_time[:self._report_rusage_top_n]

            peak_rss_values = [r.rusage.max_rss_kb for r in results if r.rusage.max_rss_kb is not None]
            user_time_values = [r.rusage.user_time for r in results if r.rusage.user_time is not None]
            sys_time_values = [r.rusage.sys_time for r in results if r.rusage.sys_time is not None]
            peak_rss_kb = max(peak_rss_values) if peak_rss_values else None
            sum_user_time = sum(user_time_values) if user_time_values else None
            sum_sys_time = sum(sys_time_values) if sys_time_values else None

            rusage["duration_sec"] = round((finished_at - self._started_at).total_seconds(), 3)
            if sum_user_time is not None:
                rusage["total_user_sec"] = round(sum_user_time, 3)
            if sum_sys_time is not None:
                rusage["total_sys_sec"] = round(sum_sys_time, 3)
            if peak_rss_kb is not None:
                rusage["peak_rss_mb"] = round(peak_rss_kb / 1024, 1)
            if run_wall_time:
                rusage["run_duration_sec"] = {run_id: round(t, 3) for run_id, t in run_wall_time}
            if run_rss:
                rusage["run_rss_mb"] = {run_id: round(kb / 1024, 1) for run_id, kb in run_rss}
        elif self._report_rusage_mode == "all":
            run_ids = [r.run_id for r in results]
            assert all(run_ids), "rusage=all requires run_id"
            assert len(run_ids) == len(set(run_ids)), "rusage=all requires unique run_id"
            rusage = {}
            for r in results:
                assert r.run_id is not None
                rusage[r.run_id] = r.rusage.to_json()

        if self._report_rusage_mode != "no" and rusage:
            rusage = {
                "started_at": self._format_timestamp(self._started_at),
                "finished_at": self._format_timestamp(finished_at),
                **rusage,
            }

        data: dict[str, Any] = {}
        if engine.build_metadata:
            data["binary"] = engine.build_metadata
        elif self._engine.binary_path:
            data["binary"] = {"binary_name": os.path.basename(self._engine.binary_path)}
        if engine.flags:
            data["flags"] = engine.flags
        if self._probes is not None:
            data["probes"] = dict(sorted(self._probes.items()))
        if self._test262_revision:
            data["test262"] = self._test262_revision.to_json()
        fv = self._file_verdicts()
        fw = self._file_weights()
        tag_stats = self._build_tag_stats(fw)
        data["summary"] = self._summary_json(tag_stats, fv, fw)
        tags = self._tags_stats_json(tag_stats)
        if tags:
            data["tags"] = tags
        if self._report_dirs:
            dirs = self._dirs_json(tag_stats)
            if dirs:
                data["dirs"] = dirs
        if self._report_rusage_mode != "no" and rusage:
            data["rusage"] = rusage
        test_order = self._test_order()
        if self._report_tests:
            data["tests"] = group_run_results(results, test_order)
        if self._report_runs:
            data["scenarios"] = group_run_results(results, test_order, "run_id")
        return self.format_json_value(data) + "\n"

    def to_text(self) -> str:
        """Format results as text."""
        lines: list[str] = []
        if self._report_runs:
            results = self._results
            test_order = self._test_order()
            if test_order:
                order_map = {tid: i for i, tid in enumerate(test_order)}
                n = len(test_order)
                results = sorted(results, key=lambda r: (order_map.get(r.test_id or "", n), r.run_id or ""))
            lines.extend(f"{r.run_id}: {r.verdict_message()}" for r in results)
        else:
            statuses = group_run_results(self._results, self._test_order())
            for fp, status in statuses.items():
                if isinstance(status, str):
                    lines.append(f"{fp}: {status}")
                else:
                    lines.append(f"{fp}: {json.dumps(status, ensure_ascii=False)}")
        return "\n".join(lines) + "\n" if lines else ""

    def _tags_by_file(self) -> dict[str, list[str]]:
        """Build per-file qualified tag lists, excluding file:* and dir:* tags."""
        tags_by_file: dict[str, set[str]] = {}
        for run in self._results:
            if run.test_id and isinstance(run.tags, Tags):
                tags_by_file.setdefault(run.test_id, set()).update(
                    tag for tag in run.tags
                    if not tag.startswith("file:") and not tag.startswith("dir:")
                )
        return {
            fp: sorted(tags)
            for fp, tags in sorted(tags_by_file.items())
        }

    def to_tags_json(self) -> str:
        """Format per-file tags as JSON with one entry per line."""
        data = self._tags_by_file()
        if not data:
            return "{}\n"
        lines = ["{"]
        items = list(data.items())
        for i, (fp, tags) in enumerate(items):
            suffix = "," if i + 1 < len(items) else ""
            lines.append(f"  {json.dumps(fp)}: {json.dumps(tags, ensure_ascii=False)}{suffix}")
        lines.append("}")
        return "\n".join(lines) + "\n"

    @staticmethod
    def _write_path(path: Path, out: str, success_label: str) -> None:
        if str(path) == "-":
            sys.stdout.write(out)
            return
        if str(path).startswith("/dev/"):
            path.write_text(out, encoding="utf-8")
            return
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
        print(f"{success_label} written to {path}")

    def write(self) -> None:
        """Write results to file.

        JSON output may include tests and/or scenarios sections.
        Text output can include either tests or scenarios, but not both.
        """
        if self._output_file is None:
            raise ValueError("output_file is not configured")
        path = self._output_file
        if self._report_json:
            out = self.to_json()
        else:
            out = self.to_text()
        self._write_path(path, out, "Results")

    def write_tags(self) -> None:
        """Write per-file tags JSON to the configured output file."""
        if self._output_tags_file is None:
            raise ValueError("output_tags_file is not configured")
        self._write_path(self._output_tags_file, self.to_tags_json(), "Tags")

    def print_summary(self) -> int:
        """Print failure list, optional breakdowns, and summary line. Returns fail count."""
        results = self._results
        engine_name = self._engine.name
        use_color = self._use_color
        finished_at = datetime.now(UTC)
        elapsed_sec = (finished_at - self._started_at).total_seconds()

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
            edition_table = self._edition_report()
            if edition_table:
                print(edition_table)
                print()

        peak_rss_kb = max((r.rusage.max_rss_kb or 0) for r in results) if results else 0

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
            line += f" in {elapsed_sec:.3f}s"
            if peak_rss_kb:
                line += f", peak RSS: {peak_rss_kb / 1024:.1f}MB"
        else:
            line = f"{engine_name}: no tests were run"
        print(line)

        return len(failed)
