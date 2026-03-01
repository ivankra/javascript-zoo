#!/bin/bash
# Wrapper for building container images (podman/docker/container)
#
# Features:
#   * Autodetects podman/docker/container
#   * Injects DOCKER_REGISTRY and DOCKER_ARG into --build-arg BASE
#   * --print-rev flag for CI/CD
#   * Set DOCKER_PUSH=1 to push built image to DOCKER_REGISTRY
#
# Keep this script bash 3.x compatible for macOS.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

usage() {
  echo "Usage: build.sh [--print-rev] <id> <dockerfile> [<docker build args> ...]" >&2
  exit 1
}

parse_args() {
  PRINT_REV=0

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --print-rev) PRINT_REV=1; shift;;
      -*) usage;;
      *) break;;
    esac
  done

  ID="${1:-}"
  DOCKERFILE="${2:-}"
  if [[ $# -ge 3 ]]; then
    BUILD_ARGS=("${@:3}")
  else
    BUILD_ARGS=()
  fi

  if [[ -z "$ID" || -z "$DOCKERFILE" ]]; then
    usage
  fi

  TAG="$ID"
  if [[ "$ID" != jsz-* ]]; then
    TAG="jsz-$ID"
  fi
}

detect_docker() {
  if [[ -n "${DOCKER:-}" ]]; then
    return 0
  fi
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
}

# Extract the default value for a given ARG from Dockerfile.
dockerfile_arg_default() {
  local key="$1"
  sed -nE "/^ *ARG +$key=/{s/^ *ARG +$key=([^ ]+).*$/\\1/p;q;}" "$DOCKERFILE"
}

# Apply env override (REPO/REV) by replacing any existing matching build-arg.
# Mutates BUILD_ARGS array.
apply_env_build_arg_override() {
  local key="$1"
  local value="$2"
  local -a filtered=()
  local a="" skip_next=0

  [[ -n "$value" ]] || return 0
  grep -Eq "^ARG +$key=" "$DOCKERFILE" || return 0

  for a in "${BUILD_ARGS[@]}"; do
    if [[ "$skip_next" == 1 ]]; then
      skip_next=0
      continue
    fi
    if [[ "$a" == "--build-arg" ]]; then
      skip_next=1
      continue
    fi
    if [[ "$a" == --build-arg="$key="* || "$a" == "$key="* ]]; then
      continue
    fi
    filtered+=("$a")
  done

  if [[ ${#filtered[@]} -gt 0 ]]; then
    BUILD_ARGS=("${filtered[@]}" --build-arg "$key=$value")
  else
    BUILD_ARGS=(--build-arg "$key=$value")
  fi

  if [[ "$PRINT_REV" != 1 ]]; then
    echo "Using $key=$value override to build $DOCKERFILE" >&2
  fi
}

resolve_build_arg() {
  local key="$1"
  shift
  local value="" a="" b=""

  while [[ $# -gt 0 ]]; do
    a="$1"
    shift

    if [[ "$a" == "--build-arg" && $# -gt 0 ]]; then
      b="$1"
      shift
      if [[ "$b" == "$key="* ]]; then
        value="${b#"$key="}"
      fi
      continue
    fi

    if [[ "$a" == --build-arg="$key="* ]]; then
      value="${a#--build-arg=$key=}"
      continue
    fi

    if [[ "$a" == "$key="* ]]; then
      value="${a#"$key="}"
    fi
  done

  echo "$value"
}

# Print git revision to be built without running docker build.
# Doesn't resolve to git commit hash.
print_rev() {
  local repo rev
  local parts=()
  repo="$(resolve_build_arg REPO "${BUILD_ARGS[@]}")"
  rev="$(resolve_build_arg REV "${BUILD_ARGS[@]}")"
  [[ -n "$repo" ]] || repo="$(dockerfile_arg_default REPO)"
  [[ -n "$rev" ]] || rev="$(dockerfile_arg_default REV)"
  if [[ -n "$repo" ]]; then
    parts+=("REPO=$repo")
  fi
  if [[ -n "$rev" ]]; then
    parts+=("REV=$rev")
  fi
  echo "$ID: ${parts[*]}"
}

# Expand base image name with DOCKER_REGISTRY and DOCKER_ARCH
rewrite_base() {
  local base="${1:-}"
  [[ -z "$base" ]] && { echo "$base"; return; }
  if [[ -n "${DOCKER_REGISTRY:-}" && "$base" == jsz-* ]]; then
    base="$DOCKER_REGISTRY/$base"
  fi
  [[ "$base" == *:* ]] && { echo "$base"; return; }
  echo "$base:$DOCKER_ARCH"
}

# Set/update --build-arg BASE parameter
set_base_build_arg() {
  local -a out=()
  local a="" b=""
  local has_base_arg=0

  while [[ ${#BUILD_ARGS[@]} -gt 0 ]]; do
    a="${BUILD_ARGS[0]}"
    BUILD_ARGS=("${BUILD_ARGS[@]:1}")

    if [[ "$a" == "--build-arg" && ${#BUILD_ARGS[@]} -gt 0 ]]; then
      b="${BUILD_ARGS[0]}"
      BUILD_ARGS=("${BUILD_ARGS[@]:1}")
      if [[ "$b" == BASE=* ]]; then
        has_base_arg=1
        b="BASE=$(rewrite_base "${b#BASE=}")"
      fi
      out+=("--build-arg" "$b")
      continue
    fi

    if [[ "$a" == --build-arg=BASE=* ]]; then
      has_base_arg=1
      out+=("--build-arg=BASE=$(rewrite_base "${a#--build-arg=BASE=}")")
      continue
    fi

    if [[ "$a" == BASE=* ]]; then
      has_base_arg=1
      out+=("BASE=$(rewrite_base "${a#BASE=}")")
      continue
    fi

    out+=("$a")
  done

  if [[ ${#out[@]} -gt 0 ]]; then
    BUILD_ARGS=("${out[@]}")
  else
    BUILD_ARGS=()
  fi

  if [[ "$has_base_arg" == 0 ]]; then
    # No explicit BASE provided: inherit Dockerfile default ARG BASE=... and pin to arch.
    local dockerfile_base="$(dockerfile_arg_default BASE)"
    if [[ -n "$dockerfile_base" ]]; then
      if [[ ${#BUILD_ARGS[@]} -gt 0 ]]; then
        BUILD_ARGS=(--build-arg "BASE=$(rewrite_base "$dockerfile_base")" "${BUILD_ARGS[@]}")
      else
        BUILD_ARGS=(--build-arg "BASE=$(rewrite_base "$dockerfile_base")")
      fi
    fi
  fi
}

push_built_image() {
  if [[ -z "${DOCKER_REGISTRY:-}" ]]; then
    echo "build.sh: DOCKER_PUSH=1 requires DOCKER_REGISTRY to be set" >&2
    exit 1
  fi

  local remote_tag="$DOCKER_REGISTRY/$TAG:$DOCKER_ARCH"
  "$DOCKER" tag "$TAG:$DOCKER_ARCH" "$remote_tag"
  "$DOCKER" push "$remote_tag"
}

parse_args "$@"

if [[ ! -f "$DOCKERFILE" ]]; then
  echo "build.sh: file doesn't exist: $DOCKERFILE" >&2
  exit 1
fi

if [[ -z "${DOCKER_ARCH:-}" ]]; then
  DOCKER_ARCH="$(uname -m | sed 's/aarch64/arm64/; s/x86_64/amd64/')"
fi

IID_DIR="$ROOT_DIR/.cache/iid/$DOCKER_ARCH"

apply_env_build_arg_override REPO "${REPO:-}"
apply_env_build_arg_override REV "${REV:-}"
set_base_build_arg

if [[ "$PRINT_REV" == 1 ]]; then
  print_rev
  exit 0
fi

detect_docker
mkdir -p "$IID_DIR"

if [[ "$DOCKER" != "container" ]]; then
  (set -x; "$DOCKER" build --arch "$DOCKER_ARCH" --iidfile="$IID_DIR/$TAG" -t "$TAG" -t "$TAG:$DOCKER_ARCH" -f "$DOCKERFILE" "${BUILD_ARGS[@]}" "$ROOT_DIR")
else
  (set -x; "$DOCKER" build --arch "$DOCKER_ARCH" -t "$TAG" -t "$TAG:$DOCKER_ARCH" -f "$DOCKERFILE" "${BUILD_ARGS[@]}" "$ROOT_DIR")
  touch "$IID_DIR/$TAG"
fi

if [[ "${DOCKER_PUSH:-}" == 1 ]]; then
  push_built_image
fi
