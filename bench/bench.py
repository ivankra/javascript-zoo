#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import math
import os
import random
import re
import shlex
import signal
import subprocess
import sys
import tempfile
import threading
import time
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import cast

REPO_ROOT = Path(__file__).parent.parent.resolve()
sys.path.insert(0, str(REPO_ROOT))

from harness import Annotator, EngineConfig, Prelude, RunResult, Runner, Tags, Verdict, read_json
from harness.data import BinaryInfo, Report
from harness.util import write_atomic

START_TIME = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S.%f %Z")
PERIODIC_SAVE_SECONDS = 10
BENCH_ROOT = REPO_ROOT / "bench"
COMPARE_SCRIPT = BENCH_ROOT / "compare.py"

V8_V7_TESTS = [
    "richards.js",
    "deltablue.js",
    "crypto.js",
    "raytrace.js",
    "earley-boyer.js",
    "regexp.js",
    "splay.js",
    "navier-stokes.js",
]

OCTANE_TESTS = [
    "richards.js",
    "deltablue.js",
    "crypto.js",
    "raytrace.js",
    "earley-boyer.js",
    "regexp.js",
    "splay.js",
    "navier-stokes.js",
    "pdfjs.js",
    "mandreel.js",
    "gbemu.js",
    "code-load.js",
    "box2d.js",
    "zlib.js",
    "typescript.js",
]

class RepSpec:
    """Manages repetition counts and time budgets for benchmark runs."""

    def __init__(self, reps: list[str] | None) -> None:
        self.default_spec = "1"
        self.file_specs: dict[str, str] = {}
        self.counts: dict[str, int] = {}
        self.limits: dict[str, int | None] = {}

        if reps:
            for spec in reps:
                if ":" in spec:
                    test, value = spec.split(":", 1)
                    self.file_specs[test] = value
                else:
                    self.default_spec = spec

    def should_run(self, basename: str) -> bool:
        if basename not in self.counts:
            self.counts[basename] = 0
            self.limits[basename] = None
            spec = self.file_specs.get(basename, self.default_spec)
            if not spec.endswith("s"):
                self.limits[basename] = int(spec)
        limit = self.limits[basename]
        return limit is None or self.counts[basename] < limit

    def add(self, basename: str, run: RunResult | None, verbose: bool = False) -> None:
        spec = self.file_specs.get(basename, self.default_spec)
        self.counts[basename] = self.counts.get(basename, 0) + 1

        if not spec.endswith("s") or self.limits.get(basename) is not None:
            return

        limit_sec = int(spec[:-1])
        real_time = run.rusage.real_time if run is not None else None
        if not real_time or real_time < 0.01 or real_time > limit_sec:
            self.limits[basename] = 1
        else:
            self.limits[basename] = max(math.floor(limit_sec / real_time), 1)

        if verbose:
            reps = self.limits[basename] or 0
            print(f"real {real_time or 0:.2f}s => {reps} rep(s)", flush=True)

    def count(self, basename: str) -> int:
        return self.counts.get(basename, 0)


def resolve_test_path(name: str) -> Path:
    p = Path(name)
    if p.exists():
        return p.resolve()
    return (BENCH_ROOT / name).resolve()


def load_test(path: Path) -> str:
    """Read test file into memory, inlining load() calls recursively."""
    lines: list[str] = []
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines(keepends=True):
        m = re.match(r"^load\((?:base_dir \+ )?('[^']+'|\"[^\"\\]+\")\) *;$", line.strip())
        if not m:
            lines.append(line)
            continue
        lines.append("// BEGIN " + line.strip() + "\n")
        loaded = load_test(path.parent / m.group(1)[1:-1])
        lines.append(loaded.strip() + "\n")
        lines.append("// END " + line.strip() + "\n\n")
    return "".join(lines).strip() + "\n"


def _replace_octal(m: re.Match[str]) -> str:
    return '"\\x%.2X"' % ord(eval(m.group(0))[0])


def _replace_hex(m: re.Match[str]) -> str:
    s = m.group(0)
    if s.startswith("0x"):
        return str(int(s, 16))
    return s


