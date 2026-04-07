# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import contextlib
import io
import json
import tempfile
import unittest
from pathlib import Path
from typing import Any
from unittest import mock

from harness.config import EngineConfig
from harness.runner import MemoryWatchdog, RunRusage, RunResult, Runner, Verdict


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
            verdict_type=Verdict.CRASHED,
            verdict_detail="signal 11",
            exit_code=-11,
        )
        d = r.to_dict()
        self.assertEqual(d["verdict_type"], str(Verdict.CRASHED))
        r2 = RunResult.from_dict(d)
        self.assertEqual(r2.verdict_type, Verdict.CRASHED)
        self.assertEqual(r2.verdict_detail, "signal 11")

    def test_from_dict_rejects_unknown_fields(self) -> None:
        with self.assertRaisesRegex(ValueError, "unknown RunResult fields"):
            RunResult.from_dict({"run_id": "x", "bogus_key": 1})

    def test_from_dict_rusage_dict(self) -> None:
        d = mk_run().to_dict()
        d["rusage"] = {"real_time": 1.5, "user_time": 0.8}
        r = RunResult.from_dict(d)
        self.assertEqual(r.rusage.real_time, 1.5)
        self.assertEqual(r.rusage.user_time, 0.8)

    def test_verdict_message_ok(self) -> None:
        self.assertEqual(mk_run(verdict_type=Verdict.OK).verdict_message(), "OK")

    def test_verdict_message_error_with_message(self) -> None:
        r = mk_run(
            verdict_type=Verdict.SYNTAX_ERROR,
            verdict_detail="Unexpected token",
        )
        self.assertEqual(r.verdict_message(), "SyntaxError: Unexpected token")

    def test_verdict_message_failed_omits_error_type(self) -> None:
        r = mk_run(
            verdict_type=Verdict.FAILED,
            verdict_detail="something went wrong",
        )
        self.assertEqual(r.verdict_message(), "something went wrong")

class ConfigRunnerSmokeTest(unittest.TestCase):
    def _make_binary(self, td: str, name: str = "eng") -> Path:
        p = Path(td) / name
        p.write_text("#!/bin/sh\necho hi\n")
        p.chmod(0o755)
        return p

    def test_run_command_propagates_build_metadata(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(json.dumps({"engine": "eng", "version": "1.0"}))
            cfg = EngineConfig.load(str(binary))
            run = Runner(cfg).run_command(cfg.argv("/dev/null"))
            self.assertEqual(run.build_metadata.get("version"), "1.0")

    def test_oom_kill(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            cfg = EngineConfig.load(str(binary))
            # Allocate ~100MB via python; limit to 10MB so watchdog kills it.
            stderr = io.StringIO()
            with contextlib.redirect_stderr(stderr):
                run = Runner(cfg).run_command(
                    ["python3", "-c", "x = b'A' * (100 * 1024 * 1024); import time; time.sleep(10)"],
                    memory_limit_mb=10,
                    timeout_sec=30,
                )
            self.assertEqual(run.verdict_type, Verdict.OOM)
            self.assertIn(">10MB", run.verdict_detail or "")
            self.assertIn("memory watchdog: killing", stderr.getvalue())

    def test_memory_addr_limit_mb(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            cfg = EngineConfig.load(str(binary))
            run = Runner(cfg).run_command(
                [
                    "python3",
                    "-c",
                    "x = b'A' * (1024 * 1024 * 1024)",
                ],
                memory_addr_limit_mb=256,
                timeout_sec=30,
            )
            self.assertNotEqual(run.exit_code, 0)
            self.assertIn("MemoryError", run.stderr or "")


if __name__ == "__main__":
    unittest.main()
