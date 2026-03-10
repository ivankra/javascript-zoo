# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import json
import os
import re
import sys
import tempfile
import unittest
from unittest import mock
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).parent))

from lib import (
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
        self.assertEqual(r.combined_output(), "out\nerr")

    def test_combined_output_both_no_extra_newline(self) -> None:
        r = mk_run(stdout="out\n", stderr="err\n")
        self.assertEqual(r.combined_output(), "out\nerr\n")

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
# EngineConfig.command
# ---------------------------------------------------------------------------

class EngineConfigCommandTest(unittest.TestCase):
    def _cfg(self, **kw: Any) -> EngineConfig:
        kw.setdefault("binary_path", "/usr/bin/eng")
        return EngineConfig(**kw)

    def test_bare_command(self) -> None:
        cmd = self._cfg().argv("/tmp/s.js")
        self.assertEqual(cmd, ["/usr/bin/eng", "/tmp/s.js"])

    def test_flags_prepended(self) -> None:
        cmd = self._cfg(flags=["--strict", "-O"]).argv("/tmp/s.js")
        self.assertEqual(cmd, ["/usr/bin/eng", "--strict", "-O", "/tmp/s.js"])

    def test_module_flag_only_in_module_mode(self) -> None:
        cfg = self._cfg(flags=["eval"], module_flag="--module")
        self.assertEqual(cfg.argv("/tmp/s.js", module=False),
                         ["/usr/bin/eng", "eval", "/tmp/s.js"])
        self.assertEqual(cfg.argv("/tmp/s.js", module=True),
                         ["/usr/bin/eng", "eval", "--module", "/tmp/s.js"])

    def test_path_object_stringified(self) -> None:
        cmd = self._cfg().argv(Path("/tmp/s.js"))
        self.assertEqual(cmd, ["/usr/bin/eng", "/tmp/s.js"])

    def test_multiple_positional_args_appended(self) -> None:
        cmd = self._cfg(flags=["eval"]).argv(Path("/tmp/a.js"), "--flag", "/tmp/b.js")
        self.assertEqual(cmd, ["/usr/bin/eng", "eval", "/tmp/a.js", "--flag", "/tmp/b.js"])

    def test_mode_overrides_default_flags(self) -> None:
        cfg = self._cfg(flags=["eval"], test262_flags=["--harmony"])
        cmd = cfg.argv("/tmp/s.js", mode="test262")
        self.assertEqual(cmd, ["/usr/bin/eng", "--harmony", "/tmp/s.js"])

    def test_mode_falls_back_to_default_flags(self) -> None:
        cfg = self._cfg(flags=["eval"], test262_flags=None)
        cmd = cfg.argv("/tmp/s.js", mode="test262")
        self.assertEqual(cmd, ["/usr/bin/eng", "eval", "/tmp/s.js"])

    def test_mode_appends_extra_flags(self) -> None:
        cfg = self._cfg(flags=["eval"], bench_flags=["-O", "-w"])
        cmd = cfg.argv("--fast", "/tmp/s.js", mode="bench")
        self.assertEqual(cmd, ["/usr/bin/eng", "-O", "-w", "--fast", "/tmp/s.js"])


# ---------------------------------------------------------------------------
# EngineConfig.load
# ---------------------------------------------------------------------------

class EngineConfigLoadTest(unittest.TestCase):
    _td: tempfile.TemporaryDirectory[str]
    _binary: Path

    @classmethod
    def setUpClass(cls) -> None:
        cls._td = tempfile.TemporaryDirectory()
        cls._binary = Path(cls._td.name) / "eng"
        cls._binary.write_text("#!/bin/sh\necho hi\n")
        cls._binary.chmod(0o755)

    @classmethod
    def tearDownClass(cls) -> None:
        cls._td.cleanup()

    def _make_binary(self, td: str, name: str = "eng") -> Path:
        p = Path(td) / name
        p.write_text("#!/bin/sh\necho hi\n")
        p.chmod(0o755)
        return p

    def test_load_basic(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            cfg = EngineConfig.load(str(binary))
            self.assertEqual(cfg.binary_path, str(binary))
            self.assertEqual(cfg.flags, [])

    def test_load_sidecar_json(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(
                json.dumps({"engine": "myeng", "console_log": "print"})
            )
            cfg = EngineConfig.load(str(binary))
            self.assertEqual(cfg.engine, "myeng")
            self.assertEqual(cfg.console_log, "print")

    def test_load_flags_from_runner_json(self) -> None:
        cfg = EngineConfig.load(str(self._binary), config_name="nova")
        self.assertEqual(cfg.flags, ["eval"])

    def test_load_module_flag_from_runner_json(self) -> None:
        cfg = EngineConfig.load(str(self._binary), config_name="quickjs")
        self.assertEqual(cfg.module_flag, "--module")

    def test_load_test262_flags_from_runner_json(self) -> None:
        cfg = EngineConfig.load(str(self._binary), config_name="v8")
        self.assertIn("--harmony", cfg.test262_flags or [])
        self.assertIn("--future", cfg.test262_flags or [])

    def test_load_bench_flags_from_runner_json(self) -> None:
        cfg = EngineConfig.load(str(self._binary), config_name="hermes")
        self.assertEqual(cfg.bench_flags, ["-O", "-w"])
        self.assertEqual(cfg.flags, [])

    def test_load_multiple_scripts_from_runner_json(self) -> None:
        cfg = EngineConfig.load(str(self._binary), config_name="jsc")
        self.assertEqual(cfg.multiple_scripts, "shared")

    def test_load_uses_binary_then_short_then_variant_then_engine(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td, "eng_variant")
            (Path(td) / "eng_variant.json").write_text(json.dumps({
                "engine": "engine-name",
                "variant": "variant-name",
            }))
            with mock.patch.object(EngineConfig, "get_configs", return_value={
                "eng_variant": {"console_log": "binary"},
                "eng": {"console_log": "short"},
                "engine-name_variant-name": {"console_log": "variant"},
                "engine-name": {"console_log": "engine"},
            }):
                cfg = EngineConfig.load(str(binary))
            self.assertEqual(cfg.console_log, "binary")

    def test_load_any_engineconfig_field_from_sidecar(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(json.dumps({
                "cwd": "/tmp/work",
                "env": {"MODE": "test"},
                "output_limit": 123,
            }))
            cfg = EngineConfig.load(str(binary))
            self.assertEqual(cfg.cwd, "/tmp/work")
            self.assertEqual(cfg.env, {"MODE": "test"})
            self.assertEqual(cfg.output_limit, 123)

    def test_load_multiple_scripts_from_sidecar(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(json.dumps({"multiple_scripts": "isolated"}))
            cfg = EngineConfig.load(str(binary))
            self.assertEqual(cfg.multiple_scripts, "isolated")

    def test_cmdline_flags_override_config(self) -> None:
        # nova config has flags: ["eval"]; cmdline flags win
        cfg = EngineConfig.load(f"{self._binary} --fast", config_name="nova")
        self.assertEqual(cfg.flags, ["--fast"])

    def test_explicit_config_name_overrides_detected_config(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(json.dumps({"engine": "quickjs"}))
            cfg = EngineConfig.load(str(binary), config_name="nova")
            self.assertEqual(cfg.flags, ["eval"])
            self.assertEqual(cfg.module_flag, "--module")

    def test_non_executable_raises(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            p = Path(td) / "eng"
            p.write_text("not a script")
            p.chmod(0o644)
            with self.assertRaises(SystemExit):
                EngineConfig.load(str(p))

    def test_missing_binary_raises(self) -> None:
        with self.assertRaises(SystemExit):
            EngineConfig.load("/nonexistent/binary")

    def test_conformance_suite_from_sidecar(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(json.dumps({"conformance_suite": ["es5"]}))
            cfg = EngineConfig.load(str(binary))
            self.assertEqual(cfg.conformance_suite, ["es5"])

    def test_conformance_suite_explicit_empty_list(self) -> None:
        # Explicit [] in sidecar means "no suites", not "use default".
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(json.dumps({"conformance_suite": []}))
            cfg = EngineConfig.load(str(binary))
            self.assertEqual(cfg.conformance_suite, [])

    def test_load_exceptions_re_from_configs(self) -> None:
        # boa has exceptions_re with named groups type and message
        cfg = EngineConfig.load(str(self._binary), config_name="boa")
        self.assertGreater(len(cfg.exceptions_re), 0)
        cre = re.compile(cfg.exceptions_re[1])  # Uncaught: pattern
        self.assertIn("type", cre.groupindex)
        self.assertIn("message", cre.groupindex)
        m = cre.search("Uncaught: TypeError: bad")
        self.assertIsNotNone(m)
        assert m
        self.assertEqual(m.group("type"), "TypeError")
        self.assertEqual(m.group("message"), "bad")
        # spidermonkey also has exceptions_re
        cfg2 = EngineConfig.load(str(self._binary), config_name="spidermonkey")
        self.assertGreater(len(cfg2.exceptions_re), 0)
        cre2 = re.compile(cfg2.exceptions_re[0])
        self.assertIn("type", cre2.groupindex)
        m2 = cre2.search("/tmp/t.js:1:7 TypeError: bad")
        self.assertIsNotNone(m2)
        assert m2
        self.assertEqual(m2.group("type"), "TypeError")

    def test_load_stderr_replace_re_from_configs(self) -> None:
        # kjs has stderr_replace_re to drop LEAK messages
        cfg = EngineConfig.load(str(self._binary), config_name="kjs")
        self.assertGreater(len(cfg.stderr_replace_re), 0)
        pat, repl = next(iter(cfg.stderr_replace_re.items()))
        cre = re.compile(pat)
        self.assertTrue(cre.search("LEAK: 42 KJS::Node"))
        self.assertFalse(cre.search("SyntaxError: oops"))
        self.assertEqual(repl, "")

    def test_load_stdout_replace_re_from_configs(self) -> None:
        # espruino has stdout_replace_re to drop its startup banner
        cfg = EngineConfig.load(str(self._binary), config_name="espruino")
        self.assertGreater(len(cfg.stdout_replace_re), 0)
        pat, repl = next(iter(cfg.stdout_replace_re.items()))
        cre = re.compile(pat)
        self.assertTrue(cre.search(" ____                 _ "))
        self.assertTrue(cre.search("Espruino is Open Source. Our work is supported"))
        self.assertEqual(repl, "")

    def test_load_warnings_re_from_configs(self) -> None:
        # nova has warnings_re: ['^Parse errors:$']
        cfg = EngineConfig.load(str(self._binary), config_name="nova")
        self.assertGreater(len(cfg.warnings_re), 0)
        cre = re.compile(cfg.warnings_re[0])
        self.assertTrue(cre.search("Parse errors:"))

    def test_run_command_propagates_build_metadata(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(json.dumps({"engine": "eng", "version": "1.0"}))
            from lib import Runner
            cfg = EngineConfig.load(str(binary))
            run = Runner(cfg).run_command(cfg.argv("/dev/null"))
            self.assertEqual(run.build_metadata.get("version"), "1.0")

    def test_runner_strips_ansi_from_stdout_and_stderr(self) -> None:
        from lib import Runner
        with tempfile.TemporaryDirectory() as td:
            binary = Path(td) / "eng"
            binary.write_text(
                "#!/bin/sh\n"
                "printf '\\033[1;31mError\\033[0m: bad\\n'\n"
                "printf '\\033[32mOK\\033[0m\\n' >&2\n"
            )
            binary.chmod(0o755)
            cfg = EngineConfig.load(str(binary))
            run = Runner(cfg).run_command(cfg.argv("/dev/null"))
        self.assertEqual(run.stdout, "Error: bad\n")
        self.assertEqual(run.stderr, "OK\n")


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
        from lib import Runner
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

    def test_stdout_before_stderr(self) -> None:
        # stdout is tried before stderr.
        pat = r"^(?P<type>[A-Za-z]+Error): (?P<message>.+)$"
        arb = self._arb([pat])
        out = arb.classify(mk_run(stdout="TypeError: from stdout", stderr="SyntaxError: from stderr"))
        self.assertEqual(out.error_type, ErrorType.TYPE_ERROR)
        self.assertEqual(out.error_message, "from stdout")

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

    def test_ansi_optional_prefix_with_anchor(self) -> None:
        # mquickjs full pattern from configs.jsonnet: optional ESC[...m, ^ anchor kept
        pat = "^(?:\x1b\\[[0-9;]*m)?(?P<type>[A-Za-z]+Error): (?P<message>[^\x1b\n]+)"
        arb = self._arb([pat])
        # With ANSI prefix
        out = arb.classify(mk_run(stderr="\x1b[31;1mSyntaxError: oops"))
        self.assertEqual(out.error_type, ErrorType.SYNTAX_ERROR)
        self.assertEqual(out.error_message, "oops")
        # Without ANSI prefix
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



# ---------------------------------------------------------------------------
# iterate_js_files
# ---------------------------------------------------------------------------

class IterateJsFilesTest(unittest.TestCase):
    """Tests for iterate_js_files."""

    _td: tempfile.TemporaryDirectory[str]
    root: Path

    @classmethod
    def setUpClass(cls) -> None:
        # Set up a shared test directory tree
        cls._td = tempfile.TemporaryDirectory()
        cls.root = Path(cls._td.name)
        for rel in [
            "README.md",
            "test.txt",
            "util.js",
            "es1/Array.js",
            "es1/Array.txt",
            "es1/String.prototype.split.js",
            "es2019/String.prototype.trimStart.js",
            "es2019/misc.JSON-stringify-well-formed.js",
            "es2020/BigInt.js",
            "es2020/BigInt.js.txt",
            "es3/Error.js",
            "es3/String.prototype.search.js",
            "es5/JSON.js",
            "es5/String.indexing.js",
            "language/expressions/dynamic-import/empty_FIXTURE.js",
            "language/expressions/dynamic-import/returns-promise.js",
            "language/notes.txt",
            "language/statements/do-while/S12.6.1_A3.js",
            "language/statements/do-while/labelled-fn-stmt.js",
            "language/statements/for/decl-cls.js",
            "language/statements/while/decl-cls.js",
        ]:
            p = cls.root / rel
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text("")

    @classmethod
    def tearDownClass(cls) -> None:
        cls._td.cleanup()

    def _ls(
        self,
        selectors: list[str],
        *,
        root: Path | None = None,
        exclude_re: list[re.Pattern[str]] | None = None,
    ) -> list[str]:
        return list(iterate_js_files(
            selectors,
            root=self.root if root is None else root,
            exclude_re=exclude_re,
        ))

    def test_dir_yields_js_only(self) -> None:
        self.assertEqual(self._ls(["es1"]), [
            "es1/Array.js",
            "es1/String.prototype.split.js",
        ])

    def test_recursive_sorted(self) -> None:
        self.assertEqual(self._ls(["language/statements"]), [
            "language/statements/do-while/S12.6.1_A3.js",
            "language/statements/do-while/labelled-fn-stmt.js",
            "language/statements/for/decl-cls.js",
            "language/statements/while/decl-cls.js",
        ])

    def test_version_sort_and_list_js_in_dirs(self) -> None:
        self.assertEqual(self._ls(["es*"]), [
            "es1/Array.js",
            "es1/String.prototype.split.js",
            "es3/Error.js",
            "es3/String.prototype.search.js",
            "es5/JSON.js",
            "es5/String.indexing.js",
            "es2019/String.prototype.trimStart.js",
            "es2019/misc.JSON-stringify-well-formed.js",
            "es2020/BigInt.js",
        ])

    def test_glob_matching_files_keeps_non_js_suffixes(self) -> None:
        self.assertEqual(self._ls(["es2020/*.txt"]), [
            "es2020/BigInt.js.txt",
        ])

    def test_direct_file_keeps_non_js_suffix(self) -> None:
        path = self.root / "test.txt"
        got = list(iterate_js_files([str(path)]))
        self.assertEqual(got, [str(path)])

    def test_recursive_globstar(self) -> None:
        self.assertEqual(self._ls(["**/*.txt"]), [
            "es1/Array.txt",
            "es2020/BigInt.js.txt",
            "language/notes.txt",
            "test.txt",
        ])

    def test_exclude_re_filters_dir_walk_and_glob(self) -> None:
        self.assertEqual(self._ls(
            ["language/**/*.js"],
            exclude_re=[re.compile("_FIXTURE"), re.compile(r"/while/")],
        ), [
            "language/expressions/dynamic-import/returns-promise.js",
            "language/statements/do-while/S12.6.1_A3.js",
            "language/statements/do-while/labelled-fn-stmt.js",
            "language/statements/for/decl-cls.js",
        ])

    def test_glob_dedup(self) -> None:
        self.assertEqual(self._ls(["es3/*.js", "es3/Error.js"]), [
            "es3/Error.js",
            "es3/String.prototype.search.js",
        ])

    def test_dir_and_recursive_glob_dedup(self) -> None:
        self.assertEqual(self._ls(["es3", "**/*String*.js"]), [
            "es3/Error.js",
            "es3/String.prototype.search.js",
            "es1/String.prototype.split.js",
            "es5/String.indexing.js",
            "es2019/String.prototype.trimStart.js",
        ])

    def test_nonexistent_selector_skipped(self) -> None:
        self.assertEqual(self._ls(["no_such_dir", "es1/no_such.js"]), [])

    def test_dot_prefix_stays_cwd_relative(self) -> None:
        with tempfile.TemporaryDirectory() as parent_td:
            parent_dir = Path(parent_td)
            cwd_dir = parent_dir / "subdir"
            cwd_dir.mkdir()
            (cwd_dir / "pick.js").write_text("")
            (parent_dir / "pick.js").write_text("")
            old_cwd = Path.cwd()
            try:
                os.chdir(cwd_dir)
                got_here = self._ls(["./pick.js"])
                got_parent = self._ls(["../pick.js"])
            finally:
                os.chdir(old_cwd)
        self.assertEqual(got_here, ["pick.js"])
        self.assertEqual(got_parent, ["../pick.js"])


if __name__ == "__main__":
    unittest.main()
