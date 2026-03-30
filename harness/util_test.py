# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import os
import re
import tempfile
import unittest
from pathlib import Path

from unittest.mock import patch

from harness.util import FileDiscovery, iterate_js_files, version_sort_key


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


class FileDiscoveryFromListTest(unittest.TestCase):
    def test_basic(self) -> None:
        d = FileDiscovery.from_list(["a.js", "b.js", "c.js"])
        self.assertTrue(d.done)
        self.assertEqual(d.count, 3)
        self.assertEqual(d.files, ["a.js", "b.js", "c.js"])

    def test_iter(self) -> None:
        self.assertEqual(list(FileDiscovery.from_list(["a.js", "b.js"])), ["a.js", "b.js"])

    def test_copies_input(self) -> None:
        items = ["a.js", "b.js"]
        d = FileDiscovery.from_list(items)
        items.append("c.js")
        self.assertEqual(d.files, ["a.js", "b.js"])

    def test_empty(self) -> None:
        d = FileDiscovery.from_list([])
        self.assertTrue(d.done)
        self.assertEqual(d.count, 0)
        self.assertEqual(list(d), [])

    def test_wait(self) -> None:
        self.assertEqual(FileDiscovery.from_list(["a.js"]).wait(), ["a.js"])


class FileDiscoverySyncTest(unittest.TestCase):
    def setUp(self) -> None:
        self._td = tempfile.TemporaryDirectory()
        self.root = Path(self._td.name)
        for rel in ["dir1/a.js", "dir1/b.js", "dir1/skip.txt", "dir2/c.js", "dir2/nested/d.js"]:
            path = self.root / rel
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("// x\n")

    def tearDown(self) -> None:
        self._td.cleanup()

    def test_discovers_all_files(self) -> None:
        d = FileDiscovery(["dir1", "dir2"], root=self.root)
        self.assertTrue(d.done)
        self.assertEqual(list(d), ["dir1/a.js", "dir1/b.js", "dir2/c.js", "dir2/nested/d.js"])

    def test_exclude_re(self) -> None:
        d = FileDiscovery(["dir1", "dir2"], root=self.root, exclude_re=[re.compile(r"/nested/")])
        self.assertEqual(list(d), ["dir1/a.js", "dir1/b.js", "dir2/c.js"])

    def test_shuffle_keeps_same_set(self) -> None:
        d = FileDiscovery(["dir1", "dir2"], root=self.root, shuffle=True)
        self.assertEqual(set(d.files), {"dir1/a.js", "dir1/b.js", "dir2/c.js", "dir2/nested/d.js"})

    def test_iter_multiple_times(self) -> None:
        d = FileDiscovery(["dir1"], root=self.root)
        self.assertEqual(list(d), list(d))

    def test_background_discovers_all(self) -> None:
        d = FileDiscovery(["dir1", "dir2"], root=self.root, background=True)
        result = list(d)
        self.assertTrue(d.done)
        self.assertEqual(result, ["dir1/a.js", "dir1/b.js", "dir2/c.js", "dir2/nested/d.js"])

    def test_background_matches_sync(self) -> None:
        sync = FileDiscovery(["dir1", "dir2"], root=self.root)
        bg = FileDiscovery(["dir1", "dir2"], root=self.root, background=True)
        self.assertEqual(list(bg), sync.files)

    def test_background_streams_results(self) -> None:
        real_walk = os.scandir

        def delayed_scandir(path: str | os.PathLike[str]):
            ctx = real_walk(path)
            entries = list(ctx)
            ctx.close()

            class _Ctx:
                def __enter__(self_inner):
                    if Path(path).name == "dir1":
                        import time
                        time.sleep(0.02)
                    return iter(entries)

                def __exit__(self_inner, exc_type, exc, tb):
                    return False

            return _Ctx()

        with patch("harness.util.os.scandir", side_effect=delayed_scandir):
            d = FileDiscovery(["dir1", "dir2"], root=self.root, background=True)
            it = iter(d)
            first = next(it)
            self.assertGreaterEqual(d.count, 1)
            rest = list(it)
        self.assertEqual(set([first, *rest]), {"dir1/a.js", "dir1/b.js", "dir2/c.js", "dir2/nested/d.js"})
        self.assertTrue(d.done)

    def test_background_wait(self) -> None:
        d = FileDiscovery(["dir1", "dir2"], root=self.root, background=True)
        self.assertEqual(d.wait(), ["dir1/a.js", "dir1/b.js", "dir2/c.js", "dir2/nested/d.js"])

    def test_inferred_root_with_explicit_root(self) -> None:
        d = FileDiscovery(["dir1"], root=self.root)
        self.assertEqual(d.inferred_root, self.root)


