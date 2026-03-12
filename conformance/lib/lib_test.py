# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import unittest
from typing import Any

from conformance.lib import (
    Arbiter,
    EngineConfig,
    ErrorType,
    RunMetrics,
    RunResult,
    Verdict,
    iterate_js_files,
)


def mk_run(**kwargs: Any) -> RunResult:
    defaults: dict[str, Any] = {
        "run_id": "t",
        "verdict": None,
        "command": "eng x.js",
        "stdout": "",
        "stderr": "",
        "cwd": "/tmp",
        "exit_code": 0,
    }
    defaults.update(kwargs)
    return RunResult(**defaults)

# ---------------------------------------------------------------------------
# Arbiter.extract_error_type_from_text
# ---------------------------------------------------------------------------

class ExtractErrorTypeTest(unittest.TestCase):
    arb = Arbiter(EngineConfig())

    def _check(self, text: str, expected: ErrorType | None) -> None:
        result = self.arb.extract_error_type_from_text(text)
        self.assertEqual(result[0] if result else None, expected)

    def test_syntax_error(self) -> None:
        self._check("SyntaxError: Unexpected token (9:6)", ErrorType.SYNTAX_ERROR)

    def test_reference_error(self) -> None:
        self._check("ReferenceError: Proxy is not defined", ErrorType.REFERENCE_ERROR)
        self._check('ReferenceError: "Proxy" is not defined.', ErrorType.REFERENCE_ERROR)
        self._check("ReferenceError:Binding has not been defined", ErrorType.REFERENCE_ERROR)

    def test_type_error(self) -> None:
        self._check("TypeError: undefined is not a function", ErrorType.TYPE_ERROR)
        self._check("Uncaught TypeError: not a function", ErrorType.TYPE_ERROR)

    def test_eval_error(self) -> None:
        self._check("EvalError: boom", ErrorType.EVAL_ERROR)

    def test_test262_error(self) -> None:
        self._check("Test262Error: custom harness failure", ErrorType.TEST262_ERROR)

    def test_prefers_subclass_over_bare_error(self) -> None:
        self._check("Error: something went wrong\nTypeError: bad type", ErrorType.TYPE_ERROR)

    def test_reject_does_not_throw(self) -> None:
        # "does not throw" lines should be skipped.
        self._check("foo does not throw RangeError", None)
        self._check("expected TypeError to be thrown but no exception", None)

    def test_none_for_clean_output(self) -> None:
        self._check("", None)
        self._check("all tests passed", None)
        self._check("42", None)

    def test_skips_ok_lines_in_pass2(self) -> None:
        # Conformance "...: OK" lines should not extract error type.
        self._check("test.js: OK\nSyntaxError: real error", ErrorType.SYNTAX_ERROR)

    def test_error_type_field(self) -> None:
        self._check("error_type: ReferenceError", ErrorType.REFERENCE_ERROR)


# ---------------------------------------------------------------------------
# RunResult
# ---------------------------------------------------------------------------

