# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import unittest
import json
import contextlib
import io
import os
import tempfile
from datetime import UTC, datetime
from pathlib import Path
from unittest.mock import patch

from harness.config import EngineConfig
from harness.frontmatter import Frontmatter
from harness.tags import Tags
from harness.reporter import Reporter, group_run_results
from harness.runner import RunResult, RunRusage, Verdict
from harness.util import FileDiscovery


def _run(
    run_id: str,
    verdict: Verdict,
    *,
    tags: Tags | None = None,
    mode: str = "",
    test_id: str | None = None,
    rusage: RunRusage | None = None,
) -> RunResult:
    return RunResult(
        run_id=run_id,
        test_id=test_id or run_id,
        verdict_type=verdict,
        tags=tags,
        mode=mode,
        rusage=rusage or RunRusage(),
    )


def _t262(features: set[str] | None = None, *, mode: str) -> Tags:
    """Build a Tags with features and mode, like test262.py does."""
    fm = Frontmatter(features=features or set())
    tags = Tags.test262(fm)
    tags.add("mode", mode)
    return tags


class TestTagStats(unittest.TestCase):
    """Test _build_tag_stats deduplication and mode tag equivalence."""

    def _reporter(self, runs: list[RunResult]) -> Reporter:
        r = Reporter(EngineConfig(binary_path="/fake/js"))
        for run in runs:
            r.test_completed([run])
        return r

    def test_per_file_dedup_worst_verdict(self):
        """Two modes for one file: strict=OK, sloppy=FAIL -> file counts as FAIL."""
        tags_s = _t262({"Symbol"}, mode="strict")
        tags_l = _t262({"Symbol"}, mode="sloppy")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.PASS, tags=tags_s, mode="strict", test_id="test/a.js"),
            _run("test/a.sloppy.js", Verdict.FAIL, tags=tags_l, mode="sloppy", test_id="test/a.js"),
        ])
        stats = r._build_tag_stats()
        # features:Symbol should show 1 file, counted as FAIL (worst of the two modes)
        self.assertEqual(stats["features:Symbol"].total, 1)
        self.assertEqual(stats["features:Symbol"].failed, 1)
        self.assertEqual(stats["features:Symbol"].passed, 0)

    def test_mode_tags_are_per_run(self):
        """mode:strict and mode:sloppy each see their own run, no cross-mode dedup."""
        tags_s = _t262({"Symbol"}, mode="strict")
        tags_l = _t262({"Symbol"}, mode="sloppy")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.PASS, tags=tags_s, mode="strict", test_id="test/a.js"),
            _run("test/a.sloppy.js", Verdict.FAIL, tags=tags_l, mode="sloppy", test_id="test/a.js"),
        ])
        stats = r._build_tag_stats()
        # Each mode tag sees exactly 1 file (since file+mode is unique)
        self.assertEqual(stats["mode:strict"].total, 1)
        self.assertEqual(stats["mode:strict"].passed, 1)
        self.assertEqual(stats["mode:sloppy"].total, 1)
        self.assertEqual(stats["mode:sloppy"].failed, 1)

    def test_mode_tags_match_raw_counts(self):
        """mode:* tag stats equal raw per-run counts (no dedup effect)."""
        runs = []
        for name, v in [("a", Verdict.PASS), ("b", Verdict.FAIL), ("c", Verdict.PASS)]:
            for mode in ("strict", "sloppy"):
                tags = _t262({"Symbol"}, mode=mode)
                runs.append(_run(f"test/{name}.{mode}.js", v, tags=tags, mode=mode, test_id=f"test/{name}.js"))
        r = self._reporter(runs)
        stats = r._build_tag_stats()
        # 3 files per mode, each file unique per mode -> same as raw counts
        for mode in ("strict", "sloppy"):
            s = stats[f"mode:{mode}"]
            self.assertEqual(s.total, 3)
            self.assertEqual(s.passed, 2)
            self.assertEqual(s.failed, 1)

    def test_summary_tests_deduped(self):
        """summary["all"] deduplicates across modes (per-file worst)."""
        tags_s = _t262(mode="strict")
        tags_l = _t262(mode="sloppy")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.PASS, tags=tags_s, mode="strict", test_id="test/a.js"),
            _run("test/a.sloppy.js", Verdict.PASS, tags=tags_l, mode="sloppy", test_id="test/a.js"),
            _run("test/b.strict.js", Verdict.PASS, tags=tags_s, mode="strict", test_id="test/b.js"),
            _run("test/b.sloppy.js", Verdict.FAIL, tags=tags_l, mode="sloppy", test_id="test/b.js"),
        ])
        summary = r._summary_json(r._build_tag_stats(), r._file_verdicts(), r._file_weights())
        # 2 files: a=OK, b=FAIL (worst of strict OK + sloppy FAIL)
        self.assertEqual(summary["all"]["pass"], 1)
        self.assertEqual(summary["all"]["fail"], 1)

    def test_skipped_with_tags_counted(self):
        """Skipped results with tags appear in tag stats."""
        tags = Tags.test262(Frontmatter(features={"Symbol"}))
        r = self._reporter([
            _run("test/a.js", Verdict.SKIP, tags=tags),
        ])
        stats = r._build_tag_stats()
        self.assertEqual(stats["features:Symbol"].skipped, 1)

    def test_results_without_tags_excluded_from_tag_stats(self):
        """Results with tags=None are silently excluded from tag stats."""
        r = self._reporter([
            _run("test/a.js", Verdict.PASS, tags=None),
        ])
        stats = r._build_tag_stats()
        self.assertEqual(stats, {})

    def test_empty_features_and_edition_in_stats(self):
        """Tests with no features/edition produce 'features:N/A' and 'edition:N/A' keys."""
        tags = _t262(mode="strict")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.PASS, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        stats = r._build_tag_stats()
        self.assertIn("features:N/A", stats)
        self.assertEqual(stats["features:N/A"].passed, 1)
        self.assertIn("edition:N/A", stats)
        self.assertEqual(stats["edition:N/A"].passed, 1)

    def test_empty_keys_in_tags_json(self):
        """'features:N/A' and 'edition:N/A' appear in tags JSON for featureless tests."""
        tags = _t262(mode="strict")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.PASS, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        tag_stats = r._tags_stats_json(r._build_tag_stats())
        self.assertIn("features:N/A", tag_stats)
        self.assertIn("edition:N/A", tag_stats)

    def test_file_tags_are_not_reported(self):
        """file:* tags stay filterable but are omitted from JSON tag stats."""
        fm = Frontmatter(features={"Symbol"})
        tags = Tags.test262(fm, rel_path="test/built-ins/Map/a.js")
        tags.add("mode", "strict")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.PASS, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        stats = r._build_tag_stats()
        self.assertIn("file:test/built-ins/Map/a.js", stats)
        tag_stats = r._tags_stats_json(stats)
        self.assertNotIn("file:test/built-ins/Map/a.js", tag_stats)

    def test_dir_tags_never_in_tags_stats(self):
        """dir:* tags are excluded from _tags_stats_json (they go in dirs section)."""
        fm = Frontmatter(features={"Symbol"})
        tags = Tags.test262(fm, rel_path="test/built-ins/Map/a.js")
        tags.add("mode", "strict")

        r = Reporter(EngineConfig(binary_path="/fake/js"), report_dirs=True)
        r.test_completed([_run("test/a.strict.js", Verdict.PASS, tags=tags, mode="strict", test_id="test/a.js")])
        self.assertNotIn("dir:test", r._tags_stats_json(r._build_tag_stats()))

    def test_dirs_json_when_enabled(self):
        """_dirs_json returns dir stats without the dir: prefix."""
        fm = Frontmatter(features={"Symbol"})
        tags = Tags.test262(fm, rel_path="test/built-ins/Map/a.js")
        tags.add("mode", "strict")

        r = Reporter(EngineConfig(binary_path="/fake/js"), report_dirs=True)
        r.test_completed([_run("test/a.strict.js", Verdict.PASS, tags=tags, mode="strict", test_id="test/a.js")])
        dirs = r._dirs_json(r._build_tag_stats())
        self.assertIn("test", dirs)
        self.assertIn("test/built-ins", dirs)
        self.assertNotIn("dir:test", dirs)


