# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from harness.data import (
    BenchmarkResult,
    GitRevisionInfo,
    Report,
    RunResult,
    RunRusage,
    StatsDict,
    TestResult,
    Verdict,
)

class TestRunRusage(unittest.TestCase):
    def test_roundtrip(self):
        r = RunRusage(user_time=1.23456, sys_time=0.5, real_time=2.0, max_rss_kb=4096)
        d = r.to_json()
        self.assertAlmostEqual(d["user_time"], 1.235)  # rounded to 3 decimal places
        self.assertAlmostEqual(d["sys_time"], 0.5)
        r2 = RunRusage.from_dict(d)
        self.assertAlmostEqual(r2.user_time, 1.235)
        self.assertEqual(r2.max_rss_kb, 4096)

    def test_from_dict_ignores_unknown(self):
        r = RunRusage.from_dict({"user_time": 1.0, "unknown_field": 99})
        self.assertEqual(r.user_time, 1.0)

    def test_none_fields(self):
        r = RunRusage()
        d = r.to_json()
        self.assertNotIn("user_time", d)
        self.assertNotIn("max_rss_kb", d)


class TestRunResult(unittest.TestCase):
    def test_is_passed(self):
        r = RunResult(verdict_type=Verdict.PASS)
        self.assertTrue(r.is_passed())
        self.assertFalse(r.is_failed())
        self.assertFalse(r.is_skipped())

    def test_is_failed(self):
        for v in (Verdict.FAIL, Verdict.CRASH, Verdict.TIMEOUT, Verdict.TYPE_ERROR):
            r = RunResult(verdict_type=v)
            self.assertTrue(r.is_failed(), v)
            self.assertFalse(r.is_passed(), v)

    def test_is_skipped(self):
        r = RunResult(verdict_type=Verdict.SKIP)
        self.assertTrue(r.is_skipped())
        self.assertFalse(r.is_passed())
        self.assertFalse(r.is_failed())

    def test_coarse_verdict_fail(self):
        for v in (Verdict.CRASH, Verdict.TIMEOUT, Verdict.OOM, Verdict.TYPE_ERROR):
            r = RunResult(verdict_type=v)
            self.assertIs(r.coarse_verdict(), Verdict.FAIL)

    def test_coarse_verdict_pass_skip(self):
        self.assertIs(RunResult(verdict_type=Verdict.PASS).coarse_verdict(), Verdict.PASS)
        self.assertIs(RunResult(verdict_type=Verdict.SKIP).coarse_verdict(), Verdict.SKIP)

    def test_coarse_verdict_none(self):
        self.assertIsNone(RunResult().coarse_verdict())

    def test_verdict_message_pass(self):
        self.assertEqual(RunResult(verdict_type=Verdict.PASS).verdict_message(), "PASS")

    def test_verdict_message_with_detail(self):
        r = RunResult(verdict_type=Verdict.FAIL, verdict_detail="something broke")
        self.assertEqual(r.verdict_message(), "FAIL: something broke")

    def test_verdict_message_negative(self):
        r = RunResult(verdict_type=Verdict.NEGATIVE, verdict_detail="NOT(SyntaxError)")
        self.assertEqual(r.verdict_message(), "NOT(SyntaxError)")

    def test_verdict_message_empty(self):
        self.assertEqual(RunResult().verdict_message(), "")

    def test_combined_output_both(self):
        r = RunResult(stdout="out\n", stderr="err\n")
        self.assertEqual(r.combined_output(), "err\nout\n")

    def test_combined_output_stdout_only(self):
        r = RunResult(stdout="only\n")
        self.assertEqual(r.combined_output(), "only\n")

    def test_combined_output_stderr_only(self):
        r = RunResult(stderr="only\n")
        self.assertEqual(r.combined_output(), "only\n")

    def test_combined_output_cleaned_preferred(self):
        r = RunResult(stdout="raw", stderr="raw", stdout_cleaned="clean_out", stderr_cleaned="clean_err")
        combined = r.combined_output()
        self.assertIn("clean_out", combined)
        self.assertIn("clean_err", combined)

    def test_from_dict_basic(self):
        d = {"run_id": "test/foo.js", "verdict_type": "PASS", "mode": "strict"}
        r = RunResult.from_dict(d)
        self.assertEqual(r.run_id, "test/foo.js")
        self.assertIs(r.verdict_type, Verdict.PASS)
        self.assertEqual(r.mode, "strict")

    def test_from_dict_compat_verdict(self):
        r = RunResult.from_dict({"verdict": "PASS"})
        self.assertIs(r.verdict_type, Verdict.PASS)

    def test_from_dict_compat_error_type(self):
        r = RunResult.from_dict({"error_type": "TypeError", "error_message": "bad"})
        self.assertIs(r.verdict_type, Verdict.TYPE_ERROR)
        self.assertEqual(r.verdict_detail, "bad")

    def test_from_dict_compat_ok(self):
        r = RunResult.from_dict({"verdict_type": "OK"})
        self.assertIs(r.verdict_type, Verdict.PASS)

    def test_from_dict_unknown_field_raises(self):
        with self.assertRaises(ValueError):
            RunResult.from_dict({"verdict_type": "PASS", "unknown_field": 1})

    def test_from_dict_rusage_deserialized(self):
        r = RunResult.from_dict({"rusage": {"user_time": 1.5, "max_rss_kb": 1024}})
        self.assertIsInstance(r.rusage, RunRusage)
        self.assertEqual(r.rusage.user_time, 1.5)


