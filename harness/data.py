# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import dataclasses
import json
from enum import StrEnum
from pathlib import Path
from typing import TYPE_CHECKING, Any, ClassVar, TypedDict, cast

if TYPE_CHECKING:
    from .tags import Tags


_FIELDS_CACHE: dict[type, frozenset[str]] = {}


def _fields(cls: type) -> frozenset[str]:
    cached = _FIELDS_CACHE.get(cls)
    if cached is None:
        cached = frozenset(f.name for f in dataclasses.fields(cls))
        _FIELDS_CACHE[cls] = cached
    return cached


class Verdict(StrEnum):
    """Test outcome classification."""

    PASS = "PASS"
    # Didn't run the test due to some filter
    SKIP = "SKIP"
    # Every verdict other than PASS/SKIP means a failure.
    FAIL = "FAIL"    # unclassified/generic error, Error exception, missing PASS marker
    CRASH = "CRASH"  # killed by a signal or runtime panic
    TIMEOUT = "TIMEOUT"
    OOM = "OOM"
    # Non-zero exit code (low priority, only given when no better error type fits)
    EXIT = "EXIT"
    # Standard JavaScript exception types
    SYNTAX_ERROR = "SyntaxError"
    REFERENCE_ERROR = "ReferenceError"
    TYPE_ERROR = "TypeError"
    EVAL_ERROR = "EvalError"
    RANGE_ERROR = "RangeError"
    URI_ERROR = "URIError"
    INTERNAL_ERROR = "InternalError"
    AGGREGATE_ERROR = "AggregateError"
    SUPPRESSED_ERROR = "SuppressedError"
    # Test262Error exception (assertion failure, etc)
    TEST262_ERROR = "Test262Error"
    # Negative test passed or threw an unexpected error
    NEGATIVE = "NOT"
    # Got "Test262: This statement should not be evaluated."
    # Usually a negative syntax test that didn't get rejected.
    DONOTEVALUATE = "DONOTEVALUATE"
    # Missing "Test262:AsyncTestComplete" marker
    NO_ASYNC_TEST_COMPLETE = "NoAsyncTestComplete"
    # Got "Test262:AsyncTestFailure:..."
    ASYNC_TEST_FAILURE = "AsyncTestFailure"


class PerModeTestResult(TypedDict, total=False):
    sloppy: str
    strict: str


# A single test verdict: bare string "<Verdict>[: <detail>]" e.g. "PASS", "ReferenceError: foo",
# for single-mode test or if runs in both modes had identical result, or a per-mode dict.
TestResult = str | PerModeTestResult


@dataclasses.dataclass
class RunRusage:
    """Normalized process resource usage metrics.

    Populated from resource.getrusage(RUSAGE_CHILDREN) deltas.
    Fields are None when the measurement was not available.
    """
    user_time: float | None = None
    sys_time: float | None = None
    real_time: float | None = None
    max_rss_kb: int | None = None
    io_in_blocks: int | None = None
    io_out_blocks: int | None = None
    ctx_switches_voluntary: int | None = None
    ctx_switches_involuntary: int | None = None

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> RunRusage:
        return cls(**{k: v for k, v in data.items() if k in _fields(cls)})

    def to_json(self) -> dict[str, Any]:
        data: dict[str, Any] = {}
        for field in dataclasses.fields(self):
            value = getattr(self, field.name)
            if value is None:
                continue
            if field.name in ("user_time", "sys_time", "real_time"):
                value = round(value, 3)
            data[field.name] = value
        return data


