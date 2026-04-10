# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import unittest
from typing import Any

from harness.annotator import Annotator
from harness.config import EngineConfig
from harness.runner import Runner, RunResult, Verdict


def mk_run(**kwargs: Any) -> RunResult:
    defaults: dict[str, Any] = {
        "run_id": "t",
        "verdict_type": None,
        "command": "eng x.js",
        "stdout": "",
        "stderr": "",
        "cwd": "/tmp",
        "exit_code": 0,
    }
    defaults.update(kwargs)
    return RunResult(**defaults)


# (config_kwargs, run_kwargs, classify_kwargs, want_verdict_type, want_verdict_message)
_CLASSIFY_CASES: list[tuple[dict, dict, dict, Verdict, str]] = [
    (
        {},
        {"stdout": "42\n"},
        {},
        Verdict.PASS,
        "PASS",
    ),
    (
        {},
        {"stdout": "Error"},
        {"pass_pattern": r"OK"},
        Verdict.FAIL,
        "FAIL",
    ),
    (
        {},
        {"stdout": "", "exit_code": 3},
        {"pass_pattern": r"OK"},
        Verdict.FAIL,
        "FAIL",
    ),
    (
        {},
        {"stdout": "plain output"},
        {"pass_pattern": r"test\.js: OK"},
        Verdict.FAIL,
        "FAIL: plain output",
    ),
    (
        {},
        {"exit_code": -9, "verdict_type": Verdict.TIMEOUT, "verdict_detail": ">10s"},
        {},
        Verdict.TIMEOUT,
        "TIMEOUT: >10s",
    ),
    (
        {},
        {"exit_code": -9, "verdict_type": Verdict.OOM, "verdict_detail": ">1024MB"},
        {},
        Verdict.OOM,
        "OOM: >1024MB",
    ),
    (
        {},
        {"exit_code": -11},
        {},
        Verdict.CRASH,
        "CRASH: SIGSEGV",
    ),
    (
        {},
        {"exit_code": 2},
        {},
        Verdict.EXIT,
        "EXIT: 2",
    ),
    (
        {},
        {"stdout": "ReferenceError: x not defined", "exit_code": 1},
        {},
        Verdict.REFERENCE_ERROR,
        "ReferenceError: x not defined",
    ),
    (
        {},
        {"stdout": "test.js: OK\nnoise"},
        {"pass_pattern": r"test\.js: OK"},
        Verdict.PASS,
        "PASS",
    ),
    (
        {},
        {"stdout": "SyntaxError: bad"},
        {"pass_pattern": r"test\.js: OK"},
        Verdict.SYNTAX_ERROR,
        "SyntaxError: bad",
    ),
    (
        {},
        {"stdout": "EvalError: bad eval", "exit_code": 1},
        {},
        Verdict.EVAL_ERROR,
        "EvalError: bad eval",
    ),
    (
        {},
        {"stdout": "RangeError", "exit_code": 1},
        {},
        Verdict.RANGE_ERROR,
        "RangeError",
    ),
    (
        {},
        {"stdout": "RangeError: out of range", "exit_code": 1},
        {},
        Verdict.RANGE_ERROR,
        "RangeError: out of range",
    ),
    (
        {},
        {"stdout": "URIError: bad uri", "exit_code": 1},
        {},
        Verdict.URI_ERROR,
        "URIError: bad uri",
    ),
    (
        {},
        {"stdout": "InternalError: internal", "exit_code": 1},
        {},
        Verdict.INTERNAL_ERROR,
        "InternalError: internal",
    ),
    (
        {},
        {"stdout": "AggregateError: many", "exit_code": 1},
        {},
        Verdict.AGGREGATE_ERROR,
        "AggregateError: many",
    ),
    (
        {},
        {"stdout": "SuppressedError: suppressed", "exit_code": 1},
        {},
        Verdict.SUPPRESSED_ERROR,
        "SuppressedError: suppressed",
    ),
    (
        {},
        {"stdout": "Test262Error: assert", "exit_code": 1},
        {},
        Verdict.TEST262_ERROR,
        "Test262Error: assert",
    ),
    # fail_pattern tests
    (
        {},
        {"stdout": "test.js: OK\ntest.js: failed"},
        {"pass_pattern": r"test\.js: OK", "fail_pattern": r"test\.js: (?:failed|exception)"},
        Verdict.FAIL,
        "FAIL: found both pass and fail markers",
    ),
    (
        {},
        {"stdout": "test.js: OK"},
        {"pass_pattern": r"test\.js: OK", "fail_pattern": r"test\.js: (?:failed|exception)"},
        Verdict.PASS,
        "PASS",
    ),
    (
        {},
        {"stdout": "test.js: OK\ntest.js: exception: TypeError: bad"},
        {"pass_pattern": r"test\.js: OK", "fail_pattern": r"test\.js: (?:failed|exception)"},
        Verdict.FAIL,
        "FAIL: found both pass and fail markers",
    ),
    (
        {},
        {"stdout": "test.js: exception: TypeError: bad"},
        {"pass_pattern": r"test\.js: OK", "fail_pattern": r"test\.js: (?:failed|exception)"},
        Verdict.TYPE_ERROR,
        "TypeError: test.js: exception: TypeError: bad",
    ),
    (
        {},
        {"stdout": "Test262: This statement should not be evaluated."},
        {},
        Verdict.DONOTEVALUATE,
        "DONOTEVALUATE",
    ),
    # async tests
    (
        {},
        {"stdout": "Test262:AsyncTestComplete"},
        {"expect_async": True},
        Verdict.PASS,
        "PASS",
    ),
    (
        {},
        {"stdout": "Test262:AsyncTestFailure: boom"},
        {"expect_async": True},
        Verdict.ASYNC_TEST_FAILURE,
        "AsyncTestFailure: boom",
    ),
    (
        {},
        {"stdout": "plain"},
        {"expect_async": True},
        Verdict.NO_ASYNC_TEST_COMPLETE,
        "NoAsyncTestComplete",
    ),
    # negative tests
    (
        {},
        {"stderr": "SyntaxError: bad", "exit_code": 1},
        {"negative_phase": "parse", "negative_type": "SyntaxError"},
        Verdict.PASS,
        "PASS",
    ),
    (
        {},
        {"exit_code": -9, "verdict_type": Verdict.TIMEOUT},
        {"negative_phase": "parse", "negative_type": "SyntaxError"},
        Verdict.TIMEOUT,
        "TIMEOUT",
    ),
    (
        {},
        {"exit_code": -11},
        {"negative_phase": "runtime", "negative_type": "TypeError"},
        Verdict.CRASH,
        "CRASH: SIGSEGV",
    ),
    (
        {},
        {"stdout": "ok"},
        {"negative_phase": "runtime", "negative_type": "TypeError"},
        Verdict.NEGATIVE,
        "NOT(TypeError): PASS",
    ),
    (
        {},
        {"stdout": "RangeError"},
        {"negative_phase": "runtime", "negative_type": "EvalError"},
        Verdict.NEGATIVE,
        "NOT(EvalError): RangeError",
    ),
    (
        {},
        {"stderr": "TypeError: bad", "exit_code": 1},
        {"negative_phase": "runtime", "negative_type": "SyntaxError"},
        Verdict.NEGATIVE,
        "NOT(SyntaxError): TypeError: bad",
    ),
    (
        {},
        {"stdout": "ok"},
        {"negative_phase": "parse", "negative_type": "SyntaxError"},
        Verdict.NEGATIVE,
        "NOT(SyntaxError): PASS",
    ),
    (
        {},
        {"exit_code": 1},
        {"negative_phase": "runtime", "negative_type": "SyntaxError"},
        Verdict.NEGATIVE,
        "NOT(SyntaxError): EXIT: 1",
    ),
    (
        {"exit_code_for_syntax_error": 101},
        {"exit_code": 101},
        {},
        Verdict.SYNTAX_ERROR,
        "SyntaxError: exit code 101",
    ),
    (
        {"exit_code_for_syntax_error": 101},
        {"exit_code": 101},
        {"negative_phase": "parse", "negative_type": "SyntaxError"},
        Verdict.PASS,
        "PASS",
    ),
    (
        {"exit_code_may_be_syntax_error": 7},
        {"exit_code": 7},
        {},
        Verdict.EXIT,
        "EXIT: 7",
    ),
    (
        {"exit_code_may_be_syntax_error": 7},
        {"exit_code": 7},
        {"negative_phase": "parse", "negative_type": "SyntaxError"},
        Verdict.PASS,
        "PASS",
    ),
    (
        {"exit_code_may_be_test262_error": 9},
        {"exit_code": 9},
        {},
        Verdict.EXIT,
        "EXIT: 9",
    ),
    (
        {"exit_code_may_be_test262_error": 9},
        {"exit_code": 9},
        {"negative_phase": "runtime", "negative_type": "Test262Error"},
        Verdict.PASS,
        "PASS",
    ),
    (
        {"errors_re": [r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stdout": "TypeError: bad type\n    at file.js:1:7"},
        {},
        Verdict.TYPE_ERROR,
        "TypeError: bad type",
    ),
    (
        {"errors_re": [r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stderr": "ReferenceError: unk is not defined\n    at <eval> (file.js:1)"},
        {},
        Verdict.REFERENCE_ERROR,
        "ReferenceError: unk is not defined",
    ),
    (
        {"errors_re": [r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stdout": "TypeError: from stdout", "stderr": "SyntaxError: from stderr"},
        {},
        Verdict.SYNTAX_ERROR,
        "SyntaxError: from stderr; from stdout",
    ),
    (
        {"errors_re": [r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stdout": "42", "stderr": "ReferenceError: unk"},
        {},
        Verdict.REFERENCE_ERROR,
        "ReferenceError: unk",
    ),
    (
        {"errors_re": [r"^Exception: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stdout": "Exception: SyntaxError: oops\nglobal code@file.js:1"},
        {},
        Verdict.SYNTAX_ERROR,
        "SyntaxError: oops",
    ),
    (
        {"errors_re": [r"^Uncaught (?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stderr": "Uncaught ReferenceError: x not defined"},
        {},
        Verdict.REFERENCE_ERROR,
        "ReferenceError: x not defined",
    ),
    (
        {"errors_re": [r"^Uncaught exception: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stderr": "Uncaught exception: ReferenceError: unk is not defined\n    at %entry (f.js:1)"},
        {},
        Verdict.REFERENCE_ERROR,
        "ReferenceError: unk is not defined",
    ),
    (
        {"errors_re": [r"^\S+ \(line [0-9]+\): (?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stderr": "/tmp/t.js (line 0): SyntaxError: oops"},
        {},
        Verdict.SYNTAX_ERROR,
        "SyntaxError: oops",
    ),
    (
        {"errors_re": [r"^[^ ]+ (?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stderr": "/tmp/t.js:1:7 TypeError: bad type\nStack:\n  @/tmp/t.js:1:7"},
        {},
        Verdict.TYPE_ERROR,
        "TypeError: bad type",
    ),
    (
        {"errors_re": [r"^(?P<type>[A-Za-z]+Error): (?P<message>[^\n]+)"]},
        {"stderr": "TypeError: bad"},
        {},
        Verdict.TYPE_ERROR,
        "TypeError: bad",
    ),
    (
        {"errors_re": [r"^Unhandled exception: (?P<type>[A-Za-z]+Error)(?:: (?P<message>.+))?$"]},
        {"stderr": "Unhandled exception: SyntaxError: oops"},
        {},
        Verdict.SYNTAX_ERROR,
        "SyntaxError: oops",
    ),
    (
        {"errors_re": [r"^Unhandled exception: (?P<type>[A-Za-z]+Error)(?:: (?P<message>.+))?$"]},
        {"stderr": "Unhandled exception: ReferenceError"},
        {},
        Verdict.REFERENCE_ERROR,
        "ReferenceError",
    ),
    (
        {"errors_re": [r"(?P<type>[A-Za-z]+Error)"]},
        {"stdout": "SyntaxError"},
        {},
        Verdict.SYNTAX_ERROR,
        "SyntaxError",
    ),
    (
        {"errors_re": [r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stdout": "CustomError: bad"},
        {},
        Verdict.FAIL,
        "FAIL: CustomError: bad",
    ),
    (
        {"errors_re": [r"^(?P<type>[A-Za-z]+Error)$"]},
        {"stdout": "CustomError"},
        {},
        Verdict.FAIL,
        "FAIL: CustomError",
    ),
    (
        {"errors_re": [r"^Uncaught: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stdout": "Uncaught: TypeError: bad"},
        {},
        Verdict.TYPE_ERROR,
        "TypeError: bad",
    ),
    (
        {"errors_re": [r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stdout": "TypeError: bad", "exit_code": -11},
        {},
        Verdict.CRASH,
        "CRASH: SIGSEGV",
    ),
    (
        {"errors_re": [r"^Exception: (?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stdout": "some error occurred", "exit_code": 1},
        {},
        Verdict.EXIT,
        "EXIT: 1",
    ),
    (
        {"errors_re": [r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stderr": "SyntaxError: first\nReferenceError: second"},
        {},
        Verdict.SYNTAX_ERROR,
        "SyntaxError: first; second",
    ),
    (
        {"errors_re": [
            r"^Prefix: (?P<type>[A-Za-z]+Error): (?P<message>.+)$",
            r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$",
        ]},
        {"stderr": "SyntaxError: oops"},
        {},
        Verdict.SYNTAX_ERROR,
        "SyntaxError: oops",
    ),
    (
        {"errors_re": [r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"]},
        {"stdout": "raw string"},
        {},
        Verdict.PASS,
        "PASS",
    ),
]

class AnnotatorTest(unittest.TestCase):
    def test_classify(self) -> None:
        for cfg_kw, run_kw, cls_kw, want_vt, want_message in _CLASSIFY_CASES:
            with self.subTest(config=cfg_kw, run=run_kw):
                cl = Annotator(EngineConfig(**cfg_kw))
                out = cl.classify(mk_run(**run_kw), **cls_kw)
                self.assertEqual(out.verdict_type, want_vt)
                self.assertEqual(out.verdict_message(), want_message)

    def test_verdict_message_for_every_verdict(self) -> None:
        cases: list[list[Verdict | str | None]] = [
            ["PASS", Verdict.PASS, None],
            ["SKIP: filtered out", Verdict.SKIP, "filtered out"],
            ["FAIL: generic failure", Verdict.FAIL, "generic failure"],
            ["CRASH: SIGSEGV", Verdict.CRASH, "SIGSEGV"],
            ["TIMEOUT: >10s", Verdict.TIMEOUT, ">10s"],
            ["OOM: >1024MB", Verdict.OOM, ">1024MB"],
            ["EXIT: 2", Verdict.EXIT, "2"],
            ["SyntaxError: bad", Verdict.SYNTAX_ERROR, "bad"],
            ["ReferenceError: x is not defined", Verdict.REFERENCE_ERROR, "x is not defined"],
            ["TypeError: bad type", Verdict.TYPE_ERROR, "bad type"],
            ["EvalError: bad eval", Verdict.EVAL_ERROR, "bad eval"],
            ["RangeError: out of range", Verdict.RANGE_ERROR, "out of range"],
            ["URIError: bad uri", Verdict.URI_ERROR, "bad uri"],
            ["InternalError: internal", Verdict.INTERNAL_ERROR, "internal"],
            ["AggregateError: many", Verdict.AGGREGATE_ERROR, "many"],
            ["SuppressedError: suppressed", Verdict.SUPPRESSED_ERROR, "suppressed"],
            ["Test262Error: assert", Verdict.TEST262_ERROR, "assert"],
            ["NOT(SyntaxError): TypeError", Verdict.NEGATIVE, "NOT(SyntaxError): TypeError"],
            ["DONOTEVALUATE", Verdict.DONOTEVALUATE, None],
            ["NoAsyncTestComplete", Verdict.NO_ASYNC_TEST_COMPLETE, None],
            ["AsyncTestFailure: boom", Verdict.ASYNC_TEST_FAILURE, "boom"],
        ]
        for want, verdict_type, verdict_detail in cases:
            run = mk_run(verdict_type=verdict_type, verdict_detail=verdict_detail)
            self.assertEqual(run.verdict_message(), want)

    def test_stdout_replace_re_anchors_match_per_line(self) -> None:
        # ^ and $ in *_replace_re patterns are line-anchored (re.MULTILINE).
        cfg = EngineConfig(stdout_replace_re={"^noise: ": "", "noise$": ""})
        cl = Annotator(cfg)
        run = cl.classify(mk_run(stdout="noise: keep this\nkeep noise\n"))
        self.assertEqual(run.stdout_cleaned, "keep this\nkeep\n")

    def test_stdout_replace_re_list_of_dicts_form(self) -> None:
        cfg = EngineConfig(stdout_replace_re=[{"^noise: ": ""}, {"noise$": ""}])
        cl = Annotator(cfg)
        run = cl.classify(mk_run(stdout="noise: keep this\nkeep noise\n"))
        self.assertEqual(run.stdout_cleaned, "keep this\nkeep\n")

    def test_shorten_message_drops_redundant_syntax_error_text(self) -> None:
        cl = Annotator(EngineConfig(
            errors_re=[r"^(?P<type>SyntaxError): (?P<message>.*)$"],
        ))
        run = cl.classify(mk_run(stdout="SyntaxError: syntax error\n", exit_code=1))
        self.assertEqual(run.verdict_type, Verdict.SYNTAX_ERROR)
        self.assertIsNone(run.verdict_detail)
        self.assertEqual(run.verdict_message(), "SyntaxError")

    def test_strip_ansi_from_stdout_and_stderr(self) -> None:
        cl = Annotator(EngineConfig())
        run = cl.classify(mk_run(
            stdout="\x1b[1;31mError\x1b[0m: bad\n",
            stderr="\x1b[32mPASS\x1b[0m\n",
            exit_code=1,
        ))
        self.assertEqual(run.stdout_cleaned, "Error: bad\n")
        self.assertEqual(run.stderr_cleaned, "PASS\n")

    def test_real_crash_produces_signal_name(self) -> None:
        import shutil
        from harness import Runner
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
        result = Annotator(EngineConfig()).classify(run)
        self.assertEqual(result.verdict_type, Verdict.CRASH)
        self.assertEqual(result.verdict_detail, "SIGABRT")

    def test_strip_cwd(self) -> None:
        ann = Annotator(EngineConfig())
        run = mk_run(stderr="SyntaxError: Could not find export 'default' in module '/my/emit/test/foo.js'", exit_code=1, cwd="/my/emit")
        ann.classify(run)
        self.assertEqual(run.verdict_detail, "Could not find export 'default' in module 'test/foo.js'")
        # file:// URLs are also stripped
        run = mk_run(stderr="TypeError: bad in file:///my/emit/test/foo.js", exit_code=1, cwd="/my/emit")
        ann.classify(run)
        self.assertEqual(run.verdict_detail, "bad in test/foo.js")


if __name__ == "__main__":
    unittest.main()