class FileDiscoveryRootInferenceTest(unittest.TestCase):
    """Tests for fallback_roots + root_marker based root inference."""

    def setUp(self) -> None:
        self._td = tempfile.TemporaryDirectory()
        # Build a fake test262 tree:
        #   <td>/test262/harness/assert.js   (root marker)
        #   <td>/test262/test/built-ins/a.js
        #   <td>/test262/test/built-ins/b.js
        #   <td>/test262/test/staging/c.js
        self.td = Path(self._td.name).resolve()
        self.test262 = self.td / "test262"
        for rel in [
            "harness/assert.js",
            "test/built-ins/a.js",
            "test/built-ins/b.js",
            "test/staging/c.js",
        ]:
            p = self.test262 / rel
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text("// x\n")

    def tearDown(self) -> None:
        self._td.cleanup()

    def test_fallback_root_dir(self) -> None:
        """Bare selector matched via fallback_roots, root inferred from marker."""
        d = FileDiscovery(
            ["test/built-ins"],
            fallback_roots=[self.test262],
            root_marker="harness/assert.js",
        )
        self.assertEqual(d.inferred_root, self.test262)
        self.assertEqual(sorted(d.files), ["test/built-ins/a.js", "test/built-ins/b.js"])

    def test_fallback_root_subdir(self) -> None:
        """Bare selector without test/ prefix matched via second fallback root."""
        d = FileDiscovery(
            ["built-ins"],
            fallback_roots=[self.test262, self.test262 / "test"],
            root_marker="harness/assert.js",
        )
        self.assertEqual(d.inferred_root, self.test262)
        self.assertEqual(sorted(d.files), ["test/built-ins/a.js", "test/built-ins/b.js"])

    def test_symlink_resolution(self) -> None:
        """Symlinked selector resolves to real test262 root."""
        link = self.td / "link_test"
        link.symlink_to(self.test262 / "test")
        d = FileDiscovery(
            [str(link / "built-ins")],
            root_marker="harness/assert.js",
        )
        self.assertEqual(d.inferred_root, self.test262)
        self.assertEqual(sorted(d.files), ["test/built-ins/a.js", "test/built-ins/b.js"])

    def test_glob_with_fallback(self) -> None:
        """Glob selectors work with fallback_roots."""
        d = FileDiscovery(
            ["test/built-ins/*.js"],
            fallback_roots=[self.test262],
            root_marker="harness/assert.js",
        )
        self.assertEqual(d.inferred_root, self.test262)
        self.assertEqual(sorted(d.files), ["test/built-ins/a.js", "test/built-ins/b.js"])

    def test_explicit_path_no_fallback(self) -> None:
        """Explicit ./ prefix must NOT try fallback_roots."""
        d = FileDiscovery(
            ["./test/built-ins"],
            fallback_roots=[self.test262],
            root_marker="harness/assert.js",
        )
        # ./test/built-ins doesn't exist in cwd, so no files found
        self.assertEqual(d.files, [])
        self.assertIsNone(d.inferred_root)

    def test_mixed_roots_error(self) -> None:
        """Files resolving to different roots must raise an error."""
        other = self.td / "other262"
        for rel in ["harness/assert.js", "test/x.js"]:
            p = other / rel
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text("// x\n")
        d = FileDiscovery(
            [str(self.test262 / "test/built-ins/a.js"), str(other / "test/x.js")],
            root_marker="harness/assert.js",
        )
        with self.assertRaises(RuntimeError):
            d.wait()

    def test_out_of_tree_file_after_in_tree(self) -> None:
        """File outside any marker tree must raise when root is established."""
        outside = self.td / "stray.js"
        outside.write_text("// x\n")
        d = FileDiscovery(
            [str(self.test262 / "test/built-ins/a.js"), str(outside)],
            root_marker="harness/assert.js",
        )
        with self.assertRaises(RuntimeError):
            d.wait()

    def test_out_of_tree_file_before_in_tree(self) -> None:
        """Out-of-tree file first, then in-tree — must still raise."""
        outside = self.td / "stray.js"
        outside.write_text("// x\n")
        d = FileDiscovery(
            [str(outside), str(self.test262 / "test/built-ins/a.js")],
            root_marker="harness/assert.js",
        )
        with self.assertRaises(RuntimeError):
            d.wait()

    def test_no_marker_no_inference(self) -> None:
        """Without root_marker, no inference happens even with fallback_roots."""
        d = FileDiscovery(
            ["test/built-ins"],
            fallback_roots=[self.test262],
        )
        self.assertIsNone(d.inferred_root)

    def test_background_inferred_root_available_immediately(self) -> None:
        """inferred_root is available right after construction (constructor blocks
        until root is determined, not until all files are discovered)."""
        d = FileDiscovery(
            ["test"],
            fallback_roots=[self.test262],
            root_marker="harness/assert.js",
            background=True,
        )
        self.assertEqual(d.inferred_root, self.test262)
        # discovery may still be running; wait and verify all files found
        self.assertEqual(len(d.wait()), 3)

    def test_from_list_inferred_root_is_none(self) -> None:
        d = FileDiscovery.from_list(["a.js"])
        self.assertIsNone(d.inferred_root)