class TestStatsDict(unittest.TestCase):
    def test_to_dict_uses_long_keys(self):
        s = StatsDict(passed=10, failed=2, skipped=1)
        d = s.to_dict()
        self.assertIn("passed", d)
        self.assertIn("failed", d)
        self.assertIn("skipped", d)
        self.assertNotIn("pass", d)
        self.assertEqual(d["passed"], 10)

    def test_to_dict_skips_none_and_zero(self):
        s = StatsDict(passed=5)
        d = s.to_dict()
        self.assertNotIn("fail", d)
        self.assertNotIn("skip", d)
        self.assertNotIn("pass_percent", d)

    def test_to_dict_includes_percent(self):
        s = StatsDict(passed=9, failed=1, pass_percent=90.0)
        d = s.to_dict()
        self.assertEqual(d["pass_percent"], 90.0)

    def test_from_dict_short_keys(self):
        s = StatsDict.from_dict({"pass": 7, "fail": 3, "skip": 2})
        self.assertEqual(s.passed, 7)
        self.assertEqual(s.failed, 3)
        self.assertEqual(s.skipped, 2)

    def test_from_dict_long_keys(self):
        s = StatsDict.from_dict({"passed": 7, "failed": 3})
        self.assertEqual(s.passed, 7)
        self.assertEqual(s.failed, 3)

    def test_from_dict_ignores_unknown(self):
        s = StatsDict.from_dict({"pass": 1, "extra_key": 99})
        self.assertEqual(s.passed, 1)

    def test_roundtrip(self):
        s = StatsDict(passed=8, failed=1, skipped=1, pass_percent=80.0)
        s2 = StatsDict.from_dict(s.to_dict())
        self.assertEqual(s2.passed, 8)
        self.assertEqual(s2.failed, 1)
        self.assertEqual(s2.pass_percent, 80.0)


