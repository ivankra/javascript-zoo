#!/bin/bash
# Downloads binaries from latest GitHub release, builds and pushes Docker Hub image.
# https://hub.docker.com/r/ivankra/javascript-zoo
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -euo pipefail

if [[ "${1:-}" == -* ]]; then
  echo "Usage: $0 [PUSHDEST (e.g. docker.io/ivankra/javascript-zoo)] [TAG or latest]" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOCKER="$(command -v docker 2>/dev/null || command -v podman)"  # prefer docker for `docker buildx --push`
PUSHDEST="${1:-docker.io/ivankra/javascript-zoo}"
TAG="${2:-latest}"
REGISTRY="${PUSHDEST%%/*}"
if [[ "$REGISTRY" == "$PUSHDEST" ]]; then
  REGISTRY="docker.io"
fi

if [[ -z "${DOCKER:-}" ]]; then
  echo "podman or docker is required" >&2
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "gh is required" >&2
  exit 1
fi

if [[ "$TAG" == latest ]]; then
  TAG="$(gh release view --repo ivankra/javascript-zoo --json tagName -q .tagName)"
  if [[ ! "$TAG" =~ ^[0-9]{8}$ ]]; then
    echo "latest release tag is not YYYYMMDD: $TAG" >&2
    exit 1
  fi
fi
echo "Release tag: $TAG"

# Download and repack artifacts from GitHub release into dist/<arch>-$TAG.tar
if ! [[ -f "$ROOT_DIR/dist/amd64-$TAG.tar" && -f "$ROOT_DIR/dist/arm64-$TAG.tar" ]]; then
  TMP_ARTIFACTS="$(mktemp -d /tmp/jsz-hub-assets.XXXXXX)"
  trap 'rm -rf "$TMP_ARTIFACTS"' EXIT
  gh release download "$TAG" --repo ivankra/javascript-zoo --dir "$TMP_ARTIFACTS" --pattern "*.amd64.tar.zst" --pattern "*.arm64.tar.zst"
  for arch in amd64 arm64; do
    if [[ -f "$ROOT_DIR/dist/$arch-$TAG.tar" ]]; then
      continue
    fi
    rm -rf "$ROOT_DIR/dist/$arch"
    mkdir -p "$ROOT_DIR/dist/$arch"
    matched=0
    for f in "$TMP_ARTIFACTS"/*."$arch".tar.zst; do
      if [[ -f "$f" ]]; then
        tar --zstd -xf "$f" -C "$ROOT_DIR/dist/$arch"
        matched=1
      fi
    done
    if (( matched == 0 )); then
      echo "No release assets found for $arch in tag $TAG" >&2
      exit 1
    fi
    (cd "$ROOT_DIR/dist/$arch" && (for x in *; do if [ -f "$x" ] && [ -x "$x" ] && [ -f "$x.json" ]; then echo "$x"; fi; done | sort -V) >LIST)
    (cd "$ROOT_DIR/dist" && tar --owner=root --group=root -c "$arch") >"$ROOT_DIR/dist/$arch-$TAG.tar"
  done
fi

set -x

"$DOCKER" login "$REGISTRY"

if [[ "$DOCKER" == *docker ]]; then
  "$DOCKER" buildx build --platform linux/amd64,linux/arm64 --push \
    -f "$ROOT_DIR/build/jsz-runtime.Dockerfile" \
    -t "$PUSHDEST:runtime" \
    --build-arg BASE=debian:stable \
    "$ROOT_DIR"

  "$DOCKER" buildx build --platform linux/amd64,linux/arm64 --push \
    -f "$ROOT_DIR/build/hub.Dockerfile" \
    -t "$PUSHDEST:$TAG" \
    -t "$PUSHDEST:latest" \
    --build-arg BASE="$PUSHDEST:runtime" \
    --build-arg TAG="$TAG" \
    "$ROOT_DIR"
else
  # podman buildx doesn't support --push, so this is more complicated than it has to be
  for arch in amd64 arm64; do
    "$DOCKER" build --platform "linux/$arch" \
      -t "jsz-runtime-$arch" \
      -f "$ROOT_DIR/build/jsz-runtime.Dockerfile" \
      --build-arg BASE=debian:stable \
      "$ROOT_DIR"

    "$DOCKER" build --platform "linux/$arch" \
      -t "$PUSHDEST:$TAG-$arch" \
      -f "$ROOT_DIR/build/hub.Dockerfile" \
      --build-arg BASE="jsz-runtime-$arch" \
      --build-arg TAG="$TAG" \
      "$ROOT_DIR"

    "$DOCKER" push "$PUSHDEST:$TAG-$arch"
  done

  "$DOCKER" rmi -f "$PUSHDEST:$TAG" >/dev/null 2>&1 || true
  "$DOCKER" manifest rm "$PUSHDEST:$TAG" >/dev/null 2>&1 || true
  "$DOCKER" manifest create "$PUSHDEST:$TAG" "$PUSHDEST:$TAG-amd64" "$PUSHDEST:$TAG-arm64"
  "$DOCKER" manifest push --all "$PUSHDEST:$TAG" "docker://$PUSHDEST:$TAG"

  "$DOCKER" rmi -f "$PUSHDEST:latest" >/dev/null 2>&1 || true
  "$DOCKER" manifest rm "$PUSHDEST:latest" >/dev/null 2>&1 || true
  "$DOCKER" manifest create "$PUSHDEST:latest" "$PUSHDEST:$TAG-amd64" "$PUSHDEST:$TAG-arm64"
  "$DOCKER" manifest push --all "$PUSHDEST:latest" "docker://$PUSHDEST:latest"

  "$DOCKER" rmi -f "$PUSHDEST:$TAG-amd64" "$PUSHDEST:$TAG-arm64" "jsz-runtime-amd64" "jsz-runtime-arm64" >/dev/null 2>&1 || true
fi

# Smoke test: pull the image and run dist.py --smoke-test on every engine in /dist/LIST
"$DOCKER" run --rm "$PUSHDEST:$TAG" \
  bash -c 'set -ex; while read f; do python3 /zoo/build/dist.py --smoke-test "/dist/$f"; done < /dist/LIST'

echo OK