@dataclasses.dataclass
class RunResult:
    """Single script execution outcome plus post-classification fields.

    Produced by Runner.run_command() and optionally refined by Annotator.classify().
    """
    # Staging-path identifier for reports (includes .mjs rename, .strict/.sloppy suffix).
    run_id: str | None = None
    # Original test file path relative to test root (discovery key, e.g. "test/foo.js").
    # Used for grouping runs by file.  Defaults to run_id when not explicitly set.
    test_id: str | None = None
    # Test outcome classification.
    # Mostly populated by Annotator, with some runtime errors by Runner.
    verdict_type: Verdict | None = None
    # Human-readable one-line explanation. None when verdict_type is self-explanatory.
    verdict_detail: str | None = None
    # Shell-renderable command string for reproducibility/debugging.
    command: str | None = None
    cwd: str | None = None
    # Original captured process streams
    stdout: str | None = None
    stderr: str | None = None
    # Refined output streams with engine-specific cleanups applied by Clasifier
    stdout_cleaned: str | None = None
    stderr_cleaned: str | None = None
    # Concrete runnable script path passed to the engine
    # (usually a temp file containing the test code after preprocessing).
    script_path: str | None = None
    # Absolute path to the original test file (e.g. file in the checked out test262 tree).
    test_path: str | None = None
    # Raw subprocess return code; negative means terminated by signal (-N → signal N).
    exit_code: int | None = None
    # Process group leader pid for the engine process tree.
    pid: int | None = None
    # Resource usage metrics from rusage.
    rusage: RunRusage = dataclasses.field(default_factory=RunRusage)
    # Benchmark-specific numeric scores extracted from output.
    benchmarks: dict[str, int | float | None] = dataclasses.field(default_factory=dict)
    tags: Tags | None = None
    # Execution mode: "strict" or "sloppy" (test262).
    mode: str = ""
    # Weight for compat-table's weighted pass rate calculation.
    weight: float | None = None

    def print_streams(self) -> None:
        """Print stdout and stderr with stream-prefixed lines."""
        for line in (self.stdout or "").rstrip().splitlines():
            print(f"  stdout> {line}")
        for line in (self.stderr or "").rstrip().splitlines():
            print(f"  stderr> {line}")

    def combined_output(self) -> str:
        """Merge stdout and stderr into a single string for parsing."""
        out = self.stdout_cleaned if self.stdout_cleaned is not None else (self.stdout or "")
        err = self.stderr_cleaned if self.stderr_cleaned is not None else (self.stderr or "")
        if not err:
            return out
        if not out:
            return err
        sep = "" if out.endswith("\n") else "\n"
        return f"{err}{sep}{out}"

    def is_passed(self) -> bool:
        return self.verdict_type is Verdict.PASS

    def is_skipped(self) -> bool:
        return self.verdict_type is Verdict.SKIP

    def is_failed(self) -> bool:
        return self.verdict_type not in (None, Verdict.PASS, Verdict.SKIP)

    def coarse_verdict(self) -> Verdict | None:
        if self.verdict_type is None:
            return None
        return Verdict.FAIL if self.is_failed() else self.verdict_type

    def verdict_message(self) -> str:
        """Render verdict plus optional error detail as a compact status string."""
        if self.verdict_type is None:
            return ""
        assert self.verdict_detail != "PASS"
        status = str(self.verdict_type)
        if not self.verdict_detail:
            return status
        if self.verdict_type is Verdict.NEGATIVE:
            assert self.verdict_detail and self.verdict_detail.startswith("NOT(")
            return self.verdict_detail
        return f"{status}: {self.verdict_detail}"

    def to_dict(self) -> dict[str, Any]:
        d = dataclasses.asdict(self)
        if d.get("verdict_type") is not None:
            d["verdict_type"] = str(d["verdict_type"])
        return d

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> RunResult:
        allowed = {f.name for f in dataclasses.fields(cls)}
        compat_fields = {"verdict", "error_type", "error_message"}
        unknown = sorted(set(data) - allowed - compat_fields)
        if unknown:
            raise ValueError(f"unknown RunResult fields: {unknown}")
        try:
            values = {k: data[k] for k in allowed if k in data}
            if "verdict_type" not in values:
                if data.get("error_type") is not None:
                    values["verdict_type"] = data["error_type"]
                elif data.get("verdict") is not None:
                    values["verdict_type"] = data["verdict"]
            if "verdict_detail" not in values and data.get("error_message") is not None:
                values["verdict_detail"] = data["error_message"]
            if values.get("verdict_type") is not None:
                raw_verdict = str(values["verdict_type"])
                if raw_verdict == "OK":
                    raw_verdict = str(Verdict.PASS)
                values["verdict_type"] = Verdict(raw_verdict)
            if "rusage" in values and isinstance(values["rusage"], dict):
                values["rusage"] = RunRusage.from_dict(values["rusage"])
            return cls(**values)
        except (TypeError, ValueError) as e:
            raise ValueError(f"invalid RunResult data: {e}") from e