def apply_transforms(script: str, transforms: list[str], preludes: list[Prelude]) -> str:
    """Apply named transforms and prepend resolved preludes to script.

    Only preludes with no tag or tag="bench" are included.
    """
    tags = {"bench"}
    for name in transforms:
        if name == "octal":
            script = re.sub(r'"\\[01]([0-9][0-9])"', _replace_octal, script)
        elif name == "hex":
            script = re.sub(
                r"(0x[0-9a-fA-F]+|\"(?:[^\"\\\n]|\\.)*\"|'(?:[^'\\\n]|\\.)*')",
                _replace_hex,
                script,
            )

    parts = [p.code.strip() for p in preludes
             if (p.if_tag is None or p.if_tag in tags) and p.code and p.code.strip()]
    if parts:
        script = "\n".join(parts) + "\n" + script

    return script


def extract_scores(script: str, basename: str, *, v8_v7: bool = False) -> dict[str, int | float | None]:
    """Identify expected benchmark score keys from the script text."""
    expected = re.findall(r"new BenchmarkSuite\(['\"]([A-Za-z0-9]+)['\"]", script)
    if "BenchmarkSuite.GeometricMeanLatency" in script and not v8_v7:
        expected += [name + "Latency" for name in expected if name in ("Splay", "Mandreel")]
    if basename.startswith("richards."):
        expected += ["Richards"]
    return dict.fromkeys(expected, None)


def parse_scores(
    output: str,
    expected: dict[str, int | float | None],
    *,
    v8_v7: bool = False,
) -> dict[str, int | float | None]:
    """Extract numeric benchmark scores from engine output."""
    if not expected:
        return {}
    pattern = r"(%s|Score \(version [0-9]\)): ([0-9.]+(?:e[+-][0-9]+)?)" % (
        "|".join(re.escape(name) for name in expected),
    )
    scores: dict[str, int | float | None] = dict(expected)
    for name, raw in re.findall(pattern, output):
        if v8_v7 and name.endswith("Latency"):
            continue
        key = re.sub(r" \(version ([0-9])\)", r"V\1", name)
        try:
            value: int | float = int(raw)
        except ValueError:
            value = float(raw)
            if value.is_integer():
                value = int(value)
            else:
                value = round(value, 3)
        scores[key] = value
    return scores


def maybe_pause() -> None:
    for f in (Path.cwd() / "pause", BENCH_ROOT / "pause"):
        if f.exists():
            print(f"Pausing while {f} exists", flush=True)
            while f.exists():
                time.sleep(1)


def run_compare(paths: list[Path]) -> None:
    if not paths or not COMPARE_SCRIPT.exists():
        return
    cmd = [str(COMPARE_SCRIPT)]
    for path in paths:
        cmd.append(path.name if path.parent == Path.cwd() else str(path))
    print("+ " + shlex.join(cmd), flush=True)
    subprocess.run(cmd, check=False)


