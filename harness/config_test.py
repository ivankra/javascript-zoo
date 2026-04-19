# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import json
import os
import re
import subprocess
import tempfile
import unittest
from pathlib import Path
from typing import Any
from unittest import mock

from harness.config import EngineConfig, Prelude, REPO_ROOT, resolve_flags, load_configs_dict, resolve_preludes
from harness.tags import Tags


class ResolveFlagsTest(unittest.TestCase):
    """Tests for resolve_flags() — the unified shell/if/list resolver."""

    def _env(self, binary: str = "") -> dict[str, str]:
        return {**os.environ, "BINARY": binary}

    # --- basic passthrough & flattening ---

    def test_plain_strings_passthrough(self) -> None:
        self.assertEqual(resolve_flags(["--foo", "--bar"]), ["--foo", "--bar"])

    def test_nested_list_flattened(self) -> None:
        self.assertEqual(resolve_flags([["--a", "--b"], "--c"]), ["--a", "--b", "--c"])

    def test_deeply_nested_lists_flattened(self) -> None:
        self.assertEqual(resolve_flags([[["--a"], "--b"], "--c"]), ["--a", "--b", "--c"])

    # --- expand_shell ---

    def test_shell_expands_tokens(self) -> None:
        result = resolve_flags([{"shell": "echo --x --y"}], expand_shell=True, env=self._env())
        self.assertEqual(result, ["--x", "--y"])

    def test_shell_empty_output_skipped(self) -> None:
        result = resolve_flags([{"shell": "true"}], expand_shell=True, env=self._env())
        self.assertEqual(result, [])

    def test_shell_quoted_token_preserved(self) -> None:
        result = resolve_flags([{"shell": "echo \"'a b c'\""}], expand_shell=True, env=self._env())
        self.assertEqual(result, ["a b c"])

    def test_shell_multiline_tokenised(self) -> None:
        result = resolve_flags([{"shell": "printf '%s\\n%s\\n' --a --b"}], expand_shell=True, env=self._env())
        self.assertEqual(result, ["--a", "--b"])

    def test_shell_receives_binary_env(self) -> None:
        result = resolve_flags([{"shell": "echo $BINARY"}], expand_shell=True, env=self._env("/path/to/eng"))
        self.assertEqual(result, ["/path/to/eng"])

    def test_shell_not_expanded_when_flag_off(self) -> None:
        item = {"shell": "echo hi"}
        result = resolve_flags([item])
        self.assertEqual(result, [item])

    def test_mixed_types(self) -> None:
        result = resolve_flags(["--a", ["--b", "--c"], {"shell": "echo --d"}], expand_shell=True, env=self._env())
        self.assertEqual(result, ["--a", "--b", "--c", "--d"])

    # --- if/then/else preserved (expand_shell only) ---

    def test_tag_item_preserved(self) -> None:
        result = resolve_flags([{"if": "X", "then": "--a"}], expand_shell=True)
        self.assertEqual(result, [{"if": "X", "then": "--a"}])

    def test_tag_item_with_else_preserved(self) -> None:
        result = resolve_flags([{"if": "X", "then": "--a", "else": "--b"}])
        self.assertEqual(result, [{"if": "X", "then": "--a", "else": "--b"}])

    def test_shell_inside_then_resolved(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": {"shell": "echo --resolved"}}], expand_shell=True, env=self._env(),
        )
        self.assertEqual(result, [{"if": "X", "then": "--resolved"}])

    def test_shell_inside_else_resolved(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": "--a", "else": {"shell": "echo --b"}}], expand_shell=True, env=self._env(),
        )
        self.assertEqual(result, [{"if": "X", "then": "--a", "else": "--b"}])

    def test_empty_if_branches_trimmed_after_shell_resolution(self) -> None:
        self.assertEqual(
            resolve_flags(
                [{"if": "X", "then": {"shell": "true"}}],
                expand_shell=True,
                env=self._env(),
            ),
            [],
        )
        self.assertEqual(
            resolve_flags(
                [{"if": "X", "then": "--a", "else": {"shell": "true"}}],
                expand_shell=True,
                env=self._env(),
            ),
            [{"if": "X", "then": "--a"}],
        )
        self.assertEqual(
            resolve_flags(
                [{"if": "X", "then": {"shell": "true"}, "else": "--fallback"}],
                expand_shell=True,
                env=self._env(),
            ),
            [{"if": "!(X)", "then": "--fallback"}],
        )
        self.assertEqual(
            resolve_flags(
                [{"if": "X", "then": {"shell": "true"}, "else": {"shell": "true"}}],
                expand_shell=True,
                env=self._env(),
            ),
            [],
        )

    def test_shell_multitoken_inside_then_becomes_list(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": {"shell": "echo --a --b"}}], expand_shell=True, env=self._env(),
        )
        self.assertEqual(result, [{"if": "X", "then": ["--a", "--b"]}])

    def test_list_inside_then_preserved(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": ["--a", "--b"]}], expand_shell=True,
        )
        self.assertEqual(result, [{"if": "X", "then": ["--a", "--b"]}])

    def test_nested_if_then_preserved(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": {"if": "Y", "then": "--deep"}}],
        )
        self.assertEqual(result, [{"if": "X", "then": {"if": "Y", "then": "--deep"}}])

    def test_deeply_nested_shell_resolved(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": {"if": "Y", "then": {"shell": "echo --deep"}}}],
            expand_shell=True, env=self._env(),
        )
        self.assertEqual(result, [{"if": "X", "then": {"if": "Y", "then": "--deep"}}])

    # --- expand_if ---

    def test_expand_if_includes_then_when_tag_present(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": "--yes"}], expand_if=True, tags=Tags({"X"}),
        )
        self.assertEqual(result, ["--yes"])

    def test_expand_if_includes_else_when_tag_absent(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": "--yes", "else": "--no"}], expand_if=True, tags=Tags(),
        )
        self.assertEqual(result, ["--no"])

    def test_expand_if_skips_when_no_else_and_tag_absent(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": "--yes"}], expand_if=True, tags=Tags(),
        )
        self.assertEqual(result, [])

    def test_expand_if_skips_when_tags_none(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": "--yes"}], expand_if=True, tags=None,
        )
        self.assertEqual(result, [])

    def test_expand_if_then_list_flattened(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": ["--a", "--b"]}], expand_if=True, tags=Tags({"X"}),
        )
        self.assertEqual(result, ["--a", "--b"])

    def test_expand_if_else_list_flattened(self) -> None:
        result = resolve_flags(
            [{"if": "X", "then": "--a", "else": ["--b", "--c"]}], expand_if=True, tags=Tags(),
        )
        self.assertEqual(result, ["--b", "--c"])

    def test_expand_if_nested(self) -> None:
        flags = [{"if": "X", "then": {"if": "Y", "then": "--deep", "else": "--shallow"}}]
        self.assertEqual(
            resolve_flags(flags, expand_if=True, tags=Tags({"X", "Y"})),
            ["--deep"],
        )
        self.assertEqual(
            resolve_flags(flags, expand_if=True, tags=Tags({"X"})),
            ["--shallow"],
        )
        self.assertEqual(
            resolve_flags(flags, expand_if=True, tags=Tags()),
            [],
        )

    def test_expand_if_nested_else_branch(self) -> None:
        flags = [{"if": "X", "then": "--a", "else": {"if": "Y", "then": "--b"}}]
        self.assertEqual(
            resolve_flags(flags, expand_if=True, tags=Tags({"X"})),
            ["--a"],
        )
        self.assertEqual(
            resolve_flags(flags, expand_if=True, tags=Tags({"Y"})),
            ["--b"],
        )
        self.assertEqual(
            resolve_flags(flags, expand_if=True, tags=Tags()),
            [],
        )

    def test_expand_if_empty_list_branch_emits_nothing(self) -> None:
        flags = [{"if": "X", "then": [], "else": "--fallback"}]
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags({"X"})), [])
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags()), ["--fallback"])

    def test_expand_if_empty_string_branch_emits_empty_arg(self) -> None:
        flags = [{"if": "X", "then": "", "else": "--fallback"}]
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags({"X"})), [""])
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags()), ["--fallback"])

    # --- expand_if with FilterExpr (boolean conditions) ---

    def test_expand_if_qualified_tag(self) -> None:
        flags = [{"if": "flags:CanBlockIsTrue", "then": "--can-block"}]
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags.from_iterable(["flags:CanBlockIsTrue"])), ["--can-block"])
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags()), [])

    def test_expand_if_negation(self) -> None:
        flags = [{"if": "!flags:module", "then": "--script"}]
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags()), ["--script"])
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags.from_iterable(["flags:module"])), [])

    def test_expand_if_and_expr(self) -> None:
        flags = [{"if": "flags:CanBlockIsTrue & features:Atomics", "then": "--atomics-wait"}]
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags.from_iterable(["flags:CanBlockIsTrue", "features:Atomics"])), ["--atomics-wait"])
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags.from_iterable(["flags:CanBlockIsTrue"])), [])

    def test_expand_if_or_expr(self) -> None:
        flags = [{"if": "flags:module | flags:async", "then": "--special"}]
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags.from_iterable(["flags:module"])), ["--special"])
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags.from_iterable(["flags:async"])), ["--special"])
        self.assertEqual(resolve_flags(flags, expand_if=True, tags=Tags()), [])

    def test_expand_if_deeply_nested_three_levels(self) -> None:
        flags = [{"if": "A", "then": {"if": "B", "then": {"if": "C", "then": "--abc"}}}]
        self.assertEqual(
            resolve_flags(flags, expand_if=True, tags=Tags({"A", "B", "C"})),
            ["--abc"],
        )
        self.assertEqual(
            resolve_flags(flags, expand_if=True, tags=Tags({"A", "B"})),
            [],
        )


