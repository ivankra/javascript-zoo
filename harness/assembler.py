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

from .config import EngineConfig, Prelude
from .frontmatter import Frontmatter
from .tags import FilterExpr, Tags
from .util import iterate_js_files, write_atomic


_REL_SPECIFIER_RE = re.compile(
    r"""(?:"""
    r"""from\s*['"](\.[^'"]+)['"]"""          # import/export ... from '...'
    r"""|import\s+['"](\.[^'"]+)['"]"""       # import '...' (side-effect)
    r"""|import\s*(?:\.\s*[a-zA-Z]+\s*)?\(\s*['"](\.[^'"]+)['"]"""  # dynamic import('...') / import.source('...') / import.defer('...')
    r"""|importValue\s*\(\s*['"](\.[^'"]+)['"]"""  # ShadowRealm importValue
    r""")"""
)

_USED_262_RE = re.compile(r"(?<![0-9A-Za-z_$.])\$262\.[A-Za-z_$][0-9A-Za-z_$]*")


@dataclasses.dataclass
class Scenario:
    """One test × mode combination to execute (file already read)."""
    test_path: Path          # absolute path to the test file
    test_content: str        # original test source code
    rel_path: str            # path relative to test262 root
    fm: Frontmatter          # parsed YAML frontmatter
    mode: str                # "strict" or "sloppy"
    tags: Tags | None = None

    def run_id(self) -> str:
        """Relative path for this scenario in the staging tree.

        Encodes .mjs rename for modules and .strict/.sloppy suffix for
        multi-mode tests.  Used as run_id for reporting and as the
        relative path under --stage-dir.  For temp-dir staging of
        single-file scripts the actual on-disk name differs (flat temp
        file), but this path is still used as the logical run_id.
        """
        p = Path(self.rel_path)
        if "module" in self.fm.flags:
            return str(p.with_suffix(".mjs"))
        if len(self.fm.modes()) > 1:
            return str(p.with_suffix(f".{self.mode}{p.suffix}"))
        return self.rel_path


