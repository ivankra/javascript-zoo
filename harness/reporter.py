# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import json
import os
import re
import shutil
import sys
import time
from collections import Counter
from pathlib import Path
from typing import TYPE_CHECKING, Any

from .config import EngineConfig
from .frontmatter import test262_features_yaml
from .tags import Tags
from .runner import RunResult, Verdict
from .util import get_git_revision, version_sort_key

if TYPE_CHECKING:
    from .util import FileDiscovery


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

    def merge(self, other: Stats) -> None:
        self.total += other.total
        self.passed += other.passed
        self.failed += other.failed
        self.skipped += other.skipped

    def to_dict(self) -> dict[str, int]:
        d = {"ok": self.passed, "fail": self.failed, "skip": self.skipped}
        return {k: v for k, v in d.items() if v}


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
        counts = f"{ok}/{ok + fail} ({ok * 100 / (ok + fail):.2f}%) passed, {fail} failed"
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
        verbose: int = 0,
        test262: bool = False,
        test262_dir: Path | None = None,
        probes: dict[str, str] | None = None,
        report_rusage: str = "no",
        report_json: bool | None = None,
        report_tests: bool | None = None,
        report_runs: bool | None = None,
        report_dirs: bool = True,
    ) -> None:
        self._engine = engine
        self._discovery = discovery
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
        # Currently in-flight tests: test_id -> monotonic start time.
        # Progress bar shows the most recently submitted entry.
        self._in_flight: dict[str, float] = {}
        self._progress_dirty = False
        # dict used as ordered set (Python 3.7+ insertion order); values unused.
        self._input_order: dict[str, int] = {}
        # Dir progress tracking (initialized by set_expected_dirs)
        self._dir_order: list[str] = []
        self._dir_total: Counter[str] = Counter()
        self._dir_done: Counter[str] = Counter()
        self._dir_passed: Counter[str] = Counter()
        self._dir_failed_tests: dict[str, list[str]] = {}
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

    def note_started(self, test_id: str) -> None:
        """Mark a test as in-flight (submitted to process pool)."""
        self._in_flight[test_id] = time.monotonic()

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

        if runs:
            test_id = runs[0].test_id or runs[0].run_id or ""
            self._in_flight.pop(test_id, None)

        if any(r.verdict is Verdict.SKIPPED for r in runs):
            self._file_counts[Verdict.SKIPPED] += 1
        elif any(r.verdict is Verdict.FAILED for r in runs):
            self._file_counts[Verdict.FAILED] += 1
        else:
            self._file_counts[Verdict.OK] += 1

        if self._verbose < 1 and sys.stderr.isatty():
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
        if self._in_flight:
            latest_id = max(self._in_flight, key=self._in_flight.__getitem__)
            cols = shutil.get_terminal_size((80, 24)).columns
            avail = cols - len(line) - 3  # " | "
            if avail >= 10:
                line += f" | {self._truncate_left(latest_id, avail)}"
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
            line = format_summary_line(d, ok, fail, use_color=self._use_color)
            if fail:
                failed_text = " ".join(self._dir_failed_tests[d])
                if failed_text and len(failed_text) < 60:
                    line += f"; {failed_text}"
            print(f"  {line}" if header else line, flush=True)

    _INLINE_DICT_KEYS = frozenset({
        "ok", "ok_percent", "fail", "skip", "strict", "sloppy", "if", "then",
        "else", "shell", "user_time", "sys_time", "real_time", "max_rss_kb",
        "io_in_blocks", "io_out_blocks", "ctx_switches_voluntary",
        "ctx_switches_involuntary"
    })

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
            items = [f'{inner}{json.dumps(k)}: {Reporter.format_json_value(v, indent + 1)}'
                     for k, v in value.items()]
            return "{\n" + ",\n".join(items) + "\n" + pad + "}"
        if isinstance(value, list):
            items = [f'{inner}{Reporter.format_json_value(v, indent + 1)}' for v in value]
            return "[\n" + ",\n".join(items) + "\n" + pad + "]"
        return json.dumps(value)

    # ── Internal helpers ──────────────────────────────────────────────────────

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

    def _build_tag_stats(self) -> dict[str, Stats]:
        """Aggregate per-file worst verdict for each fully-qualified tag."""
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
        for qt, fv in tag_file_verdicts.items():
            s = Stats()
            for v in fv.values():
                s.add(v)
            result[qt] = s
        return result

    def _summary_json(self) -> dict[str, Any]:
        """Build summary: tests at top, then {qualified_tag: stats} version-sorted.

        Excludes dir: tags (those go in _dirs_json()).
        """
        fv = self._file_verdicts()
        test_stats = Stats()
        for v in fv.values():
            test_stats.add(v)

        def add_ok_percent(d: dict[str, int]) -> dict[str, int | float]:
            total = d.get("ok", 0) + d.get("fail", 0)
            if total:
                return {**d, "ok_percent": round(100.0 * d.get("ok", 0) / total, 3)}
            return dict(d)

        result: dict[str, Any] = {}
        result["tests"] = add_ok_percent(test_stats.to_dict())

        tag_stats = self._build_tag_stats()
        for qt in sorted(tag_stats, key=version_sort_key):
            assert ":" in qt, f"tag must be namespaced: {qt!r}"
            if qt.startswith("dir:"):
                continue
            d = tag_stats[qt].to_dict()
            result[qt] = add_ok_percent(d) if qt.startswith("edition:") else d

        return result

    def _dirs_json(self) -> dict[str, Any]:
        """Build dir stats: {path: stats} without the dir: prefix."""
        tag_stats = self._build_tag_stats()
        dirs: dict[str, Any] = {}
        for qt in sorted(tag_stats, key=version_sort_key):
            if qt.startswith("dir:"):
                dirs[qt.removeprefix("dir:")] = tag_stats[qt].to_dict()
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

        rusage: dict[str, Any] = {}
        if self._report_rusage_mode == "top":
            run_rss = [(r.run_id or "", r.rusage.max_rss_kb or 0) for r in results]
            run_rss = sorted(((run_id, kb) for run_id, kb in run_rss if kb), key=lambda x: (-x[1], x[0]))
            run_wall_time = [(r.run_id or "", r.rusage.real_time or 0) for r in results]
            run_wall_time = sorted(((run_id, t) for run_id, t in run_wall_time if t), key=lambda x: (-x[1], x[0]))

            run_rss = run_rss[:self._report_rusage_top_n]
            run_wall_time = run_wall_time[:self._report_rusage_top_n]

            peak_rss_kb = max((r.rusage.max_rss_kb or 0) for r in results) if results else 0

            if self._wall_sec:
                rusage["total_time_s"] = round(self._wall_sec, 3)
            if peak_rss_kb:
                rusage["peak_rss_mb"] = round(peak_rss_kb / 1024, 1)
            if run_wall_time:
                rusage["wall_time_s"] = {run_id: round(t, 3) for run_id, t in run_wall_time}
            if run_rss:
                rusage["rss_mb"] = {run_id: round(kb / 1024, 1) for run_id, kb in run_rss}
        elif self._report_rusage_mode == "all":
            run_ids = [r.run_id for r in results]
            assert all(run_ids), "rusage=all requires run_id"
            assert len(run_ids) == len(set(run_ids)), "rusage=all requires unique run_id"
            rusage = {}
            for r in results:
                assert r.run_id is not None
                rusage[r.run_id] = r.rusage.to_json()

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
        data["summary"] = self._summary_json()
        if self._report_dirs:
            dirs = self._dirs_json()
            if dirs:
                data["dirs"] = dirs
        test_order = self._test_order()
        if self._report_tests:
            data["tests"] = group_run_results(results, test_order)
        if self._report_runs:
            data["scenarios"] = group_run_results(results, test_order, "run_id")
        if self._report_rusage_mode != "no" and rusage:
            data["rusage"] = rusage
        return self.format_json_value(data) + "\n"

    def to_text(self) -> str:
        """Format results as text."""
        lines: list[str] = []
        if self._engine.build_metadata:
            lines.append(f"Metadata: {json.dumps(self._engine.build_metadata, ensure_ascii=False, separators=(',', ':'))}")
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

    def write(self, *, wall_sec: float = 0) -> None:
        """Write results to file.

        JSON output may include tests and/or scenarios sections.
        Text output can include either tests or scenarios, but not both.
        """
        if wall_sec:
            self._wall_sec = wall_sec
        if self._output_file is None:
            raise ValueError("output_file is not configured")
        path = self._output_file
        if self._report_json:
            out = self.to_json()
        else:
            out = self.to_text()
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
            if wall_sec:
                line += f", wall time: {wall_sec:.3f}s"
            if peak_rss_kb:
                line += f", peak RSS: {peak_rss_kb / 1024:.1f}MB"
        else:
            line = f"{engine_name}: no tests were run"
        print(line)

        return len(failed)
