# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import json
import os
import re
import tempfile
import unittest
from pathlib import Path
from typing import Any
from unittest import mock

import conformance.lib.config as config_module
from conformance.lib import EngineConfig, Prelude, Runner
from conformance.lib.config import _resolve_flags_list, load_configs_dict, resolve_preludes


class ResolveFlagsListTest(unittest.TestCase):
    def test_plain_strings_passthrough(self) -> None:
        self.assertEqual(_resolve_flags_list(["--foo", "--bar"], ""), ["--foo", "--bar"])

    def test_nested_list_flattened(self) -> None:
        self.assertEqual(_resolve_flags_list([["--a", "--b"], "--c"], ""), ["--a", "--b", "--c"])

    def test_shell_item_expands_lines(self) -> None:
        result = _resolve_flags_list([{"shell": "printf '%s\\n%s\\n' --x --y"}], "/bin/eng")
        self.assertEqual(result, ["--x", "--y"])

    def test_shell_item_empty_lines_skipped(self) -> None:
        result = _resolve_flags_list([{"shell": "printf '\\n--x\\n\\n'"}], "/bin/eng")
        self.assertEqual(result, ["--x"])

    def test_shell_item_receives_binary_env(self) -> None:
        result = _resolve_flags_list([{"shell": "echo $BINARY"}], "/path/to/eng")
        self.assertEqual(result, ["/path/to/eng"])

    def test_mixed_types(self) -> None:
        result = _resolve_flags_list(["--a", ["--b", "--c"], {"shell": "echo --d"}], "/bin/e")
        self.assertEqual(result, ["--a", "--b", "--c", "--d"])

    def test_resolve_method_updates_flags_in_place(self) -> None:
        cfg = EngineConfig(
            binary_path="/bin/eng",
            flags=["--a", ["--b"], {"shell": "echo --c"}],
        )
        cfg.resolve()
        self.assertEqual(cfg.flags, ["--a", "--b", "--c"])

    def test_resolve_method_handles_none_test262_flags(self) -> None:
        cfg = EngineConfig(binary_path="/bin/eng", test262_flags=None)
        cfg.resolve()
        self.assertIsNone(cfg.test262_flags)

    def test_resolve_method_is_idempotent(self) -> None:
        cfg = EngineConfig(binary_path="/bin/eng", flags=["--a", "--b"])
        cfg.resolve()
        cfg.resolve()
        self.assertEqual(cfg.flags, ["--a", "--b"])

    def test_tag_item_preserved(self) -> None:
        tag_item = {"tag": "Intl", "flag": "--intl"}
        result = _resolve_flags_list(["--a", tag_item], "")
        self.assertEqual(result, ["--a", tag_item])

    def test_tag_item_in_nested_list(self) -> None:
        tag_item = {"tag": "Intl", "flag": "--intl"}
        result = _resolve_flags_list([[tag_item, "--b"]], "")
        self.assertEqual(result, [tag_item, "--b"])

    def test_resolve_preserves_tag_items(self) -> None:
        tag_item = {"tag": "Intl", "flag": "--intl"}
        cfg = EngineConfig(binary_path="/bin/eng", flags=["--a", tag_item])
        cfg.resolve()
        self.assertEqual(cfg.flags, ["--a", tag_item])



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

    def test_tag_flag_included_when_tag_present(self) -> None:
        cfg = self._cfg(flags=["--a", {"tag": "Intl", "flag": "--intl"}])
        cmd = cfg.argv("/tmp/s.js", tags={"Intl"})
        self.assertEqual(cmd, ["/usr/bin/eng", "--a", "--intl", "/tmp/s.js"])

    def test_tag_flag_excluded_when_tag_absent(self) -> None:
        cfg = self._cfg(flags=["--a", {"tag": "Intl", "flag": "--intl"}])
        cmd = cfg.argv("/tmp/s.js", tags=set())
        self.assertEqual(cmd, ["/usr/bin/eng", "--a", "/tmp/s.js"])

    def test_tag_flag_excluded_by_default(self) -> None:
        cfg = self._cfg(flags=["--a", {"tag": "Intl", "flag": "--intl"}])
        cmd = cfg.argv("/tmp/s.js")
        self.assertEqual(cmd, ["/usr/bin/eng", "--a", "/tmp/s.js"])

    def test_multiple_tag_flags(self) -> None:
        cfg = self._cfg(flags=[
            "--base",
            {"tag": "Intl", "flag": "--intl"},
            {"tag": "Atomics", "flag": "--harmony-atomics"},
        ])
        cmd = cfg.argv("/tmp/s.js", tags={"Intl", "Atomics"})
        self.assertEqual(cmd, ["/usr/bin/eng", "--base", "--intl", "--harmony-atomics", "/tmp/s.js"])
        cmd2 = cfg.argv("/tmp/s.js", tags={"Atomics"})
        self.assertEqual(cmd2, ["/usr/bin/eng", "--base", "--harmony-atomics", "/tmp/s.js"])


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
            self.assertEqual(cfg.binary_path, str(binary.resolve()))
            self.assertEqual(cfg.flags, [])

    def test_load_relative_binary_path_is_resolved(self) -> None:
        old_cwd = os.getcwd()
        with tempfile.TemporaryDirectory() as td:
            try:
                os.chdir(td)
                binary = self._make_binary(td)
                cfg = EngineConfig.load("./eng")
                self.assertEqual(cfg.binary_path, str(binary.resolve()))
                self.assertEqual(cfg.argv("/tmp/s.js")[0], str(binary.resolve()))
            finally:
                os.chdir(old_cwd)

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
        self.assertGreater(len(cfg.errors_re), 0)
        cre = re.compile(cfg.errors_re[1])
        self.assertIn("type", cre.groupindex)
        self.assertIn("message", cre.groupindex)
        m = cre.search("Uncaught: TypeError: bad")
        self.assertIsNotNone(m)
        assert m
        self.assertEqual(m.group("type"), "TypeError")
        self.assertEqual(m.group("message"), "bad")

    def test_missing_binary_raises(self) -> None:
        with self.assertRaises(SystemExit):
            EngineConfig.load("/nonexistent/binary")


