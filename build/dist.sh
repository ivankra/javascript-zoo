#!/bin/bash
# Copies /dist artifacts out of a built image into dist/<arch>/ in the repo.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

ID="${1:-}"
if [[ -z "$ID" ]]; then
  echo "Usage: ./build/dist.sh <id>" >&2
  exit 1
fi

if [[ -z "${DOCKER_ARCH:-}" ]]; then
  DOCKER_ARCH="$(uname -m | sed 's/aarch64/arm64/; s/x86_64/amd64/')"
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

DIST_ROOT="$ROOT_DIR/dist/$DOCKER_ARCH"
CACHE_ROOT="$ROOT_DIR/.cache"
IIDFILE="$CACHE_ROOT/iid/$DOCKER_ARCH/jsz-$ID"
mkdir -p "$DIST_ROOT"
rm -rf "$DIST_ROOT/$ID" "$DIST_ROOT/$ID".* >/dev/null 2>&1 || true

TMPCP="$CACHE_ROOT/dist-tmp-$ID"
CIDFILE=""
rm -rf "$TMPCP"
mkdir -p "$TMPCP"

if [[ "$DOCKER" == "container" ]]; then
  OUTDIR=$(realpath "$TMPCP")
  "$DOCKER" run --rm --arch "$DOCKER_ARCH" --volume "$OUTDIR:/out" "jsz-$ID:$DOCKER_ARCH" /bin/bash -e -c "
if ! [[ -f \"/dist/$ID.json\" || -f \"/dist/parsers/$ID.json\" || -f \"/dist/transpilers/$ID.json\" ]]; then
  ./dist.py \"/dist/$ID\" --rename-variant
fi
mkdir -p /out/dist
cp -a /dist/. /out/dist/
"
else
  CIDFILE="$CACHE_ROOT/cid/$ID"
  mkdir -p "$CACHE_ROOT/cid"

  if [[ -f "$CIDFILE" ]]; then
    "$DOCKER" rm "$(cat "$CIDFILE")" >/dev/null 2>&1 || true
    rm -f "$CIDFILE"
  fi

  "$DOCKER" run --arch "$DOCKER_ARCH" --cidfile="$CIDFILE" "jsz-$ID:$DOCKER_ARCH" /bin/bash -e -c "
if ! [[ -f \"/dist/$ID.json\" || -f \"/dist/parsers/$ID.json\" || -f \"/dist/transpilers/$ID.json\" ]]; then
  ./dist.py \"/dist/$ID\" --rename-variant
fi
"

  CID=$(cat "$CIDFILE")
  "$DOCKER" cp "$CID":/dist "$TMPCP" || \
    (sleep 1 && "$DOCKER" cp "$CID":/dist "$TMPCP") || \
    (sleep 1 && "$DOCKER" cp "$CID":/dist "$TMPCP")

  "$DOCKER" rm "$CID" >/dev/null
  rm -f "$CIDFILE"
fi

rm -rf "$DIST_ROOT/$ID" "$DIST_ROOT/$ID."* "$DIST_ROOT/$ID-dist"

dst_files=()

for subdir in "" parsers/ transpilers/; do
  for src in "$TMPCP/dist/$subdir$ID"*; do
    if [[ -e "$src" ]]; then
      mkdir -p "$DIST_ROOT/$subdir"
      dst="$DIST_ROOT/$subdir$(basename "$src")"
      if [[ -e "$dst" ]]; then
        chmod a+w "$dst"
        rm -rf "$dst"
      fi
      mv -f "$src" "$dst"
      if [[ -f "$dst" ]]; then
        chmod a-w "$dst"
      fi
      if [[ "$dst" == *.jar ]]; then
        chmod a-x "$dst"
      fi
      touch -h "$dst"
      if [[ -d "$dst" ]]; then
        dst_files+=("$dst"/*)
      else
        dst_files+=("$dst")
      fi
    fi
  done
done

ls -ld "${dst_files[@]}"

rm -rf "$TMPCP"
if [[ -n "$CIDFILE" ]]; then
  rm -f "$CIDFILE"
fi

cd "$DIST_ROOT"
(for x in *; do if [[ -f "$x" && -x "$x" && -f $x.json ]]; then echo "$x"; fi; done | sort -V) >LIST

# Optionally, clean up build container's image after a successful build to free up space
if [[ -n "${DIST_REMOVE_IMAGE:-}" && "$DOCKER" != "container" ]]; then
  image_ref=""
  if [[ -s "$IIDFILE" ]]; then
    image_ref="$(cat "$IIDFILE")"
  else
    image_ref="$("$DOCKER" image inspect --format '{{.Id}}' "jsz-$ID:$DOCKER_ARCH" 2>/dev/null || true)"
  fi

  # Remove both engine tags (`jsz-$ID` and `jsz-$ID:$DOCKER_ARCH`) and the
  # image id if available. This targets only the extracted engine image.
  for ref in "jsz-$ID" "jsz-$ID:$DOCKER_ARCH" "$image_ref"; do
    if [[ -n "$ref" ]]; then
      "$DOCKER" image rm -f "$ref" >/dev/null 2>&1 || true
    fi
  done
fi
