from __future__ import annotations

import re
from collections.abc import Iterable, Iterator
from functools import cache

from .frontmatter import Frontmatter

_python_eval = eval


class Tags:
    """Tag set for engine argv/flag matching and reporting.

    Stores bare values for fast `tag in tags` lookups, plus namespaced
    pairs for qualified `namespace:value` lookups.

    Use `Tags({"bench"})` for simple tag sets, or
    `Tags.test262(fm, rel_path=...)` for test262.

    Namespaces (test262):
      * features   – test262 feature tags (Symbol, Promise, ...)
      * flags      – test262 flags (module, async, onlyStrict, ...)
      * includes   – harness includes (assert.js, sta.js, ...)
      * field      – frontmatter fields present (es5id, es6id, negative)
      * edition    – highest ES edition (es5, es6, es2020, ..., esnext)
      * mode       – execution mode (strict or sloppy)
      * folder     – all ancestor directory prefixes of rel_path
      * uses       – $262.* methods usage tags (reporting only; not available
                     for test discovery/filtering because they are added after
                     staging)
    """

    __slots__ = ("values", "pairs")

    def __init__(self, values: set[str] | None = None, *, pairs: set[tuple[str, str]] | None = None):
        self.values: set[str] = set(values) if values else set()
        self.pairs: set[tuple[str, str]] = set(pairs) if pairs else set()

    @classmethod
    def test262(cls, fm: Frontmatter, *, rel_path: str = "") -> Tags:
        """Build a full tag set from test262 frontmatter."""
        tags = cls({"test262"})

        for s in fm.features:
            tags.add("features", s)
        if not fm.features:
            tags.add("features", "N/A")

        for s in fm.flags:
            tags.add("flags", s)
        if not fm.flags:
            tags.add("flags", "N/A")

        tags.values.update(fm.includes)
        for s in fm.includes:
            tags.pairs.add(("includes", s))

        if fm.es5id:
            tags.add("field", "es5id")
        if fm.es6id:
            tags.add("field", "es6id")
        if fm.negative_type:
            tags.add("field", "negative")

        edition = fm.edition()
        if edition:
            tags.add("edition", edition)
        else:
            tags.add("edition", "N/A")

        if rel_path:
            assert not rel_path.startswith("/")
            tags.add_folders(rel_path)

        return tags

    @classmethod
    def from_iterable(cls, tags: Iterable[str]) -> Tags:
        """Build Tags from qualified 'ns:value' strings (and bare values)."""
        t = cls()
        for s in tags:
            i = s.find(":")
            if i != -1:
                t.add(s[:i], s[i+1:])
            else:
                t.values.add(s)
        return t

    def clone(self) -> Tags:
        """Return a shallow copy."""
        return Tags(self.values, pairs=self.pairs)

    def add(self, ns: str, value: str) -> None:
        assert value, f"empty value for namespace {ns!r}; use 'N/A' instead"
        self.pairs.add((ns, value))
        self.values.add(value)

    def add_folders(self, rel_path: str) -> None:
        """Add folder:prefix pairs for all ancestor directories of rel_path."""
        i = 0
        while i < len(rel_path):
            i = rel_path.find("/", i)
            if i == -1:
                break
            self.add("folder", rel_path[:i])
            i += 1

    def __iter__(self) -> Iterator[str]:
        """Yield all fully-qualified 'namespace:value' tags, sorted."""
        return iter(sorted(f"{ns}:{val}" for ns, val in self.pairs))

    def __contains__(self, tag: object) -> bool:
        if tag in self.values:
            return True
        if not isinstance(tag, str):
            return False

        i = tag.find(":")
        if i == -1:
            return False

        return (tag[:i], tag[i+1:]) in self.pairs


class FilterExpr:
    """Boolean filter over tag sets.

    Syntax: `[namespace:]tag` variables, `!`/`~` (NOT), `&` (AND),
    `|`/`,` (OR, lowest precedence), parentheses for grouping.
    Examples: `Temporal`, `es6&Map`, `!(module|async)`.
    Empty expression matches everything.
    """

    def __init__(self, expr: str | None = None):
        expr = (expr or "").replace('!', '~').replace(',', '|')
        split = re.split(r'([\s~&|()]+)', f'({expr})')[1:-1]
        self.vars = split[1::2]
        split[1::2] = ['%d'] * len(self.vars)
        self.fmt = ''.join(split).replace('~', ' not ').replace('&', ' and ').replace('|', ' or ')
        if not self.vars:
            self.fmt = '1'

    def __call__(self, tags: Tags | set[str] | None = None) -> bool:
        if tags is None:
            tags = set()
        return bool(_python_eval(self.fmt % tuple(int(v in tags) for v in self.vars)))

    @staticmethod
    @cache
    def _cached(expr: str | None) -> FilterExpr:
        return FilterExpr(expr)

    @staticmethod
    def eval(expr: str | None, tags: Tags | set[str] | None = None) -> bool:
        return FilterExpr._cached(expr)(tags)
