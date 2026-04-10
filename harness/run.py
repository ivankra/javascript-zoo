#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import os
import re
import sys
import tempfile
from pathlib import Path
from typing import Any, Callable, cast

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from harness import Annotator, EngineConfig, FileDiscovery, PoolExecutor, PoolWorker, Reporter, RunResult, Runner, Tags
from harness.util import HelpFormatter

CONFORMANCE_DIR = REPO_ROOT / "conformance"
PRELUDE_CONSOLE_JS = REPO_ROOT / "harness/prelude-console.js"


_COMPAT_TABLE_HEADER_RE = re.compile(r"^// compat-table: (.*)")
_COMPAT_TABLE_GROUP_RE = re.compile(r"^(.*) \((tiny|small|medium|large)\) > .*")
_COMPAT_TABLE_SIZE = {"tiny": 1, "small": 2, "medium": 4, "large": 8}


def compute_compat_table_weights(test_files: list[str], root: Path) -> dict[str, float]:
    """Parse compat-table headers from test files, compute per-file weights.

    Two-pass: first counts group members, then assigns weight = group_size / group_count.
    Files without a group marker get weight 1.
    """
    # Parse headers
    file_headers: dict[str, str] = {}
    for rel in test_files:
        if not rel.startswith("compat-table/"):
            continue
        path = root / rel
        with open(path, encoding="utf-8", errors="replace") as f:
            for line in f:
                m = _COMPAT_TABLE_HEADER_RE.match(line)
                if m:
                    file_headers[rel] = m.group(1)
                    break
                if not line.startswith(("//", "#!")):
                    break

    # Pass 1: count group members
    groups: dict[str, list[str]] = {}
    ungrouped: list[str] = []
    for rel, header in file_headers.items():
        m = _COMPAT_TABLE_GROUP_RE.match(header)
        if m:
            groups.setdefault(m.group(1), []).append(rel)
        else:
            ungrouped.append(rel)

    # Pass 2: assign weights
    weights: dict[str, float] = {}
    for rel, header in file_headers.items():
        m = _COMPAT_TABLE_GROUP_RE.match(header)
        if not m:
            weights[rel] = 1
        else:
            group_name = m.group(1)
            group_weight = _COMPAT_TABLE_SIZE[m.group(2)]
            weights[rel] = group_weight / len(groups[group_name])

    return weights


class ConformanceWorker(PoolWorker):
    def __init__(self, cfg: EngineConfig, on_spawn: Callable[[int], None]) -> None:
        super().__init__(on_spawn)
        self.cfg = cfg
        self.runner = Runner(cfg, on_spawn=on_spawn)
        self.annotator = Annotator(cfg)

    def run(self, task: Any) -> list[RunResult]:
        test_id, weight = cast(tuple[str, float | None], task)
        test_path = CONFORMANCE_DIR / test_id
        console_log = self.cfg.console_log or ["console.log"]
        if type(console_log) is str:
            console_log = [console_log]

        if "console.log" in console_log and not self.cfg.requires_tmp_staging:
            run = self.runner.run_command(
                self.cfg.argv(test_path),
                run_id=test_id,
                test_path=str(test_path),
                script_path=str(test_path),
            )
        elif "print" in console_log and self.cfg.multiple_scripts_with_shared_realm is True and not self.cfg.requires_tmp_staging:
            run = self.runner.run_command(
                self.cfg.argv(PRELUDE_CONSOLE_JS, test_path),
                run_id=test_id,
                test_path=str(test_path),
                script_path=str(test_path),
            )
        else:
            source = test_path.read_text(encoding="utf-8", errors="replace")
            source = source.replace("console.log", console_log[0])
            with tempfile.TemporaryDirectory(prefix="conf-") as td:
                patched = Path(td) / test_path.name
                patched.write_text(source, encoding="utf-8")
                run = self.runner.run_command(
                    self.cfg.argv(patched),
                    run_id=test_id,
                    test_path=str(test_path),
                    script_path=str(patched),
                )

        pass_pattern = rf"{re.escape(test_path.name)}: OK"
        fail_pattern = rf"{re.escape(test_path.name)}: (?:failed|exception)"
        self.annotator.classify(
            run,
            pass_pattern=pass_pattern,
            fail_pattern=fail_pattern,
            strip_line_prefix=f"{test_id}: ",
        )

        tags = Tags()
        tags.add_folders(test_id)
        run.tags = tags
        if weight is not None:
            run.weight = weight
        return [run]


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Run conformance suites for a JS engine.",
        formatter_class=HelpFormatter,
    )
    parser.add_argument("engine", help="Engine binary path or name")
    parser.add_argument("suites", nargs="*", help="Suite dirs/globs (default: from config)")
    parser.add_argument("-o", "--output", help="Write results to file")
    parser.add_argument("-c", "--config", help="Force a specific config entry from config.yml (normally inferred from binary basename)")
    parser.add_argument("-j", "--jobs", type=int, default=None, metavar="N",
                        help=f"Run N jobs in parallel (default: {os.cpu_count()})")
    parser.add_argument("-v", "--verbose", action="count", default=0, help="Increase verbosity")
    parser.add_argument("-t", "--timeout", type=float, metavar="SEC", help="Per-test timeout in seconds")
    parser.add_argument("--shuffle", action="store_true", default=False,
                        help="Randomize test execution order")
    parser.add_argument(
        "--json", action=argparse.BooleanOptionalAction, default=None, dest="report_json",
        help="Enable JSON output; default autodetects from -o suffix")

    args = parser.parse_args()

    cfg = EngineConfig.load(args.engine, config_name=args.config)
    cfg.resolve()
    if args.timeout is not None:
        cfg.timeout_sec = args.timeout

    # Resolve test files from suites or config defaults.
    suites = args.suites or list(cfg.conformance_suite)
    discovery = FileDiscovery(suites, root=CONFORMANCE_DIR, shuffle=args.shuffle)
    tests = discovery.files
    if not tests:
        sys.exit(f"No conformance tests found for patterns: {suites}")

    reporter = Reporter(
        cfg,
        discovery=discovery,
        output_file=args.output,
        verbose=args.verbose,
        report_json=args.report_json,
        report_dirs=True,
    )
    multi_dir = len(set(os.path.dirname(rel) for rel in tests)) >= 2
    if multi_dir:
        reporter.set_expected_dirs()

    weights = compute_compat_table_weights(tests, CONFORMANCE_DIR)
    items = ((rel, (rel, weights.get(rel))) for rel in tests)

    pool = PoolExecutor(
        max_workers=cfg.job_count(flag=args.jobs),
        worker_cls=ConformanceWorker,
        worker_args=(cfg,),
    )

    try:
        for file_results in pool.imap(items, on_started=reporter.test_started):
            reporter.test_completed(file_results)
            if not args.verbose and multi_dir:
                reporter.print_completed_dirs()
    except KeyboardInterrupt:
        sys.exit("\nAborted")
    finally:
        pool.stop()

    reporter.clear_progress()

    # Flush any dir summaries not yet printed (verbose mode defers them to the end).
    if multi_dir:
        reporter.print_completed_dirs(header=args.verbose >= 1)

    reporter.print_summary()

    if args.output:
        reporter.write()


if __name__ == "__main__":
    main()
