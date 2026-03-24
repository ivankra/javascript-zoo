# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import pickle
import unittest

from harness.frontmatter import Frontmatter, Tags, test262_feature_to_ecmascript_edition


class TestFrontmatter(unittest.TestCase):
    def test_parse_basic(self):
        fm = Frontmatter.parse("""\
/*---
description: basic test
features: [Symbol, Promise]
flags: [onlyStrict]
includes: [assert.js]
---*/
var x = 1;
""")
        self.assertEqual(fm.description, "basic test")
        self.assertEqual(fm.features, {"Symbol", "Promise"})
        self.assertEqual(fm.flags, {"onlyStrict"})
        self.assertEqual(fm.includes, ["assert.js"])

    def test_parse_negative(self):
        fm = Frontmatter.parse("""\
/*---
negative:
  phase: parse
  type: SyntaxError
---*/
""")
        self.assertEqual(fm.negative_phase, "parse")
        self.assertEqual(fm.negative_type, "SyntaxError")

    def test_parse_no_frontmatter(self):
        fm = Frontmatter.parse("var x = 1;")
        self.assertEqual(fm.features, set())
        self.assertEqual(fm.flags, set())

    def test_modes(self):
        self.assertEqual(Frontmatter().modes(), ("strict", "sloppy"))
        self.assertEqual(Frontmatter(flags={"onlyStrict"}).modes(), ("strict",))
        self.assertEqual(Frontmatter(flags={"noStrict"}).modes(), ("sloppy",))
        self.assertEqual(Frontmatter(flags={"raw"}).modes(), ("sloppy",))
        self.assertEqual(Frontmatter(flags={"module"}).modes(), ("strict",))

    def test_edition(self):
        E = lambda **kw: Frontmatter(**kw).edition()
        self.assertIsNone(E())
        self.assertIsNone(E(features={"host-gc-required"}))
        self.assertEqual(E(features={"some-future-feature"}), "esnext")
        self.assertEqual(E(features={"Symbol"}), "es6")
        self.assertEqual(E(features={"Symbol", "Promise.any"}), "es2021")
        self.assertEqual(E(features={"Symbol", "some-future-feature"}), "esnext")
        self.assertEqual(E(features={"Symbol", "host-gc-required"}), "es6")
        self.assertEqual(E(es5id="S15.1"), "es5")
        self.assertEqual(E(es6id="19.1.1"), "es6")
        self.assertEqual(E(es5id="S15.1", features={"Symbol"}), "es6")
        self.assertEqual(E(es5id="S15.1", es6id="19.1.1"), "es6")
        self.assertEqual(E(es6id="19.1.1", features={"Promise.any"}), "es2021")


def T(fm: Frontmatter | None = None, **kw) -> Tags:
    """Shorthand: build a Tags from a Frontmatter."""
    return Tags.test262(fm or Frontmatter(), **kw)