class ConfigScriptExecutionTest(unittest.TestCase):
    def test_config_module_runs_as_script_path(self) -> None:
        proc = subprocess.run(
            ["python3", "./harness/config.py"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(proc.returncode, 0, proc.stderr)
        data = json.loads(proc.stdout)
        self.assertIsInstance(data, dict)
        self.assertIn("default", data)

    # --- EngineConfig.resolve() integration ---

    def test_resolve_method_updates_flags_in_place(self) -> None:
        cfg = EngineConfig(
            binary_path="/bin/eng",
            flags=["--a", ["--b"], {"shell": "echo --c"}],
        )
        cfg.resolve()
        self.assertEqual(cfg.flags, ["--a", "--b", "--c"])

    def test_resolve_method_is_idempotent(self) -> None:
        cfg = EngineConfig(binary_path="/bin/eng", flags=["--a", "--b"])
        cfg.resolve()
        cfg.resolve()
        self.assertEqual(cfg.flags, ["--a", "--b"])

    def test_resolve_preserves_tag_items(self) -> None:
        tag_item = {"if": "Intl", "then": "--intl"}
        cfg = EngineConfig(binary_path="/bin/eng", flags=["--a", tag_item])
        cfg.resolve()
        self.assertEqual(cfg.flags, ["--a", tag_item])

    def test_tag_item_in_nested_list(self) -> None:
        tag_item = {"if": "Intl", "then": "--intl"}
        result = resolve_flags([[tag_item, "--b"]], expand_shell=True)
        self.assertEqual(result, [tag_item, "--b"])


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

    def test_module_tag_flag(self) -> None:
        cfg = self._cfg(flags=["eval", {"if": "module", "then": "--module"}])
        self.assertEqual(cfg.argv("/tmp/s.js"), ["/usr/bin/eng", "eval", "/tmp/s.js"])
        self.assertEqual(cfg.argv("/tmp/s.js", tags=Tags({"module"})), ["/usr/bin/eng", "eval", "--module", "/tmp/s.js"])

    def test_path_object_stringified(self) -> None:
        cmd = self._cfg().argv(Path("/tmp/s.js"))
        self.assertEqual(cmd, ["/usr/bin/eng", "/tmp/s.js"])

    def test_multiple_positional_args_appended(self) -> None:
        cmd = self._cfg(flags=["eval"]).argv(Path("/tmp/a.js"), "--flag", "/tmp/b.js")
        self.assertEqual(cmd, ["/usr/bin/eng", "eval", "/tmp/a.js", "--flag", "/tmp/b.js"])

    def test_tagged_test262_flag(self) -> None:
        cfg = self._cfg(flags=["eval", {"if": "test262", "then": "--harmony"}])
        self.assertEqual(cfg.argv("/tmp/s.js"), ["/usr/bin/eng", "eval", "/tmp/s.js"])
        self.assertEqual(cfg.argv("/tmp/s.js", tags=Tags({"test262"})),
                         ["/usr/bin/eng", "eval", "--harmony", "/tmp/s.js"])

    def test_tagged_bench_flag(self) -> None:
        cfg = self._cfg(flags=["eval", {"if": "bench", "then": "-O"}])
        self.assertEqual(cfg.argv("/tmp/s.js", tags=Tags({"bench"})),
                         ["/usr/bin/eng", "eval", "-O", "/tmp/s.js"])

    def test_tag_flag_included_when_tag_present(self) -> None:
        cfg = self._cfg(flags=["--a", {"if": "Intl", "then": "--intl"}])
        cmd = cfg.argv("/tmp/s.js", tags=Tags({"Intl"}))
        self.assertEqual(cmd, ["/usr/bin/eng", "--a", "--intl", "/tmp/s.js"])

    def test_tag_flag_excluded_when_tag_absent(self) -> None:
        cfg = self._cfg(flags=["--a", {"if": "Intl", "then": "--intl"}])
        cmd = cfg.argv("/tmp/s.js", tags=Tags())
        self.assertEqual(cmd, ["/usr/bin/eng", "--a", "/tmp/s.js"])

    def test_tag_flag_excluded_by_default(self) -> None:
        cfg = self._cfg(flags=["--a", {"if": "Intl", "then": "--intl"}])
        cmd = cfg.argv("/tmp/s.js")
        self.assertEqual(cmd, ["/usr/bin/eng", "--a", "/tmp/s.js"])

    def test_multiple_tag_flags(self) -> None:
        cfg = self._cfg(flags=[
            "--base",
            {"if": "Intl", "then": "--intl"},
            {"if": "Atomics", "then": "--harmony-atomics"},
        ])
        cmd = cfg.argv("/tmp/s.js", tags=Tags({"Intl", "Atomics"}))
        self.assertEqual(cmd, ["/usr/bin/eng", "--base", "--intl", "--harmony-atomics", "/tmp/s.js"])
        cmd2 = cfg.argv("/tmp/s.js", tags=Tags({"Atomics"}))
        self.assertEqual(cmd2, ["/usr/bin/eng", "--base", "--harmony-atomics", "/tmp/s.js"])

    def test_if_then_else_in_argv(self) -> None:
        cfg = self._cfg(flags=[{"if": "X", "then": "--yes", "else": "--no"}])
        self.assertEqual(cfg.argv("/tmp/s.js", tags=Tags({"X"})),
                         ["/usr/bin/eng", "--yes", "/tmp/s.js"])
        self.assertEqual(cfg.argv("/tmp/s.js", tags=Tags()),
                         ["/usr/bin/eng", "--no", "/tmp/s.js"])

    def test_nested_if_then_in_argv(self) -> None:
        cfg = self._cfg(flags=[
            {"if": "X", "then": {"if": "Y", "then": "--xy", "else": "--x-only"}, "else": "--none"},
        ])
        self.assertEqual(cfg.argv("/tmp/s.js", tags=Tags({"X", "Y"})),
                         ["/usr/bin/eng", "--xy", "/tmp/s.js"])
        self.assertEqual(cfg.argv("/tmp/s.js", tags=Tags({"X"})),
                         ["/usr/bin/eng", "--x-only", "/tmp/s.js"])
        self.assertEqual(cfg.argv("/tmp/s.js", tags=Tags()),
                         ["/usr/bin/eng", "--none", "/tmp/s.js"])

    def test_list_branch_in_argv(self) -> None:
        cfg = self._cfg(flags=[{"if": "X", "then": ["--a", "--b"]}])
        self.assertEqual(cfg.argv("/tmp/s.js", tags=Tags({"X"})),
                         ["/usr/bin/eng", "--a", "--b", "/tmp/s.js"])
        self.assertEqual(cfg.argv("/tmp/s.js", tags=Tags()),
                         ["/usr/bin/eng", "/tmp/s.js"])


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
                "flags": ["--ignored-by-sidecar"],
            }))
            cfg = EngineConfig.load(f"{binary} --fast", config_name="nova")
            # console_log comes from the sidecar JSON
            self.assertEqual(cfg.console_log, "print")
            # cmd flags are prepended before config (nova) flags
            self.assertEqual(cfg.flags[0], "--fast")
            self.assertIn("eval", cfg.flags)
            self.assertIn("--expose-internals", cfg.flags)

    def test_load_cmd_flags_prepend_to_config_flags(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            with mock.patch("harness.config.load_configs_dict", return_value={
                "default": {},
                "eng": {"flags": ["--config-flag"]},
            }):
                cfg = EngineConfig.load(f"{binary} --cmd-flag")
            self.assertEqual(cfg.flags, ["--cmd-flag", "--config-flag"])

    def test_load_cmd_flags_replace_when_trailing_double_dash(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            with mock.patch("harness.config.load_configs_dict", return_value={
                "default": {},
                "eng": {"flags": ["--config-flag"]},
            }):
                cfg = EngineConfig.load(f"{binary} --cmd-flag --")
            # trailing -- stripped, config flags not appended
            self.assertEqual(cfg.flags, ["--cmd-flag"])

    def test_load_cmd_flags_only_double_dash_replace_empties_flags(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            with mock.patch("harness.config.load_configs_dict", return_value={
                "default": {},
                "eng": {"flags": ["--config-flag"]},
            }):
                cfg = EngineConfig.load(f"{binary} --")
            self.assertEqual(cfg.flags, [])

    def test_load_cmd_flags_double_dash_edge_case(self) -> None:
        # node --a -- -- : last -- stripped (replace), inner -- kept as literal flag
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            with mock.patch("harness.config.load_configs_dict", return_value={
                "default": {},
                "eng": {"flags": ["--config-flag"]},
            }):
                cfg = EngineConfig.load(f"{binary} --cmd-flag -- --")
            self.assertEqual(cfg.flags, ["--cmd-flag", "--"])

    def test_explicit_config_name_overrides_detected_config(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = self._make_binary(td)
            (Path(td) / "eng.json").write_text(json.dumps({"engine": "quickjs"}))
            cfg = EngineConfig.load(str(binary), config_name="nova")
            self.assertIn("eval", cfg.flags)
            self.assertIn("--expose-internals", cfg.flags)

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

    def test_all_declared_configs_construct(self) -> None:
        configs = load_configs_dict()
        assert isinstance(configs, dict)
        for name, cfg in configs.items():
            if name.startswith("."):
                continue
            assert isinstance(cfg, dict), name
            EngineConfig(**cfg)


class ResolvePreludesTest(unittest.TestCase):
    def test_empty_list(self) -> None:
        self.assertEqual(resolve_preludes([]), [])

    def test_code_item(self) -> None:
        result = resolve_preludes([{"code": "var x = 1;"}])
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0].code, "var x = 1;")
        self.assertIsNone(result[0].file)
        self.assertIsNone(result[0].if_tag)

    def test_file_item(self) -> None:
        with tempfile.NamedTemporaryFile(suffix=".js", mode="w", delete=False) as f:
            f.write("var y = 2;\n")
            f.flush()
            rel = os.path.relpath(f.name, REPO_ROOT)
        try:
            result = resolve_preludes([{"file": rel}])
            self.assertEqual(len(result), 1)
            self.assertEqual(result[0].code, "var y = 2;\n")
            self.assertEqual(result[0].file, rel)
            self.assertIsNone(result[0].if_tag)
        finally:
            os.unlink(f.name)

    def test_tag_on_code_item(self) -> None:
        result = resolve_preludes([{"if": "Intl", "code": "// intl"}])
        self.assertEqual(result[0].if_tag, "Intl")
        self.assertEqual(result[0].code, "// intl")

    def test_tag_on_file_item(self) -> None:
        with tempfile.NamedTemporaryFile(suffix=".js", mode="w", delete=False) as f:
            f.write("// tagged\n")
            f.flush()
            rel = os.path.relpath(f.name, REPO_ROOT)
        try:
            result = resolve_preludes([{"if": "IsHTMLDDA", "file": rel}])
            self.assertEqual(result[0].if_tag, "IsHTMLDDA")
            self.assertEqual(result[0].code, "// tagged\n")
        finally:
            os.unlink(f.name)

    def test_source_inception(self) -> None:
        with tempfile.NamedTemporaryFile(suffix=".js", mode="w", delete=False) as f:
            f.write('eval($SOURCE);\n')
            f.flush()
            rel = os.path.relpath(f.name, REPO_ROOT)
        try:
            result = resolve_preludes([{"file": rel}])
            assert result[0].code is not None
            self.assertNotIn("$SOURCE", result[0].code)
            self.assertIn("eval(", result[0].code)
        finally:
            os.unlink(f.name)

    def test_missing_file_or_code_raises(self) -> None:
        with self.assertRaises(TypeError):
            resolve_preludes([{"if": "X"}])

    def test_resolve_method_resolves_preludes(self) -> None:
        cfg = EngineConfig(
            binary_path="/bin/eng",
            prelude=[{"code": "var z = 1;"}],  # type: ignore[list-item]
        )
        cfg.resolve()
        self.assertEqual(len(cfg.prelude), 1)
        self.assertIsInstance(cfg.prelude[0], Prelude)
        self.assertEqual(cfg.prelude[0].code, "var z = 1;")

    def test_binary_info_populates_build_metadata(self) -> None:
        cfg = EngineConfig(
            binary_path="/bin/sh",
            binary_info={"version": "echo 1.2.3"},
        )
        cfg.resolve()
        self.assertEqual(cfg.build_metadata["version"], "1.2.3")

    def test_resolve_idempotent(self) -> None:
        cfg = EngineConfig(
            binary_path="/bin/eng",
            prelude=[{"code": "var z = 1;"}],  # type: ignore[list-item]
        )
        cfg.resolve()
        cfg.resolve()
        self.assertEqual(len(cfg.prelude), 1)
        self.assertEqual(cfg.prelude[0].code, "var z = 1;")


if __name__ == "__main__":
    unittest.main()
