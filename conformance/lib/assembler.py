# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import itertools
import os
import re
import shutil
import sys
import tempfile
from functools import lru_cache
from pathlib import Path

from .config import EngineConfig
from .frontmatter import Frontmatter
from .util import expand_template_literals, iterate_js_files


_REL_SPECIFIER_RE = re.compile(
    r"""(?:"""
    r"""from\s*['"](\.[^'"]+)['"]"""          # import/export ... from '...'
    r"""|import\s+['"](\.[^'"]+)['"]"""       # import '...' (side-effect)
    r"""|import\s*\(\s*['"](\.[^'"]+)['"]"""  # dynamic import('...')
    r"""|importValue\s*\(\s*['"](\.[^'"]+)['"]"""  # ShadowRealm importValue
    r""")"""
)


@dataclasses.dataclass
class Scenario:
    """One test × mode combination to execute (file already read)."""
    test_path: Path          # absolute path to the test file
    test_content: str        # original test source code
    rel_path: str            # path relative to test262 root
    fm: Frontmatter          # parsed YAML frontmatter
    mode: str                # "strict" or "sloppy"
    tags: frozenset[str] = frozenset()  # precomputed fm.tags()

    def display_id(self) -> str:
        if len(self.fm.modes()) > 1:
            return f"{self.rel_path}@{self.mode}"
        return self.rel_path


@dataclasses.dataclass
class StagedScript:
    """Result of Assembler.stage(): where to find the script and how to clean up."""
    script_path: Path
    cwd: Path
    # Directory to rmtree on cleanup, or None for single-file cleanup.
    tmp_dir: Path | None = None

    def cleanup(self) -> None:
        if self.tmp_dir is not None:
            shutil.rmtree(self.tmp_dir, ignore_errors=True)
        else:
            try:
                os.unlink(self.script_path)
            except OSError:
                pass


