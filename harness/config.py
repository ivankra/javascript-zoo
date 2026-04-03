# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import json
import os
import re
import shlex
import shutil
import subprocess
import sys
from functools import cache
from pathlib import Path
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .tags import Tags

from .tags import FilterExpr

import yaml
SafeLoader: Any = getattr(yaml, "CSafeLoader", yaml.SafeLoader)

REPO_ROOT = Path(__file__).parent.parent
CONFIGS_YML = Path(__file__).parent / "config.yml"


@dataclasses.dataclass
class Prelude:
    """Prelude snippet, optionally gated on a tag."""
    # Inline prelude snippet or file content (loaded by EngineConfig.resolve())
    code: str | None = None
    # Prelude file path relative to repo root
    file: str | None = None
    # If set, only include this prelude when the named tag is present
    if_tag: str | None = None


@dataclasses.dataclass
class EngineConfig:
    """Engine invocation configuration, shared between all runs.

    Created via EngineConfig.load(), which handles binary resolution,
    sidecar JSON loading, and merging with runner_config.
    """

    # --- Invocation ---
    binary_path: str | None = None
    # Raw sidecar metadata from <binary>.json kept for reporting/persistence.
    # Fields are promoted up into EngineConfig during loading.
    build_metadata: dict[str, Any] = dataclasses.field(default_factory=dict)
    # Flags prepended before the script path.
    # Specified as a nested tree resolved by resolve_flags():
    # - list: resolved recursively and flattened
    # - str: literal flag
    # - {"if": tag, "then": tree, "else": tree}:
    #   conditional branch on a per-test tag (see tags.py)
    # - {"shell": cmd}: run via bash and tokenized, essentially $(...).
    #   May use $BINARY var to refer to the engine binary.
    #   Intended for grepping advertised flags from `$BINARY --help`.
    #   Shell substitutions are expanded once at startup, not per test.
    flags: list = dataclasses.field(default_factory=list)

    # --- Promoted sidecar fields ---
    # Print function name - "console.log", "print", etc.
    # Can be a list if multiple functions are available.
    console_log: str | list[str] = dataclasses.field(default_factory=list)
    # Engine base name from build_metadata (e.g. "quickjs").
    engine: str = ""
    # Whether multiple script args are supported and share one JS realm.
    multiple_scripts_with_shared_realm: bool | None = None
    # Always stage javascript code to be run by the engine in /tmp
    requires_tmp_staging: bool = False

    # --- Process defaults ---
    timeout_sec: float = 60.0
    memory_limit_mb: int | None = None
    memory_addr_limit_mb: int | None = None
    cwd: str | None = None
    env: dict[str, str] = dataclasses.field(default_factory=dict)
    output_limit: int = 1000000

    # --- Output classification ---
    # Post-run output cleanups to be applied by Annotator: {regex: replacement}.
    # Patterns are run against the whole stdout/stderr input and compiled
    # with re.MULTILINE: ^ and $ match line boundaries; . does not match \n;
    # explicit \n works.
    # Accepts either {regex: repl, ...} or [{regex: repl}, {regex: repl}, ...]
    # for YAML templating convenience.
    # Use "" as a replacement to drop matching text.
    # Note: replacements run before ok/fail detection and errors_re matching,
    # so prefer doing noisy wrapper cleanup here first.
    stdout_replace_re: dict[str, str] | list[dict[str, str]] = dataclasses.field(default_factory=dict)
    stderr_replace_re: dict[str, str] | list[dict[str, str]] = dataclasses.field(default_factory=dict)
    # Regex for crash strings from the language runtime (Java, Go etc).
    # If matches stdout or stderr, run will be classified as ErrorType.CRASHED with
    # the text captured by the "message" group as error_message.
    crash_re: list[str] = dataclasses.field(default_factory=list)
    # Structured patterns for errors/exceptions with named groups "type" and "message".
    # Currently these are ran against each individual line of the combined
    # stdout/stderr, one line after another - first line with errors wins.
    # Order matters - first regex to match against the current line wins.
    # "type" group should capture standard JavaScript error name / one of
    # ErrorType enum values, else it'll map to uninformative ErrorType.GENERIC.
    # Advise: try to match stable terminal exception lines (e.g. "TypeError: ..."),
    # not traceback scaffolding; use *_replace_re to strip traceback boilerplate,
    # normalize multi-line exceptions to one-liners, normalize exception names,
    # silence false positive warning lines etc.
    errors_re: list[str] = dataclasses.field(default_factory=list)
    # Exit code to map to SyntaxError (needed for nashorn)
    exit_code_for_syntax_error: int | None = None
    # Exit code to accept for Test262Error in negative test262 case
    # Needed for some engines that don't properly format user-defined exceptions
    exit_code_for_test262_error: int | None = None
    ignore_sigabrt: bool = False

    # Prelude snippets. List of dicts, resolved by resolve() into list[Prelude].
    # Use tag "bench" / "test262" to gate preludes by execution mode.
    #   {"file": "path"}            → unconditional file (relative to repo root)
    #   {"code": "..."}             → unconditional inline JS
    #   {"if": "X", "file": "path"} → conditional file (when tag X present)
    #   {"if": "X", "code": "..."}  → conditional inline JS
    prelude: list[Prelude] = dataclasses.field(default_factory=list)

    # --- Bench mode ---
    bench_suite: list[str] = dataclasses.field(default_factory=list)
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
    # Default test262 filter expression for this engine.
    # See test262.py --filter; if flag is specified it takes precedence.
    test262_filter: str = ""

    @property
    def name(self) -> str:
        return Path(self.binary_path).name if self.binary_path else ""

    def resolve(self) -> None:
        """Expand shell items, flatten nested lists, and resolve preludes in-place.

        Shell items: {"shell": "bash command"} — run via bash -c with $BINARY set.
        Each non-empty output line becomes one flag.
        Nested lists are flattened recursively.
        Safe to call multiple times (no-op on already-resolved fields).
        """
        env = {**os.environ, "BINARY": str(self.binary_path) or ""}
        self.flags = resolve_flags(self.flags, expand_shell=True, env=env)
        if self.prelude and not isinstance(self.prelude[0], Prelude):
            self.prelude = resolve_preludes(self.prelude)

    def argv(self, *args: Path | str, tags: Tags | None = None) -> list[str]:
        """Build execution argv: binary + flags + positional args.

        Conditional flags ({"if": ..., "then": ..., ["else": ...]}) are evaluated
        using *tags*.  Nesting is supported: branch values may be str, list[str],
        or another {"if":...} dict.
        """
        cmd = [str(self.binary_path)]
        resolved = resolve_flags(self.flags, expand_if=True, tags=tags)
        cmd.extend(str(f) for f in resolved)
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
            for key in [re.split(r"[_.]", binary.name, 1)[0], binary.name]:
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



