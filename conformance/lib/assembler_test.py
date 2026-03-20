# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from conformance.lib import Frontmatter, Scenario
from conformance.lib.assembler import Assembler, build_print_prelude
from conformance.lib.config import EngineConfig, Prelude


def _scenario(source: str, *, mode: str = "sloppy", rel_path: str = "test/x.js") -> Scenario:
    fm = Frontmatter.parse(source)
    return Scenario(
        test_path=Path("/fake") / rel_path,
        test_content=source,
        rel_path=rel_path,
        fm=fm,
        mode=mode,
        tags=fm.tags(mode),
    )


def _assembler(**kw) -> Assembler:
    engine = EngineConfig(binary_path="/fake/js", prelude=kw.pop("prelude", []))
    return Assembler(engine, Path("/fake/test262"), **kw)


class TestAssemble(unittest.TestCase):
    def test_strict_directive(self):
        asm = _assembler()
        out = asm.assemble(_scenario("var x;", mode="strict"))
        self.assertTrue(out.startswith('"use strict";\n'))

    def test_sloppy_directive(self):
        asm = _assembler()
        out = asm.assemble(_scenario("var x;", mode="sloppy"))
        self.assertTrue(out.startswith('//"use strict";\n'))

    def test_raw_flag_passthrough(self):
        source = "/*---\nflags: [raw]\n---*/\nvar x;"
        asm = _assembler()
        out = asm.assemble(_scenario(source))
        self.assertEqual(out, source)

    def test_finished_marker(self):
        asm = _assembler()
        out = asm.assemble(_scenario("var x;"))
        self.assertIn('print("ScriptExec"+"utionFinished");', out)

    def test_negative_no_marker(self):
        source = "/*---\nnegative:\n  phase: runtime\n  type: TypeError\n---*/\nvar x;"
        asm = _assembler()
        out = asm.assemble(_scenario(source))
        self.assertNotIn(Assembler.SCRIPT_EXECUTION_FINISHED_MARKER, out)

    def test_prelude_included(self):
        asm = _assembler(prelude=[Prelude(code="/* prelude */")])
        out = asm.assemble(_scenario("var x;"))
        self.assertIn("/* prelude */", out)

    def test_tagged_prelude_excluded(self):
        asm = _assembler(prelude=[Prelude(code="/* intl */", tag="Intl")])
        out = asm.assemble(_scenario("var x;"))
        self.assertNotIn("/* intl */", out)

    def test_tagged_prelude_included(self):
        source = "/*---\nfeatures: [Intl]\n---*/\nvar x;"
        asm = _assembler(prelude=[Prelude(code="/* intl */", tag="Intl")])
        out = asm.assemble(_scenario(source))
        self.assertIn("/* intl */", out)


class TestScenario(unittest.TestCase):
    def test_display_id_single_mode(self):
        source = "/*---\nflags: [onlyStrict]\n---*/\nvar x;"
        s = _scenario(source, mode="strict")
        self.assertEqual(s.display_id(), "test/x.js")

    def test_display_id_both_modes(self):
        s = _scenario("var x;", mode="strict")
        self.assertEqual(s.display_id(), "test/x.js@strict")

    def test_tags(self):
        source = "/*---\nfeatures: [Symbol]\n---*/\nvar x;"
        s = _scenario(source, mode="strict")
        self.assertIn("Symbol", s.tags)
        self.assertIn("strict", s.tags)