class RunResultTest(unittest.TestCase):
    def test_combined_output_stdout_only(self) -> None:
        r = mk_run(stdout="hello\n", stderr="")
        self.assertEqual(r.combined_output(), "hello\n")

    def test_combined_output_stderr_only(self) -> None:
        r = mk_run(stdout="", stderr="err\n")
        self.assertEqual(r.combined_output(), "err\n")

    def test_combined_output_both_adds_newline(self) -> None:
        r = mk_run(stdout="out", stderr="err")
        self.assertEqual(r.combined_output(), "err\nout")

    def test_combined_output_both_no_extra_newline(self) -> None:
        r = mk_run(stdout="out\n", stderr="err\n")
        self.assertEqual(r.combined_output(), "err\nout\n")

    def test_to_dict_roundtrip(self) -> None:
        r = mk_run(
            verdict=Verdict.FAILED,
            error_type=ErrorType.CRASH,
            error_message="signal 11",
            exit_code=-11,
        )
        d = r.to_dict()
        self.assertEqual(d["verdict"], "failed")
        self.assertEqual(d["error_type"], "crash")
        r2 = RunResult.from_dict(d)
        self.assertEqual(r2.verdict, Verdict.FAILED)
        self.assertEqual(r2.error_type, ErrorType.CRASH)
        self.assertEqual(r2.error_message, "signal 11")

    def test_from_dict_rejects_unknown_fields(self) -> None:
        with self.assertRaisesRegex(ValueError, "unknown RunResult fields"):
            RunResult.from_dict({"run_id": "x", "bogus_key": 1})

    def test_from_dict_metrics_dict(self) -> None:
        d = mk_run().to_dict()
        d["metrics"] = {"real_time": 1.5, "user_time": 0.8}
        r = RunResult.from_dict(d)
        self.assertEqual(r.metrics.real_time, 1.5)
        self.assertEqual(r.metrics.user_time, 0.8)

    def test_verdict_message_ok(self) -> None:
        self.assertEqual(mk_run(verdict=Verdict.OK).verdict_message(), "OK")

    def test_verdict_message_timeout(self) -> None:
        r = mk_run(verdict=Verdict.FAILED, error_type=ErrorType.TIMEOUT)
        self.assertEqual(r.verdict_message(), "timeout")

    def test_verdict_message_error_with_message(self) -> None:
        r = mk_run(
            verdict=Verdict.FAILED,
            error_type=ErrorType.SYNTAX_ERROR,
            error_message="Unexpected token",
        )
        self.assertEqual(r.verdict_message(), "SyntaxError: Unexpected token")

    def test_verdict_message_generic_omits_error_type(self) -> None:
        r = mk_run(
            verdict=Verdict.FAILED,
            error_type=ErrorType.GENERIC,
            error_message="failed",
        )
        self.assertEqual(r.verdict_message(), "failed: failed")


# ---------------------------------------------------------------------------
# Arbiter
# ---------------------------------------------------------------------------

# (label, run_kwargs, classify_kwargs, want_verdict, want_error_type, want_msg_substr)
_CLASSIFY_CASES: list[tuple[str, dict, dict, Verdict, ErrorType | None, str]] = [
    ("timeout preset",     {"exit_code": -9, "error_type": ErrorType.TIMEOUT}, {},                          Verdict.FAILED, ErrorType.TIMEOUT,                   ""),
    ("crash signal 11",    {"exit_code": -11},                                  {},                          Verdict.FAILED, ErrorType.CRASH,                     "SIGSEGV"),
    ("nonzero exit",       {"exit_code": 2},                                    {},                          Verdict.FAILED, ErrorType.EXIT,                      "2"),
    ("clean ok",           {"stdout": "42\n"},                                  {},                          Verdict.OK,   None,                                ""),
    ("reference error",    {"stdout": "ReferenceError: x not defined", "exit_code": 1}, {},                 Verdict.FAILED, ErrorType.REFERENCE_ERROR,            ""),
    ("type error",         {"stdout": "TypeError: bad", "exit_code": 1},        {},                          Verdict.FAILED, ErrorType.TYPE_ERROR,                ""),
    ("ok pattern found",   {"stdout": "test.js: OK\nnoise"},                    {"expect_ok_pattern": r"test\.js: OK"}, Verdict.OK,   None,                    ""),
    ("ok pattern missing", {"stdout": "plain output"},                          {"expect_ok_pattern": r"test\.js: OK"}, Verdict.FAILED, ErrorType.MISSING_OK,     ""),
    ("ok absent+error",    {"stdout": "SyntaxError: bad"},                      {"expect_ok_pattern": r"test\.js: OK"}, Verdict.FAILED, ErrorType.SYNTAX_ERROR,   ""),
    ("ok absent+exit 3",   {"stdout": "", "exit_code": 3},                      {"expect_ok_pattern": r"test\.js: OK"}, Verdict.FAILED, ErrorType.EXIT,           ""),
    ("async complete",     {"stdout": "Test262:AsyncTestComplete"},              {"expect_async": True},      Verdict.OK,   None,                                ""),
    ("async failure",      {"stdout": "Test262:AsyncTestFailure: boom"},         {"expect_async": True},      Verdict.FAILED, ErrorType.ASYNC_TEST_FAILURE,        "boom"),
    ("async missing",      {"stdout": "plain"},                                  {"expect_async": True},      Verdict.FAILED, ErrorType.MISSING_ASYNC_TEST_COMPLETE, ""),
]

