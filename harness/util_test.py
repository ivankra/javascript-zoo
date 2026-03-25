# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import os
import re
import tempfile
import unittest
from pathlib import Path

from harness.util import iterate_js_files, version_sort_key


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


class VersionSortKeyTest(unittest.TestCase):
    def _sorted(self, items: list[str]) -> list[str]:
        return sorted(items, key=version_sort_key)

    def test_numeric_components(self) -> None:
        self.assertEqual(self._sorted(["es20", "es3", "es1"]), ["es1", "es3", "es20"])

    def test_parent_dir_before_children(self) -> None:
        self.assertEqual(self._sorted([
            "test/intl402/Array/prototype/toLocaleString",
            "test/intl402/Array/prototype",
            "test/intl402/Array",
            "test/intl402",
            "test/harness/foo",
            "test/harness",
            "test/built-ins/undefined",
            "test/built-ins/parseInt",
            "test/built-ins",
            "test",
            "es5/JSON",
            "es5",
            "es2025/Array/from",
            "es2025/Array",
            "es2025",
        ]), [
            "es5",
            "es5/JSON",
            "es2025",
            "es2025/Array",
            "es2025/Array/from",
            "test",
            "test/built-ins",
            "test/built-ins/parseInt",
            "test/built-ins/undefined",
            "test/harness",
            "test/harness/foo",
            "test/intl402",
            "test/intl402/Array",
            "test/intl402/Array/prototype",
            "test/intl402/Array/prototype/toLocaleString",
        ])

    def test_slash_sorts_before_hyphen(self) -> None:
        # "test/a/sub" should come before "test/a-b" because '/' < '-'
        self.assertEqual(self._sorted(["test/a-b", "test/a/sub"]), ["test/a/sub", "test/a-b"])