class ResolvePreludesTest(unittest.TestCase):
    def test_empty_list(self) -> None:
        self.assertEqual(resolve_preludes([]), [])

    def test_code_item(self) -> None:
        result = resolve_preludes([{"code": "var x = 1;"}])
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0].code, "var x = 1;")
        self.assertIsNone(result[0].file)
        self.assertIsNone(result[0].tag)

    def test_file_item(self) -> None:
        with tempfile.NamedTemporaryFile(suffix=".js", mode="w", delete=False) as f:
            f.write("var y = 2;\n")
            f.flush()
            rel = os.path.relpath(f.name, config_module.REPO_ROOT)
        try:
            result = resolve_preludes([{"file": rel}])
            self.assertEqual(len(result), 1)
            self.assertEqual(result[0].code, "var y = 2;\n")
            self.assertEqual(result[0].file, rel)
            self.assertIsNone(result[0].tag)
        finally:
            os.unlink(f.name)

    def test_tag_on_code_item(self) -> None:
        result = resolve_preludes([{"tag": "Intl", "code": "// intl"}])
        self.assertEqual(result[0].tag, "Intl")
        self.assertEqual(result[0].code, "// intl")

    def test_tag_on_file_item(self) -> None:
        with tempfile.NamedTemporaryFile(suffix=".js", mode="w", delete=False) as f:
            f.write("// tagged\n")
            f.flush()
            rel = os.path.relpath(f.name, config_module.REPO_ROOT)
        try:
            result = resolve_preludes([{"tag": "IsHTMLDDA", "file": rel}])
            self.assertEqual(result[0].tag, "IsHTMLDDA")
            self.assertEqual(result[0].code, "// tagged\n")
        finally:
            os.unlink(f.name)

    def test_source_inception(self) -> None:
        with tempfile.NamedTemporaryFile(suffix=".js", mode="w", delete=False) as f:
            f.write('eval($SOURCE);\n')
            f.flush()
            rel = os.path.relpath(f.name, config_module.REPO_ROOT)
        try:
            result = resolve_preludes([{"file": rel}])
            assert result[0].code is not None
            self.assertNotIn("$SOURCE", result[0].code)
            self.assertIn("eval(", result[0].code)
        finally:
            os.unlink(f.name)

    def test_missing_file_or_code_raises(self) -> None:
        with self.assertRaises(TypeError):
            resolve_preludes([{"tag": "X"}])

    def test_resolve_method_resolves_preludes(self) -> None:
        cfg = EngineConfig(
            binary_path="/bin/eng",
            test262_prelude=[{"code": "var z = 1;"}],  # type: ignore[list-item]
        )
        cfg.resolve()
        self.assertEqual(len(cfg.test262_prelude), 1)
        self.assertIsInstance(cfg.test262_prelude[0], Prelude)
        self.assertEqual(cfg.test262_prelude[0].code, "var z = 1;")

    def test_resolve_idempotent(self) -> None:
        cfg = EngineConfig(
            binary_path="/bin/eng",
            test262_prelude=[{"code": "var z = 1;"}],  # type: ignore[list-item]
        )
        cfg.resolve()
        cfg.resolve()
        self.assertEqual(len(cfg.test262_prelude), 1)
        self.assertEqual(cfg.test262_prelude[0].code, "var z = 1;")


if __name__ == "__main__":
    unittest.main()
