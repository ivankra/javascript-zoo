# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import json
import os
import shlex
import shutil
import subprocess
import sys
from functools import cache
from pathlib import Path
from typing import Any

import yaml
SafeLoader: Any = getattr(yaml, "CSafeLoader", yaml.SafeLoader)

REPO_ROOT = Path(__file__).parent.parent.parent
CONFIGS_YML = REPO_ROOT / "configs.yml"


@dataclasses.dataclass
class EngineConfig:
    """Engine invocation configuration, shared between all runs.

    Created via EngineConfig.load(), which handles binary resolution,
    sidecar JSON loading, and merging with runner_config.
    """

    # --- Invocation ---
    binary_path: str | None = None
    # Flags always prepended before the script path.
    # Items may be str, {"shell": "..."} (expanded via bash), or list[str] (flattened).
    # Call resolve() to expand these to plain list[str] before use.
    flags: list[str | dict[str, str] | list] = dataclasses.field(default_factory=list)
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
    # Whether multiple script args are supported and share one JS realm.
    multiple_scripts_with_shared_realm: bool | None = None

    # --- Process defaults ---
    timeout_sec: float = 30.0
    cwd: str | None = None
    env: dict[str, str] = dataclasses.field(default_factory=dict)
    output_limit: int = 1000000

    # --- Output classification ---
    # In order of priority
    # Post-run output substitutions applied by Arbiter: {regex: replacement}.
    # Use "" to drop matching text. Patterns are compiled with re.MULTILINE:
    # ^ and $ match line boundaries; . does not match \n; explicit \n works.
    # Accepts either {regex: repl, ...} or [{regex: repl}, {regex: repl}, ...].
    stdout_replace_re: dict[str, str] | list[dict[str, str]] = dataclasses.field(default_factory=dict)
    stderr_replace_re: dict[str, str] | list[dict[str, str]] = dataclasses.field(default_factory=dict)
    # Regex for crash strings from language runtime (Java, Go etc)
    crash_re: list[str] = dataclasses.field(default_factory=list)
    # Warning lines to skip (false positives for errors_re)
    warnings_re: list[str] = dataclasses.field(default_factory=list)
    # Structured patterns for errors/exceptions with named groups "type" and "message"
    errors_re: list[str] = dataclasses.field(default_factory=list)

    # --- Bench mode ---
    bench_suite: list[str] = dataclasses.field(default_factory=list)
    # Bench-only flags. If set (even to []), override `flags` in bench.py.
    bench_flags: list[str | dict[str, str] | list] | None = None
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
    test262_flags: list[str | dict[str, str] | list] | None = None
    # Default test262 feature skips for this engine. CLI --skip-features overrides.
    test262_skip_features: list[str] = dataclasses.field(default_factory=list)

    @property
    def name(self) -> str:
        return Path(self.binary_path).name if self.binary_path else ""

    def resolve(self) -> None:
        """Expand shell items and flatten nested lists in all flags fields in-place.

        Shell items: {"shell": "bash command"} — run via bash -c with $BINARY set.
        Each non-empty output line becomes one flag.
        Nested lists are flattened recursively.
        Safe to call multiple times (no-op on already-resolved list[str]).
        """
        binary = self.binary_path or ""
        for attr in ("flags", "test262_flags", "bench_flags"):
            val = getattr(self, attr)
            if val is not None:
                setattr(self, attr, _resolve_flags_list(val, binary))

    def argv(self, *args: Path | str, module: bool = False, mode: str = "") -> list[str]:
        """Build execution argv: binary + selected flags [+ module_flag] + positional args."""
        cmd = [str(self.binary_path)]
        if mode == "bench" and self.bench_flags is not None:
            flags = self.bench_flags
        elif mode == "test262" and self.test262_flags is not None:
            flags = self.test262_flags
        else:
            flags = self.flags
        for flag in flags:
            if not isinstance(flag, str):
                raise RuntimeError(f"unresolved flag {flag!r} in argv(); call resolve() first")
        cmd.extend(flags)  # type: ignore[arg-type]
        if module and self.module_flag:
            cmd.append(self.module_flag)
        cmd.extend(str(arg) for arg in args)
        return cmd

    @staticmethod
    def get_configs() -> dict[str, Any]:
        return load_configs_dict()

    @staticmethod
    def load(path_or_cmd: str, *, config_name: str | None = None) -> EngineConfig:
        """Resolve binary, load sidecar build_metadata, merge with configs YAML."""
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

        configs = EngineConfig.get_configs()
        cfg = configs.get("default", {})
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



def _resolve_flags_list(items: list, binary_path: str) -> list[str]:
    """Recursively expand shell items and flatten nested lists to list[str]."""
    result: list[str] = []
    for item in items:
        if isinstance(item, str):
            result.append(item)
        elif isinstance(item, list):
            result.extend(_resolve_flags_list(item, binary_path))
        elif isinstance(item, dict) and "shell" in item:
            env = {**os.environ, "BINARY": binary_path}
            try:
                proc = subprocess.run(
                    ["bash", "-c", item["shell"]],
                    env=env,
                    capture_output=True,
                    text=True,
                    timeout=30,
                )
            except Exception as e:
                sys.exit(f"shell flag expansion failed: {e}")
            result.extend(line for line in proc.stdout.splitlines() if line.strip())
        else:
            sys.exit(f"unexpected flags item: {item!r}")
    return result




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
    if p.is_absolute():
        return p
    return Path.cwd() / p


@cache
def load_configs_dict() -> dict[str, Any]:
    """Load and return engine configs from YAML. Exits on error."""
    yaml_path = CONFIGS_YML
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
