#!/bin/bash
# Download and extract jscript9.dll from IE11 redistributable payload
# into output directory.
#
# Usage:
#   download-jscript9.sh [OUT_DIR]
#
# Env:
#   JSCRIPT9_IE11_URL (optional): override IE11 package URL.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -euo pipefail

OUT_DIR="${1:-/dist/jscript9-dist}"
WORK_DIR="${WORK_DIR:-/tmp/jscript9-payload}"
IE11_URL="${JSCRIPT9_IE11_URL:-https://download.microsoft.com/download/2/9/4/29413f94-2acf-496a-ad9c-8f43598510b7/EIE11_EN-US_MCM_WIN764.EXE}"

rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR/stage1" "$WORK_DIR/stage2" "$OUT_DIR"

extract_with_tools() {
  local src="$1"
  local dst="$2"
  mkdir -p "$dst"
  7z x -y "-o$dst" "$src" >/dev/null 2>&1 || true
  cabextract -q -d "$dst" "$src" >/dev/null 2>&1 || true
  unzip -oq "$src" -d "$dst" >/dev/null 2>&1 || true
}

curl -fL "$IE11_URL" -o "$WORK_DIR/ie11-installer.exe"
extract_with_tools "$WORK_DIR/ie11-installer.exe" "$WORK_DIR/stage1"

# Extract likely nested payloads (IE-REDIST.EXE and sibling archives).
while IFS= read -r -d '' nested; do
  extract_with_tools "$nested" "$WORK_DIR/stage2/.nested.$(basename "$nested")"
done < <(find "$WORK_DIR/stage1" -type f \( -iname '*.exe' -o -iname '*.cab' \) -print0)

# Expand compressed dll payloads if present (.dl_/.ex_).
while IFS= read -r -d '' packed; do
  cabextract -q -d "$(dirname "$packed")" "$packed" >/dev/null 2>&1 || true
done < <(find "$WORK_DIR" -type f \( -iname 'jscript9*.dl_' -o -iname 'jscript9*.ex_' \) -print0)

# Prefer amd64 payload from the x64 package, fallback to any matching jscript9.dll.
dll="$(find "$WORK_DIR" -type f -iname 'jscript9.dll' | grep -Ei '/(amd64|x64)_' | head -n1 || true)"
if [[ -z "$dll" ]]; then
  dll="$(find "$WORK_DIR" -type f -iname 'jscript9.dll' | head -n1 || true)"
fi

if [[ -z "$dll" ]]; then
  echo "Could not locate jscript9.dll in extracted IE payload" >&2
  find "$WORK_DIR" -maxdepth 4 -type f | sed -n '1,200p' >&2 || true
  exit 1
fi

cp -f "$dll" "$OUT_DIR/$(basename "$dll" | tr '[:upper:]' '[:lower:]')"