class TestTags(unittest.TestCase):
    def test_always_includes_test262(self):
        self.assertIn("test262", T())

    def test_features(self):
        tags = T(Frontmatter(features={"Symbol", "Promise"}))
        self.assertIn("Symbol", tags)
        self.assertIn("Promise", tags)
        self.assertIn("features:Symbol", tags)
        self.assertIn("features:Promise", tags)

    def test_no_features_empty_pair(self):
        tags = T()
        self.assertIn("features:", tags)

    def test_includes(self):
        tags = T(Frontmatter(includes=["assert.js", "compareArray.js"]))
        self.assertIn("includes:assert.js", tags)
        self.assertIn("includes:compareArray.js", tags)
        self.assertIn("assert.js", tags)

    def test_es5id(self):
        tags = T(Frontmatter(es5id="S15.1"))
        self.assertIn("es5id", tags)
        self.assertIn("field:es5id", tags)
        self.assertIn("es5", tags)
        self.assertNotIn("es5id", T())

    def test_es6id(self):
        tags = T(Frontmatter(es6id="19.1.1"))
        self.assertIn("es6id", tags)
        self.assertIn("field:es6id", tags)
        self.assertIn("es6", tags)
        self.assertNotIn("es6id", T())

    def test_flags(self):
        tags = T(Frontmatter(flags={"async", "onlyStrict"}))
        self.assertIn("async", tags)
        self.assertIn("onlyStrict", tags)
        self.assertIn("flags:async", tags)

    def test_no_flags_empty_pair(self):
        self.assertIn("flags:", T())

    def test_module_flag(self):
        self.assertIn("module", T(Frontmatter(flags={"module"})))
        self.assertNotIn("module", T())

    def test_negative(self):
        self.assertIn("negative", T(Frontmatter(negative_type="SyntaxError")))
        self.assertIn("field:negative", T(Frontmatter(negative_type="SyntaxError")))
        self.assertNotIn("negative", T())

    def test_edition_from_features(self):
        self.assertIn("es6", T(Frontmatter(features={"Symbol"})))
        self.assertIn("edition:es6", T(Frontmatter(features={"Symbol"})))

    def test_esnext_for_unknown_feature(self):
        self.assertIn("esnext", T(Frontmatter(features={"some-future-feature"})))

    def test_no_edition_when_no_features(self):
        tags = T()
        self.assertNotIn("esnext", tags)
        self.assertNotIn("es5", tags)
        self.assertNotIn("es6", tags)
        self.assertIn("edition:", tags)

    def test_no_features_in_qualified_tags(self):
        tags = T()
        qt = tags.qualified_tags()
        self.assertIn("features:", qt)
        self.assertIn("edition:", qt)

    def test_qualified_tags_with_features(self):
        tags = T(Frontmatter(features={"Symbol"}))
        qt = tags.qualified_tags()
        self.assertIn("features:Symbol", qt)
        self.assertNotIn("features:", qt)
        self.assertIn("edition:es6", qt)
        self.assertNotIn("edition:", qt)

    def test_mode(self):
        tags = T()
        tags.add("mode", "strict")
        self.assertIn("strict", tags)
        self.assertIn("mode:strict", tags)
        self.assertNotIn("sloppy", tags)

    def test_raw_flag(self):
        self.assertIn("raw", T(Frontmatter(flags={"raw"})))

    def test_noStrict_flag(self):
        self.assertIn("noStrict", T(Frontmatter(flags={"noStrict"})))

    def test_folder(self):
        tags = T(rel_path="built-ins/Array/from/x.js")
        self.assertIn("folder:built-ins", tags)
        self.assertIn("folder:built-ins/Array", tags)
        self.assertIn("folder:built-ins/Array/from", tags)
        self.assertNotIn("folder:built-ins/Array/from/x.js", tags)
        self.assertNotIn("folder:Array", tags)

    def test_not_found(self):
        tags = T()
        self.assertNotIn("nonexistent", tags)
        self.assertNotIn("bad:namespace", tags)

    def test_pickle_simple(self):
        tags = Tags({"bench"})
        tags2 = pickle.loads(pickle.dumps(tags))
        self.assertIn("bench", tags2)

    def test_pickle_test262(self):
        fm = Frontmatter(features={"Symbol"}, flags={"onlyStrict"}, es6id="19.1.1")
        tags = T(fm, rel_path="test/built-ins/Array/from/x.js")
        tags2 = pickle.loads(pickle.dumps(tags))
        self.assertIn("Symbol", tags2)
        self.assertIn("features:Symbol", tags2)
        self.assertIn("folder:test/built-ins", tags2)
        self.assertIn("edition:es6", tags2)

    def test_clone(self):
        tags = T(Frontmatter(features={"Symbol"}))
        orig_values = set(tags.values)
        orig_pairs = set(tags.pairs)
        cloned = tags.clone()
        cloned.add("mode", "strict")
        cloned.add("features", "Promise")
        # Clone has the new tags
        self.assertIn("strict", cloned)
        self.assertIn("mode:strict", cloned)
        self.assertIn("Promise", cloned)
        # Original is unmodified
        self.assertEqual(tags.values, orig_values)
        self.assertEqual(tags.pairs, orig_pairs)

    def test_does_not_mutate_features(self):
        fm = Frontmatter(features={"Symbol"}, es5id="S15.1")
        Tags.test262(fm)
        self.assertEqual(fm.features, {"Symbol"})


