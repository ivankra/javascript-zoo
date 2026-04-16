# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import re
from functools import cache
from pathlib import Path
from typing import Any, ClassVar

import yaml  # type: ignore[import-untyped]
SafeLoader: Any = getattr(yaml, "CSafeLoader", yaml.SafeLoader)


@dataclasses.dataclass
class Frontmatter:
    """Parsed test262 YAML frontmatter."""
    description: str = ""
    includes: list[str] = dataclasses.field(default_factory=list)
    flags: set[str] = dataclasses.field(default_factory=set)
    features: set[str] = dataclasses.field(default_factory=set)
    defines: list[str] = dataclasses.field(default_factory=list)
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
            defines=list(data.get("defines") or []),
            negative_phase=negative.get("phase"),
            negative_type=negative.get("type"),
            locale=list(data.get("locale") or []),
            es5id=str(data["es5id"]) if data.get("es5id") else None,
            es6id=str(data["es6id"]) if data.get("es6id") else None,
        )

    def modes(self) -> tuple[str, ...]:
        """Return list of modes (strict/sloppy) for this test as a tuple."""
        if "module" in self.flags or "onlyStrict" in self.flags:
            return ("strict",)
        # raw implies noStrict (test262/CONTRIBUTING.md)
        if "noStrict" in self.flags or "raw" in self.flags:
            return ("sloppy",)
        return ("strict", "sloppy")

    def edition(self) -> str | None:
        """ECMAScript edition level of the test: "es5", "es6", "es2016" ... "esnext".

        Edition is determined from the presence of es5id and es6id fields,
        feature tags, and feature to edition mapping in features.yml.
        Return highest level of any feature found, mapping any unknown
        features to "esnext". Returns None if undetermined (no features).
        """
        edition = 0
        if self.es6id:
            edition = 6
        elif self.es5id:
            edition = 5
        if self.features:
            feat_map = test262_feature_to_ecmascript_edition()
            for f in self.features:
                edition = max(edition, feat_map.get(f, 9999))
        if edition == 0:
            return None
        if edition == 9999:
            return "esnext"
        return f"es{edition}"


@cache
def test262_features_yaml() -> dict[str, list[str]]:
    """Load features.yml: edition name / tag -> list of test262 feature tags."""

    path = Path(__file__).resolve().parent / "features.yml"
    with path.open("r", encoding="utf-8") as f:
        data = yaml.load(f, Loader=SafeLoader)

    assert isinstance(data, dict), f"{path}: expected mapping"
    seen: dict[str, str] = {}
    for edition, features in data.items():
        assert isinstance(edition, str), f"{path}: non-string key {edition!r}"
        assert isinstance(features, list), f"{path}: {edition!r} must be a list"
        for feat in features:
            assert feat not in seen, f"{path}: feature {feat!r} in {edition!r} already listed under {seen[feat]!r}"
            seen[feat] = edition
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