@dataclasses.dataclass
class StatsDict:
    """Aggregated test pass statistics (e.g. per directory or tag)."""
    passed: int = 0
    failed: int = 0
    skipped: int = 0
    pass_percent: float | None = None
    weight: float | None = None
    weighted_pass_percent: float | None = None

    _COMPAT: ClassVar[dict[str, str]] = {"pass": "passed", "fail": "failed", "skip": "skipped"}

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> StatsDict:
        normalized = {cls._COMPAT.get(k, k): v for k, v in data.items()}
        return cls(**{k: v for k, v in normalized.items() if k in _fields(cls)})

    def to_dict(self) -> dict[str, Any]:
        return {f.name: v for f in dataclasses.fields(self) if (v := getattr(self, f.name))}


class BinaryInfo(TypedDict, total=False):
    """Engine binary metadata, usually loaded from sidecar .json file."""
    arch: str
    binary_name: str  # always populated even without sidecar file
    binary_sha256: str
    binary_size: int
    dist_size: int
    engine: str
    repository: str
    revision: str
    revision_date: str
    version: str
    console_log: str | list[str]
    cc: str
    dotnet: str
    go: str
    jdk: str
    jit: str
    loc: int
    rustc: str
    sources: str
    standard: str
    zig: str
    v8_build_config: dict[str, str]


@dataclasses.dataclass
class GitRevisionInfo:
    """Git repository revision metadata."""
    repository: str | None = None
    revision: str | None = None
    revision_date: str | None = None
    revision_dirty: bool | None = None

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> GitRevisionInfo:
        return cls(**{k: v for k, v in data.items() if k in _fields(cls)})

    def to_dict(self) -> dict[str, Any]:
        return {f.name: v for f in dataclasses.fields(self) if (v := getattr(self, f.name))}


@dataclasses.dataclass
class BenchmarkResult:
    """Aggregated results of multiple runs for a single benchmark."""
    score: list[int | float] = dataclasses.field(default_factory=list)
    error: str | None = None
    user: list[float] = dataclasses.field(default_factory=list)
    sys: list[float] = dataclasses.field(default_factory=list)
    real: list[float] = dataclasses.field(default_factory=list)
    rss_mb: list[float] = dataclasses.field(default_factory=list)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> BenchmarkResult:
        return cls(**{k: v for k, v in data.items() if k in _fields(cls)})

    def to_dict(self) -> dict[str, Any]:
        return {f.name: v for f in dataclasses.fields(self) if (v := getattr(self, f.name))}