class TestTags(unittest.TestCase):
    def test_test262_adds_file_and_dir_tags(self):
        fm = Frontmatter(features={"Symbol"})
        tags = Tags.test262(fm, rel_path="test/built-ins/Map/a.js")
        self.assertIn("file:test/built-ins/Map/a.js", tags)
        self.assertIn("dir:test", tags)
        self.assertIn("dir:test/built-ins", tags)
        self.assertIn("dir:test/built-ins/Map", tags)


class TestEditionReport(unittest.TestCase):
    """Test _edition_report grouping, 'N/A' and 'skipped' buckets."""

    def _reporter(self, runs: list[RunResult]) -> Reporter:
        r = Reporter(EngineConfig(binary_path="/fake/js"), test262=True)
        for run in runs:
            r.test_completed([run])
        return r

    def test_editions_partition(self):
        """Edition passed+failed+skipped sums match total across all edition lines."""
        runs = []
        for i, (feat, verdict) in enumerate([
            ("Symbol", Verdict.PASS),        # es6
            ("Promise", Verdict.PASS),        # es6
            ("BigInt", Verdict.FAIL),     # es2020
        ]):
            tags = _t262({feat}, mode="strict")
            runs.append(_run(f"test/{i}.strict.js", verdict, tags=tags, mode="strict", test_id=f"test/{i}.js"))
        r = self._reporter(runs)
        stats = r._build_tag_stats()
        # Each test belongs to exactly one edition
        edition_total = sum(
            s.total for qt, s in stats.items()
            if qt.startswith("edition:")
        )
        self.assertEqual(edition_total, 3)

    def test_na_collects_no_edition(self):
        """Tests with no features land in 'N/A', not in any edition."""
        tags = _t262(mode="strict")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.PASS, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        report = r._edition_report()
        self.assertIn("N/A", report)
        self.assertNotIn("esnext", report)

    def test_skipped_edition_goes_to_skipped(self):
        """An edition where all tests are skipped merges into 'skipped'."""
        tags = _t262({"Symbol"}, mode="strict")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.SKIP, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        report = r._edition_report()
        self.assertIn("skipped", report)
        self.assertNotIn("es6", report)

    def test_unlisted_feature_under_esnext(self):
        """Features not in features.yml appear under esnext."""
        tags = _t262({"SomeNewProposal"}, mode="strict")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.FAIL, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        report = r._edition_report()
        self.assertIn("esnext", report)
        self.assertIn("SomeNewProposal", report)

    def test_empty_feature_not_shown(self):
        """The empty 'features:' sentinel never appears as a feature line."""
        tags = _t262(mode="strict")  # no features
        r = self._reporter([
            _run("test/a.strict.js", Verdict.PASS, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        report = r._edition_report()
        # Should not have a bare "    : " line
        for line in report.splitlines():
            stripped = line.strip()
            if stripped.startswith(":"):
                self.fail(f"Empty feature label in report: {line!r}")


class TestJsonFormatting(unittest.TestCase):
    def test_per_mode_verdict_dict_is_inline(self):
        """Per-mode verdict dicts render on a single line, not expanded."""
        data = {"test/a.js": {"strict": "PASS", "sloppy": "FAIL: some error"}}
        out = Reporter.format_json_value(data)
        # The inner dict should be on the same line as the key
        for line in out.splitlines():
            if '"test/a.js"' in line:
                self.assertIn('"strict"', line)
                self.assertIn('"sloppy"', line)
                break
        else:
            self.fail('"test/a.js" not found in output')

    def test_stats_dict_is_inline(self):
        """Stats dicts (ok/fail/skip) render on a single line."""
        data = {"features:Symbol": {"pass": 10, "fail": 2}}
        out = Reporter.format_json_value(data)
        for line in out.splitlines():
            if '"features:Symbol"' in line:
                self.assertIn('"pass"', line)
                self.assertIn('"fail"', line)
                break
        else:
            self.fail('"features:Symbol" not found in output')

    def test_nested_dict_is_not_inline(self):
        """Dicts containing non-scalar values are still expanded."""
        data = {"outer": {"inner": {"a": 1}}}
        out = Reporter.format_json_value(data)
        # "outer" and "inner" should be on different lines
        lines = [l.strip() for l in out.splitlines()]
        outer_line = next(l for l in lines if '"outer"' in l)
        self.assertNotIn('"a"', outer_line)


class TestOutputTags(unittest.TestCase):
    def test_to_tags_json_excludes_file_tags_and_keeps_one_entry_per_line(self):
        fm = Frontmatter(features={"Symbol"})
        tags = Tags.test262(fm, rel_path="test/built-ins/Map/a.js")
        tags.add("mode", "strict")
        r = Reporter(EngineConfig(binary_path="/fake/js"))
        r.test_completed([
            _run("test/a.strict.js", Verdict.PASS, tags=tags, mode="strict", test_id="test/a.js"),
        ])

        out = r.to_tags_json()
        self.assertTrue(out.startswith("{\n"))
        self.assertIn('  "test/a.js": [', out)
        self.assertNotIn("file:test/built-ins/Map/a.js", out)
        self.assertNotIn("dir:test", out)
        self.assertIn("mode:strict", out)

    def test_write_tags_writes_json_file(self):
        fm = Frontmatter(features={"Symbol"})
        tags = Tags.test262(fm, rel_path="test/built-ins/Map/a.js")
        tags.add("mode", "strict")
        with tempfile.TemporaryDirectory() as tmpdir:
            path = os.path.join(tmpdir, "tags.json")
            r = Reporter(EngineConfig(binary_path="/fake/js"), output_tags_file=path)
            r.test_completed([
                _run("test/a.strict.js", Verdict.PASS, tags=tags, mode="strict", test_id="test/a.js"),
            ])
            r.write_tags()
            data = json.loads(Path(path).read_text(encoding="utf-8"))
            self.assertEqual(sorted(data), ["test/a.js"])
            self.assertNotIn("dir:test", data["test/a.js"])
            self.assertNotIn("file:test/built-ins/Map/a.js", data["test/a.js"])

    def test_to_tags_json_unions_modes_for_same_file(self):
        fm = Frontmatter(features={"Symbol"})
        strict_tags = Tags.test262(fm, rel_path="test/built-ins/Map/a.js")
        strict_tags.add("mode", "strict")
        sloppy_tags = Tags.test262(fm, rel_path="test/built-ins/Map/a.js")
        sloppy_tags.add("mode", "sloppy")
        r = Reporter(EngineConfig(binary_path="/fake/js"))
        r.test_completed([
            _run("test/a.strict.js", Verdict.PASS, tags=strict_tags, mode="strict", test_id="test/a.js"),
            _run("test/a.sloppy.js", Verdict.PASS, tags=sloppy_tags, mode="sloppy", test_id="test/a.js"),
        ])

        data = json.loads(r.to_tags_json())
        self.assertIn("mode:strict", data["test/a.js"])
        self.assertIn("mode:sloppy", data["test/a.js"])


class TestTestOrder(unittest.TestCase):
    def test_discovery_preserves_order(self):
        d = FileDiscovery.from_list(["c.js", "a.js", "b.js"])
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=d)
        self.assertEqual(r._test_order(), ["c.js", "a.js", "b.js"])

    def test_group_run_results_uses_test_order_then_appends_leftovers(self):
        runs = [
            _run("test/c.strict.js", Verdict.PASS, test_id="test/c.js"),
            _run("test/a.strict.js", Verdict.PASS, test_id="test/a.js"),
            _run("test/b.strict.js", Verdict.PASS, test_id="test/b.js"),
        ]
        grouped = group_run_results(
            runs,
            ["test/a.js", "test/b.js"],
        )
        self.assertEqual(list(grouped), ["test/a.js", "test/b.js", "test/c.js"])

    def test_group_run_results_rejects_missing_test_id(self):
        run = _run("test/a.strict.js", Verdict.PASS, test_id="test/a.js")
        run.test_id = None
        with self.assertRaisesRegex(ValueError, "missing test_id"):
            group_run_results([run], [])


class TestReporterRusageJson(unittest.TestCase):
    def test_json_omits_rusage_by_default(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=FileDiscovery.from_list(["test/a.js"]))
        r.test_completed([
            _run(
                "test/a.strict.js",
                Verdict.PASS,
                test_id="test/a.js",
                rusage=RunRusage(real_time=1.25, max_rss_kb=2048),
            )
        ])
        out = json.loads(r.to_json())
        self.assertNotIn("rusage", out)

    def test_json_reports_top_rusage_when_requested(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=FileDiscovery.from_list(["test/a.js"]), report_rusage="top20")
        r.test_completed([
            _run(
                "test/a.strict.js",
                Verdict.PASS,
                test_id="test/a.js",
                rusage=RunRusage(real_time=1.25, max_rss_kb=2048),
            )
        ])
        out = json.loads(r.to_json())
        self.assertIn("rusage", out)
        self.assertEqual(out["rusage"]["duration_sec"], 0)
        self.assertNotIn("total_user_sec", out["rusage"])
        self.assertNotIn("total_sys_sec", out["rusage"])
        self.assertEqual(out["rusage"]["peak_rss_mb"], 2.0)
        self.assertEqual(out["rusage"]["run_duration_sec"]["test/a.strict.js"], 1.25)
        self.assertEqual(out["rusage"]["run_rss_mb"]["test/a.strict.js"], 2.0)
        self.assertRegex(out["rusage"]["started_at"], r"^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC$")

    def test_json_omits_rusage_when_disabled(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=FileDiscovery.from_list(["test/a.js"]), report_rusage="no")
        r.test_completed([
            _run(
                "test/a.js",
                Verdict.PASS,
                test_id="test/a.js",
                rusage=RunRusage(real_time=1.25, max_rss_kb=2048),
            )
        ])
        out = json.loads(r.to_json())
        self.assertNotIn("rusage", out)

    def test_json_reports_all_runs_when_requested(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=FileDiscovery.from_list(["test/a.js"]), report_rusage="all")
        r.test_completed([
            _run("test/a.strict.js", Verdict.PASS, test_id="test/a.js", rusage=RunRusage(real_time=1.25, max_rss_kb=2048)),
            _run("test/a.sloppy.js", Verdict.PASS, test_id="test/a.js", rusage=RunRusage(real_time=0.5, max_rss_kb=1024)),
        ])
        out = json.loads(r.to_json())
        self.assertEqual(out["rusage"]["test/a.strict.js"]["real_time"], 1.25)
        self.assertEqual(out["rusage"]["test/a.strict.js"]["max_rss_kb"], 2048)
        self.assertEqual(out["rusage"]["test/a.sloppy.js"]["real_time"], 0.5)
        self.assertEqual(out["rusage"]["test/a.sloppy.js"]["max_rss_kb"], 1024)

    def test_json_reports_aggregate_duration_sec(self):
        with patch("harness.reporter.datetime", wraps=datetime) as mock_datetime:
            mock_datetime.now.side_effect = [
                datetime(2026, 4, 5, 4, 28, 10, tzinfo=UTC),
                datetime(2026, 4, 5, 4, 28, 12, 500000, tzinfo=UTC),
            ]
            r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=FileDiscovery.from_list(["test/a.js"]), report_rusage="top20")
            r.test_completed([
                _run("test/a.strict.js", Verdict.PASS, test_id="test/a.js", rusage=RunRusage(real_time=1.25, max_rss_kb=2048)),
            ])
            out = json.loads(r.to_json())
        self.assertEqual(out["rusage"]["started_at"], "2026-04-05 04:28:10 UTC")
        self.assertEqual(out["rusage"]["duration_sec"], 2.5)

    def test_json_reports_zero_rusage_values(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=FileDiscovery.from_list(["test/a.js"]), report_rusage="top20")
        r.test_completed([
            _run(
                "test/a.strict.js",
                Verdict.PASS,
                test_id="test/a.js",
                rusage=RunRusage(real_time=0.0, user_time=0.0, sys_time=0.0, max_rss_kb=0),
            ),
        ])
        out = json.loads(r.to_json())
        self.assertEqual(out["rusage"]["duration_sec"], 0)
        self.assertEqual(out["rusage"]["total_user_sec"], 0)
        self.assertEqual(out["rusage"]["total_sys_sec"], 0)
        self.assertEqual(out["rusage"]["peak_rss_mb"], 0.0)
        self.assertEqual(out["rusage"]["run_duration_sec"]["test/a.strict.js"], 0.0)
        self.assertEqual(out["rusage"]["run_rss_mb"]["test/a.strict.js"], 0.0)

    def test_json_reports_all_runs_requires_unique_run_id(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), report_rusage="all")
        r.test_completed([
            _run("run/a.js", Verdict.PASS, test_id="test/a.js"),
            _run("run/a.js", Verdict.PASS, test_id="test/b.js"),
        ])
        with self.assertRaisesRegex(AssertionError, "unique run_id"):
            r.to_json()

    def test_json_reports_rusage_sorted_descending(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), report_rusage="top20")
        r.test_completed([
            _run("run/a.js", Verdict.PASS, test_id="test/a.js", rusage=RunRusage(real_time=0.5, max_rss_kb=1024)),
            _run("run/b.js", Verdict.PASS, test_id="test/b.js", rusage=RunRusage(real_time=1.25, max_rss_kb=2048)),
            _run("run/c.js", Verdict.PASS, test_id="test/c.js", rusage=RunRusage(real_time=0.75, max_rss_kb=1536)),
        ])
        out = json.loads(r.to_json())
        self.assertEqual(list(out["rusage"]["run_duration_sec"]), ["run/b.js", "run/c.js", "run/a.js"])
        self.assertEqual(list(out["rusage"]["run_rss_mb"]), ["run/b.js", "run/c.js", "run/a.js"])

    def test_json_reports_top_n_runs_when_requested(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), report_rusage="top2")
        r.test_completed([
            _run("run/a.js", Verdict.PASS, test_id="test/a.js", rusage=RunRusage(real_time=0.5, max_rss_kb=1024)),
            _run("run/b.js", Verdict.PASS, test_id="test/b.js", rusage=RunRusage(real_time=1.25, max_rss_kb=2048)),
            _run("run/c.js", Verdict.PASS, test_id="test/c.js", rusage=RunRusage(real_time=0.75, max_rss_kb=1536)),
        ])
        out = json.loads(r.to_json())
        self.assertEqual(list(out["rusage"]["run_duration_sec"]), ["run/b.js", "run/c.js"])
        self.assertEqual(list(out["rusage"]["run_rss_mb"]), ["run/b.js", "run/c.js"])


