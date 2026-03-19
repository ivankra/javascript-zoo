# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import unittest
from typing import Any

from conformance.lib import (
    Classifier,
    EngineConfig,
    ErrorType,
    RunMetrics,
    RunResult,
    Runner,
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


# (label, run_kwargs, classify_kwargs, want_verdict, want_error_type, want_msg_substr)
_CLASSIFY_CASES: list[tuple[str, dict, dict, Verdict, ErrorType | None, str]] = [
    ("timeout preset",     {"exit_code": -9, "error_type": ErrorType.TIMEOUT}, {},                          Verdict.FAILED, ErrorType.TIMEOUT,                   ""),
    ("oom preset",         {"exit_code": -9, "error_type": ErrorType.OOM, "error_message": ">1024MB"}, {}, Verdict.FAILED, ErrorType.OOM, ">1024MB"),
    ("crash signal 11",    {"exit_code": -11},                                  {},                          Verdict.FAILED, ErrorType.CRASHED,                     "SIGSEGV"),
    ("nonzero exit",       {"exit_code": 2},                                    {},                          Verdict.FAILED, ErrorType.EXIT,                      "2"),
    ("clean ok",           {"stdout": "42\n"},                                  {},                          Verdict.OK,   None,                                ""),
    ("nonzero exit+output", {"stdout": "ReferenceError: x not defined", "exit_code": 1}, {},              Verdict.FAILED, ErrorType.REFERENCE_ERROR,           "x not defined"),
    ("ok pattern found",   {"stdout": "test.js: OK\nnoise"},                    {"ok_pattern": r"test\.js: OK"}, Verdict.OK,   None,                    ""),
    ("ok pattern missing", {"stdout": "plain output"},                          {"ok_pattern": r"test\.js: OK"}, Verdict.FAILED, ErrorType.GENERIC,     ""),
    ("ok absent+error",    {"stdout": "SyntaxError: bad"},                      {"ok_pattern": r"test\.js: OK"}, Verdict.FAILED, ErrorType.SYNTAX_ERROR,   "bad"),
    ("ok absent+exit 3",   {"stdout": "", "exit_code": 3},                      {"ok_pattern": r"test\.js: OK"}, Verdict.FAILED, ErrorType.GENERIC,     ""),
    # fail_pattern tests
    ("ok+fail both present",  {"stdout": "test.js: OK\ntest.js: failed"},        {"ok_pattern": r"test\.js: OK", "fail_pattern": r"test\.js: (?:failed|exception)"}, Verdict.FAILED, ErrorType.GENERIC, "both ok and fail"),
    ("ok+fail ok only",       {"stdout": "test.js: OK"},                         {"ok_pattern": r"test\.js: OK", "fail_pattern": r"test\.js: (?:failed|exception)"}, Verdict.OK,     None,                 ""),
    ("ok+fail exception line",{"stdout": "test.js: OK\ntest.js: exception: TypeError: bad"}, {"ok_pattern": r"test\.js: OK", "fail_pattern": r"test\.js: (?:failed|exception)"}, Verdict.FAILED, ErrorType.GENERIC, "both ok and fail"),
    ("ok+fail fail only",     {"stdout": "test.js: exception: TypeError: bad"},  {"ok_pattern": r"test\.js: OK", "fail_pattern": r"test\.js: (?:failed|exception)"}, Verdict.FAILED, ErrorType.TYPE_ERROR,  "bad"),
    # async tests
    ("async complete",     {"stdout": "Test262:AsyncTestComplete"},              {"expect_async": True},      Verdict.OK,   None,                                ""),
    ("async failure",      {"stdout": "Test262:AsyncTestFailure: boom"},         {"expect_async": True},      Verdict.FAILED, ErrorType.ASYNC_TEST_FAILURE,        "boom"),
    ("async missing",      {"stdout": "plain"},                                  {"expect_async": True},      Verdict.FAILED, ErrorType.NO_ASYNC_TEST_COMPLETE, ""),
]

class ClassifierTest(unittest.TestCase):
    def test_classify(self) -> None:
        cl = Classifier(EngineConfig())
        for label, run_kw, cls_kw, want_v, want_et, want_msg in _CLASSIFY_CASES:
            with self.subTest(label):
                out = cl.classify(mk_run(**run_kw), **cls_kw)
                self.assertEqual(out.verdict, want_v)
                self.assertEqual(out.error_type, want_et)
                if want_msg:
                    self.assertIn(want_msg, out.error_message or "")

    def test_warnings_re_suppresses_matched_lines(self) -> None:
        cl = Classifier(EngineConfig(
            errors_re=[r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"],
            warnings_re=[r"^Note:"],
        ))
        out = cl.classify(mk_run(stdout="Note: TypeError: warning\nSyntaxError: real", exit_code=1))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "real")

    def test_stdout_replace_re_anchors_match_per_line(self) -> None:
        # ^ and $ in *_replace_re patterns are line-anchored (re.MULTILINE).
        cfg = EngineConfig(stdout_replace_re={"^noise: ": "", "noise$": ""})
        cl = Classifier(cfg)
        run = cl.classify(mk_run(stdout="noise: keep this\nkeep noise\n"))
        self.assertEqual(run.stdout_cleaned, "keep this\nkeep\n")

    def test_stdout_replace_re_list_of_dicts_form(self) -> None:
        cfg = EngineConfig(stdout_replace_re=[{"^noise: ": ""}, {"noise$": ""}])
        cl = Classifier(cfg)
        run = cl.classify(mk_run(stdout="noise: keep this\nkeep noise\n"))
        self.assertEqual(run.stdout_cleaned, "keep this\nkeep\n")

    def test_strip_ansi_from_stdout_and_stderr(self) -> None:
        cl = Classifier(EngineConfig())
        run = cl.classify(mk_run(
            stdout="\x1b[1;31mError\x1b[0m: bad\n",
            stderr="\x1b[32mOK\x1b[0m\n",
            exit_code=1,
        ))
        self.assertEqual(run.stdout_cleaned, "Error: bad\n")
        self.assertEqual(run.stderr_cleaned, "OK\n")

    def test_jsish(self) -> None:
        cl = Classifier(EngineConfig.load("/bin/true", config_name="jsish"))
        cases = [
            (
                "/conformance/es1/literals.string.hex.js:6: parse: Unsupported string escape: \\x\n"
                'literals.string.hex.js:9:   "es1/literals.string.hex.js: failed",\n',
                "SyntaxError: Unsupported string escape: \\x",
            ),
            (
                "/conformance/es1/asi.js:14: parse: :13.6: error: syntax error, unexpected '}'\n"
                "ERROR: \n",
                "SyntaxError: unexpected '}'",
            ),
            (
                "/conformance/es1/asi.eval.js:2: parse: /conformance/es1/asi.eval.js:2.7: error: syntax error, unexpected '}'\n"
                "ERROR: \n",
                "SyntaxError: unexpected '}'",
            ),
            (
                "/conformance/es1/Array.prototype.join.generic.js:13: error: expected array object\n"
                "ERROR: \n",
                "expected array object",
            ),
            (
                'typeof.null.js:11:  "es1/typeof.null.js: typeof null != \'object\'", \n',
                "exit code 1",
            ),
        ]
        for raw_stderr, want_vm in cases:
            with self.subTest(want_vm):
                run = cl.classify(mk_run(stderr=raw_stderr, exit_code=1))
                self.assertEqual(run.verdict_message(), want_vm)

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
        result = Classifier(EngineConfig()).classify(run)
        self.assertEqual(result.error_type, ErrorType.CRASHED)
        self.assertEqual(result.error_message, "SIGABRT")


class ErrorsReTest(unittest.TestCase):
    """Tests for errors_re patterns."""

    def _arb(self, errors_re: list[str] | None = None) -> Classifier:
        return Classifier(EngineConfig(errors_re=errors_re or []))

    # --- stream selection ---

    def test_stdout_match(self) -> None:
        # v8-style: bare ErrorType: message on stdout
        cl = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(stdout="TypeError: bad type\n    at file.js:1:7"))
        self.assertEqual(out.verdict, Verdict.FAILED)
        self.assertEqual(out.error_type, ErrorType.TYPE_ERROR)
        self.assertEqual(out.error_message, "bad type")

    def test_stderr_match(self) -> None:
        # quickjs/engine262-style: bare ErrorType: message on stderr
        cl = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(
            stderr="ReferenceError: unk is not defined\n    at <eval> (file.js:1)",
        ))
        self.assertEqual(out.verdict, Verdict.FAILED)
        self.assertEqual(out.error_type, ErrorType.REFERENCE_ERROR)
        self.assertEqual(out.error_message, "unk is not defined")

    def test_stderr_before_stdout(self) -> None:
        pat = r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"
        cl = self._arb([pat])
        out = cl.classify(mk_run(stdout="TypeError: from stdout", stderr="SyntaxError: from stderr"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "from stderr; from stdout")

    def test_stderr_used_when_stdout_no_match(self) -> None:
        pat = r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"
        cl = self._arb([pat])
        out = cl.classify(mk_run(stdout="42", stderr="ReferenceError: unk"))
        self.assertEqual(out.error_type, ErrorType.REFERENCE_ERROR)

    # --- prefix style variants (matching real engine configs) ---

    def test_jsc_exception_prefix(self) -> None:
        # jsc: ^Exception: ErrorType: message on stdout
        cl = self._arb([r"^Exception: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(stdout="Exception: SyntaxError: oops\nglobal code@file.js:1"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "oops")

    def test_uncaught_prefix(self) -> None:
        # hermes/escargot: ^Uncaught ErrorType: message
        cl = self._arb([r"^Uncaught (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(stderr="Uncaught ReferenceError: x not defined"))
        self.assertEqual(out.error_type, ErrorType.REFERENCE_ERROR)
        self.assertEqual(out.error_message, "x not defined")

    def test_uncaught_exception_prefix(self) -> None:
        # qv4/nova: ^Uncaught exception: ErrorType: message
        cl = self._arb([r"^Uncaught exception: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(
            stderr="Uncaught exception: ReferenceError: unk is not defined\n    at %entry (f.js:1)",
        ))
        self.assertEqual(out.error_type, ErrorType.REFERENCE_ERROR)
        self.assertEqual(out.error_message, "unk is not defined")

    def test_location_prefix(self) -> None:
        # kjs: ^path (line N): ErrorType: message
        cl = self._arb([r"^\S+ \(line [0-9]+\): (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(stderr="/tmp/t.js (line 0): SyntaxError: oops"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "oops")

    def test_spidermonkey_location_prefix(self) -> None:
        # spidermonkey: ^path:line:col ErrorType: message
        cl = self._arb([r"^[^ ]+ (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(stderr="/tmp/t.js:1:7 TypeError: bad type\nStack:\n  @/tmp/t.js:1:7"))
        self.assertEqual(out.error_type, ErrorType.TYPE_ERROR)
        self.assertEqual(out.error_message, "bad type")

    def test_error_prefix_pattern(self) -> None:
        pat = "^(?P<type>[A-Za-z]+Error): (?P<message>[^\n]+)"
        cl = self._arb([pat])
        out2 = cl.classify(mk_run(stderr="TypeError: bad"))
        self.assertEqual(out2.error_type, ErrorType.TYPE_ERROR)
        self.assertEqual(out2.error_message, "bad")

    # --- optional message group (jerryscript style) ---

    def test_optional_message_present(self) -> None:
        cl = self._arb([r"^Unhandled exception: (?P<type>[A-Za-z]+Error)(?:: (?P<message>.+))?$"])
        out = cl.classify(mk_run(stderr="Unhandled exception: SyntaxError: oops"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "oops")

    def test_optional_message_absent(self) -> None:
        cl = self._arb([r"^Unhandled exception: (?P<type>[A-Za-z]+Error)(?:: (?P<message>.+))?$"])
        out = cl.classify(mk_run(stderr="Unhandled exception: ReferenceError"))
        self.assertEqual(out.error_type, ErrorType.REFERENCE_ERROR)
        self.assertIsNone(out.error_message)

    def test_no_message_group(self) -> None:
        # Pattern with only a type group → message is None
        cl = self._arb([r"(?P<type>[A-Za-z]+Error)"])
        out = cl.classify(mk_run(stdout="SyntaxError"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertIsNone(out.error_message)

    def test_unknown_error_type_preserves_type_and_message(self) -> None:
        cl = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(stdout="CustomError: bad"))
        self.assertEqual(out.error_type, ErrorType.GENERIC)
        self.assertEqual(out.error_message, "CustomError: bad")

    def test_unknown_error_type_without_message_preserves_type(self) -> None:
        cl = self._arb([r"^(?P<type>[A-Za-z]+Error)$"])
        out = cl.classify(mk_run(stdout="CustomError"))
        self.assertEqual(out.error_type, ErrorType.GENERIC)
        self.assertEqual(out.error_message, "CustomError")

    # --- priority ---

    def test_errors_re_extracts_clean_message(self) -> None:
        cl = self._arb([r"^Uncaught: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(stdout="Uncaught: TypeError: bad"))
        self.assertEqual(out.error_type, ErrorType.TYPE_ERROR)
        self.assertEqual(out.error_message, "bad")

    def test_crash_takes_priority_over_errors_re(self) -> None:
        cl = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(stdout="TypeError: bad", exit_code=-11))
        self.assertEqual(out.error_type, ErrorType.CRASHED)

    def test_no_match_returns_exit_code_failure(self) -> None:
        cl = self._arb([r"^Exception: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(stdout="some error occurred", exit_code=1))
        self.assertEqual(out.verdict, Verdict.FAILED)
        self.assertEqual(out.error_type, ErrorType.EXIT)

    # --- multi-pattern / multi-line ---

    def test_first_matching_line_wins(self) -> None:
        cl = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(stderr="SyntaxError: first\nReferenceError: second"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "first; second")

    def test_first_matching_pattern_wins(self) -> None:
        # For each line, patterns are tried in order; first match wins.
        cl = self._arb([
            r"^Prefix: (?P<type>[A-Za-z]+Error): (?P<message>.+)$",  # won't match
            r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$",
        ])
        out = cl.classify(mk_run(stderr="SyntaxError: oops"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)

    def test_raw_throw_no_match(self) -> None:
        # A raw string throw doesn't contain "Error:" → no errors_re match → OK
        cl = self._arb([r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"])
        out = cl.classify(mk_run(stdout="raw string"))
        self.assertEqual(out.verdict, Verdict.OK)


if __name__ == "__main__":
    unittest.main()
