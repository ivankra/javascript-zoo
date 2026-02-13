#!/bin/bash
# Copies build artefacts out of build container's /dist into ../dist/<arch>/
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

ARCH=$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/amd64/')
DOCKER=$(command -v podman 2>/dev/null || echo docker)

mkdir -p "../dist/$ARCH"
rm -rf "../dist/$ARCH/$ID" >/dev/null 2>&1
rm -rf "../dist/$ARCH/$ID".* >/dev/null 2>&1

CIDFILE="../.cache/cid/$ID"
mkdir -p "../.cache/cid"

if [[ -f $CIDFILE ]]; then
  $DOCKER rm "$(cat "$CIDFILE")" >/dev/null 2>&1 || true
  rm -f "$CIDFILE"
fi

# Most variant builds reuse same Dockerfile with original /dist filenames,
# so their build artefacts may need to be renamed post-build here,
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
TMPCP="../.cache/dist-tmp-$ID"
rm -rf "$TMPCP"
mkdir -p "$TMPCP"
$DOCKER cp "$CID":/dist "$TMPCP" || \
  (sleep 1 && $DOCKER cp "$CID":/dist "$TMPCP") || \
  (sleep 1 && $DOCKER cp "$CID":/dist "$TMPCP")

rm -rf \
  "../dist/$ARCH/$ID" \
  "../dist/$ARCH/$ID."* \
  "../dist/$ARCH/$ID-dist"

for subdir in "" parsers/ transpilers/; do
  for src in "$TMPCP/dist/$subdir$ID"*; do
    if [[ -e "$src" ]]; then
      mkdir -p "../dist/$ARCH/$subdir"
      dst="../dist/$ARCH/$subdir$(basename "$src")"
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

$DOCKER rm "$CID" >/dev/null
rm -rf "$TMPCP" "$CIDFILE"

cd "../dist/$ARCH"
(for x in *; do if [[ -f "$x" && -x "$x" && -f $x.json ]]; then echo $x; fi; done | sort -V) >LIST

exit 0