class TestReporterOutputSelection(unittest.TestCase):
    def test_json_defaults_to_tests_only_for_json_path(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=FileDiscovery.from_list(["test/a.js"]))
        r.test_completed([_run("test/a.js", Verdict.PASS, test_id="test/a.js")])
        out = json.loads(r.to_json())
        self.assertIn("tests", out)
        self.assertNotIn("scenarios", out)

    def test_json_can_include_scenarios_and_tests(self):
        r = Reporter(
            EngineConfig(binary_path="/fake/js"),
            discovery=FileDiscovery.from_list(["test/a.js"]),
            output_file="out.json",
            report_json=True,
            report_tests=True,
            report_runs=True,
        )
        r.test_completed([_run("test/a.strict.js", Verdict.PASS, test_id="test/a.js", mode="strict")])
        out = json.loads(r.to_json())
        self.assertIn("tests", out)
        self.assertIn("scenarios", out)
        self.assertEqual(out["scenarios"]["test/a.strict.js"], "PASS")

    def test_json_can_omit_both_tests_and_runs(self):
        r = Reporter(
            EngineConfig(binary_path="/fake/js"),
            discovery=FileDiscovery.from_list(["test/a.js"]),
            output_file="out.json",
            report_json=True,
            report_tests=False,
            report_runs=False,
        )
        r.test_completed([_run("test/a.js", Verdict.PASS, test_id="test/a.js")])
        out = json.loads(r.to_json())
        self.assertNotIn("tests", out)
        self.assertNotIn("scenarios", out)

    def test_text_cannot_include_both_tests_and_runs(self):
        with self.assertRaisesRegex(ValueError, "text output cannot include both tests and runs"):
            Reporter(
                EngineConfig(binary_path="/fake/js"),
                output_file="out.txt",
                report_json=False,
                report_tests=True,
                report_runs=True,
            )

    def test_text_cannot_omit_both_tests_and_runs(self):
        with self.assertRaisesRegex(ValueError, "text output must include either tests or runs"):
            Reporter(
                EngineConfig(binary_path="/fake/js"),
                output_file="out.txt",
                report_json=False,
                report_tests=False,
                report_runs=False,
            )


