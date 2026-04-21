# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import tempfile
import re
import unittest
from pathlib import Path

from harness.assembler import Assembler, HarnessScript, Scenario, build_print_prelude, _REL_SPECIFIER_RE
from harness.config import EngineConfig, Prelude
from harness.frontmatter import Frontmatter
from harness.tags import Tags


def _scenario(source: str, *, mode: str = "sloppy", rel_path: str = "test/x.js") -> Scenario:
    fm = Frontmatter.parse(source)
    return Scenario(
        test_path=Path("/fake") / rel_path,
        test_content=source,
        rel_path=rel_path,
        fm=fm,
        mode=mode,
        tags=Tags.test262(fm, rel_path=rel_path),
    )


def _assembler(**kw) -> Assembler:
    engine = EngineConfig(binary_path="/fake/js", prelude=kw.pop("prelude", []))
    kw.setdefault("no_harness", True)
    return Assembler(engine, Path("/fake/test262"), **kw)


class TestAssemble(unittest.TestCase):
    def test_strict_directive(self):
        asm = _assembler()
        out = asm.assemble(_scenario("var x;", mode="strict"))
        lines = [l for l in out.splitlines() if l]
        self.assertEqual(lines[1], '"use strict";')

    def test_sloppy_directive(self):
        asm = _assembler()
        out = asm.assemble(_scenario("var x;", mode="sloppy"))
        lines = [l for l in out.splitlines() if l]
        self.assertEqual(lines[1], '//"use strict";')

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
        asm = _assembler(prelude=[Prelude(code="/* intl */", if_tag="Intl")])
        out = asm.assemble(_scenario("var x;"))
        self.assertNotIn("/* intl */", out)

    def test_tagged_prelude_included(self):
        source = "/*---\nfeatures: [Intl]\n---*/\nvar x;"
        asm = _assembler(prelude=[Prelude(code="/* intl */", if_tag="Intl")])
        out = asm.assemble(_scenario(source))
        self.assertIn("/* intl */", out)

    def test_tagged_prelude_qualified_tag(self):
        source = "/*---\nfeatures: [Intl]\n---*/\nvar x;"
        asm = _assembler(prelude=[Prelude(code="/* intl */", if_tag="features:Intl")])
        out = asm.assemble(_scenario(source))
        self.assertIn("/* intl */", out)
        out2 = asm.assemble(_scenario("var x;"))
        self.assertNotIn("/* intl */", out2)

    def test_tagged_prelude_negation(self):
        asm = _assembler(prelude=[Prelude(code="/* no-intl */", if_tag="!Intl")])
        out = asm.assemble(_scenario("var x;"))
        self.assertIn("/* no-intl */", out)
        source = "/*---\nfeatures: [Intl]\n---*/\nvar x;"
        out2 = asm.assemble(_scenario(source))
        self.assertNotIn("/* no-intl */", out2)

    def test_tagged_prelude_boolean_expr(self):
        source = "/*---\nfeatures: [Intl, Temporal]\n---*/\nvar x;"
        asm = _assembler(prelude=[Prelude(code="/* both */", if_tag="Intl & Temporal")])
        out = asm.assemble(_scenario(source))
        self.assertIn("/* both */", out)
        source2 = "/*---\nfeatures: [Intl]\n---*/\nvar x;"
        out2 = asm.assemble(_scenario(source2))
        self.assertNotIn("/* both */", out2)


class TestScenario(unittest.TestCase):
    def test_run_id_single_mode(self):
        source = "/*---\nflags: [onlyStrict]\n---*/\nvar x;"
        s = _scenario(source, mode="strict")
        self.assertEqual(s.run_id(), "test/x.js")

    def test_run_id_both_modes(self):
        s = _scenario("var x;", mode="strict")
        self.assertEqual(s.run_id(), "test/x.strict.js")

    def test_run_id_module(self):
        source = "/*---\nflags: [module]\n---*/\nexport {};"
        s = _scenario(source, mode="strict")
        self.assertEqual(s.run_id(), "test/x.mjs")

    def test_tags(self):
        source = "/*---\nfeatures: [Symbol]\n---*/\nvar x;"
        s = _scenario(source, mode="strict")
        self.assertIn("Symbol", s.tags)
        self.assertIn("features:Symbol", s.tags)


