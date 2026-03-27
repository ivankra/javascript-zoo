# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import unittest
import json
import contextlib
import io
from unittest.mock import patch

from harness.config import EngineConfig
from harness.frontmatter import Frontmatter
from harness.tags import Tags
from harness.reporter import Reporter
from harness.runner import RunResult, RunRusage, Verdict


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
        verdict=verdict,
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
            r.add_file([run])
        return r

    def test_per_file_dedup_worst_verdict(self):
        """Two modes for one file: strict=OK, sloppy=FAIL -> file counts as FAIL."""
        tags_s = _t262({"Symbol"}, mode="strict")
        tags_l = _t262({"Symbol"}, mode="sloppy")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.OK, tags=tags_s, mode="strict", test_id="test/a.js"),
            _run("test/a.sloppy.js", Verdict.FAILED, tags=tags_l, mode="sloppy", test_id="test/a.js"),
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
            _run("test/a.strict.js", Verdict.OK, tags=tags_s, mode="strict", test_id="test/a.js"),
            _run("test/a.sloppy.js", Verdict.FAILED, tags=tags_l, mode="sloppy", test_id="test/a.js"),
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
        for name, v in [("a", Verdict.OK), ("b", Verdict.FAILED), ("c", Verdict.OK)]:
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
        """summary["tests"] deduplicates across modes (per-file worst)."""
        tags_s = _t262(mode="strict")
        tags_l = _t262(mode="sloppy")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.OK, tags=tags_s, mode="strict", test_id="test/a.js"),
            _run("test/a.sloppy.js", Verdict.OK, tags=tags_l, mode="sloppy", test_id="test/a.js"),
            _run("test/b.strict.js", Verdict.OK, tags=tags_s, mode="strict", test_id="test/b.js"),
            _run("test/b.sloppy.js", Verdict.FAILED, tags=tags_l, mode="sloppy", test_id="test/b.js"),
        ])
        summary = r._summary_json()
        # 2 files: a=OK, b=FAIL (worst of strict OK + sloppy FAIL)
        self.assertEqual(summary["tests"]["ok"], 1)
        self.assertEqual(summary["tests"]["fail"], 1)

    def test_skipped_with_tags_counted(self):
        """Skipped results with tags appear in tag stats."""
        tags = Tags.test262(Frontmatter(features={"Symbol"}))
        r = self._reporter([
            _run("test/a.js", Verdict.SKIPPED, tags=tags),
        ])
        stats = r._build_tag_stats()
        self.assertEqual(stats["features:Symbol"].skipped, 1)

    def test_results_without_tags_excluded_from_tag_stats(self):
        """Results with tags=None are silently excluded from tag stats."""
        r = self._reporter([
            _run("test/a.js", Verdict.OK, tags=None),
        ])
        stats = r._build_tag_stats()
        self.assertEqual(stats, {})

    def test_empty_features_and_edition_in_stats(self):
        """Tests with no features/edition produce 'features:' and 'edition:' keys."""
        tags = _t262(mode="strict")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.OK, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        stats = r._build_tag_stats()
        self.assertIn("features:", stats)
        self.assertEqual(stats["features:"].passed, 1)
        self.assertIn("edition:", stats)
        self.assertEqual(stats["edition:"].passed, 1)

    def test_empty_keys_in_summary_json(self):
        """'features:' and 'edition:' appear in summary JSON for featureless tests."""
        tags = _t262(mode="strict")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.OK, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        summary = r._summary_json()
        self.assertIn("features:", summary)
        self.assertIn("edition:", summary)