@dataclasses.dataclass
class Report:
    """Top-level conformance/bench .json report document."""
    binary: BinaryInfo | None = None
    flags: list[str] = dataclasses.field(default_factory=list)
    probes: dict[str, str] = dataclasses.field(default_factory=dict)
    test262: GitRevisionInfo | None = None
    summary: dict[str, StatsDict] = dataclasses.field(default_factory=dict)
    tags: dict[str, StatsDict] = dataclasses.field(default_factory=dict)
    dirs: dict[str, StatsDict] = dataclasses.field(default_factory=dict)
    rusage: dict[str, Any] = dataclasses.field(default_factory=dict)  # TODO: schema
    tests: dict[str, TestResult] = dataclasses.field(default_factory=dict)
    scenarios: dict[str, str] = dataclasses.field(default_factory=dict)
    # Benchmarking data
    time: str | None = None  # TODO: cleanup/unify with conformance
    benchmarks: dict[str, BenchmarkResult] = dataclasses.field(default_factory=dict)

    _INLINE_DICT_KEYS: ClassVar[frozenset[str]] = frozenset({
        "pass", "passed", "pass_percent", "weight", "weighted_pass_percent",
        "fail", "failed", "skip", "skipped", "strict", "sloppy", "if", "then",
        "else", "shell", "user_time", "sys_time", "real_time", "max_rss_kb",
        "io_in_blocks", "io_out_blocks", "ctx_switches_voluntary",
        "ctx_switches_involuntary"
    })
    _INLINE_VALUE_KEYS: ClassVar[frozenset[str]] = frozenset({"console_log"})

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Report:
        if isinstance(data.get("metadata"), dict):
            # Compat: old benchmark results used top-level binary/metadata/time fields.
            metadata = data.get("metadata")
            assert isinstance(metadata, dict)
            binary: BinaryInfo = cast(BinaryInfo, metadata)
            binary.setdefault("binary_name", data["binary"])
            data = {k: v for k, v in data.items() if k not in ("binary", "metadata")}
            data["binary"] = binary

        binary_data = data.get("binary")
        test262 = data.get("test262")
        bm = data.get("benchmarks")
        passthrough = _fields(cls) - {"binary", "test262", "benchmarks", "summary", "tags", "dirs"}

        def stats_map(d: Any) -> dict[str, StatsDict]:
            return {k: StatsDict.from_dict(v) for k, v in d.items()} if isinstance(d, dict) else {}

        return cls(
            binary=cast(BinaryInfo, binary_data) if isinstance(binary_data, dict) else None,
            test262=GitRevisionInfo.from_dict(test262) if isinstance(test262, dict) else None,
            benchmarks={k: BenchmarkResult.from_dict(v) for k, v in bm.items()} if isinstance(bm, dict) else {},
            summary=stats_map(data.get("summary")),
            tags=stats_map(data.get("tags")),
            dirs=stats_map(data.get("dirs")),
            **{k: v for k, v in data.items() if k in passthrough},
        )

    def to_dict(self) -> dict[str, Any]:
        result: dict[str, Any] = {}
        for f in dataclasses.fields(self):
            v = getattr(self, f.name)
            if v is None or v == [] or v == {}:
                continue
            if isinstance(v, dict) and v and hasattr(next(iter(v.values())), "to_dict"):
                result[f.name] = {k: vv.to_dict() for k, vv in v.items()}
            else:
                result[f.name] = v.to_dict() if hasattr(v, "to_dict") else v
        return result

    def add_benchmark_run(self, run: RunResult, *, default_time: str) -> None:
        """Append one benchmark run's metrics into this report."""
        if not self.time:
            self.time = default_time

        error = run.verdict_message() if run.is_failed() else None
        for key, score in run.benchmarks.items():
            entry = self.benchmarks.setdefault(key, BenchmarkResult())
            if error:
                entry.error = error
            if score is not None:
                entry.score.append(score)
            if run.rusage.user_time is not None:
                entry.user.append(round(run.rusage.user_time, 4))
            if run.rusage.sys_time is not None:
                entry.sys.append(round(run.rusage.sys_time, 4))
            if run.rusage.real_time is not None:
                entry.real.append(round(run.rusage.real_time, 4))
            if run.rusage.max_rss_kb is not None:
                entry.rss_mb.append(round(run.rusage.max_rss_kb / 1024.0, 2))

    @classmethod
    def _is_inline_json(cls, value: Any) -> bool:
        if not isinstance(value, dict) or not value:
            return False
        return set(value.keys()) <= cls._INLINE_DICT_KEYS

    @classmethod
    def _is_inline_list(cls, value: Any) -> bool:
        return isinstance(value, list) and all(not isinstance(item, dict | list) for item in value)

    @classmethod
    def format_json_value(cls, value: Any, indent: int = 0) -> str:
        """Recursively format JSON; compact simple dicts and scalar lists onto one line."""
        pad = "  " * indent
        inner = "  " * (indent + 1)
        if isinstance(value, dict):
            if not value or cls._is_inline_json(value):
                return json.dumps(value, ensure_ascii=False)
            items = [
                f'{inner}{json.dumps(k, ensure_ascii=False)}: '
                f'{json.dumps(v, ensure_ascii=False) if k in cls._INLINE_VALUE_KEYS else cls.format_json_value(v, indent + 1)}'
                for k, v in value.items()
            ]
            return "{\n" + ",\n".join(items) + "\n" + pad + "}"
        if isinstance(value, list):
            if cls._is_inline_list(value):
                return json.dumps(value, ensure_ascii=False)
            items = [f"{inner}{cls.format_json_value(v, indent + 1)}" for v in value]
            return "[\n" + ",\n".join(items) + "\n" + pad + "]"
        return json.dumps(value, ensure_ascii=False)

    def to_text(self) -> str:
        """Format the report as JSON using the repository's canonical layout."""
        return self.format_json_value(self.to_dict()) + "\n"

    @classmethod
    def load(cls, path: Path) -> Report:
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise ValueError(f"expected JSON object: {path}")
        return cls.from_dict(data)
