# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import unittest

from conformance.lib import ESNEXT, Frontmatter, FEATURE_TO_ECMASCRIPT_EDITION


class TestParse(unittest.TestCase):
    def test_basic(self):
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

    def test_negative(self):
        fm = Frontmatter.parse("""\
/*---
negative:
  phase: parse
  type: SyntaxError
---*/
""")
        self.assertEqual(fm.negative_phase, "parse")
        self.assertEqual(fm.negative_type, "SyntaxError")

    def test_no_frontmatter(self):
        fm = Frontmatter.parse("var x = 1;")
        self.assertEqual(fm.features, set())
        self.assertEqual(fm.flags, set())


class TestModes(unittest.TestCase):
    def test(self):
        self.assertEqual(Frontmatter().modes(), ("strict", "sloppy"))
        self.assertEqual(Frontmatter(flags={"onlyStrict"}).modes(), ("strict",))
        self.assertEqual(Frontmatter(flags={"noStrict"}).modes(), ("sloppy",))
        self.assertEqual(Frontmatter(flags={"raw"}).modes(), ("sloppy",))
        self.assertEqual(Frontmatter(flags={"module"}).modes(), ("strict",))


class TestScenarios(unittest.TestCase):
    def test(self):
        self.assertEqual(Frontmatter().scenarios(), ("strict", "sloppy"))
        self.assertEqual(Frontmatter(flags={"onlyStrict"}).scenarios(), ("strict",))
        self.assertEqual(Frontmatter(flags={"noStrict"}).scenarios(), ("sloppy",))
        self.assertEqual(Frontmatter(flags={"module"}).scenarios(), ("module",))
        self.assertEqual(Frontmatter(flags={"raw"}).scenarios(), ("raw",))


class TestTags(unittest.TestCase):
    def test_ecmascript_tag(self):
        self.assertIsNone(Frontmatter().ecmascript_tag())
        self.assertIsNone(Frontmatter(features={"host-gc-required"}).ecmascript_tag())
        self.assertEqual(Frontmatter(features={"some-future-feature"}).ecmascript_tag(), "esnext")
        self.assertEqual(Frontmatter(features={"Symbol"}).ecmascript_tag(), "es6")
        fm = Frontmatter(features={"Symbol", "Promise.any"})
        self.assertEqual(fm.ecmascript_tag(), "es2021")
        self.assertEqual(Frontmatter(features={"Symbol", "some-future-feature"}).ecmascript_tag(), "esnext")
        self.assertEqual(Frontmatter(features={"Symbol", "host-gc-required"}).ecmascript_tag(), "es6")
        self.assertEqual(Frontmatter(es5id="S15.1").ecmascript_tag(), "es5")
        self.assertEqual(Frontmatter(es6id="19.1.1").ecmascript_tag(), "es6")
        self.assertEqual(Frontmatter(es5id="S15.1", features={"Symbol"}).ecmascript_tag(), "es6")
        self.assertEqual(Frontmatter(es5id="S15.1", es6id="19.1.1").ecmascript_tag(), "es6")
        self.assertEqual(Frontmatter(es6id="19.1.1", features={"Promise.any"}).ecmascript_tag(), "es2021")

    def test_always_includes_test262(self):
        self.assertIn("test262", Frontmatter().tags())

    def test_includes_features(self):
        tags = Frontmatter(features={"Symbol", "Promise"}).tags()
        self.assertIn("Symbol", tags)
        self.assertIn("Promise", tags)

    def test_includes_prefixed(self):
        tags = Frontmatter(includes=["assert.js", "compareArray.js"]).tags()
        self.assertIn("includes:assert.js", tags)
        self.assertIn("includes:compareArray.js", tags)

    def test_es5id(self):
        tags = Frontmatter(es5id="S15.1").tags()
        self.assertIn("es5id", tags)
        self.assertIn("es5", tags)  # from ecmascript_tag()
        self.assertNotIn("es5id", Frontmatter().tags())

    def test_es6id(self):
        tags = Frontmatter(es6id="19.1.1").tags()
        self.assertIn("es6id", tags)
        self.assertIn("es6", tags)  # from ecmascript_tag()
        self.assertNotIn("es6id", Frontmatter().tags())

    def test_module_flag(self):
        self.assertIn("module", Frontmatter(flags={"module"}).tags())
        self.assertNotIn("module", Frontmatter().tags())

    def test_negative(self):
        self.assertIn("negative", Frontmatter(negative_type="SyntaxError").tags())
        self.assertNotIn("negative", Frontmatter().tags())

    def test_flags_included(self):
        tags = Frontmatter(flags={"async", "onlyStrict"}).tags()
        self.assertIn("async", tags)
        self.assertIn("onlyStrict", tags)

    def test_edition_tag_from_features(self):
        tags = Frontmatter(features={"Symbol"}).tags()
        self.assertIn("es6", tags)

    def test_esnext_tag_for_unknown_feature(self):
        self.assertIn("esnext", Frontmatter(features={"some-future-feature"}).tags())

    def test_no_edition_tag_when_no_features(self):
        tags = Frontmatter().tags()
        self.assertFalse(any(t.startswith("es") for t in tags if t != "test262"))

    def test_only_one_edition_tag(self):
        tags = Frontmatter(features={"Symbol", "Promise.any"}).tags()
        edition_tags = [t for t in tags if t.startswith("es") and t[2:].isdigit()]
        self.assertEqual(len(edition_tags), 1)

    def test_es5id_edition_tag(self):
        tags = Frontmatter(es5id="S15.1").tags()
        self.assertIn("es5", tags)
        self.assertNotIn("esnext", tags)

    def test_es6id_edition_tag(self):
        tags = Frontmatter(es6id="19.1.1").tags()
        self.assertIn("es6", tags)

    def test_raw_flag_in_tags(self):
        self.assertIn("raw", Frontmatter(flags={"raw"}).tags())

    def test_noStrict_flag_in_tags(self):
        self.assertIn("noStrict", Frontmatter(flags={"noStrict"}).tags())

    def test_does_not_mutate_features(self):
        fm = Frontmatter(features={"Symbol"}, es5id="S15.1")
        fm.tags()
        self.assertEqual(fm.features, {"Symbol"})


class TestFeatureToEdition(unittest.TestCase):
    def test_values_are_ints(self):
        for feat, edition in FEATURE_TO_ECMASCRIPT_EDITION.items():
            self.assertIsInstance(edition, int, f"{feat} -> {edition!r}")

    def test_known_features_present(self):
        self.assertIn("Symbol", FEATURE_TO_ECMASCRIPT_EDITION)
        self.assertIn("Promise", FEATURE_TO_ECMASCRIPT_EDITION)

    def test_non_es_keys_map_to_negative(self):
        # "harness" features should have edition -1
        harness_feats = [f for f, e in FEATURE_TO_ECMASCRIPT_EDITION.items() if e == -1]
        self.assertTrue(len(harness_feats) > 0)