class BenchRunner:
    """Per-engine state."""

    def __init__(self, cfg: EngineConfig, extra_flags: list[str], out: Path, report: Report) -> None:
        self.cfg = cfg
        self.extra_flags = extra_flags
        self.out = out
        self.report = report
        self._runner = Runner(cfg)
        self.annotator = Annotator(cfg)
        self.last: RunResult | None = None

    @property
    def name(self) -> str:
        return Path(self.cfg.binary_path or "").name

    def run(self, test_path: Path, test_script: str, *, timeout: float, v8_v7: bool, keep: bool, verbose: bool) -> RunResult:
        """Execute one benchmark test and store the result in self.last."""
        basename = test_path.name
        run_script = apply_transforms(test_script, self.cfg.bench_transforms, self.cfg.prelude)
        expected = extract_scores(run_script, basename, v8_v7=v8_v7)

        if keep:
            td_path = Path(tempfile.mkdtemp(prefix=f"{self.name}-{basename.removesuffix('.js')}-"))
            td_obj = None
        else:
            td_obj = tempfile.TemporaryDirectory(prefix=f"{self.name}-{basename.removesuffix('.js')}-")
            td_path = Path(td_obj.name)

        try:
            script_path = td_path / basename
            script_path.write_text(run_script, encoding="utf-8")
            argv = self.cfg.argv(*self.extra_flags, script_path, tags=Tags({"bench"}))
            if verbose:
                print(f"> cd {shlex.quote(str(td_path))}; {shlex.join(argv)}", flush=True)
            run = self._runner.run_command(
                argv,
                run_id=basename,
                test_path=str(test_path.resolve()),
                script_path=str(script_path.resolve()),
                timeout_sec=timeout,
                cwd=str(td_path),
            )
        finally:
            if td_obj is not None:
                td_obj.cleanup()

        if run.stdout:
            print(run.stdout.rstrip(), flush=True)
        if run.stderr:
            print(run.stderr.rstrip(), file=sys.stderr, flush=True)

        scores = parse_scores(run.combined_output(), expected, v8_v7=v8_v7)
        run = self.annotator.classify(run)
        run.benchmarks = scores  # type: ignore[assignment]

        if not run.is_failed():
            if expected and not any(v is not None for v in scores.values()):
                run.verdict_type = Verdict.FAIL
                run.verdict_detail = "No scores in the output"

        if self.cfg.bench_ignore_errors:
            run.verdict_type = Verdict.PASS
            run.verdict_detail = None

        self.last = run
        return run

    def commit(self) -> bool:
        """Add self.last to the report. Prints error if failed. Returns True on error."""
        assert self.last is not None
        self.report.add_benchmark_run(self.last, default_time=START_TIME)
        if self.last.is_failed():
            print(f"{self.name}: {self.last.run_id}: {self.last.verdict_message()}", flush=True)
            return True
        return False

    def kill(self) -> None:
        """Kill the active subprocess, if any."""
        self._runner.stop()

    def save(self) -> None:
        write_atomic(self.out, self.report.to_text().encode("utf-8"))

    @classmethod
    def create(cls, spec: str, *, config_name: str | None, output: Path, append: bool) -> BenchRunner:
        parts = shlex.split(spec)
        binary_spec, extra_flags = parts[0], parts[1:]
        cfg = EngineConfig.load(binary_spec, config_name=config_name)
        cfg.resolve()
        output.parent.mkdir(parents=True, exist_ok=True)

        if cfg.build_metadata:
            binary: BinaryInfo = cast(BinaryInfo, dict(cfg.build_metadata))
        else:
            binary = {"binary_name": Path(cfg.binary_path or "").name}
        report = Report(
            binary=binary,
            time=START_TIME,
            flags=list(cfg.flags) if cfg.flags else [],
        )
        if output.exists() and append:
            prev = read_json(output, None)
            if isinstance(prev, dict):
                prev_report = Report.from_dict(prev)
                if prev_report.time and not prev_report.time.endswith(START_TIME):
                    prev_report.time = f"{prev_report.time}, {START_TIME}"
                report = prev_report

        return cls(cfg, extra_flags, output, report)


def create_runners(
    args: argparse.Namespace, rem: list[str]
) -> tuple[list[BenchRunner], list[Path]]:
    """Parse engine specs and test specs, build runners, resolve test paths."""
    test_specs: list[str]
    if "--" in rem:
        idx = rem.index("--")
        engine_specs = rem[:idx]
        test_specs = rem[idx + 1:]
    else:
        engine_specs = list(rem)
        test_specs = []
        while len(engine_specs) > 1 and engine_specs[-1].endswith(".js"):
            test_specs.insert(0, engine_specs.pop())

    if not engine_specs:
        sys.exit("error: at least one engine must be specified")
    if args.config and len(args.config) != len(engine_specs):
        sys.exit("error: number of -C flags must match number of engines")
    if args.output and len(args.output) != len(engine_specs):
        sys.exit("error: number of -o flags must match number of engines")

    seen_counts: dict[str, int] = {}
    runners: list[BenchRunner] = []
    for i, spec in enumerate(engine_specs):
        config_name = args.config[i] if args.config else None
        if args.output:
            output = Path(args.output[i])
        else:
            base_name = Path(shlex.split(spec)[0]).name
            n = seen_counts.get(base_name, 0)
            seen_counts[base_name] = n + 1
            output = Path.cwd() / f"{base_name}{'' if n == 0 else n + 1}.bench"
            if args.verbose:
                print(f"Output file: {output}", flush=True)
        runners.append(BenchRunner.create(spec, config_name=config_name, output=output, append=args.append))

    test_specs = test_specs or list(runners[0].cfg.bench_suite or (V8_V7_TESTS if args.v8_v7 else OCTANE_TESTS))
    if not test_specs:
        sys.exit("no tests to run")

    tests = [resolve_test_path(name) for name in test_specs]
    missing = [p for p in tests if not p.exists()]
    if missing:
        sys.exit(f"benchmark test not found: {missing[0]}")

    return runners, tests


