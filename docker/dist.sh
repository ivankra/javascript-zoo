#!/bin/bash
# Copies build artifacts out of build container's /dist into ../dist/<arch>/
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -e

ID="$1"
if [[ -z "$ID" ]]; then
  echo "Usage: ./dist.sh <name>[.Dockerfile]"
  exit 1
fi

ID=${ID%.Dockerfile}

if [[ -z "$DOCKER_ARCH" ]]; then
  DOCKER_ARCH="$(uname -m | sed 's/aarch64/arm64/; s/x86_64/amd64/')"
fi

if [[ -z "$DOCKER" ]]; then
  if command -v podman >/dev/null 2>&1; then
    DOCKER=podman
  elif command -v docker >/dev/null 2>&1; then
    DOCKER=docker
  elif command -v container >/dev/null 2>&1; then
    DOCKER=container
  else
    echo "No container engine found. Install podman, docker, or container (or set DOCKER)." >&2
    exit 1
  fi
fi

mkdir -p "../dist/$DOCKER_ARCH"
rm -rf "../dist/$DOCKER_ARCH/$ID" >/dev/null 2>&1
rm -rf "../dist/$DOCKER_ARCH/$ID".* >/dev/null 2>&1

TMPCP="../.cache/dist-tmp-$ID"
CIDFILE=""
rm -rf "$TMPCP"
mkdir -p "$TMPCP"

if [[ "$DOCKER" == "container" ]]; then
  OUTDIR=$(realpath "$TMPCP")
  # Apple's container CLI doesn't support docker-compatible --cidfile/cp.
  $DOCKER run --rm --arch "$DOCKER_ARCH" --volume "$OUTDIR:/out" "jsz-$ID" /bin/bash -e -c "$(cat <<EOF
if ! [[ -f "/dist/$ID.json" || -f "/dist/parsers/$ID.json" || -f "/dist/transpilers/$ID.json" ]]; then
  ./dist.py "/dist/$ID" --rename-variant
fi
ls -l /dist | grep -v ^total | grep -v ' jsz_' || true
mkdir -p /out/dist
cp -a /dist/. /out/dist/
EOF
)"
else
  CIDFILE="../.cache/cid/$ID"
  mkdir -p "../.cache/cid"

  if [[ -f $CIDFILE ]]; then
    $DOCKER rm "$(cat "$CIDFILE")" >/dev/null 2>&1 || true
    rm -f "$CIDFILE"
  fi

  # Most variant builds reuse same Dockerfile with original /dist filenames,
  # so their build artifacts may need to be renamed post-build here,
  # e.g. /dist/v8 -> /dist/v8_jitless, as well as json/LICENSE files.
  $DOCKER run --cidfile="$CIDFILE" "jsz-$ID" /bin/bash -e -c "$(cat <<EOF
if ! [[ -f "/dist/$ID.json" || -f "/dist/parsers/$ID.json" || -f "/dist/transpilers/$ID.json" ]]; then
  ./dist.py "/dist/$ID" --rename-variant
fi
ls -l /dist | grep -v ^total | grep -v ' jsz_' || true
EOF
)"

  # Copy dist directory's contents to ../dist/<arch>/
  CID=$(cat "$CIDFILE")
  $DOCKER cp "$CID":/dist "$TMPCP" || \
    (sleep 1 && $DOCKER cp "$CID":/dist "$TMPCP") || \
    (sleep 1 && $DOCKER cp "$CID":/dist "$TMPCP")

  $DOCKER rm "$CID" >/dev/null
  rm -f "$CIDFILE"
fi

rm -rf \
  "../dist/$DOCKER_ARCH/$ID" \
  "../dist/$DOCKER_ARCH/$ID."* \
  "../dist/$DOCKER_ARCH/$ID-dist"

for subdir in "" parsers/ transpilers/; do
  for src in "$TMPCP/dist/$subdir$ID"*; do
    if [[ -e "$src" ]]; then
      mkdir -p "../dist/$DOCKER_ARCH/$subdir"
      dst="../dist/$DOCKER_ARCH/$subdir$(basename "$src")"
      if [[ -e "$dst" ]]; then
        chmod a+w "$dst"
        rm -rf "$dst"
      fi
      mv -f "$src" "$dst"
      if [[ -f "$dst" ]]; then
        chmod a-w "$dst"
      fi
    fi
  done
done

rm -rf "$TMPCP"
if [[ -n "$CIDFILE" ]]; then
  rm -f "$CIDFILE"
fi

cd "../dist/$DOCKER_ARCH"
(for x in *; do if [[ -f "$x" && -x "$x" && -f $x.json ]]; then echo $x; fi; done | sort -V) >LIST

exit 0