_WARN_CFG = EngineConfig(errors_re=[r"(?i)error"], warnings_re=[r"^Parse errors:$"])

# (label, run_kwargs, want_verdict) — uses _WARN_CFG arbiter
_CLASSIFY_WARN_CASES: list[tuple[str, dict, Verdict]] = [
    ("warn + error → fail", {"stdout": "Parse errors:\nsome error here"}, Verdict.FAILED),
    ("warn only → ok",      {"stdout": "Parse errors:\nclean output"},    Verdict.OK),
]

# (label, output, want_line)
_BEST_ERROR_LINE_CASES: list[tuple[str, str, str | None]] = [
    ("clean output",     "42\nhello world\n",             None),
    ("first error line", "ok line\nTypeError: bad\nmore", "TypeError: bad"),
    ("skip blank lines", "\n\nfailed to run\n",           "failed to run"),
]


class ArbiterTest(unittest.TestCase):
    def test_classify(self) -> None:
        arb = Arbiter(EngineConfig())
        for label, run_kw, cls_kw, want_v, want_et, want_msg in _CLASSIFY_CASES:
            with self.subTest(label):
                out = arb.classify(mk_run(**run_kw), **cls_kw)
                self.assertEqual(out.verdict, want_v)
                self.assertEqual(out.error_type, want_et)
                if want_msg:
                    self.assertIn(want_msg, out.error_message or "")

    def test_classify_warn(self) -> None:
        arb = Arbiter(_WARN_CFG)
        for label, run_kw, want_v in _CLASSIFY_WARN_CASES:
            with self.subTest(label):
                self.assertEqual(arb.classify(mk_run(**run_kw)).verdict, want_v)

    def test_best_error_line(self) -> None:
        arb = Arbiter(EngineConfig())
        for label, output, want in _BEST_ERROR_LINE_CASES:
            with self.subTest(label):
                self.assertEqual(arb._best_error_line(output), want)

    def test_best_error_line_warn_skipped(self) -> None:
        arb = Arbiter(EngineConfig(warnings_re=[r"^warning:"]))
        self.assertEqual(arb._best_error_line("warning: minor\nfailed: big"), "failed: big")

    def test_warnings_re_multiple_patterns_both_suppressed(self) -> None:
        # Multiple warning patterns; matched lines are not treated as errors.
        cfg = EngineConfig(errors_re=[r"(?i)error"], warnings_re=[r"^Parse errors:$", r"^Note:"])
        arb = Arbiter(cfg)
        # Both lines match warnings_re and are suppressed → no error found → OK
        r = arb.classify(mk_run(stdout="Parse errors:\nNote: error here"))
        self.assertEqual(r.verdict, Verdict.OK)
        # Real error after suppressed warning → FAIL
        r2 = arb.classify(mk_run(stdout="Parse errors:\nactual error occurred"))
        self.assertEqual(r2.verdict, Verdict.FAILED)

    def test_errors_re_multiple_patterns(self) -> None:
        cfg = EngineConfig(errors_re=[r"panic", r"crashed"])
        arb = Arbiter(cfg)
        self.assertEqual(
            arb.classify(mk_run(stdout="engine panic!", exit_code=1)).verdict, Verdict.FAILED
        )
        self.assertEqual(
            arb.classify(mk_run(stdout="process crashed", exit_code=1)).verdict, Verdict.FAILED
        )
        self.assertEqual(arb.classify(mk_run(stdout="42")).verdict, Verdict.OK)

    def test_shorten_message_strips_failed_and_error_prefixes_case_insensitively(self) -> None:
        arb = Arbiter(EngineConfig(errors_re=[r"(?i)failed"]))
        out = arb.classify(mk_run(stdout="FAILED: Error: boom"))
        self.assertEqual(out.error_type, ErrorType.GENERIC)
        self.assertEqual(out.error_message, "boom")

    def test_real_crash_produces_signal_name(self) -> None:
        import shutil
        from conformance.lib import Runner
        python = shutil.which("python3") or shutil.which("python")
        if not python:
            self.skipTest("python not found")
        cfg = EngineConfig(binary_path=python)
        runner = Runner(cfg)
        # Send SIGABRT to self — reliably crashes on all platforms.
        run = runner.run_command(
            [python, "-c", "import os, signal; os.kill(os.getpid(), signal.SIGABRT)"],
        )
        self.assertIsNotNone(run.exit_code)
        exit_code = run.exit_code
        assert exit_code is not None
        self.assertLess(exit_code, 0)  # negative = killed by signal
        result = Arbiter(EngineConfig()).classify(run)
        self.assertEqual(result.error_type, ErrorType.CRASH)
        self.assertEqual(result.error_message, "SIGABRT")


