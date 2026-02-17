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
  echo "Usage: ./build/build.sh <id> <dockerfile> [docker build args...]" >&2
  exit 1
fi

if [[ -z "${DOCKER_ARCH:-}" ]]; then
  DOCKER_ARCH="$(uname -m | sed 's/aarch64/arm64/; s/x86_64/amd64/')"
fi

IID_DIR="$ROOT_DIR/.cache/iid/$DOCKER_ARCH"
DIST_DIR="$ROOT_DIR/dist/$DOCKER_ARCH"

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
  set -- "${filtered[@]}" --build-arg "REPO=$REPO"
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
  set -- "${filtered[@]}" --build-arg "REV=$REV"
  echo "Using REV=$REV override to build $DOCKERFILE"
fi

mkdir -p "$IID_DIR" "$DIST_DIR"
rm -f "$DIST_DIR/$ID.json" "$DIST_DIR/parsers/$ID.json" "$DIST_DIR/transpilers/$ID.json"

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
