# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import itertools
import json
import os
import re
import shutil
import sys
import tempfile
from functools import cache
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

_REFS_GLOBALS = ["$262"]
_REFS_RE = re.compile(
    r"(?<![0-9A-Za-z_$.])"
    r"(?:\$262\.[A-Za-z_$][0-9A-Za-z_$]*"
    r"|" + "|".join(re.escape(g) for g in _REFS_GLOBALS) + r")"
    r"(?![0-9A-Za-z_$])"
)

# Matches JS single-line comments, multi-line comments, and string literals
# (single/double/template).  String literals are matched to avoid stripping
# comment-like sequences inside them.
_JS_COMMENT_RE = re.compile(
    r"//[^\n]*"
    r"|/\*[\s\S]*?\*/"
    r"|'(?:[^'\\]|\\.)*'"
    r'|"(?:[^"\\]|\\.)*"'
    r"|`(?:[^`\\]|\\.)*`",
    re.DOTALL,
)


def find_references(source: str) -> set[str]:
    """Find references to notable JS globals in source, ignoring comments and strings."""
    stripped = _JS_COMMENT_RE.sub(" ", source)
    refs = set(_REFS_RE.findall(stripped))
    if any(r.startswith("$262.") for r in refs):
        refs.add("$262")
    return refs


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
    references: set[str] = dataclasses.field(default_factory=set)
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


class HarnessScript:
    """Cached content and metadata for a single harness file."""

    @staticmethod
    @cache
    def load(path: Path) -> "HarnessScript":
        return HarnessScript(path)

    def __init__(self, path: Path) -> None:
        self.path = path
        self.content = path.read_bytes().decode("utf-8", errors="replace")
        self.fm = Frontmatter.parse(self.content)
        self.references = find_references(self.content)

        # JS snippet to assign symbols from "defines:" to globalThis.
        #
        # INTERPRETING.md prescribes evaluating harness code in global scope.
        # This is problematic for module tests (as well as Node.js which wraps
        # scripts in a function) if we concatenate harness and test code into
        # a single .mjs. It will get evaluated in module scope, so harness-defined
        # symbols will not automatically end up in globalThis, breaking tests lile:
        # test/language/import/import-defer/errors/resolution-error/import-defer-of-missing-module-fails.js
        # test/built-ins/Array/fromAsync/async-iterable-async-mapped-awaits-once.js
        #
        # One workaround is to add a footer to the harness code to explicitly
        # assign to globalThis all symbols in "defines:" frontmatter section.
        #
        # More complex alternatives: separate harness .js that imports .mjs,
        # and indirect eval.
        parts = []
        if self.fm.defines:
            parts.append("if (typeof globalThis !== 'undefined') {")
            for sym in self.fm.defines:
                parts.append(f"if (typeof globalThis.{sym} === 'undefined' && typeof {sym} !== 'undefined')")
                parts.append("{ globalThis.%s = %s; };" % (sym, sym))
            parts.append("}\n")
        self.globalThis_footer = " ".join(parts)


class HarnessSource:
    """HarnessScript content with engine-specific harness_replace_re applied, cached."""

    @staticmethod
    @cache
    def load(path: Path, replacements: tuple[tuple[str, str], ...]) -> "HarnessSource":
        return HarnessSource(path, replacements)

    def __init__(self, path: Path, replacements: tuple[tuple[str, str], ...]) -> None:
        base = HarnessScript.load(path)
        content = base.content
        if "harness/" in str(path):
            for pattern, repl in replacements:
                content = re.sub(pattern, repl, content, flags=re.MULTILINE)
        self.content = content
        self.globalThis_footer = base.globalThis_footer
        self.references = base.references