class TestReporterWriteStreams(unittest.TestCase):
    def test_write_dash_writes_to_stdout(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=FileDiscovery.from_list(["test/a.js"]), output_file="-")
        r.test_completed([_run("test/a.js", Verdict.PASS, test_id="test/a.js")])
        stdout = io.StringIO()
        with contextlib.redirect_stdout(stdout):
            r.write()
        self.assertEqual(stdout.getvalue(), "test/a.js: PASS\n")

    def test_write_dev_stdout_writes_to_stdout(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=FileDiscovery.from_list(["test/a.js"]), output_file="/dev/stdout")
        r.test_completed([_run("test/a.js", Verdict.PASS, test_id="test/a.js")])
        with patch("pathlib.Path.write_text") as write_text:
            r.write()
        write_text.assert_called_once_with("test/a.js: PASS\n", encoding="utf-8")


class TestReporterProgress(unittest.TestCase):
    def test_progress_uses_count_until_discovery_finishes(self):
        discovery = FileDiscovery.from_list(["test/Array/from.js", "test/Array/of.js"])
        discovery._done.clear()  # simulate in-progress
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=discovery)
        r._in_flight["test/Array/from.js"] = 1.0
        r._in_flight["test/Array/of.js"] = 2.0
        r.test_completed([_run("test/Array/from.js", Verdict.FAIL, test_id="test/Array/from.js")])
        line = r._progress_line()
        self.assertTrue(line.startswith("[1] "))
        self.assertIn("0 passed, 1 failed", line)
        # Shows the most recently started in-flight test.
        self.assertIn("test/Array/of.js", line)
        discovery._done.set()  # simulate done
        line2 = r._progress_line()
        self.assertTrue(line2.startswith("[50%] "))

    def test_progress_shows_last_completed_when_nothing_in_flight(self):
        discovery = FileDiscovery.from_list(["test/Array/from.js"])
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=discovery)
        r._in_flight["test/Array/from.js"] = 1.0
        r.test_completed([_run("test/Array/from.js", Verdict.PASS, test_id="test/Array/from.js")])
        line = r._progress_line()
        self.assertIn("[100%]", line)
        self.assertIn("test/Array/from.js", line)

    def test_progress_shows_latest_in_flight(self):
        discovery = FileDiscovery.from_list(["a.js", "b.js", "c.js"])
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=discovery)
        r._in_flight["a.js"] = 1.0
        r._in_flight["b.js"] = 2.0
        r._in_flight["c.js"] = 3.0
        # b completes — progress shows c (last started)
        r.test_completed([_run("b.js", Verdict.PASS, test_id="b.js")])
        line = r._progress_line()
        self.assertIn("c.js", line)
        # c completes — now a is the only one left
        r.test_completed([_run("c.js", Verdict.PASS, test_id="c.js")])
        line = r._progress_line()
        self.assertIn("a.js", line)

    def test_progress_tracks_started_workers(self):
        discovery = FileDiscovery.from_list(["a.js", "b.js"])
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=discovery)
        r.test_started("a.js")
        r.test_started("b.js")
        r.test_completed([_run("a.js", Verdict.PASS, test_id="a.js")])
        line = r._progress_line()
        self.assertIn("b.js", line)

    def test_progress_truncates_filename_to_terminal_width(self):
        discovery = FileDiscovery.from_list(["test/Array/from.js"])
        r = Reporter(EngineConfig(binary_path="/fake/js"), discovery=discovery)
        r._in_flight["test/Array/from.js"] = 1.0
        with patch("harness.reporter.shutil.get_terminal_size", return_value=os.terminal_size((25, 24))):
            line = r._progress_line()
            # Too narrow for filename
            self.assertNotIn("test/Array/from.js", line)

    def test_truncate_left(self):
        self.assertEqual(Reporter._truncate_left("abcdefgh", 5), "\u2026efgh")
        self.assertEqual(Reporter._truncate_left("abc", 10), "abc")
        self.assertEqual(Reporter._truncate_left("abcde", 1), "\u2026")


if __name__ == "__main__":
    unittest.main()
