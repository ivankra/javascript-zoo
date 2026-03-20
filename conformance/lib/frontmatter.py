# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import re
from functools import cache
from pathlib import Path
from typing import Any, ClassVar

import yaml
SafeLoader: Any = getattr(yaml, "CSafeLoader", yaml.SafeLoader)

# Edition number placeholder for ESnext features.
# features.yml doesn't exhaustively list these features, users of
# test262_feature_to_ecmascript_edition should map unknown tags to it.
ESNEXT = 9999


@cache
def test262_features_yaml() -> dict[str, list[str]]:
    """Load features.yml: edition name / tag -> list of test262 feature tags."""

    path = Path(__file__).parent.resolve() / "features.yml"
    with path.open("r", encoding="utf-8") as f:
        data = yaml.load(f, Loader=SafeLoader)

    assert isinstance(data, dict), f"{path}: expected mapping"
    for edition, features in data.items():
        assert isinstance(edition, str), f"{path}: non-string key {edition!r}"
        assert isinstance(features, list), f"{path}: {edition!r} must be a list"
    return data


@cache
def test262_feature_to_ecmascript_edition() -> dict[str, int]:
    """Returns mapping: feature -> edition number (e.g. 5, 6, 2020).

    es* keys are parsed numerically (es5 -> 5, es2020 -> 2020).
    Non-es keys (e.g. "harness") map to -1.
    """
    result: dict[str, int] = {}
    for key, feats in test262_features_yaml().items():
        if key.startswith("es"):
            try:
                num = int(key[2:])
            except ValueError:
                num = -1
        else:
            num = -1
        for f in feats:
            result.setdefault(f, num)
    return result


# Module-level aliases for convenience.
FEATURES_BY_ECMASCRIPT_EDITION = test262_features_yaml()
FEATURE_TO_ECMASCRIPT_EDITION = test262_feature_to_ecmascript_edition()

# String version for reporter (temporary, will be refactored).
_FEATURE_TO_EDITION_STR: dict[str, str] = {}
for _edition, _feats in FEATURES_BY_ECMASCRIPT_EDITION.items():
    for _f in _feats:
        _FEATURE_TO_EDITION_STR.setdefault(_f, _edition)


@dataclasses.dataclass
class Frontmatter:
    """Parsed test262 YAML frontmatter."""
    description: str = ""
    includes: list[str] = dataclasses.field(default_factory=list)
    flags: set[str] = dataclasses.field(default_factory=set)
    features: set[str] = dataclasses.field(default_factory=set)
    negative_phase: str | None = None
    negative_type: str | None = None
    locale: list[str] = dataclasses.field(default_factory=list)
    es5id: str | None = None
    es6id: str | None = None
    _FRONTMATTER_RE: ClassVar[re.Pattern[str]] = re.compile(r"/\*---\n(.*?)\n---\*/", re.DOTALL)

    @classmethod
    def parse(cls, source_text: str) -> "Frontmatter":
        """Parse YAML frontmatter given the source code of a test262 test."""
        m = cls._FRONTMATTER_RE.search(source_text.replace("\r\n", "\n").replace("\r", "\n"))
        if not m:
            return cls()

        data = yaml.load(m.group(1), Loader=SafeLoader)
        negative = data.get("negative") or {}

        return cls(
            description=data.get("description", "") or "",
            includes=list(data.get("includes") or []),
            flags=set(data.get("flags") or []),
            features=set(data.get("features") or []),
            negative_phase=negative.get("phase"),
            negative_type=negative.get("type"),
            locale=list(data.get("locale") or []),
            es5id=str(data["es5id"]) if data.get("es5id") else None,
            es6id=str(data["es6id"]) if data.get("es6id") else None,
        )

    def ecmascript_tag(self) -> str | None:
        """Highest ES edition required by this test, as a tag string.

        Returns e.g. "es5", "es2020", "esnext", or None if undetermined.
        Unknown features (not in features.yml) map to "esnext".
        Also considers es5id/es6id fields.
        """
        edition = 0
        if self.es6id:
            edition = 6
        elif self.es5id:
            edition = 5
        if self.features:
            feat_map = test262_feature_to_ecmascript_edition()
            for f in self.features:
                edition = max(edition, feat_map.get(f, ESNEXT))
        if edition == 0:
            return None
        if edition == ESNEXT:
            return "esnext"
        return f"es{edition}"

    def tags(self) -> set[str]:
        """Build the full tag set for engine argv/flag matching.

        Includes: features, flags, includes:*, test262, es5id/es6id,
        negative, and es{edition}/esnext.
        """
        tags = set(self.features) | self.flags
        tags.add("test262")
        for inc in self.includes:
            tags.add(f"includes:{inc}")
        if self.es5id:
            tags.add("es5id")
        if self.es6id:
            tags.add("es6id")
        if self.negative_type:
            tags.add("negative")
        edition = self.ecmascript_tag()
        if edition:
            tags.add(edition)
        return tags

    def modes(self) -> tuple[str, ...]:
        """Return which of strict/sloppy modes this test runs in."""
        if "module" in self.flags or "onlyStrict" in self.flags:
            return ("strict",)
        # raw implies noStrict (test262/CONTRIBUTING.md)
        if "noStrict" in self.flags or "raw" in self.flags:
            return ("sloppy",)
        return ("strict", "sloppy")

    def scenarios(self) -> tuple[str, ...]:
        """Expand frontmatter flags into concrete execution scenarios."""
        if "raw" in self.flags:
            return ("raw",)
        if "module" in self.flags:
            return ("module",)
        if "onlyStrict" in self.flags:
            return ("strict",)
        if "noStrict" in self.flags:
            return ("sloppy",)
        return ("strict", "sloppy")
