#!/usr/bin/env python3
# Run inside build container at the end of build to finish packaging:
# strips and copies binary or creates bash wrapper, writes /dist/engine.json
# with given key=value pairs, git metadata etc.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import argparse
import glob
import hashlib
import json
import os
import shutil
import stat
import subprocess
import sys
import tempfile
from pathlib import Path


NUMERIC_META_KEYS = {"binary_size", "dist_size", "loc"}
LICENSE_GLOBS = [
    "LICENSE*",
    "COPYING*",
    "COPYRIGHT*",
    "*[Ll]icense*.txt",
    "*[Ll]icenses",
    "*[Ll]icense",
    "*_LICENSE*",
    "NOTICE*",
    "*NOTICE*.txt",
    "*[Nn]otice*.txt",
]


def fail(msg: str) -> None:
    print(f"dist.py: {msg}", file=sys.stderr)
    raise SystemExit(1)


def arch_name() -> str:
    m = os.uname().machine
    if m == "x86_64":
        return "amd64"
    if m == "aarch64":
        return "arm64"
    return m


def parse_args(
    argv: list[str],
) -> tuple[
    Path,
    Path | None,
    str | None,
    list[str],
    list[str],
    bool,
    bool,
    dict[str, str],
]:
    p = argparse.ArgumentParser(
        prog="./dist.py",
        usage="./dist.py /dist/<engine> [--binary=<path>] [--wrapper=<cmd>] [--license=<path> ...] [--dist_files=<path> ...] [--no-license] [run_script_cmd='<cmd>'] [key=value ...]",
    )
    p.add_argument("out", help="output path, must be under /dist")
    p.add_argument("meta", nargs="*", help="metadata entries as key=value")
    p.add_argument("--binary", dest="binary")
    p.add_argument("--wrapper", dest="wrapper")
    p.add_argument("--license", dest="licenses", action="append", default=[])
    p.add_argument("--dist_files", dest="dist_files", action="append", default=[])
    p.add_argument("--no-license", action="store_true", dest="no_license")
    p.add_argument("--rename-variant", action="store_true", dest="rename_variant")

    ns = p.parse_args(argv)

    out = Path(ns.out)
    if not str(out).startswith("/dist/"):
        fail(f"output path must be under /dist, got: {out}")

    meta: dict[str, str] = {}
    for token in ns.meta:
        if "=" not in token:
            fail(f"metadata must be key=value, got: {token}")
        k, v = token.split("=", 1)
        if not k:
            fail("metadata key cannot be empty")
        meta[k.replace("-", "_")] = v

    binary = Path(ns.binary) if ns.binary else None
    return (
        out,
        binary,
        ns.wrapper,
        ns.licenses,
        ns.dist_files,
        ns.no_license,
        ns.rename_variant,
        meta,
    )


def dist_json_candidates() -> list[Path]:
    out: list[Path] = []
    for p in sorted(Path("/dist").glob("*.json")):
        if p.name.startswith("jsz_"):
            continue
        out.append(p)
    return out


def rename_variant(out: Path) -> None:
    out_json = Path(str(out) + ".json")
    if out.exists() or out_json.exists():
        return

    jsons = dist_json_candidates()
    if len(jsons) != 1:
        fail(
            "expected exactly one /dist/*.json artifact for --rename-variant, "
            f"found {len(jsons)}"
        )

    src_json = jsons[0]
    src = Path(str(src_json)[: -len(".json")])
    if not src.exists():
        fail(f"missing packaged file for {src_json}: {src}")

    out.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(src), str(out))
    shutil.move(str(src_json), str(out_json))

    src_license = Path(str(src) + ".LICENSE")
    out_license = Path(str(out) + ".LICENSE")
    if src_license.exists():
        shutil.move(str(src_license), str(out_license))

    src_dist = src.parent / f"{src.name}-dist"
    out_dist = out.parent / f"{out.name}-dist"
    if src_dist.is_dir() and not out_dist.exists():
        shutil.move(str(src_dist), str(out_dist))

    if out_json.exists():
        try:
            doc = json.loads(out_json.read_text(encoding="utf-8"))
        except Exception as e:
            fail(f"failed to parse {out_json}: {e}")
        if not isinstance(doc, dict):
            fail(f"expected JSON object in {out_json}")
        if "_" in out.name:
            engine, variant = out.name.split("_", 1)
            doc["engine"] = engine
            doc["variant"] = variant
        else:
            doc["engine"] = out.name
            doc.pop("variant", None)
        out_json.write_text(
            json.dumps(doc, ensure_ascii=True, sort_keys=True, indent=2) + "\n",
            encoding="utf-8",
        )


