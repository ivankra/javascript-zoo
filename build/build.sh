#!/bin/bash
# Wrapper for building container images (podman/docker/container).
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

ID="${1:-}"
DOCKERFILE="${2:-}"
shift $(( $# >= 2 ? 2 : $# ))

if [[ -z "$ID" || -z "$DOCKERFILE" ]]; then
  echo "Usage: build.sh <id> <dockerfile> [docker build args...]" >&2
  exit 1
fi

if [[ -z "${DOCKER_ARCH:-}" ]]; then
  DOCKER_ARCH="$(uname -m | sed 's/aarch64/arm64/; s/x86_64/amd64/')"
fi

IID_DIR="$ROOT_DIR/.cache/iid/$DOCKER_ARCH"

if [[ ! -f "$DOCKERFILE" ]]; then
  echo "build.sh: missing Dockerfile: $DOCKERFILE" >&2
  exit 1
fi

if [[ -z "${DOCKER:-}" ]]; then
  if command -v podman >/dev/null 2>&1; then
    DOCKER=podman
  elif command -v container >/dev/null 2>&1; then
    DOCKER=container
  elif command -v docker >/dev/null 2>&1; then
    DOCKER=docker
  else
    echo "No docker engine found. Install podman, docker, macOS containerization or set DOCKER." >&2
    exit 1
  fi
fi

# Add REPO/REV overrides from environment variables if Dockerfile accepts them.
if [[ -n "${REPO:-}" ]] && grep -Eq '^ARG +REPO=' "$DOCKERFILE"; then
  filtered=()
  skip_next=0
  for a in "$@"; do
    if [[ "$skip_next" == 1 ]]; then
      skip_next=0
      continue
    fi
    if [[ "$a" == "--build-arg" ]]; then
      skip_next=1
      continue
    fi
    if [[ "$a" == --build-arg=REPO=* || "$a" == REPO=* ]]; then
      continue
    fi
    filtered+=("$a")
  done
  if [[ ${#filtered[@]} -gt 0 ]]; then
    set -- "${filtered[@]}" --build-arg "REPO=$REPO"
  else
    set -- --build-arg "REPO=$REPO"
  fi
  echo "Using REPO=$REPO override to build $DOCKERFILE"
fi

if [[ -n "${REV:-}" ]] && grep -Eq '^ARG +REV=' "$DOCKERFILE"; then
  filtered=()
  skip_next=0
  for a in "$@"; do
    if [[ "$skip_next" == 1 ]]; then
      skip_next=0
      continue
    fi
    if [[ "$a" == "--build-arg" ]]; then
      skip_next=1
      continue
    fi
    if [[ "$a" == --build-arg=REV=* || "$a" == REV=* ]]; then
      continue
    fi
    filtered+=("$a")
  done
  if [[ ${#filtered[@]} -gt 0 ]]; then
    set -- "${filtered[@]}" --build-arg "REV=$REV"
  else
    set -- --build-arg "REV=$REV"
  fi
  echo "Using REV=$REV override to build $DOCKERFILE"
fi

base_with_arch() {
  local base="${1:-}"
  [[ -z "$base" ]] && { echo "$base"; return; }
  [[ "$base" == *:* ]] && { echo "$base"; return; }
  echo "$base:$DOCKER_ARCH"
}

# Rewrite incoming args in-place so BASE consistently carries arch suffix.
has_base_arg=0
args=()
while [[ $# -gt 0 ]]; do
  a="$1"; shift
  if [[ "$a" == "--build-arg" && $# -gt 0 ]]; then
    b="$1"; shift
    if [[ "$b" == BASE=* ]]; then has_base_arg=1; b="BASE=$(base_with_arch "${b#BASE=}")"; fi
    args+=("--build-arg" "$b")
    continue
  fi
  if [[ "$a" == --build-arg=BASE=* ]]; then
    has_base_arg=1
    args+=("--build-arg=BASE=$(base_with_arch "${a#--build-arg=BASE=}")")
    continue
  fi
  if [[ "$a" == BASE=* ]]; then
    has_base_arg=1
    args+=("BASE=$(base_with_arch "${a#BASE=}")")
    continue
  fi
  args+=("$a")
done
if [[ ${#args[@]} -gt 0 ]]; then
  set -- "${args[@]}"
fi

if [[ "$has_base_arg" == 0 ]]; then
  # No explicit BASE provided: inherit Dockerfile default ARG BASE=... and pin to arch.
  dockerfile_base="$(sed -nE '/^[[:space:]]*ARG[[:space:]]+BASE=/{s/^[[:space:]]*ARG[[:space:]]+BASE=([^[:space:]]+).*$/\1/p;q;}' "$DOCKERFILE")"
  if [[ -n "$dockerfile_base" ]]; then
    set -- --build-arg "BASE=$(base_with_arch "$dockerfile_base")" "$@"
  fi
fi

mkdir -p "$IID_DIR"

TAG="$ID"
if [[ "$ID" != jsz-* ]]; then
  TAG="jsz-$ID"
fi

if [[ "$DOCKER" != "container" ]]; then
  set -x
  "$DOCKER" build --arch "$DOCKER_ARCH" --iidfile="$IID_DIR/$TAG" -t "$TAG" -t "$TAG:$DOCKER_ARCH" -f "$DOCKERFILE" "$@" "$ROOT_DIR"
else
  set -x
  "$DOCKER" build --arch "$DOCKER_ARCH" -t "$TAG" -t "$TAG:$DOCKER_ARCH" -f "$DOCKERFILE" "$@" "$ROOT_DIR"
  touch "$IID_DIR/$TAG"
fi