# ---------------------------------------------------------------------------
# Arbiter: exceptions_re structured exception parsing
# ---------------------------------------------------------------------------

class ExceptionReTest(unittest.TestCase):
    """Tests for exceptions_re patterns."""

    def _arb(
        self,
        exceptions_re: list[str] | None = None,
        errors_re: list[str] | None = None,
    ) -> Arbiter:
        kw: dict[str, Any] = dict(exceptions_re=exceptions_re or [])
        if errors_re is not None:
            kw["errors_re"] = errors_re
        return Arbiter(EngineConfig(**kw))

    # --- stream selection ---

    def test_stdout_match(self) -> None:
        # v8-style: bare ErrorType: message on stdout
        arb = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = arb.classify(mk_run(stdout="TypeError: bad type\n    at file.js:1:7"))
        self.assertEqual(out.verdict, Verdict.FAILED)
        self.assertEqual(out.error_type, ErrorType.TYPE_ERROR)
        self.assertEqual(out.error_message, "bad type")

    def test_stderr_match(self) -> None:
        # quickjs/engine262-style: bare ErrorType: message on stderr
        arb = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = arb.classify(mk_run(
            stderr="ReferenceError: unk is not defined\n    at <eval> (file.js:1)",
        ))
        self.assertEqual(out.verdict, Verdict.FAILED)
        self.assertEqual(out.error_type, ErrorType.REFERENCE_ERROR)
        self.assertEqual(out.error_message, "unk is not defined")

    def test_stderr_before_stdout(self) -> None:
        pat = r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"
        arb = self._arb([pat])
        out = arb.classify(mk_run(stdout="TypeError: from stdout", stderr="SyntaxError: from stderr"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "from stderr")

    def test_stderr_used_when_stdout_no_match(self) -> None:
        pat = r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"
        arb = self._arb([pat])
        out = arb.classify(mk_run(stdout="42", stderr="ReferenceError: unk"))
        self.assertEqual(out.error_type, ErrorType.REFERENCE_ERROR)

    # --- prefix style variants (matching real engine configs) ---

    def test_jsc_exception_prefix(self) -> None:
        # jsc: ^Exception: ErrorType: message on stdout
        arb = self._arb([r"^Exception: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = arb.classify(mk_run(stdout="Exception: SyntaxError: oops\nglobal code@file.js:1"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "oops")

    def test_uncaught_prefix(self) -> None:
        # hermes/escargot: ^Uncaught ErrorType: message
        arb = self._arb([r"^Uncaught (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = arb.classify(mk_run(stderr="Uncaught ReferenceError: x not defined"))
        self.assertEqual(out.error_type, ErrorType.REFERENCE_ERROR)
        self.assertEqual(out.error_message, "x not defined")

    def test_uncaught_exception_prefix(self) -> None:
        # qv4/nova: ^Uncaught exception: ErrorType: message
        arb = self._arb([r"^Uncaught exception: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = arb.classify(mk_run(
            stderr="Uncaught exception: ReferenceError: unk is not defined\n    at %entry (f.js:1)",
        ))
        self.assertEqual(out.error_type, ErrorType.REFERENCE_ERROR)
        self.assertEqual(out.error_message, "unk is not defined")

    def test_location_prefix(self) -> None:
        # kjs: ^path (line N): ErrorType: message
        arb = self._arb([r"^\S+ \(line [0-9]+\): (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = arb.classify(mk_run(stderr="/tmp/t.js (line 0): SyntaxError: oops"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "oops")

    def test_spidermonkey_location_prefix(self) -> None:
        # spidermonkey: ^path:line:col ErrorType: message
        arb = self._arb([r"^[^ ]+ (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = arb.classify(mk_run(stderr="/tmp/t.js:1:7 TypeError: bad type\nStack:\n  @/tmp/t.js:1:7"))
        self.assertEqual(out.error_type, ErrorType.TYPE_ERROR)
        self.assertEqual(out.error_message, "bad type")

    def test_error_prefix_pattern(self) -> None:
        pat = "^(?P<type>[A-Za-z]+Error): (?P<message>[^\n]+)"
        arb = self._arb([pat])
        out2 = arb.classify(mk_run(stderr="TypeError: bad"))
        self.assertEqual(out2.error_type, ErrorType.TYPE_ERROR)
        self.assertEqual(out2.error_message, "bad")

    # --- optional message group (jerryscript style) ---

    def test_optional_message_present(self) -> None:
        arb = self._arb([r"^Unhandled exception: (?P<type>[A-Za-z]+Error)(?:: (?P<message>.+))?$"])
        out = arb.classify(mk_run(stderr="Unhandled exception: SyntaxError: oops"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "oops")

    def test_optional_message_absent(self) -> None:
        arb = self._arb([r"^Unhandled exception: (?P<type>[A-Za-z]+Error)(?:: (?P<message>.+))?$"])
        out = arb.classify(mk_run(stderr="Unhandled exception: ReferenceError"))
        self.assertEqual(out.error_type, ErrorType.REFERENCE_ERROR)
        self.assertIsNone(out.error_message)

    def test_no_message_group(self) -> None:
        # Pattern with only a type group → message is None
        arb = self._arb([r"(?P<type>[A-Za-z]+Error)"])
        out = arb.classify(mk_run(stdout="SyntaxError"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertIsNone(out.error_message)

    def test_unknown_error_type_preserves_type_and_message(self) -> None:
        arb = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = arb.classify(mk_run(stdout="CustomError: bad"))
        self.assertEqual(out.error_type, ErrorType.GENERIC)
        self.assertEqual(out.error_message, "CustomError: bad")

    def test_unknown_error_type_without_message_preserves_type(self) -> None:
        arb = self._arb([r"^(?P<type>[A-Za-z]+Error)$"])
        out = arb.classify(mk_run(stdout="CustomError"))
        self.assertEqual(out.error_type, ErrorType.GENERIC)
        self.assertEqual(out.error_message, "CustomError")

    # --- priority ---

    def test_beats_errors_re_gives_clean_message(self) -> None:
        # exceptions_re extracts just the message; errors_re path would give the full line.
        arb = self._arb(
            [r"^Uncaught: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"],
            errors_re=[r"(?i)error"],
        )
        out = arb.classify(mk_run(stdout="Uncaught: TypeError: bad"))
        self.assertEqual(out.error_type, ErrorType.TYPE_ERROR)
        self.assertEqual(out.error_message, "bad")  # clean extract, not full line

    def test_crash_takes_priority_over_exceptions_re(self) -> None:
        arb = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = arb.classify(mk_run(stdout="TypeError: bad", exit_code=-11))
        self.assertEqual(out.error_type, ErrorType.CRASH)

    def test_no_match_falls_through_to_errors_re(self) -> None:
        arb = self._arb(
            [r"^Exception: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"],
            errors_re=[r"(?i)error"],
        )
        out = arb.classify(mk_run(stdout="some error occurred", exit_code=1))
        self.assertEqual(out.verdict, Verdict.FAILED)

    # --- multi-pattern / multi-line ---

    def test_first_matching_line_wins(self) -> None:
        arb = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = arb.classify(mk_run(stderr="SyntaxError: first\nReferenceError: second"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "first")

    def test_first_matching_pattern_wins(self) -> None:
        # For each line, patterns are tried in order; first match wins.
        arb = self._arb([
            r"^Prefix: (?P<type>[A-Za-z]+Error): (?P<message>.+)$",  # won't match
            r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$",
        ])
        out = arb.classify(mk_run(stderr="SyntaxError: oops"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)

    def test_raw_throw_no_match(self) -> None:
        # A raw string throw doesn't contain "Error:" → no exceptions_re match → OK
        arb = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = arb.classify(mk_run(stdout="raw string"))
        self.assertEqual(out.verdict, Verdict.OK)


if __name__ == "__main__":
    unittest.main()