def has_shebang(path: Path) -> bool:
    try:
        with path.open("rb") as f:
            return f.read(2) == b"#!"
    except Exception:
        return False


def should_strip(path: Path) -> bool:
    return path.is_file() and os.access(path, os.X_OK) and not has_shebang(path) and not str(path).startswith("/dist/")


def strip_or_copy(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    if should_strip(src):
        subprocess.run(["strip", "-o", str(dst), str(src)], check=True)
    elif src.resolve() != dst.resolve():
        shutil.copy2(src, dst)
    if dst.exists():
        mode = dst.stat().st_mode
        dst.chmod(mode | stat.S_IRUSR | stat.S_IXUSR | stat.S_IRGRP | stat.S_IXGRP | stat.S_IROTH | stat.S_IXOTH)


def ensure_world_rx(path: Path) -> None:
    if not path.exists():
        return
    mode = path.stat().st_mode
    path.chmod(
        mode
        | stat.S_IRUSR
        | stat.S_IXUSR
        | stat.S_IRGRP
        | stat.S_IXGRP
        | stat.S_IROTH
        | stat.S_IXOTH
    )


def build_wrapper(path: Path, wrapper_exec_line: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    content = "\n".join(
        [
            "#!/bin/bash",
            'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")',
            wrapper_exec_line,
            "",
        ]
    )
    path.write_text(content, encoding="utf-8")
    ensure_world_rx(path)


def write_combined_license(license_file: Path, paths: list[Path]) -> None:
    if not paths:
        return
    license_file.parent.mkdir(parents=True, exist_ok=True)
    existing = [p for p in paths if p.is_file()]
    multi = len(existing) > 1
    with license_file.open("wb") as out:
        for i, p in enumerate(existing):
            if multi:
                if i > 0:
                    out.write(b"\n")
                out.write(f"==> {p} <==\n".encode("utf-8"))
            data = p.read_bytes()
            out.write(data)
            if multi and not data.endswith(b"\n"):
                out.write(b"\n")


def detect_license_sources(explicit: list[str]) -> list[Path]:
    if explicit:
        found: list[Path] = []
        for pattern in explicit:
            matches = sorted(glob.glob(pattern))
            if not matches:
                fail(f"--license glob matched nothing: {pattern}")
            matched_file = False
            for p in matches:
                pp = Path(p)
                if not pp.exists():
                    fail(f"--license match does not exist: {pp}")
                if not pp.is_file():
                    fail(f"--license match is not a file: {pp}")
                matched_file = True
                if pp not in found:
                    found.append(pp)
            if not matched_file:
                fail(f"--license glob has no file matches: {pattern}")
        return found

    env_license = os.environ.get("LICENSE", "")
    if env_license:
        return [Path(env_license)]

    env_licenses = os.environ.get("LICENSES", "")
    if env_licenses:
        return [Path(x) for x in env_licenses.split() if x.strip()]

    found: list[Path] = []
    for pattern in LICENSE_GLOBS:
        for p in sorted(glob.glob(pattern)):
            pp = Path(p)
            if pp.is_file() and pp not in found:
                found.append(pp)
    return found


def maybe_git_metadata(meta: dict[str, str]) -> None:
    if not Path(".git").exists():
        return
    try:
        if "revision" not in meta:
            meta["revision"] = subprocess.check_output(
                ["git", "rev-parse", "HEAD"], text=True
            ).strip()
        if "revision_date" not in meta:
            meta["revision_date"] = subprocess.check_output(
                ["git", "log", "-1", "--format=%ad", "--date=short", "HEAD"],
                text=True,
            ).strip()
        if "repository" not in meta:
            meta["repository"] = subprocess.check_output(
                ["git", "remote", "get-url", "origin"], text=True
            ).strip()
        if "version" not in meta:
            described = subprocess.run(
                ["git", "describe", "--tags", "HEAD"],
                text=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.DEVNULL,
                check=False,
            )
            if described.returncode == 0:
                meta["version"] = described.stdout.strip().removeprefix("v")
    except Exception:
        return


def load_jsz_files(meta: dict[str, str]) -> None:
    for base in (Path("."), Path("/dist")):
        if not base.exists():
            continue
        for p in sorted(base.glob("jsz_*")):
            if p.is_file():
                key = p.name[len("jsz_") :]
                meta.setdefault(key, p.read_text(encoding="utf-8").strip())


def default_engine_variant(meta: dict[str, str], out: Path) -> None:
    name = out.name
    if "engine" not in meta:
        meta["engine"] = name.split("_", 1)[0]
    if "variant" not in meta and "_" in name:
        meta["variant"] = name.split("_", 1)[1]
    meta.setdefault("arch", arch_name())


def tree_size(path: Path) -> int:
    try:
        out = subprocess.check_output(["du", "-sbL", str(path)], text=True).strip()
        return int(out.split()[0])
    except Exception:
        total = 0
        for root, dirs, files in os.walk(path, followlinks=True):
            root_path = Path(root)
            for name in files:
                try:
                    total += (root_path / name).stat().st_size
                except OSError:
                    continue
            for name in dirs:
                try:
                    total += (root_path / name).stat().st_size
                except OSError:
                    continue
        return total


def default_size_meta(meta: dict[str, str], out: Path) -> None:
    engine = out.name.split("_", 1)[0]
    for dist_dir in (out.parent / f"{engine}-dist", out.parent / f"{out.name}-dist"):
        if dist_dir.is_dir():
            meta["dist_size"] = str(tree_size(dist_dir))
            meta.pop("binary_size", None)
            return

    if "dist_size" in meta or "binary_size" in meta or not out.exists():
        return

    if has_shebang(out):
        meta["dist_size"] = str(out.stat().st_size)
        return

    meta["binary_size"] = str(out.stat().st_size)


def set_dist_size_from_files(meta: dict[str, str], specs: list[str]) -> None:
    if not specs:
        return

    seen: set[Path] = set()
    total = 0
    for spec in specs:
        matches = [Path(p) for p in sorted(glob.glob(spec))]
        if not matches:
            pp = Path(spec)
            if pp.exists():
                matches = [pp]
            else:
                fail(f"--dist_files entry matched nothing: {spec}")
        for p in matches:
            if p in seen:
                continue
            seen.add(p)
            if p.is_dir():
                total += tree_size(p)
            elif p.is_file():
                total += p.stat().st_size
            else:
                fail(f"--dist_files path is neither file nor directory: {p}")

    meta["dist_size"] = str(total)
    meta.pop("binary_size", None)


def finalize_json(out: Path, meta: dict[str, str]) -> None:
    cooked: dict[str, object] = {}
    for k, v in meta.items():
        if k in NUMERIC_META_KEYS:
            try:
                cooked[k] = int(v)
            except ValueError:
                cooked[k] = v
        else:
            cooked[k] = v
    out.with_suffix(out.suffix + ".json").write_text(
        json.dumps(cooked, ensure_ascii=True, sort_keys=True, indent=2) + "\n",
        encoding="utf-8",
    )


def _has_line_with_substring(text: str, needle: str) -> bool:
    return any(needle in line for line in text.splitlines())


def probe_console_log_function(binary_path: Path, run_script_cmd: str | None) -> str:
    command = run_script_cmd if run_script_cmd else "$BINARY $FILE"
    attempts: list[tuple[str, str, str]] = []
    expected = "hello world"

    with tempfile.TemporaryDirectory(prefix="jsz-dist-") as tmp:
        for func in ["console.log", "print"]:
            source = f'{func}("hello" + " world");\n'
            script = Path(tmp) / f"{func.replace('.', '_')}.js"
            script.write_text(source, encoding="utf-8")

            env = os.environ.copy()
            env["BINARY"] = str(binary_path)
            env["FILE"] = str(script)

            try:
                proc = subprocess.run(
                    ["bash", "-c", command],
                    text=True,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    env=env,
                    check=False,
                )
            except Exception:
                continue

            attempts.append((func, proc.stdout, proc.stderr))
            on_stdout = _has_line_with_substring(proc.stdout, expected)
            on_stderr = _has_line_with_substring(proc.stderr, expected)
            if on_stdout and not on_stderr:
                return func
            if on_stderr and not on_stdout:
                return func

    print(
        f"dist.py: could not detect console.log/print for {binary_path}",
        file=sys.stderr,
    )
    for name, out, err in attempts:
        print(f"dist.py: probe {name} stdout:", file=sys.stderr)
        print(out, file=sys.stderr, end="" if out.endswith("\n") else "\n")
        print(f"dist.py: probe {name} stderr:", file=sys.stderr)
        print(err, file=sys.stderr, end="" if err.endswith("\n") else "\n")

    fail(f"could not detect console.log/print for {binary_path}")


def maybe_link_to_dist_out(dist_out: Path) -> None:
    if dist_out.parent != Path("/dist"):
        return
    link = Path.cwd() / dist_out.name
    if link.exists():
        return
    link.symlink_to(dist_out)


def main() -> None:
    (
        dist_out,
        binary,
        wrapper,
        explicit_licenses,
        dist_files,
        no_license,
        do_rename_variant,
        meta,
    ) = parse_args(sys.argv[1:])
    run_script_cmd = meta.get("run_script_cmd")

    if binary is not None and not binary.exists():
        fail(f"binary does not exist: {binary}")

    Path("/dist").mkdir(parents=True, exist_ok=True)

    if do_rename_variant:
        rename_variant(dist_out)
        return

    if binary is not None:
        strip_or_copy(binary, dist_out)

    if wrapper is not None:
        build_wrapper(dist_out, wrapper)

    if binary is None and wrapper is None and not dist_out.exists():
        fail(f"missing output file: {dist_out}; pass --binary=<path> or --wrapper=...")
    ensure_world_rx(dist_out)
    maybe_link_to_dist_out(dist_out)

    license_dst = Path(str(dist_out) + ".LICENSE")
    if not license_dst.exists():
        write_combined_license(license_dst, detect_license_sources(explicit_licenses))
    if not no_license and not license_dst.exists():
        fail(f"missing license file: {license_dst} (pass --license=<path> or --no-license)")

    set_dist_size_from_files(meta, dist_files)
    default_size_meta(meta, dist_out)
    load_jsz_files(meta)
    if dist_out.exists() and not has_shebang(dist_out):
        sha = hashlib.sha256(dist_out.read_bytes()).hexdigest()
        meta.setdefault("binary_sha256", sha)
    maybe_git_metadata(meta)
    default_engine_variant(meta, dist_out)
    if dist_out.parent == Path("/dist") and "console_log" not in meta:
        meta["console_log"] = probe_console_log_function(dist_out, run_script_cmd)
    finalize_json(dist_out, meta)


if __name__ == "__main__":
    main()
