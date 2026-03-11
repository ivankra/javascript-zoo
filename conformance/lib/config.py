# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import json
import os
import shlex
import shutil
import sys
from functools import cache
from pathlib import Path
from typing import Any

import yaml
SafeLoader: Any = getattr(yaml, "CSafeLoader", yaml.SafeLoader)


@dataclasses.dataclass
class EngineConfig:
    """Engine invocation configuration, shared between all runs.

    Created via EngineConfig.load(), which handles binary resolution,
    sidecar JSON loading, and merging with runner_config.
    """

    # --- Invocation ---
    binary_path: str | None = None
    # Flags always prepended before the script path.
    flags: list[str] = dataclasses.field(default_factory=list)
    # Extra flag appended after flags, before the script path, in module mode only.
    module_flag: str | None = None
    # Raw sidecar metadata from <binary>.json kept for reporting/persistence.
    # Fields are promoted up into EngineConfig during loading.
    build_metadata: dict[str, Any] = dataclasses.field(default_factory=dict)

    # --- Promoted sidecar fields ---
    # Print function name detected at build time ("console.log" or "print", etc).
    console_log: str = ""
    # Engine base name from build_metadata (e.g. "quickjs").
    engine: str = ""
    # Whether multiple script args share one JS realm/process, use isolated runs, or are unsupported.
    multiple_scripts: str | None = None

    # --- Process defaults ---
    timeout_sec: float = 30.0
    cwd: str | None = None
    env: dict[str, str] = dataclasses.field(default_factory=dict)
    output_limit: int = 1000000

    # --- Output classification ---
    # In order of priority
    # Post-run output substitutions: {regex: replacement}. Use "" to drop matching text.
    stdout_replace_re: dict[str, str] = dataclasses.field(default_factory=dict)
    stderr_replace_re: dict[str, str] = dataclasses.field(default_factory=dict)
    # High-priority structured exception patterns with named groups "type" and "message".
    exceptions_re: list[str] = dataclasses.field(default_factory=list)
    # Warning lines pattern (to filter false positives for errors_re)
    warnings_re: list[str] = dataclasses.field(default_factory=list)
    # Low-priority generic error patterns
    errors_re: list[str] = dataclasses.field(default_factory=list)

    # --- Bench mode ---
    bench_suite: list[str] = dataclasses.field(default_factory=list)
    # Bench-only flags. If set (even to []), override `flags` in bench.py.
    bench_flags: list[str] | None = None
    # JS prelude snippets prepended to each benchmark script.
    # None = use mode default (prelude-print.js); [] = no prelude; [...] = use these.
    # Each item is either an inline JS string or {"file": "path/relative/to/repo"}.
    bench_prelude: list[str | dict[str, str]] | None = None
    bench_transforms: list[str] = dataclasses.field(default_factory=list)
    # Per-test timeout overrides (seconds), keyed by benchmark basename.
    bench_timeout_for_test: dict[str, float] = dataclasses.field(default_factory=dict)
    bench_ignore_errors: bool = False

    # --- Conformance mode ---
    conformance_suite: list[str] = dataclasses.field(default_factory=lambda: [
        "es[1-5]",
        "compat-table/es6",
        "compat-table/es20[0-9][0-9]",
    ])
    conformance_jobs: int = 8

    # --- test262 mode ---
    # JS prelude injected before harness includes.
    # Either inline JS string or {"file": "path"} dict.
    test262_prelude: str | dict[str, str] | None = None
    # Test262-only flags. If set (even to []), override `flags` in test262.py.
    test262_flags: list[str] | None = None
    # Default test262 feature skips for this engine. CLI --skip-features overrides.
    test262_skip_features: list[str] = dataclasses.field(default_factory=list)

    @property
    def name(self) -> str:
        return Path(self.binary_path).name if self.binary_path else ""

    def argv(self, *args: Path | str, module: bool = False, mode: str = "") -> list[str]:
        """Build execution argv: binary + selected flags [+ module_flag] + positional args."""
        cmd = [str(self.binary_path)]
        if mode == "bench" and self.bench_flags is not None:
            cmd.extend(self.bench_flags)
        elif mode == "test262" and self.test262_flags is not None:
            cmd.extend(self.test262_flags)
        else:
            cmd.extend(self.flags)
        if module and self.module_flag:
            cmd.append(self.module_flag)
        cmd.extend(str(arg) for arg in args)
        return cmd

    @staticmethod
    def get_configs() -> dict[str, Any]:
        return load_configs_dict()

    @staticmethod
    def load(path_or_cmd: str, *, config_name: str | None = None) -> EngineConfig:
        """Resolve binary, load sidecar build_metadata, merge with configs YAML.

        Merge order (later wins):
          configs[engine] → configs[engine_variant] → build_metadata
        """
        args = shlex.split(path_or_cmd)
        if not args:
            raise SystemExit("empty engine spec")

        binary = resolve_binary(args[0])
        cmd_flags = args[1:]

        build_metadata: dict[str, Any] = {}
        json_path = binary.parent / (binary.name + ".json")
        if json_path.exists():
            try:
                raw = json.loads(json_path.read_text(encoding="utf-8"))
                if isinstance(raw, dict):
                    build_metadata = raw
            except Exception:
                pass

        # Priority for config merging:
        #  * config.yml[defaults] (lowest-priority defaults)
        #  * config.yml[<engine>]
        #  * config.yml[<engine>_<variant>]
        #  * build_metadata (highest-priority overrides)
        configs = EngineConfig.get_configs()
        cfg = configs.get("defaults", {})
        if config_name:
            if config_name not in configs:
                raise SystemExit(f"unknown config: {config_name}")
            cfg = {**cfg, **configs[config_name]}
        else:
            for key in [binary.name.split("_", 1)[0], binary.name]:
                if key and key in configs:
                    cfg = {**cfg, **configs[key]}
        cfg = {**cfg, **build_metadata}

        field_names = {field.name for field in dataclasses.fields(EngineConfig)}
        cfg = {key: value for key, value in cfg.items() if key in field_names}
        cfg["binary_path"] = str(binary)
        cfg["build_metadata"] = build_metadata
        if cmd_flags:
            cfg["flags"] = cmd_flags
        return EngineConfig(**cfg)


def resolve_binary(path_or_name: str) -> Path:
    """Resolve engine binary: relative/absolute path or bare name via PATH."""
    if "/" in path_or_name:
        p = Path(path_or_name)
    else:
        found = shutil.which(path_or_name)
        p = Path(found) if found else Path(path_or_name)
    if not p.exists():
        raise SystemExit(f"{path_or_name}: not found")
    if not os.access(p, os.X_OK):
        raise SystemExit(f"{path_or_name}: not executable")
    return p.resolve()


@cache
def load_configs_dict() -> dict[str, Any]:
    """Load and return engine configs from YAML. Exits on error."""
    script_dir = Path(__file__).parent
    yaml_path = script_dir / "config.yml"
    if not yaml_path.exists():
        sys.exit(f"Error: {yaml_path} doesn't exists")
    try:
        result = yaml.load(yaml_path.read_text(encoding="utf-8"), Loader=SafeLoader)
    except yaml.YAMLError as e:
        sys.exit(f"Failed to parse {yaml_path.name}: {e}")
    if not isinstance(result, dict):
        sys.exit(f"{yaml_path}: expected a mapping at top level")
    result = {k: v for k, v in result.items() if k != "_anchors"}
    if not all(isinstance(k, str) for k in result):
        sys.exit(f"{yaml_path}: expected string keys at top level")
    return result


if __name__ == "__main__":
    print(json.dumps(load_configs_dict(), indent=2))