class Assembler:
    """Prepares runnable test262 scripts and module trees.

    Takes care of adding harness and prelude code.

    For module/dynamic-import tests: creates an isolated
    temp dir mirroring the test262 layout for module resolution.
    """

    def __init__(self, engine: EngineConfig, test262_dir: Path, *, verbose: bool = False, save_compiled: str | None = None) -> None:
        self.test262_dir = test262_dir
        self.harness_dir = test262_dir / "harness"
        self.preludes = engine.prelude
        self.save_compiled = Path(save_compiled) if save_compiled else None
        if self.save_compiled:
            self.save_compiled.mkdir(parents=True, exist_ok=True)

    def assemble(self, scenario: Scenario) -> str:
        """Compose the runnable script for one scenario."""

        # "raw" tests may not be modified
        if "raw" in scenario.fm.flags:
            return scenario.test_content

        pieces: list[str] = []

        # Order is dictated test262's INTERPRETING.md

        # 1. "use strict"; (if strict mode)
        if scenario.mode == "strict":
            pieces.append('"use strict";\n')
        elif scenario.mode == "sloppy":
            # Add it commented-out to avoid line number drift between modes
            pieces.append('//"use strict";\n')

        # 2. Engine prelude(s)
        for p in self.preludes:
            if (p.tag is None or p.tag in scenario.tags) and p.code:
                pieces.append(p.code)

        # 3. harness/assert.js + harness/sta.js
        # 4. harness/doneprintHandle.js (if async)
        # 5. Metadata includes in the order listed
        harness = ["assert.js", "sta.js"]
        if "async" in scenario.fm.flags:
            harness.append("doneprintHandle.js")
        harness.extend(name for name in scenario.fm.includes if name not in harness)
        pieces.extend(self._read_harness(name) for name in harness)

        # 6. Test source body
        pieces.append(scenario.test_content)

        # 7. Marker to indicate that control flow reached end of the test script
        if not scenario.fm.negative_type:
            # Separate marker with + against false positives when engine just dumps the source
            pieces.append(f'\nprint("ScriptExec"+"utionFinished");\n')

        return "\n".join(pieces)

    SCRIPT_EXECUTION_FINISHED_MARKER = "ScriptExecutionFinished"

    def stage(self, scenario: Scenario, *, temp_dir: Path) -> StagedScript:
        """Assemble and write script to disk, staging module trees if needed."""
        assembled = self.assemble(scenario)

        if self.save_compiled is not None:
            dst = self.save_compiled / f"{scenario.rel_path}.{scenario.mode}.js"
            dst.parent.mkdir(parents=True, exist_ok=True)
            dst.write_text(assembled, encoding="utf-8")

        needs_module_tree = (
            "module" in scenario.fm.flags
            or "dynamic-import" in scenario.fm.features
        )

        if not needs_module_tree:
            script_path = temp_dir / f"t262-temp-{os.getpid()}-{id(assembled)}.js"
            script_path.write_bytes(assembled.encode("utf-8"))
            return StagedScript(script_path=script_path, cwd=Path(os.getcwd()))

        tmp_root = Path(tempfile.mkdtemp(prefix="t262-mod-"))
        entry_dst = tmp_root / scenario.rel_path
        entry_dst.parent.mkdir(parents=True, exist_ok=True)
        entry_dst.write_text(assembled, encoding="utf-8")

        visited: set[str] = {scenario.rel_path}
        self._copy_deps_recursive(
            tmp_root, scenario.test_path.parent, scenario.test_content, visited,
        )
        self._copy_fixture_siblings(tmp_root, scenario.test_path.parent, visited)

        pkg = tmp_root / "package.json"
        if not pkg.exists():
            pkg.write_text('{"type": "module"}\n', encoding="utf-8")

        return StagedScript(script_path=entry_dst, cwd=tmp_root, tmp_dir=tmp_root)

    def emit_preprocessed(self, tests: list[str], *, mode: str = "all", output: str | None = None) -> None:
        """Emit one assembled test to stdout or a file."""
        if len(tests) != 1:
            sys.exit("-E requires exactly one test path")

        emit_tests = list(itertools.islice(
            iterate_js_files(tests, root=self.test262_dir),
            2,
        ))
        if not emit_tests:
            sys.exit(f"no tests matched: {tests[0]}")
        if len(emit_tests) != 1:
            sys.exit(f"-E requires exactly one matched test, got multiple for: {tests[0]}")

        rel_path = emit_tests[0]
        test_path = self.test262_dir / rel_path
        source = test_path.read_text(encoding="utf-8", errors="replace")
        fm = Frontmatter.parse(source)
        modes = [m for m in fm.modes() if mode == "all" or mode == m]
        if not modes:
            sys.exit(f"no runnable mode for {mode!r}: {rel_path}")

        assembled = self.assemble(Scenario(
            test_path=test_path,
            test_content=source,
            rel_path=rel_path,
            fm=fm,
            mode=modes[0],
            tags=fm.tags(modes[0]),
        ))
        if output:
            Path(output).write_text(assembled, encoding="utf-8")
        else:
            sys.stdout.write(assembled)

    @lru_cache(maxsize=100)
    def _read_harness(self, name: str) -> str:
        p = self.harness_dir / name
        source = p.read_text(encoding="utf-8", errors="replace")
        # Expand template literals in harness code for ES5 engines
        if "`" in source:
            source = expand_template_literals(source)
        return source

    def _copy_deps_recursive(
        self,
        dst_root: Path,
        base_dir: Path,
        source: str,
        visited: set[str],
    ) -> None:
        test_dir = self.test262_dir
        for spec in self._extract_relative_deps(source):
            dep_path = (base_dir / spec).resolve()
            try:
                dep_rel = str(dep_path.relative_to(test_dir))
            except ValueError:
                continue
            if dep_rel in visited:
                continue
            visited.add(dep_rel)
            if not dep_path.exists():
                continue

            dst = dst_root / dep_rel
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(dep_path, dst)

            try:
                dep_src = dep_path.read_text(encoding="utf-8", errors="replace")
                self._copy_deps_recursive(dst_root, dep_path.parent, dep_src, visited)
            except Exception as e:
                print(f"warning: skipping deps of {dep_path}: {e}", file=sys.stderr)

    def _extract_relative_deps(self, source: str) -> list[str]:
        """Extract relative module specifiers from JS source."""
        seen: set[str] = set()
        deps: list[str] = []
        for m in _REL_SPECIFIER_RE.finditer(source):
            spec = m.group(1) or m.group(2) or m.group(3) or m.group(4)
            if spec and spec not in seen:
                seen.add(spec)
                deps.append(spec)
        return deps

    def _copy_fixture_siblings(self, dst_root: Path, base_dir: Path, visited: set[str]) -> None:
        """Copy sibling fixture files for computed import specifiers."""
        test_dir = self.test262_dir
        for dep_path in base_dir.iterdir():
            if not dep_path.is_file() or "_FIXTURE" not in dep_path.name:
                continue
            try:
                dep_rel = str(dep_path.resolve().relative_to(test_dir))
            except ValueError:
                continue
            if dep_rel in visited:
                continue
            visited.add(dep_rel)
            dst = dst_root / dep_rel
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(dep_path, dst)