class TestEditionReport(unittest.TestCase):
    """Test _edition_report grouping and 'other' bucket."""

    def _reporter(self, runs: list[RunResult]) -> Reporter:
        r = Reporter(EngineConfig(binary_path="/fake/js"), test262=True)
        for run in runs:
            r.add_file([run])
        return r

    def test_editions_partition(self):
        """Edition passed+failed+skipped sums match total across all edition lines."""
        runs = []
        for i, (feat, verdict) in enumerate([
            ("Symbol", Verdict.OK),        # es6
            ("Promise", Verdict.OK),        # es6
            ("BigInt", Verdict.FAILED),     # es2020
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

    def test_other_collects_no_edition(self):
        """Tests with no features land in 'other', not in any edition."""
        tags = _t262(mode="strict")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.OK, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        report = r._edition_report()
        self.assertIn("other", report)
        self.assertNotIn("esnext", report)

    def test_skipped_edition_goes_to_other(self):
        """An edition where all tests are skipped merges into 'other'."""
        tags = _t262({"Symbol"}, mode="strict")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.SKIPPED, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        report = r._edition_report()
        self.assertIn("other", report)
        self.assertNotIn("es6", report)

    def test_unlisted_feature_under_esnext(self):
        """Features not in features.yml appear under esnext."""
        tags = _t262({"SomeNewProposal"}, mode="strict")
        r = self._reporter([
            _run("test/a.strict.js", Verdict.FAILED, tags=tags, mode="strict", test_id="test/a.js"),
        ])
        report = r._edition_report()
        self.assertIn("esnext", report)
        self.assertIn("SomeNewProposal", report)

    def test_empty_feature_not_shown(self):
        """The empty 'features:' sentinel never appears as a feature line."""
        tags = _t262(mode="strict")  # no features
        r = self._reporter([
            _run("test/a.strict.js", Verdict.OK, tags=tags, mode="strict", test_id="test/a.js"),
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
        data = {"test/a.js": {"strict": "OK", "sloppy": "FAIL: some error"}}
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
        data = {"features:Symbol": {"ok": 10, "fail": 2}}
        out = Reporter.format_json_value(data)
        for line in out.splitlines():
            if '"features:Symbol"' in line:
                self.assertIn('"ok"', line)
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


class TestTestOrder(unittest.TestCase):
    def test_note_test_preserves_discovery_order(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"))
        r.note_test("c.js")
        r.note_test("a.js")
        r.note_test("b.js")
        r.note_test("a.js")  # duplicate
        self.assertEqual(list(r._input_order), ["c.js", "a.js", "b.js"])


class TestReporterRusageJson(unittest.TestCase):
    def test_json_includes_rusage_by_default(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"))
        r.note_test("test/a.js")
        r.add_file([
            _run(
                "test/a.js",
                Verdict.OK,
                test_id="test/a.js",
                rusage=RunRusage(real_time=1.25, max_rss_kb=2048),
            )
        ])
        out = json.loads(r.format_to_json())
        self.assertIn("rusage", out)
        self.assertEqual(out["rusage"]["peak_rss_mb"], 2.0)
        self.assertEqual(out["rusage"]["test_time_s"]["test/a.js"], 1.25)

    def test_json_omits_rusage_when_disabled(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"), report_rusage=False)
        r.note_test("test/a.js")
        r.add_file([
            _run(
                "test/a.js",
                Verdict.OK,
                test_id="test/a.js",
                rusage=RunRusage(real_time=1.25, max_rss_kb=2048),
            )
        ])
        out = json.loads(r.format_to_json())
        self.assertNotIn("rusage", out)


class TestReporterWriteStreams(unittest.TestCase):
    def test_write_dash_writes_to_stdout(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"))
        r.note_test("test/a.js")
        r.add_file([_run("test/a.js", Verdict.OK, test_id="test/a.js")])
        stdout = io.StringIO()
        with contextlib.redirect_stdout(stdout):
            r.write("-", output_format="tests")
        self.assertEqual(stdout.getvalue(), "test/a.js: OK\n")

    def test_write_dev_stdout_writes_to_stdout(self):
        r = Reporter(EngineConfig(binary_path="/fake/js"))
        r.note_test("test/a.js")
        r.add_file([_run("test/a.js", Verdict.OK, test_id="test/a.js")])
        with patch("pathlib.Path.write_text") as write_text:
            r.write("/dev/stdout", output_format="tests")
        write_text.assert_called_once_with("test/a.js: OK\n", encoding="utf-8")


if __name__ == "__main__":
    unittest.main()