def resolve_flags(
    flags: list,
    *,
    expand_if: bool = False,
    expand_shell: bool = False,
    env: dict[str, str] | None = None,
    tags: Tags | None = None,
) -> list[str | dict]:
    """Recursively resolve a flags list.

    * Always flattens nested lists.
    * expand_if: evaluate {"if": ..., "then": ..., "else": ...} conditionals
      using *tags*; the chosen branch is recursively resolved.
      The "if" value is a FilterExpr (see tags.py) boolean expression over tags.
    * expand_shell: expand {"shell": "..."} items via bash, tokenising output
      with shlex.split (empty tokens dropped, quoting respected).
      *env* is passed as the subprocess environment (caller should set BINARY etc.).
      When expand_shell is set but expand_if is not, shell items inside
      if/then/else branches are expanded while the conditional structure is kept.
    """
    result: list[str | dict] = []
    for item in flags:
        if isinstance(item, str):
            result.append(item)
        elif isinstance(item, list):
            result.extend(resolve_flags(item, expand_shell=expand_shell, expand_if=expand_if, env=env, tags=tags))
        elif isinstance(item, dict) and "shell" in item:
            if expand_shell:
                try:
                    proc = subprocess.run(
                        ["bash", "-c", item["shell"]],
                        env=env, capture_output=True, text=True, timeout=30,
                    )
                except Exception as e:
                    sys.exit(f"shell flag expansion failed: {e}")
                result.extend(shlex.split(proc.stdout))
            else:
                result.append(item)
        elif isinstance(item, dict) and "if" in item and "then" in item:
            if expand_if:
                if tags is not None and FilterExpr.eval(item["if"], tags):
                    branch = item["then"]
                elif "else" in item:
                    branch = item["else"]
                else:
                    continue
                branch_list = branch if isinstance(branch, list) else [branch]
                result.extend(resolve_flags(branch_list, expand_shell=expand_shell, expand_if=expand_if, env=env, tags=tags))
            else:
                resolved: dict[str, Any] = {"if": item["if"]}
                for key in ("then", "else"):
                    if key not in item:
                        continue
                    v = item[key]
                    v_list = v if isinstance(v, list) else [v]
                    r = resolve_flags(v_list, expand_shell=expand_shell, expand_if=False, env=env, tags=tags)
                    resolved[key] = r[0] if len(r) == 1 else r
                result.append(resolved)
        else:
            sys.exit(f"unexpected flags item: {item!r}")
    return result


def resolve_preludes(items: list) -> list[Prelude]:
    """Resolve a prelude config list to a list of Prelude.

    Each item is a dict with:
      {"file": path}                → unconditional file (relative to repo root)
      {"code": "..."}               → unconditional inline
      {"if": name, "file": path}    → conditional file
      {"if": name, "code": "..."}   → conditional inline

    File content containing $SOURCE gets the eshost inception trick applied:
    $SOURCE is replaced with a JSON-quoted copy of itself.
    """
    result: list[Prelude] = []
    for item in items:
        tag = item.get("if")
        if "file" in item:
            path = str(item["file"])
            code = (REPO_ROOT / path).read_text(encoding="utf-8")
            if "$SOURCE" in code:
                inner = code.replace("$SOURCE", '""', 1)
                code = code.replace("$SOURCE", json.dumps(inner), 1)
            result.append(Prelude(code=code, file=path, if_tag=tag))
        elif "code" in item:
            result.append(Prelude(code=item["code"], if_tag=tag))
        else:
            raise TypeError(f"prelude dict must have 'file' or 'code', got {item!r}")
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