class TestBinaryInfo(unittest.TestCase):
    def test_extra_keys_preserved(self):
        # TypedDict: unknown keys (e.g. v8_build_config) pass through untouched
        r = Report.from_dict({"binary": {"engine": "v8", "v8_build_config": {"clang": True}}, "tests": {}})
        assert r.binary is not None
        self.assertEqual(r.binary["engine"], "v8")
        self.assertEqual(r.binary["v8_build_config"], {"clang": True})

    def test_known_fields(self):
        raw = {"engine": "v8", "arch": "arm64", "revision": "abc123",
               "binary_size": 42000000, "dist_size": 50000000, "cc": "clang 23",
               "rustc": "rustc 1.96.0", "loc": 12345}
        r = Report.from_dict({"binary": raw, "tests": {}})
        assert r.binary is not None
        self.assertEqual(r.binary["engine"], "v8")
        self.assertEqual(r.binary["dist_size"], 50000000)
        self.assertEqual(r.binary["rustc"], "rustc 1.96.0")
        self.assertEqual(r.binary["loc"], 12345)

    def test_console_log_str(self):
        r = Report.from_dict({"binary": {"engine": "v8", "console_log": "console.log"}, "tests": {}})
        assert r.binary is not None
        self.assertEqual(r.binary["console_log"], "console.log")

    def test_console_log_list(self):
        r = Report.from_dict({"binary": {"engine": "v8", "console_log": ["console.log", "print"]}, "tests": {}})
        assert r.binary is not None
        self.assertEqual(r.binary["console_log"], ["console.log", "print"])

    def test_roundtrip_via_report(self):
        raw = {"engine": "v8", "arch": "arm64", "version": "14.9", "rustc": "rustc 1.96"}
        r = Report.from_dict({"binary": raw, "tests": {}})
        d = r.to_dict()
        self.assertEqual(d["binary"]["engine"], "v8")
        self.assertEqual(d["binary"]["rustc"], "rustc 1.96")


class TestBenchmarkResult(unittest.TestCase):
    def test_roundtrip(self):
        br = BenchmarkResult(score=[1.0, 2.0], user=[0.1, 0.2], real=[1.1, 2.2])
        d = br.to_dict()
        self.assertEqual(d["score"], [1.0, 2.0])
        br2 = BenchmarkResult.from_dict(d)
        self.assertEqual(br2.score, [1.0, 2.0])
        self.assertEqual(br2.user, [0.1, 0.2])

    def test_to_dict_omits_empty(self):
        br = BenchmarkResult(score=[1.0])
        d = br.to_dict()
        self.assertIn("score", d)
        self.assertNotIn("rss_mb", d)


class TestGitRevisionInfoTest(unittest.TestCase):
    def test_revision_dirty_omitted_when_false(self):
        for falsy in (None, False):
            t = GitRevisionInfo(revision="abc", revision_dirty=falsy)
            self.assertNotIn("revision_dirty", t.to_dict(), f"revision_dirty={falsy!r} should be omitted")

    def test_revision_dirty_true(self):
        t = GitRevisionInfo(revision="abc", revision_dirty=True)
        d = t.to_dict()
        self.assertTrue(d["revision_dirty"])


