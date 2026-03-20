#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

"""Probe JS engines for test262 readiness.

Diagnostic script for identifying gaps in engine configs and behavior
before running the full test262 suite. Scans a directory for engine
binaries (with sidecar .json) and runs small test snippets to
check basic capabilities.

Output: YAML to stdout, one block per engine with true/false per probe
and failure details as comments.

Usage: probe.py [engines or dirs...]
"""

from __future__ import annotations

import argparse
import os
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from lib import (  # type: ignore[import-not-found]  # noqa: E402
    Annotator,
    Assembler,
    EngineConfig,
    ErrorType,
    Frontmatter,
    Runner,
    Scenario,
    Verdict,
)

SCRIPT_DIR = Path(__file__).parent.resolve()
DEFAULT_TEST262_DIR = (SCRIPT_DIR.parent.parent / "third_party" / "test262").resolve()


# Each probe: source uses print() which is defined by the assembler's auto-generated prelude.
PROBES: dict[str, dict] = {
    "printing": {
        "source": 'print("PROBE_OK");\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
    },
    "sloppy": {
        "source": 'x="PROBE_OK"; print(x);\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
    },
    "strict": {
        "source": '(function() { print(this === undefined ? "PROBE_OK" : "NOT_STRICT"); })();\n',
        "mode": "strict",
        "ok": "PROBE_OK",
    },
    "eval": {
        "source": 'print(eval("40+2") === 42 ? "PROBE_OK" : "WRONG");\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
    },
    "harness": {
        "source": 'assert.sameValue(1, 1);\n',
        "mode": "sloppy",
        "use_harness": True,
        "ok_marker": True,  # check for ScriptExecutionFinished
    },
    # TODO: more tests for each third_party/test262/harness/*.js
    "module": {
        "source": 'export var x = 1;\nprint("PROBE_OK");\n',
        "mode": "sloppy",
        "fm_flags": {"module"},
        "ok": "PROBE_OK",
    },
    "staged": {
        "source": 'import { value } from "./probe_dep.mjs";\nprint(value);\n',
        "mode": "sloppy",
        "fm_flags": {"module"},
        "ok": "PROBE_OK",
        "stage_files": {"probe_dep.mjs": 'export var value = "PROBE_OK";\n'},
    },
    "async": {
        "source": 'Promise.resolve().then(function() { print("Test262:AsyncTestComplete"); });\n',
        "mode": "sloppy",
        "fm_flags": {"async"},
        "use_harness": True,
        "expect_async": True,
    },
    "negative": {
        "source": '1 +* 2;\n',
        "mode": "sloppy",
        "negative_phase": "parse",
        "negative_type": "SyntaxError",
    },
    "async-negative": {
        "source": 'Promise.resolve().then(function() { print("Test262:AsyncTestFailure:probe"); });\n',
        "mode": "sloppy",
        "fm_flags": {"async"},
        "use_harness": True,
        "expect_async": True,
        "expect_async_fail": True,
    },
    "SyntaxError": {
        "source": '1 +* 2;\n',
        "mode": "sloppy",
        "expect_error": ErrorType.SYNTAX_ERROR,
    },
    "ReferenceError": {
        "source": 'x\n',
        "mode": "sloppy",
        "expect_error": ErrorType.REFERENCE_ERROR,
    },
    "TypeError": {
        "source": 'throw new TypeError();\n',  #test/language/module-code/./eval-rqstd-abrupt-err-type_FIXTURE.js
        "mode": "sloppy",
        "expect_error": ErrorType.TYPE_ERROR,
    },
    "TypeError2": {
        "source": 'null.x;\n',
        "mode": "sloppy",
        "expect_error": ErrorType.TYPE_ERROR,
    },
    "EvalError": {
        "source": 'throw new EvalError("foo");\n',
        "mode": "sloppy",
        "expect_error": ErrorType.EVAL_ERROR,
    },
    "RangeError": {
        "source": 'throw new RangeError();\n',  # test/language/module-code/top-level-await/module-import-rejection-tick_FIXTURE.js
        "mode": "sloppy",
        "expect_error": ErrorType.RANGE_ERROR,
    },
    "Test262Error": {
        "source": 'throw new Test262Error("probe");\n',
        "mode": "sloppy",
        "use_harness": True,
        "expect_error": ErrorType.TEST262_ERROR,
    },
    "annexB": {
        "source": 'if (typeof escape === "function") print("PROBE_OK");\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
    },
    "Intl": {
        "source": 'if (typeof Intl !== "undefined") print("PROBE_OK");\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
    },
    "$262": {
        "source": 'if (typeof $262 !== "undefined") print("PROBE_OK");\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
    },
    "$262.createRealm": {
        "source": 'if (typeof $262 !== "undefined" && typeof $262.createRealm === "function") print("PROBE_OK");\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
    },
    "$262.detachArrayBuffer": {
        "source": 'if (typeof $262 !== "undefined" && typeof $262.detachArrayBuffer === "function") print("PROBE_OK");\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
    },
    "$262.evalScript": {
        "source": 'if (typeof $262 !== "undefined" && typeof $262.evalScript === "function") print("PROBE_OK");\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
    },
    "$262.gc": {
        "source": 'if (typeof $262 !== "undefined" && typeof $262.gc === "function") print("PROBE_OK");\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
    },
    "$262.global": {
        "source": 'if (typeof $262 !== "undefined" && $262.global === globalThis) print("PROBE_OK");\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
    },
    "$262.agent": {
        "source": 'if (typeof $262 !== "undefined" && typeof $262.agent === "object") print("PROBE_OK");\n',
        "mode": "sloppy",
        "fm_features": {"SharedArrayBuffer"},
        "ok": "PROBE_OK",
    },
    "$262.IsHTMLDDA": {
        "source": 'if (typeof $262 !== "undefined" && "IsHTMLDDA" in $262) print("PROBE_OK");\n',
        "mode": "sloppy",
        "fm_features": {"IsHTMLDDA"},
        "ok": "PROBE_OK",
    },
    "$262.AbstractModuleSource": {
        "source": 'if (typeof $262 !== "undefined" && typeof $262.AbstractModuleSource === "function") print("PROBE_OK");\n',
        "mode": "sloppy",
        "fm_features": {"source-phase-imports"},
        "ok": "PROBE_OK",
    },
}