@dataclasses.dataclass
class StagedScript:
    """Result of Assembler.stage(): where to find the script and how to clean up."""
    script_path: Path
    cwd: Path
    used: set[str] = dataclasses.field(default_factory=set)
    # Directory to rmtree on cleanup (per-test module tree), or None.
    rmtree: Path | None = None
    # Whether to unlink script_path on cleanup (single-file temp staging).
    unlink: bool = False

    def cleanup(self) -> None:
        if self.rmtree is not None:
            shutil.rmtree(self.rmtree, ignore_errors=True)
        elif self.unlink:
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

    def __init__(self, engine: EngineConfig, test262_dir: Path, *, verbose: bool = False, stage_dir: str | Path | None = None, no_harness: bool = False) -> None:
        self.test262_dir = test262_dir
        self.harness_dir = test262_dir / "harness"
        self.preludes = engine.prelude
        self.no_harness = no_harness
        self.print_prelude = build_print_prelude(engine.console_log, self.preludes)
        self.stage_dir = Path(stage_dir).resolve() if stage_dir else None
        if self.stage_dir:
            self.stage_dir.mkdir(parents=True, exist_ok=True)

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
            if p.code and FilterExpr.eval(p.if_tag, scenario.tags):
                pieces.append(p.code)

        # 2b. Auto-generated print() prelude (when engine doesn't have print natively)
        if self.print_prelude:
            pieces.append(self.print_prelude)

        # 3. harness/assert.js + harness/sta.js
        # 4. harness/doneprintHandle.js (if async)
        # 5. Metadata includes in the order listed
        if not self.no_harness:
            harness = ["assert.js", "sta.js"]
            if "async" in scenario.fm.flags:
                harness.append("doneprintHandle.js")
            harness.extend(name for name in scenario.fm.includes if name not in harness)
            pieces.extend(self._read_harness(name) for name in harness)
            # Fix "Test262Error: asyncTest called without async flag" in
            # test/language/import/import-defer/errors/resolution-error/import-defer-of-missing-module-fails.js
            # In module mode, harness-defined $DONE doesn't automatically end up in globalThis.
            if "async" in scenario.fm.flags and "module" in scenario.fm.flags:
                pieces.append("if (typeof globalThis !== 'undefined') globalThis.$DONE = $DONE;")

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
        used = set(_USED_262_RE.findall(assembled))

        is_module = "module" in scenario.fm.flags
        needs_module_tree = is_module or "dynamic-import" in scenario.fm.features

        # Pick the staging root: stage_dir (persistent) or a temp directory.
        if self.stage_dir is not None:
            dst_root = self.stage_dir
            cleanup_dir = None  # persistent — no cleanup
        elif needs_module_tree:
            dst_root = Path(tempfile.mkdtemp(prefix="t262-mod-"))
            cleanup_dir = dst_root
        else:
            # Single script — drop into the shared temp dir.  PID prefix
            # avoids collisions between parallel worker processes (e.g.
            # foo/a.js and bar/a.js running in different workers).
            script_path = temp_dir / f"{os.getpid()}-{os.path.basename(scenario.run_id())}"
            script_path.write_bytes(assembled.encode("utf-8"))
            return StagedScript(script_path=script_path, cwd=Path(os.getcwd()),
                                used=used, unlink=True)

        # Rename .js → .mjs (modules) or .js → .strict.js/.sloppy.js
        # (multi-mode scripts with dynamic-import). Rewrites self-references
        # in assembled source and deps so imports resolve to the staged name.
        # Many engines auto-detect module mode from .mjs extension, avoiding
        # the need for extra CLI flags.
        rename_map = {}
        orig_name = Path(scenario.rel_path).name
        staged_name = Path(scenario.run_id()).name
        if orig_name != staged_name:
            assembled = assembled.replace(f"./{orig_name}", f"./{staged_name}")
            rename_map[orig_name] = staged_name

        staged_path = dst_root / scenario.run_id()
        staged_path.parent.mkdir(parents=True, exist_ok=True)
        write_atomic(staged_path, assembled.encode("utf-8"), check_same=True)

        if needs_module_tree:
            visited: set[str] = {scenario.rel_path}
            self._copy_deps_recursive(
                dst_root, scenario.test_path.parent, scenario.test_content, visited,
                rename_map=rename_map, used=used,
            )

        return StagedScript(script_path=staged_path, cwd=dst_root,
                            used=used, rmtree=cleanup_dir)

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
        # Binary read to preserve CR/CRLF line endings verbatim, e.g.
        # Function/prototype/toString/line-terminator-normalisation-CR.js
        source = test_path.read_bytes().decode("utf-8", errors="replace")
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
            tags=Tags.test262(fm, rel_path=rel_path),
        ))
        if output:
            Path(output).write_bytes(assembled.encode("utf-8"))
        else:
            sys.stdout.buffer.write(assembled.encode("utf-8"))

    @lru_cache(maxsize=100)
    def _read_harness(self, name: str) -> str:
        p = self.harness_dir / name
        source = p.read_bytes().decode("utf-8", errors="replace")

        # Some engines won't report user-defined exception names nor run
        # their toString(), but would print the message field inside -
        # move Test262Error prefix to message field so we can properly
        # classify it.
        # FIXME tests/harness
        # if name == "sta.js":
        #     source = source.replace(
        #         '  this.message = message || "";',
        #         '  this.message = "Test262Error: " + (message || "");'
        #     )
        #     source = source.replace(
        #         '  return "Test262Error: " + this.message;',
        #         '  return this.message;'
        #     )

        return source


    def _copy_deps_recursive(
        self,
        dst_root: Path,
        base_dir: Path,
        source: str,
        visited: set[str],
        rename_map: dict[str, str] | None = None,
        used: set[str] | None = None,
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

            try:
                # Binary read: preserve original line endings in test fixtures
                dep_src = dep_path.read_bytes().decode("utf-8", errors="replace")
            except Exception as e:
                print(f"warning: skipping deps of {dep_path}: {e}", file=sys.stderr)
                write_atomic(dst, dep_path.read_bytes())
                continue

            if used is not None:
                used.update(_USED_262_RE.findall(dep_src))

            # Rewrite imports that reference the renamed entry file
            if rename_map:
                for old, new in rename_map.items():
                    dep_src = dep_src.replace(f"./{old}", f"./{new}")

            write_atomic(dst, dep_src.encode("utf-8"))
            self._copy_deps_recursive(dst_root, dep_path.parent, dep_src, visited,
                                      rename_map=rename_map, used=used)

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


def build_print_prelude(console_log: str | list[str], preludes: list[Prelude]) -> str | None:
    """Generate a JS prelude to define print() from console_log functions.

    Returns None if print is already available (in console_log list or defined by a prelude).
    """

    if not console_log:
        console_log = ["console.log"]
    if isinstance(console_log, str):
        console_log = [console_log]
    if "print" in console_log:
        return None
    # Check if any prelude already defines print
    if any(p.code and "print" in p.code for p in preludes if p.if_tag is None):
        return None

    lines = ["// Define print()"]
    for fn in console_log:
        parts = fn.split(".")
        # Build typeof checks for each component: typeof console != "undefined" && typeof console.log == "function"
        checks: list[str] = []
        for i in range(len(parts)):
            prefix = ".".join(parts[: i + 1])
            if i < len(parts) - 1:
                checks.append(f'typeof {prefix} !== "undefined"')
            else:
                checks.append(f'typeof {prefix} === "function"')
        guard = " && ".join(checks)
        lines.append(f"if (typeof print === \"undefined\" && {guard}) {{")
        lines.append(f"  if (typeof globalThis === \"object\") globalThis.print = {fn};")
        lines.append(f"  else if (typeof this === \"object\") this.print = {fn};")
        lines.append(f"  if (typeof print === \"undefined\") print = {fn};")
        lines.append("}")
    return "\n".join(lines) + "\n"