def main() -> int:
    parser = argparse.ArgumentParser(
        usage="%(prog)s [options] engine [engine ...] [--] [test.js ...]",
        description=(
            "Benchmark JavaScript engines. "
            "Engines and test files are positional arguments. "
            "Trailing *.js are treated as test scripts (up until optional -- separator). "
            "To pass flags to an engine, quote it: 'engine --flag'. "
            "Multiple engines run in parallel on each test."
        ),
    )
    parser.add_argument("-a", "--append", action="store_true",
                        help="append runs to existing output file")
    parser.add_argument("-C", "--config", action="append", metavar="engine[_variant]",
                        help="runner.json config key to use (one per engine)")
    parser.add_argument("-k", "--keep", action="store_true",
                        help="keep temp directories on success")
    parser.add_argument("-o", "--output", action="append", metavar="file.json",
                        help="output JSON file (one per engine)")
    parser.add_argument("-r", "--reps", action="append", metavar="[basename:]count[s]",
                        help="repetition count or time budget per test, e.g. -r 60s -r zlib.js:10")
    parser.add_argument("-t", "--timeout", type=float, metavar="seconds",
                        help="per-run timeout (overrides runner.json)")
    parser.add_argument("-v", "--verbose", action="store_true",
                        help="print commands as they run")
    parser.add_argument("-7", "--v8-v7", action="store_true",
                        help="run v8-v7 test suite instead of Octane")

    args, rem = parser.parse_known_args()
    runners, tests = create_runners(args, rem)

    run_kwargs = {"v8_v7": args.v8_v7, "keep": args.keep, "verbose": args.verbose}
    reps = RepSpec(args.reps)
    last_write = time.time()
    need_final_compare = False
    current_threads: list[threading.Thread] = []

    try:
        for path in tests:
            basename = path.name
            script = load_test(path)

            while reps.should_run(basename):
                maybe_pause()

                # Shuffle start order each round to reduce systematic bias.
                shuffled = random.sample(runners, len(runners))
                current_threads = [
                    threading.Thread(
                        target=br.run,
                        args=(path, script),
                        kwargs={
                            "timeout": args.timeout or br.cfg.bench_timeout_for_test.get(basename, br.cfg.timeout_sec),
                            **run_kwargs,
                        },
                    )
                    for br in shuffled
                ]
                for th in current_threads:
                    th.start()
                for th in current_threads:
                    th.join()
                current_threads = []

                reps.add(basename, runners[0].last, verbose=args.verbose)
                errors = [br.commit() for br in runners]
                any_error = any(errors)

                if time.time() - last_write >= PERIODIC_SAVE_SECONDS:
                    for br in runners:
                        br.save()
                    last_write = time.time()

                if any_error:
                    break

            for br in runners:
                br.save()
            last_write = time.time()

            if reps.count(basename) > 1 and len(runners) > 1:
                run_compare([br.out for br in runners])
                need_final_compare = False
            else:
                need_final_compare = True

    except KeyboardInterrupt:
        print("Aborting benchmarking", flush=True)
        for br in runners:
            br.kill()
        for th in current_threads:
            th.join()
        return 1

    if need_final_compare:
        run_compare([br.out for br in runners])

    return 0


if __name__ == "__main__":
    sys.exit(main())