def run_probe(
    runner: Runner,
    annotator: Annotator,
    assembler: Assembler,
    engine: EngineConfig,
    name: str,
    spec: dict,
    tmp_dir: Path,
) -> tuple[bool, str]:
    """Run a single probe. Returns (passed, detail)."""
    source = spec["source"]
    mode = spec.get("mode", "sloppy")
    fm_flags = spec.get("fm_flags", set())
    fm_features = spec.get("fm_features", set())
    use_harness = spec.get("use_harness", False)

    negative_phase = spec.get("negative_phase")
    negative_type = spec.get("negative_type")
    expect_async = spec.get("expect_async", False)

    # Build a minimal frontmatter
    fm = Frontmatter(
        flags=set(fm_flags),
        features=set(fm_features),
        negative_phase=negative_phase,
        negative_type=negative_type,
    )
    if use_harness:
        fm.includes = ["assert.js", "sta.js"]

    # Wrap source with frontmatter comment so Frontmatter.parse would see it,
    # but we already have the parsed fm, so just use it directly.
    scenario = Scenario(
        test_path=tmp_dir / "probe.js",
        test_content=source,
        rel_path="probe.js",
        fm=fm,
        mode=mode,
        tags=fm.tags(mode) | frozenset({"test262"}),
    )

    # Write the "test file" so assembler can find it
    (tmp_dir / "probe.js").write_text(source, encoding="utf-8")

    staged = assembler.stage(scenario, temp_dir=tmp_dir)

    # Write extra files for staged module tests (into staged cwd, not tmp_dir)
    for fname, content in spec.get("stage_files", {}).items():
        (staged.cwd / fname).write_text(content, encoding="utf-8")
    try:
        run = runner.run_command(
            engine.argv(staged.script_path, tags=scenario.tags),
            run_id=f"probe/{name}",
            timeout_sec=engine.timeout_sec,
            cwd=str(staged.cwd),
        )
        annotator.classify(
            run,
            expect_async=expect_async,
            negative_phase=negative_phase,
            negative_type=negative_type,
        )

        if spec.get("expect_async_fail"):
            ok = run.verdict == Verdict.FAILED
            detail = run.verdict_message() if not ok else ""
            return ok, detail

        if "expect_error" in spec:
            ok = run.error_type == spec["expect_error"]
            if not ok:
                parts = [str(run.error_type)]
                if run.stdout:
                    parts.append(f"stdout={run.stdout.strip()!r}")
                if run.stderr:
                    parts.append(f"stderr={run.stderr.strip()!r}")
                detail = " ".join(parts)
            else:
                detail = ""
            return ok, detail

        output = (run.stdout or "") + (run.stderr or "")

        if spec.get("ok_marker"):
            marker = Assembler.SCRIPT_EXECUTION_FINISHED_MARKER
            ok = run.verdict == Verdict.OK and marker in output
            detail = run.verdict_message() if not ok else ""
            return ok, detail

        if "ok" in spec:
            ok = run.verdict == Verdict.OK and spec["ok"] in output
            if not ok:
                detail = run.verdict_message() if run.verdict != Verdict.OK else "marker not found"
            else:
                detail = ""
            return ok, detail

        ok = run.verdict == Verdict.OK
        return ok, run.verdict_message() if not ok else ""
    finally:
        staged.cleanup()


