#!/bin/bash
# Print makefile dependencies for a docker build target.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

ID="${1:-}"
DOCKERFILE="${2:-}"
shift $(( $# >= 2 ? 2 : $# ))

if [[ -z "$ID" || -z "$DOCKERFILE" ]]; then
  echo "Usage: ./build/deps.sh <id> <dockerfile> [docker build args...]" >&2
  exit 1
fi

if [[ -z "${DOCKER_ARCH:-}" ]]; then
  DOCKER_ARCH="$(uname -m | sed 's/aarch64/arm64/; s/x86_64/amd64/')"
fi

IID_DIR="$ROOT_DIR/.cache/iid/$DOCKER_ARCH"
ARGS=("$@")

if [[ ! -f "$DOCKERFILE" ]]; then
  echo "deps.sh: missing Dockerfile: $DOCKERFILE" >&2
  exit 1
fi

collect_copy_deps() {
  local df="$1"
  awk '
    BEGIN { OFS="\n" }
    /^[[:space:]]*COPY[[:space:]]/ {
      n = split($0, a, /[[:space:]]+/)
      src_count = 0
      skip_next = 0
      for (i = 2; i <= n; i++) {
        t = a[i]
        if (t == "") continue
        if (skip_next == 1) { skip_next = 0; continue }
        if (t == "--from") { skip_next = 1; continue }
        if (t ~ /^--/) continue
        src[++src_count] = t
      }
      for (i = 1; i < src_count; i++) print src[i]
      delete src
    }
  ' "$df"
}

collect_jsz_deps_from_args() {
  printf '%s\n' "$*" | grep -Eo -- '--build-arg(=|[[:space:]]+)BASE=jsz-[-a-z0-9._]+' | sed -E 's/.*BASE=(jsz-[-a-z0-9._]+)/\1/' || true
}

collect_jsz_copy_deps() {
  grep -Eo '^COPY --from=jsz-[-a-z0-9._]+' "$1" | sed 's/^COPY --from=//' || true
}

collect_jsz_base_deps() {
  local df="$1" explicit_base_arg="$2"
  if [[ "$explicit_base_arg" == 0 ]]; then
    grep -Eo '^ARG BASE=jsz-[-a-z0-9._]+' "$df" | sed 's/^ARG BASE=//' || true
  fi
}

abs_path() {
  perl -MFile::Spec -e 'print File::Spec->canonpath(File::Spec->rel2abs($ARGV[0], $ARGV[1])), "\n"' \
    "$1" "${2:-$PWD}"
}

deps=("$ROOT_DIR/build/build.sh" "$ROOT_DIR/build/deps.sh" "$ROOT_DIR/build/build.mk" "$DOCKERFILE")
dockerfile_dir="$(cd "$(dirname "$DOCKERFILE")" && pwd)"
[[ -f "$dockerfile_dir/Makefile" ]] && deps+=("$dockerfile_dir/Makefile")

while IFS= read -r src; do
  [[ -n "$src" ]] || continue
  [[ "$src" == /* ]] && continue
  [[ "$src" == http://* || "$src" == https://* ]] && continue
  if [[ -e "$ROOT_DIR/$src" ]]; then
    deps+=("$(abs_path "$src" "$ROOT_DIR")")
  else
    deps+=("$(abs_path "$src" "$dockerfile_dir")")
  fi
done < <(collect_copy_deps "$DOCKERFILE")

explicit_base_arg=0
if printf '%s\n' "$*" | grep -Eq -- '--build-arg(=|[[:space:]]+)BASE='; then
  explicit_base_arg=1
fi

while IFS= read -r dep; do
  [[ -n "$dep" ]] || continue
  deps+=("$IID_DIR/$dep")
done < <(
  {
    # COPY --from=jsz-* must always be built locally; build.sh does not rewrite them.
    collect_jsz_copy_deps "$DOCKERFILE"
    # ARG BASE=jsz-* are rewritten to registry URLs by build.sh when DOCKER_REGISTRY
    # is set, so skip their iid deps — except for toolchain builds where ordering matters.
    if [[ -z "${DOCKER_REGISTRY:-}" || "$(basename "$DOCKERFILE")" == jsz-*.Dockerfile ]]; then
      collect_jsz_deps_from_args "$*"
      collect_jsz_base_deps "$DOCKERFILE" "$explicit_base_arg"
    fi
  } | awk '!x[$0]++'
)

printf '%s\n' "${deps[@]}" | awk '!x[$0]++'