class TestRelSpecifierRE(unittest.TestCase):
    """Test _REL_SPECIFIER_RE matches various import forms."""

    def _extract(self, source: str) -> list[str]:
        return [next(g for g in m.groups() if g is not None)
                for m in _REL_SPECIFIER_RE.finditer(source)]

    def test_static_import_from(self):
        self.assertEqual(self._extract("import {x} from './foo.js';"), ["./foo.js"])

    def test_dynamic_import(self):
        self.assertEqual(self._extract("import('./foo.js')"), ["./foo.js"])

    def test_import_source(self):
        self.assertEqual(self._extract("import.source('./empty_FIXTURE.js')"), ["./empty_FIXTURE.js"])

    def test_import_defer(self):
        self.assertEqual(self._extract("import.defer('./sync_FIXTURE.js')"), ["./sync_FIXTURE.js"])

    def test_side_effect_import(self):
        self.assertEqual(self._extract("import './setup.js';"), ["./setup.js"])

    def test_import_value(self):
        self.assertEqual(self._extract("importValue('./mod.js', 'x')"), ["./mod.js"])

    def test_non_relative_skipped(self):
        self.assertEqual(self._extract("import 'some-pkg';"), [])


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
    def test_stage_collects_used_262_from_script_and_deps_not_siblings(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            t262 = Path(tmpdir) / "test262"
            harness = t262 / "harness"
            harness.mkdir(parents=True)
            (harness / "assert.js").write_text("")
            (harness / "sta.js").write_text("")
            test_dir = t262 / "test" / "mod"
            test_dir.mkdir(parents=True)
            (test_dir / "helper.js").write_text(
                "export const x = $262.gc + $262.agent.start;\n"
            )
            (test_dir / "entry_FIXTURE.js").write_text(
                "export const ignored = $262.detachArrayBuffer;\n"
            )
            (test_dir / "main.js").write_text(
                "/*---\nflags: [module]\n---*/\n"
                "$262.evalScript('1');\n"
                "import {x} from './helper.js';\n"
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
                tags=Tags.test262(fm, rel_path="test/mod/main.js"),
            )

            tmp = Path(tmpdir) / "stage"
            tmp.mkdir()
            staged = asm.stage(scenario, temp_dir=tmp)
            try:
                self.assertEqual(
                    staged.references,
                    {"$262", "$262.evalScript", "$262.gc", "$262.agent"},
                )
            finally:
                staged.cleanup()

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
                tags=Tags.test262(fm, rel_path="test/mod/main.js"),
            )

            tmp = Path(tmpdir) / "stage"
            tmp.mkdir()
            staged = asm.stage(scenario, temp_dir=tmp)
            try:
                self.assertTrue(staged.script_path.exists())
                self.assertIsNotNone(staged.rmtree)
                self.assertEqual(staged.script_path.suffix, ".mjs")
                self.assertEqual(
                    staged.script_path.relative_to(staged.rmtree),
                    Path("test/mod/main.mjs"),
                )
                # Helper should be copied into the module tree
                helper = staged.rmtree / "test" / "mod" / "helper.js"
                self.assertTrue(helper.exists())
            finally:
                staged.cleanup()

    def test_module_fixture_rewrite(self):
        """Fixtures importing the test by .js name get rewritten to .mjs."""
        with tempfile.TemporaryDirectory() as tmpdir:
            t262 = Path(tmpdir) / "test262"
            harness = t262 / "harness"
            harness.mkdir(parents=True)
            (harness / "assert.js").write_text("")
            (harness / "sta.js").write_text("")
            test_dir = t262 / "test" / "mod"
            test_dir.mkdir(parents=True)
            (test_dir / "entry_FIXTURE.js").write_text(
                "export { A as B } from './entry.js';\n"
            )
            (test_dir / "entry.js").write_text(
                "/*---\nflags: [module]\n---*/\n"
                "import * as self from './entry.js';\n"
                "import { B } from './entry_FIXTURE.js';\n"
            )

            engine = EngineConfig(binary_path="/fake/js")
            asm = Assembler(engine, t262)

            source = (test_dir / "entry.js").read_bytes().decode("utf-8")
            fm = Frontmatter.parse(source)
            scenario = Scenario(
                test_path=test_dir / "entry.js",
                test_content=source,
                rel_path="test/mod/entry.js",
                fm=fm, mode="sloppy", tags=Tags.test262(fm, rel_path="test/mod/entry.js"),
            )

            tmp = Path(tmpdir) / "stage"
            tmp.mkdir()
            staged = asm.stage(scenario, temp_dir=tmp)
            try:
                # Entry self-import rewritten
                entry_text = staged.script_path.read_text()
                self.assertIn("./entry.mjs", entry_text)
                self.assertNotIn("./entry.js", entry_text)
                # Fixture back-reference rewritten
                fixture = staged.rmtree / "test" / "mod" / "entry_FIXTURE.js"
                self.assertTrue(fixture.exists())
                fix_text = fixture.read_text()
                self.assertIn("./entry.mjs", fix_text)
                self.assertNotIn("./entry.js", fix_text)
            finally:
                staged.cleanup()

    def test_non_module_single_file(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            engine = EngineConfig(binary_path="/fake/js")
            asm = Assembler(engine, Path("/fake/test262"), no_harness=True)

            scenario = _scenario("var x;")
            tmp = Path(tmpdir)
            staged = asm.stage(scenario, temp_dir=tmp)
            try:
                self.assertTrue(staged.script_path.exists())
                self.assertTrue(staged.unlink)
                content = staged.script_path.read_text()
                self.assertIn("var x;", content)
                self.assertEqual(staged.references, set())
            finally:
                staged.cleanup()

    def test_dynamic_import_script_keeps_js(self):
        """dynamic-import scripts must stay .js to preserve sloppy mode."""
        with tempfile.TemporaryDirectory() as tmpdir:
            t262 = Path(tmpdir) / "test262"
            harness = t262 / "harness"
            harness.mkdir(parents=True)
            (harness / "assert.js").write_text("")
            (harness / "sta.js").write_text("")
            (harness / "doneprintHandle.js").write_text("")
            test_dir = t262 / "test" / "di"
            test_dir.mkdir(parents=True)
            (test_dir / "foo.js").write_text(
                "/*---\nfeatures: [dynamic-import]\nflags: [async]\n---*/\n"
                "import('./helper.js').then(ns => {});\n"
            )
            (test_dir / "helper.js").write_text("export var h = 1;\n")

            engine = EngineConfig(binary_path="/fake/js")
            asm = Assembler(engine, t262)

            source = (test_dir / "foo.js").read_bytes().decode("utf-8")
            fm = Frontmatter.parse(source)
            scenario = Scenario(
                test_path=test_dir / "foo.js",
                test_content=source,
                rel_path="test/di/foo.js",
                fm=fm, mode="sloppy", tags=Tags.test262(fm, rel_path="test/di/foo.js"),
            )

            tmp = Path(tmpdir) / "stage"
            tmp.mkdir()
            staged = asm.stage(scenario, temp_dir=tmp)
            try:
                # Script test: must keep .js extension (not .mjs)
                self.assertEqual(staged.script_path.suffix, ".js")
                self.assertIsNotNone(staged.rmtree)
                # Helper copied into module tree
                helper = staged.rmtree / "test" / "di" / "helper.js"
                self.assertTrue(helper.exists())
            finally:
                staged.cleanup()


class TestGenerateHarnessScriptFooter(unittest.TestCase):
    def test_compiled_replacements_are_applied(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            harness_dir = Path(tmpdir) / "harness"
            harness_dir.mkdir()
            path = harness_dir / "sta.js"
            path.write_text("var print = this.print;\n")
            script = HarnessScript(path, ((re.compile(r"^var print = ", re.MULTILINE), "let print = "),))
            self.assertIn("let print = this.print;", script.content)

    def test_defines_assigned_to_global_this(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            path = Path(tmpdir) / "done.js"
            path.write_text("/*---\ndefines: [$DONE]\n---*/\nfunction $DONE() {}\n")
            self.assertIn("globalThis.$DONE = $DONE", HarnessScript(path).globalThis_footer)

    def test_no_defines_returns_empty(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            path = Path(tmpdir) / "sta.js"
            path.write_text("// no defines\n")
            self.assertEqual(HarnessScript(path).globalThis_footer, "")


class TestBuildPrintPrelude(unittest.TestCase):
    def test_print_in_console_log_returns_none(self):
        self.assertIsNone(build_print_prelude(["print"], []))

    def test_prelude_defines_print_returns_none(self):
        prelude = [Prelude(code="var print = function() {};")]
        self.assertIsNone(build_print_prelude([], prelude))

    def test_tagged_prelude_with_print_not_skipped(self):
        # Tagged preludes don't count — they're conditional
        prelude = [Prelude(code="var print = function() {};", if_tag="test262")]
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