def discover_engines(dist_dir: Path) -> list[Path]:
    """Find executable files with a sidecar .json in dist_dir (non-recursive)."""
    engines: list[Path] = []
    if not dist_dir.is_dir():
        return engines
    for entry in sorted(dist_dir.iterdir()):
        if entry.is_file() and os.access(entry, os.X_OK):
            if (dist_dir / (entry.name + ".json")).exists():
                engines.append(entry)
    return engines


def main() -> None:
    p = argparse.ArgumentParser(description="Probe JS engines for test262 readiness.")
    p.add_argument("engines", nargs="+", help="Engine binary paths (or path to directory with them)")
    p.add_argument("--test262-dir", default=str(DEFAULT_TEST262_DIR), help="test262 repo root")
    args = p.parse_args()

    test262_dir = Path(args.test262_dir).resolve()

    engines: list[Path] = []
    for e in args.engines:
        ep = Path(e)
        if ep.is_dir():
            engines.extend(discover_engines(ep))
        else:
            engines.append(ep)

    for binary in engines:
        try:
            cfg = EngineConfig.load(str(binary))
            cfg.resolve()
        except Exception as e:
            print(f"{binary.name}:  # load error: {e}", flush=True)
            continue

        runner = Runner(cfg)
        annotator = Annotator(cfg)
        asm_bare = Assembler(cfg, test262_dir, no_harness=True)
        asm_full = Assembler(cfg, test262_dir)

        print(f"{binary.name}:", flush=True)
        for probe_name, spec in PROBES.items():
            asm = asm_full if spec.get("use_harness") else asm_bare
            with tempfile.TemporaryDirectory(prefix="probe-") as tmp:
                ok, detail = run_probe(runner, annotator, asm, cfg, probe_name, spec, Path(tmp))
            val = "true" if ok else "false"
            if detail:
                print(f"  {probe_name}: {val}  # {detail}", flush=True)
            else:
                print(f"  {probe_name}: {val}", flush=True)
        print(flush=True)


if __name__ == "__main__":
    main()