class Assembler:
    """Prepares runnable test262 scripts and module trees.

    Takes care of adding harness and prelude code.

    For module/dynamic-import tests: creates an isolated
    temp dir mirroring the test262 layout for module resolution.
    """

    def __init__(self, config: EngineConfig, test262_dir: Path, *, verbose: bool = False, stage_dir: str | Path | None = None, no_harness: bool = False) -> None:
        self._config = config
        self.test262_dir = test262_dir
        self.harness_dir = test262_dir / "harness"
        self.no_harness = no_harness
        self.print_prelude = build_print_prelude(config.console_log, config.prelude)
        self.stage_dir = Path(stage_dir).resolve() if stage_dir else None
        if self.stage_dir:
            self.stage_dir.mkdir(parents=True, exist_ok=True)
        src = config.harness_replace_re
        def _pairs(x):
            for d in (x if isinstance(x, list) else [x]):
                if isinstance(d, list):
                    yield from _pairs(d)
                else:
                    yield from d.items()
        self._harness_replace: tuple[tuple[str, str], ...] = tuple(_pairs(src))

    def assemble(self, scenario: Scenario, *, references: set[str] | None = None) -> str:
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
        for p in self._config.prelude:
            if p.code and FilterExpr.eval(p.if_tag, scenario.tags):
                pieces.append(p.code)

        # 2b. Auto-generated print() prelude (when engine doesn't have print natively)
        if self.print_prelude:
            pieces.append(self.print_prelude)

        # 3. harness/assert.js + harness/sta.js
        # 4. harness/doneprintHandle.js (if async)
        # 5. Metadata includes in the order listed
        if not self.no_harness:
            includes = ["assert.js", "sta.js"]
            if "async" in scenario.fm.flags:
                includes.append("doneprintHandle.js")
            includes.extend((x for x in scenario.fm.includes if x not in includes))

            for name in includes:
                h = HarnessSource.load(self.harness_dir / name, self._harness_replace)
                pieces.append(h.content)
                pieces.append(h.globalThis_footer)
                if references is not None:
                    references.update(h.references)

        # 6. Test source body
        pieces.append(scenario.test_content)
        if references is not None:
            references.update(find_references(scenario.test_content))

        # 7. Marker to indicate that control flow reached end of the test script
        if not scenario.fm.negative_type:
            # Separate marker with + against false positives when engine just dumps the source
            pieces.append(f'\nprint("ScriptExec"+"utionFinished");\n')

        code = "\n".join(pieces)

        # "throws" is a reserved keyword in ES3, some old engines would reject with a syntax error
        if self._config.fix_assert_throws:
            code = re.sub(r'\bassert\.throws\b', 'assert["throws"]', code)

        # Wrap code in a Function() to execute in sloppy mode if necessary (for deno)
        if self._config.sloppy_via_function and scenario.mode == "sloppy":
            code = "Function(%s)()" % json.dumps(code)

        return code

    SCRIPT_EXECUTION_FINISHED_MARKER = "ScriptExecutionFinished"

    def stage(self, scenario: Scenario, *, temp_dir: Path) -> StagedScript:
        """Assemble and write script to disk, staging module trees if needed."""

        references: set[str] = set()
        assembled = self.assemble(scenario, references=references)

        is_module = "module" in scenario.fm.flags
        needs_mirror_tree = (
            is_module
            or "dynamic-import" in scenario.fm.features
            # test/staging/source-phase-imports/import-source-source-text-module.js
            # uses relative import.source(...) from a script and needs mirrored tree
            or "source-phase-imports" in scenario.fm.features
        )

        # Pick the staging root: stage_dir (persistent) or a temp directory.
        if self.stage_dir is not None:
            dst_root = self.stage_dir
            cleanup_dir = None  # persistent — no cleanup
        elif needs_mirror_tree:
            dst_root = Path(tempfile.mkdtemp(prefix="t262-mod-"))
            cleanup_dir = dst_root
        else:
            # Single script — drop into the shared temp dir.  PID prefix
            # avoids collisions between parallel worker processes (e.g.
            # foo/a.js and bar/a.js running in different workers).
            script_path = temp_dir / f"t262-{os.getpid()}.{os.path.basename(scenario.run_id())}"
            script_path.write_bytes(assembled.encode("utf-8"))
            return StagedScript(script_path=script_path, cwd=Path(os.getcwd()),
                                references=references, unlink=True)

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

        if needs_mirror_tree:
            if self._config.package_json is not None:
                write_atomic(dst_root / "package.json", self._config.package_json.encode("utf-8"), check_same=True)
            visited: set[str] = {scenario.rel_path}
            self._copy_deps_recursive(
                dst_root, scenario.test_path.parent, scenario.test_content, visited,
                rename_map=rename_map, references=references,
            )

        return StagedScript(script_path=staged_path, cwd=dst_root,
                            references=references, rmtree=cleanup_dir)

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

    def _copy_deps_recursive(
        self,
        dst_root: Path,
        base_dir: Path,
        source: str,
        visited: set[str],
        rename_map: dict[str, str] | None = None,
        references: set[str] | None = None,
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

            buf = dep_path.read_bytes()

            try:
                dep_src = buf.decode("utf-8")
            except UnicodeDecodeError:
                # test/language/import/import-bytes/bytes-from-png.js: imports .png
                write_atomic(dst, buf)
                continue

            if references is not None:
                references.update(find_references(dep_src))

            # Rewrite imports that reference the renamed entry file
            if rename_map:
                for old, new in rename_map.items():
                    dep_src = dep_src.replace(f"./{old}", f"./{new}")

            # TODO: properly fix "ReferenceError: assert is not defined" in
            # test/language/module-code/ambiguous-export-bindings/namespace-unambiguous-if-export-star-as-from-and-import-star-as-and-export.js
            # This module test imports another full test file (namespace-unambiguous-if-import-star-as-and-export.js)
            # _copy_deps_recursive() raw-copies it so its module body can't see harness bindings like assert.
            # Need to ensure dependencies that are independent tests go through full assembly pipeline.
            if dep_path.name == "namespace-unambiguous-if-import-star-as-and-export.js":
                dep_src = HarnessScript.load(self.harness_dir / "assert.js").content + "\n" + dep_src

            write_atomic(dst, dep_src.encode("utf-8"))
            self._copy_deps_recursive(dst_root, dep_path.parent, dep_src, visited,
                                      rename_map=rename_map, references=references)

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
