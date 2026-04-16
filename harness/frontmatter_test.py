# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import pickle
import unittest

from harness.frontmatter import Frontmatter, test262_feature_to_ecmascript_edition


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
        self.assertEqual(Frontmatter().modes(), ("sloppy", "strict"))
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
