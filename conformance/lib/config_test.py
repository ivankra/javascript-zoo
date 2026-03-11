# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import json
import re
import tempfile
import unittest
from pathlib import Path
from typing import Any
from unittest import mock

import conformance.lib.config as config_module
from conformance.lib import EngineConfig, Runner
from conformance.lib.config import load_configs_dict


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
        self.assertEqual(cfg.argv("/tmp/s.js", module=False), ["/usr/bin/eng", "eval", "/tmp/s.js"])
        self.assertEqual(cfg.argv("/tmp/s.js", module=True), ["/usr/bin/eng", "eval", "--module", "/tmp/s.js"])

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

    def setUp(self) -> None:
        load_configs_dict.cache_clear()

    def tearDown(self) -> None:
        load_configs_dict.cache_clear()

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

    def test_load_merges_config_sidecar_and_cmdline(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(json.dumps({
                "engine": "myeng",
                "console_log": "print",
                "cwd": "/tmp/work",
                "env": {"MODE": "test"},
                "output_limit": 123,
                "flags": ["--ignored-by-cmdline"],
            }))
            cfg = EngineConfig.load(f"{binary} --fast", config_name="nova")
            self.assertEqual(cfg.engine, "myeng")
            self.assertEqual(cfg.console_log, "print")
            self.assertEqual(cfg.cwd, "/tmp/work")
            self.assertEqual(cfg.env, {"MODE": "test"})
            self.assertEqual(cfg.output_limit, 123)
            self.assertEqual(cfg.flags, ["--fast"])
            self.assertEqual(cfg.module_flag, "--module")

    def test_explicit_config_name_overrides_detected_config(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(json.dumps({"engine": "quickjs"}))
            cfg = EngineConfig.load(str(binary), config_name="nova")
            self.assertEqual(cfg.flags, ["eval", "--no-strict"])
            self.assertEqual(cfg.module_flag, "--module")

    def test_load_preserves_explicit_empty_list_from_sidecar(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(json.dumps({"conformance_suite": []}))
            cfg = EngineConfig.load(str(binary))
            self.assertEqual(cfg.conformance_suite, [])

    def test_load_detected_config_supplies_patterns(self) -> None:
        cfg = EngineConfig.load(str(self._binary), config_name="boa")
        self.assertGreater(len(cfg.exceptions_re), 0)
        cre = re.compile(cfg.exceptions_re[1])
        self.assertIn("type", cre.groupindex)
        self.assertIn("message", cre.groupindex)
        m = cre.search("Uncaught: TypeError: bad")
        self.assertIsNotNone(m)
        assert m
        self.assertEqual(m.group("type"), "TypeError")
        self.assertEqual(m.group("message"), "bad")

    def test_load_configs_dict_loads_yaml_and_ignores_anchor_helper(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            script_dir = Path(td)
            (script_dir / "config.yml").write_text(
                "_anchors:\n"
                "  shared: &shared\n"
                "    flags: [--from-anchor]\n"
                "default:\n"
                "  <<: *shared\n",
                encoding="utf-8",
            )
            with mock.patch.object(config_module, "__file__", str(script_dir / "config.py")):
                configs = EngineConfig.get_configs()
        self.assertNotIn("_anchors", configs)
        self.assertEqual(configs["default"]["flags"], ["--from-anchor"])

    def test_missing_binary_raises(self) -> None:
        with self.assertRaises(SystemExit):
            EngineConfig.load("/nonexistent/binary")


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

    def test_runner_strips_ansi_from_stdout_and_stderr(self) -> None:
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


if __name__ == "__main__":
    unittest.main()