class TestEmitPreprocessed(unittest.TestCase):
    def test_emit_to_file(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            # Set up a minimal test262 tree
            t262 = Path(tmpdir) / "test262"
            harness = t262 / "harness"
            harness.mkdir(parents=True)
            (harness / "assert.js").write_text("// assert\n")
            (harness / "sta.js").write_text("// sta\n")
            test_dir = t262 / "test"
            test_dir.mkdir()
            (test_dir / "foo.js").write_text("/*---\ndescription: foo\n---*/\nvar x = 1;\n")

            engine = EngineConfig(binary_path="/fake/js")
            asm = Assembler(engine, t262)

            out_path = Path(tmpdir) / "out.js"
            asm.emit_preprocessed(["test/foo.js"], output=str(out_path))

            result = out_path.read_text()
            self.assertIn("var x = 1;", result)
            self.assertIn('print("ScriptExec"+"utionFinished");', result)

    def test_emit_strict_mode(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            t262 = Path(tmpdir) / "test262"
            harness = t262 / "harness"
            harness.mkdir(parents=True)
            (harness / "assert.js").write_text("")
            (harness / "sta.js").write_text("")
            test_dir = t262 / "test"
            test_dir.mkdir()
            (test_dir / "bar.js").write_text("/*---\ndescription: bar\n---*/\nvar y;\n")

            engine = EngineConfig(binary_path="/fake/js")
            asm = Assembler(engine, t262)

            out_path = Path(tmpdir) / "out.js"
            asm.emit_preprocessed(["test/bar.js"], mode="strict", output=str(out_path))

            result = out_path.read_text()
            self.assertIn('"use strict";\n', result)


class TestStageModule(unittest.TestCase):
    def test_module_creates_tree(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            t262 = Path(tmpdir) / "test262"
            harness = t262 / "harness"
            harness.mkdir(parents=True)
            (harness / "assert.js").write_text("")
            (harness / "sta.js").write_text("")
            test_dir = t262 / "test" / "mod"
            test_dir.mkdir(parents=True)
            (test_dir / "helper.js").write_text("export var h = 1;\n")
            (test_dir / "main.js").write_text(
                "/*---\nflags: [module]\n---*/\nimport {h} from './helper.js';\n"
            )

            engine = EngineConfig(binary_path="/fake/js")
            asm = Assembler(engine, t262)

            source = (test_dir / "main.js").read_text()
            fm = Frontmatter.parse(source)
            scenario = Scenario(
                test_path=test_dir / "main.js",
                test_content=source,
                rel_path="test/mod/main.js",
                fm=fm,
                mode="sloppy",
                tags=fm.tags("sloppy"),
            )

            tmp = Path(tmpdir) / "stage"
            tmp.mkdir()
            staged = asm.stage(scenario, temp_dir=tmp)
            try:
                self.assertTrue(staged.script_path.exists())
                self.assertIsNotNone(staged.tmp_dir)
                self.assertEqual(staged.script_path.suffix, ".mjs")
                self.assertEqual(
                    staged.script_path.relative_to(staged.tmp_dir),
                    Path("test/mod/main.mjs"),
                )
                # Helper should be copied into the module tree
                helper = staged.tmp_dir / "test" / "mod" / "helper.js"
                self.assertTrue(helper.exists())
                # package.json created for module resolution
                self.assertTrue((staged.tmp_dir / "package.json").exists())
            finally:
                staged.cleanup()

    def test_non_module_single_file(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            engine = EngineConfig(binary_path="/fake/js")
            asm = Assembler(engine, Path("/fake/test262"))

            scenario = _scenario("var x;")
            tmp = Path(tmpdir)
            staged = asm.stage(scenario, temp_dir=tmp)
            try:
                self.assertTrue(staged.script_path.exists())
                self.assertIsNone(staged.tmp_dir)
                content = staged.script_path.read_text()
                self.assertIn("var x;", content)
            finally:
                staged.cleanup()


class TestBuildPrintPrelude(unittest.TestCase):
    def test_print_in_console_log_returns_none(self):
        self.assertIsNone(build_print_prelude(["print"], []))

    def test_prelude_defines_print_returns_none(self):
        prelude = [Prelude(code="var print = function() {};")]
        self.assertIsNone(build_print_prelude([], prelude))

    def test_tagged_prelude_with_print_not_skipped(self):
        # Tagged preludes don't count — they're conditional
        prelude = [Prelude(code="var print = function() {};", tag="test262")]
        result = build_print_prelude([], prelude)
        self.assertIsNotNone(result)

    def test_console_log_generates_prelude(self):
        result = build_print_prelude(["console.log"], [])
        self.assertIn("console.log", result)
        self.assertIn("globalThis.print", result)

    def test_empty_console_log_defaults_to_console_log(self):
        result = build_print_prelude([], [])
        self.assertIsNotNone(result)
        self.assertIn("console.log", result)

    def test_multiple_console_log_functions(self):
        result = build_print_prelude(["console.log", "WScript.Echo"], [])
        self.assertIn("console.log", result)
        self.assertIn("WScript.Echo", result)

    def test_print_with_other_fns_returns_none(self):
        # If print is in the list, no prelude needed regardless of others
        self.assertIsNone(build_print_prelude(["print", "console.log"], []))


if __name__ == "__main__":
    unittest.main()