class TestFilterExpr(unittest.TestCase):
    def _eval(self, expr: str, tags: set[str]) -> bool:
        from harness.frontmatter import FilterExpr
        return FilterExpr(expr).eval(tags)

    def test_single_tag_present(self):
        self.assertTrue(self._eval("Temporal", {"Temporal", "Promise"}))

    def test_single_tag_absent(self):
        self.assertFalse(self._eval("Temporal", {"Promise"}))

    def test_or_comma(self):
        self.assertTrue(self._eval("es6,es2016", {"es2016"}))
        self.assertFalse(self._eval("es6,es2016", {"es5"}))

    def test_or_pipe(self):
        self.assertTrue(self._eval("es6|es2016", {"es6"}))

    def test_and(self):
        self.assertTrue(self._eval("es6&Map", {"es6", "Map"}))
        self.assertFalse(self._eval("es6&Map", {"es6"}))

    def test_not_bang(self):
        self.assertTrue(self._eval("!Temporal", {"Promise"}))
        self.assertFalse(self._eval("!Temporal", {"Temporal"}))

    def test_not_tilde(self):
        self.assertTrue(self._eval("~Temporal", {"Promise"}))

    def test_not_or_precedence(self):
        # !a|b should be (!a)|b, not !(a|b)
        self.assertTrue(self._eval("!Temporal|Promise", {"Promise"}))
        self.assertTrue(self._eval("!Temporal|Promise", {"Map"}))
        self.assertFalse(self._eval("!Temporal|Promise", {"Temporal"}))

    def test_parens(self):
        self.assertTrue(self._eval("esnext&(module|dynamic-import)", {"esnext", "module"}))
        self.assertTrue(self._eval("esnext&(module|dynamic-import)", {"esnext", "dynamic-import"}))
        self.assertFalse(self._eval("esnext&(module|dynamic-import)", {"esnext"}))
        self.assertFalse(self._eval("esnext&(module|dynamic-import)", {"module"}))

    def test_negated_group(self):
        self.assertTrue(self._eval("!(Temporal|Intl)", {"Map"}))
        self.assertFalse(self._eval("!(Temporal|Intl)", {"Temporal"}))

    def test_empty_expr(self):
        # Empty expression matches everything
        self.assertTrue(self._eval("", {"anything"}))
        self.assertTrue(self._eval("", set()))

    def test_with_tags_object(self):
        from harness.frontmatter import FilterExpr
        tags = Tags()
        tags.add("features", "Temporal")
        tags.add("edition", "es6")
        f = FilterExpr("Temporal&es6")
        self.assertTrue(f.eval(tags))
        f2 = FilterExpr("Temporal&es7")
        self.assertFalse(f2.eval(tags))

    def test_namespaced_tag(self):
        tags = Tags()
        tags.add("features", "Temporal")
        self.assertTrue(self._eval("features:Temporal", tags))
        self.assertFalse(self._eval("features:Promise", tags))


class TestFeatureToEdition(unittest.TestCase):
    def test_values_are_ints(self):
        for feat, edition in test262_feature_to_ecmascript_edition().items():
            self.assertIsInstance(edition, int, f"{feat} -> {edition!r}")

    def test_known_features_present(self):
        self.assertIn("Symbol", test262_feature_to_ecmascript_edition())
        self.assertIn("Promise", test262_feature_to_ecmascript_edition())

    def test_non_es_keys_map_to_negative(self):
        # "harness" features should have edition -1
        harness_feats = [f for f, e in test262_feature_to_ecmascript_edition().items() if e == -1]
        self.assertTrue(len(harness_feats) > 0)