class TestReport(unittest.TestCase):
    def test_empty_to_dict(self):
        r = Report()
        self.assertEqual(r.to_dict(), {})

    def test_to_dict_omits_empty_fields(self):
        r = Report(binary={"engine": "v8"}, tests={"test/a.js": "PASS"})
        d = r.to_dict()
        self.assertIn("binary", d)
        self.assertIn("tests", d)
        self.assertNotIn("flags", d)
        self.assertNotIn("summary", d)

    def test_from_dict_deserializes_binary(self):
        r = Report.from_dict({"binary": {"engine": "v8", "version": "12"}, "tests": {}})
        self.assertIsInstance(r.binary, dict)
        assert r.binary is not None
        self.assertEqual(r.binary["engine"], "v8")

    def test_from_dict_deserializes_test262(self):
        r = Report.from_dict({"test262": {"revision": "abc"}, "tests": {}})
        self.assertIsInstance(r.test262, GitRevisionInfo)
        self.assertEqual(r.test262.revision, "abc")

    def test_from_dict_deserializes_summary(self):
        r = Report.from_dict({"summary": {"all": {"pass": 5, "fail": 2}}, "tests": {}})
        self.assertIsInstance(r.summary["all"], StatsDict)
        self.assertEqual(r.summary["all"].passed, 5)
        self.assertEqual(r.summary["all"].failed, 2)

    def test_from_dict_deserializes_tags(self):
        r = Report.from_dict({"tags": {"edition:es2024": {"pass": 3}}, "tests": {}})
        self.assertIsInstance(r.tags["edition:es2024"], StatsDict)
        self.assertEqual(r.tags["edition:es2024"].passed, 3)

    def test_from_dict_deserializes_dirs(self):
        r = Report.from_dict({"dirs": {"test/built-ins": {"pass": 1, "fail": 0}}, "tests": {}})
        self.assertIsInstance(r.dirs["test/built-ins"], StatsDict)

    def test_from_dict_deserializes_benchmarks(self):
        r = Report.from_dict({"benchmarks": {"NavierStokes": {"score": [100.0]}}, "tests": {}})
        self.assertIsInstance(r.benchmarks["NavierStokes"], BenchmarkResult)
        self.assertEqual(r.benchmarks["NavierStokes"].score, [100.0])

    def test_roundtrip_summary(self):
        original = {
            "binary": {"engine": "v8"},
            "summary": {"all": {"pass": 10, "fail": 2, "skip": 1, "pass_percent": 83.333}},
            "tests": {"test/a.js": "PASS"},
        }
        r = Report.from_dict(original)
        d = r.to_dict()
        self.assertEqual(d["summary"]["all"]["passed"], 10)
        self.assertEqual(d["summary"]["all"]["failed"], 2)
        self.assertAlmostEqual(d["summary"]["all"]["pass_percent"], 83.333)

    def test_to_dict_summary_uses_long_keys(self):
        r = Report(summary={"all": StatsDict(passed=5, failed=1)})
        d = r.to_dict()
        self.assertIn("passed", d["summary"]["all"])
        self.assertNotIn("pass", d["summary"]["all"])

    def test_load(self):
        data = {
            "binary": {"engine": "v8"},
            "tests": {"test/foo.js": "PASS"},
            "summary": {"all": {"pass": 1}},
        }
        with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
            json.dump(data, f)
            tmp = Path(f.name)
        try:
            r = Report.load(tmp)
            assert r.binary is not None
            self.assertEqual(r.binary["engine"], "v8")
            self.assertEqual(r.tests["test/foo.js"], "PASS")
            self.assertIsInstance(r.summary["all"], StatsDict)
        finally:
            tmp.unlink()

    def test_load_invalid_json_type(self):
        with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
            json.dump([1, 2, 3], f)
            tmp = Path(f.name)
        try:
            with self.assertRaises(ValueError):
                Report.load(tmp)
        finally:
            tmp.unlink()

    def test_tests_passthrough(self):
        tests: dict[str, TestReport] = {
            "test/a.js": "PASS",
            "test/b.js": {"strict": "PASS", "sloppy": "FAIL"},
        }
        r = Report.from_dict({"tests": tests})
        self.assertEqual(r.tests["test/a.js"], "PASS")
        self.assertEqual(r.tests["test/b.js"], {"strict": "PASS", "sloppy": "FAIL"})

    def test_flags_passthrough(self):
        r = Report.from_dict({"flags": ["--harmony"], "tests": {}})
        self.assertEqual(r.flags, ["--harmony"])

    def test_to_text_inlines_stats_and_scalar_lists(self):
        report = Report(
            binary={"engine": "v8", "console_log": ["console.log", "print"]},
            summary={"all": StatsDict(passed=5, failed=1, pass_percent=83.333)},
            benchmarks={"richards": BenchmarkResult(score=[1.0, 2.5], rss_mb=[12.34])},
            tests={"test/a.js": "PASS"},
        )

        text = report.to_text()

        self.assertIn('"summary": {\n    "all": {"passed": 5, "failed": 1, "pass_percent": 83.333}\n  }', text)
        self.assertIn('"console_log": ["console.log", "print"]', text)
        self.assertIn('"score": [1.0, 2.5]', text)
        self.assertIn('"rss_mb": [12.34]', text)

    def test_to_text_multiline_for_nested_lists(self):
        report = Report(rusage={"run_duration_sec": {"a": 1.2}, "started_at": "2026-01-01 00:00:00 UTC"})

        text = report.to_text()

        self.assertIn('"rusage": {\n    "run_duration_sec": {\n      "a": 1.2\n    },', text)


if __name__ == "__main__":
    unittest.main()
