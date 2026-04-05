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
from concurrent.futures import ProcessPoolExecutor, as_completed
from pathlib import Path
from typing import Iterator

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from harness import (
    Annotator,
    Assembler,
    EngineConfig,
    ErrorType,
    Frontmatter,
    Runner,
    Scenario,
    Tags,
    Verdict,
)

DEFAULT_TEST262_DIR = (REPO_ROOT / "third_party" / "test262").resolve()


# Each probe: source uses print() which is defined by the assembler's auto-generated prelude.
PROBES: dict[str, dict] = {
    "print": {
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
    "module-export": {
        "source": 'export const x = 1;\nprint("PROBE_OK");\n',
        "mode": "sloppy",
        "fm_flags": {"module"},
        "ok": "PROBE_OK",
    },
    "module-import": {
        "source": 'import { value } from "./probe_dep.mjs";\nprint(value);\n',
        "mode": "sloppy",
        "fm_flags": {"module"},
        "ok": "PROBE_OK",
        "stage_files": {"probe_dep.mjs": 'export const value = "PROBE_OK";\n'},
    },
    "negative": {
        "source": '1 +* 2;\n',
        "mode": "sloppy",
        "negative_phase": "parse",
        "negative_type": "SyntaxError",
    },
    "async": {
        "source": 'Promise.resolve().then(function() { print("Test262:AsyncTestComplete"); });\n',
        "mode": "sloppy",
        "fm_flags": {"async"},
        "use_harness": True,
        "expect_async": True,
    },
    "assert.throws": {
        "source": 'var assert=new Object(); assert.throws="PROBE_OK"; print(assert.throws);\n',
        "mode": "sloppy",
        "ok": "PROBE_OK",
        "use_harness": False,
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
        "source": (
            'if (typeof $262 !== "undefined" && "IsHTMLDDA" in $262) {\n'
            '  var x = $262.IsHTMLDDA;\n'
            '  if (typeof x !== "undefined" || x === undefined || x === null) throw new Error("FAKE");\n'
            '  print("PROBE_OK");\n'
            '}\n'
        ),
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
    "harness": {
        "source": 'assert.sameValue(1, 1);\n',
        "mode": "sloppy",
        "use_harness": True,
        "ok_marker": True,  # check for ScriptExecutionFinished
    },
    # TODO: more tests for each third_party/test262/harness/*.js
}


def run_probe(cfg: EngineConfig, test262_dir: Path, probe_name: str, spec: dict, *, timeout: float = 0) -> tuple[str, str]:
    """Run a single probe. Returns (probe_name, "OK" or detail)."""
    runner = Runner(cfg)
    annotator = Annotator(cfg)
    assembler = Assembler(cfg, test262_dir, no_harness=not spec.get("use_harness"))

    source = spec["source"]
    mode = spec.get("mode", "sloppy")
    fm_flags = spec.get("fm_flags", set())
    fm_features = spec.get("fm_features", set())

    negative_phase = spec.get("negative_phase")
    negative_type = spec.get("negative_type")
    expect_async = spec.get("expect_async", False)

    fm = Frontmatter(
        flags=set(fm_flags),
        features=set(fm_features),
        negative_phase=negative_phase,
        negative_type=negative_type,
    )
    if spec.get("use_harness"):
        fm.includes = ["assert.js", "sta.js"]

    with tempfile.TemporaryDirectory(prefix="probe-") as tmp_str:
        tmp_dir = Path(tmp_str)
        scenario = Scenario(
            test_path=tmp_dir / "probe.js",
            test_content=source,
            rel_path="probe.js",
            fm=fm,
            mode=mode,
            tags=Tags.test262(fm),
        )
        (tmp_dir / "probe.js").write_text(source, encoding="utf-8")

        staged = assembler.stage(scenario, temp_dir=tmp_dir)
        for fname, content in spec.get("stage_files", {}).items():
            (staged.cwd / fname).write_text(content, encoding="utf-8")
        try:
            run = runner.run_command(
                cfg.argv(staged.script_path, tags=scenario.tags),
                run_id=f"probe/{probe_name}",
                timeout_sec=timeout or cfg.timeout_sec,
                cwd=str(staged.cwd),
            )
            annotator.classify(
                run,
                expect_async=expect_async,
                negative_phase=negative_phase,
                negative_type=negative_type,
            )
        finally:
            staged.cleanup()

    if spec.get("expect_async_fail"):
        ok = run.verdict == Verdict.FAILED
        detail = run.verdict_message() if not ok else ""
        return probe_name, "OK" if ok else (detail or "FAIL")

    if "expect_error" in spec:
        ok = run.error_type == spec["expect_error"]
        if not ok:
            parts = [str(run.verdict_message())]
            if run.stdout:
                parts.append(f"stdout={run.stdout.strip()!r}")
            if run.stderr:
                parts.append(f"stderr={run.stderr.strip()!r}")
            return probe_name, " ".join(parts)
        return probe_name, "OK"

    # Probe success markers should be checked against cleaned output so
    # engine-specific quoting/ANSI stripping in config.yml actually takes effect.
    output = run.combined_output()

    if spec.get("ok_marker"):
        marker = Assembler.SCRIPT_EXECUTION_FINISHED_MARKER
        ok = run.verdict == Verdict.OK and marker in output
        return probe_name, "OK" if ok else (run.verdict_message() or "FAIL")

    if "ok" in spec:
        ok = run.verdict == Verdict.OK and spec["ok"] in output
        if not ok:
            detail = run.verdict_message() if run.verdict != Verdict.OK else "marker not found"
            return probe_name, detail or "FAIL"
        return probe_name, "OK"

    ok = run.verdict == Verdict.OK
    return probe_name, "OK" if ok else (run.verdict_message() or "FAIL")


def probe_engine(
    cfg: EngineConfig, test262_dir: Path, *, jobs: int | None = None
) -> Iterator[tuple[str, str]]:
    """Run all probes on a single engine, yielding (probe_name, result) as each completes.

    The first probe (print) runs outside the pool with a high timeout
    as a warmup: some engines need extra time on first invocation
    (e.g. jscript downloads a .dll from Microsoft on first run).
    """
    probes = list(PROBES.items())
    first_name, first_spec = probes[0]
    yield run_probe(cfg, test262_dir, first_name, first_spec, timeout=60)
    rest = probes[1:]

    jobs = cfg.job_count(flag=jobs)
    if jobs <= 1 or not rest:
        for name, spec in rest:
            yield run_probe(cfg, test262_dir, name, spec)
        return

    with ProcessPoolExecutor(max_workers=min(jobs, len(rest))) as pool:
        futures = {
            pool.submit(run_probe, cfg, test262_dir, name, spec): name
            for name, spec in rest
        }
        for future in as_completed(futures):
            yield future.result()


def main() -> None:
    p = argparse.ArgumentParser(description="Probe JavaScript engines for test262 readiness.")
    p.add_argument("engines", nargs="+", help="Engine binary paths (or path to directory with them)")
    p.add_argument("--test262-dir", default=str(DEFAULT_TEST262_DIR), help="test262 repo root")
    p.add_argument("-j", "--jobs", type=int, default=None, help="Parallel probes per engine")
    args = p.parse_args()

    test262_dir = Path(args.test262_dir).resolve()

    engines: list[Path] = []
    for e in args.engines:
        ep = Path(e)
        if ep.is_dir():
            for entry in sorted(ep.iterdir()):
                if entry.is_file() and os.access(entry, os.X_OK) and (ep / (entry.name + ".json")).exists():
                    engines.append(entry)
        else:
            engines.append(ep)

    for binary in engines:
        try:
            cfg = EngineConfig.load(str(binary))
            cfg.resolve()
        except Exception as e:
            print(f"{binary.name}:  # load error: {e}", flush=True)
            continue

        print(f"{binary.name}:", flush=True)
        results = list(probe_engine(cfg, test262_dir, jobs=args.jobs))
        for probe_name, result in sorted(results, key=lambda item: item[0]):
            if result == "OK":
                print(f"  {probe_name}: true", flush=True)
            else:
                print(f"  {probe_name}: false  # {result}", flush=True)
        print(flush=True)


if __name__ == "__main__":
    main()
