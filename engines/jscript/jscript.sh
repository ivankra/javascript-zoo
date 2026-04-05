#!/bin/bash
# Wrapper for downloading jscript.dll and launching via wine + custom DLL host (jscript.cc).
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -euo pipefail

SCRIPT_DIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"
DIST_DIR="$SCRIPT_DIR/jscript-dist"

# Shared between jscript.sh and jscript9.sh
IE11_CACHE_DIR="/tmp/jsz-jscript-ie11-installer"
IE11_LOCK="$IE11_CACHE_DIR/lock"

download_ie11_jscript() {
  local ie_url="$1"
  local ie_sha256="$2"
  local dll_name="$3"
  local dll_sha256="$4"
  local out_path="$5"

  local ie_installer="$IE11_CACHE_DIR/$(basename "$ie_url")"

  mkdir -p "$IE11_CACHE_DIR"

  (
    flock 9

    # Ensure installer is cached with correct checksum.
    if [[ -f "$ie_installer" ]]; then
      if ! echo "$ie_sha256  $ie_installer" | sha256sum --status -c - 2>/dev/null; then
        echo "Cached IE11 installer SHA256 mismatch, re-downloading" >&2
        rm -f "$ie_installer"
      fi
    fi
    if ! [[ -f "$ie_installer" ]]; then
      echo "Downloading IE11 installer..." >&2
      curl -fL "$ie_url" -o "$ie_installer" >&2
      if ! echo "$ie_sha256  $ie_installer" | sha256sum --status -c - 2>/dev/null; then
        echo "Downloaded IE11 installer SHA256 mismatch" >&2
        rm -f "$ie_installer"
        exit 1
      fi
    fi

    # Extract DLL if not already present with correct checksum.
    if [[ -n "$dll_sha256" && -f "$out_path" ]]; then
      if echo "$dll_sha256  $out_path" | sha256sum --status -c - 2>/dev/null; then
        exit 0
      fi
    fi
    echo "Extracting $dll_name..." >&2
    mkdir -p "$IE11_CACHE_DIR/stage1" "$IE11_CACHE_DIR/stage2" "$(dirname "$out_path")"

    7z x -y "-o$IE11_CACHE_DIR/stage1" "$ie_installer" >/dev/null
    7z x -y "-o$IE11_CACHE_DIR/stage2" "$IE11_CACHE_DIR/stage1/IE-REDIST.EXE" >/dev/null

    local dll=""
    if [[ "$ie_url" =~ (764|x64|amd64) ]]; then
      dll="$(find "$IE11_CACHE_DIR/stage2" -type f -iname "$dll_name" | grep -Ei '/(amd64|x64)_' | head -n1 || true)"
    else
      dll="$(find "$IE11_CACHE_DIR/stage2" -type f -iname "$dll_name" | grep -Evi '/(amd64|x64)_' | head -n1 || true)"
    fi
    if [[ -z "$dll" ]]; then
      echo "Could not locate $dll_name in extracted IE payload" >&2
      find "$IE11_CACHE_DIR" -maxdepth 5 -type f | sed -n '1,200p' >&2 || true
      rm -rf "$IE11_CACHE_DIR/stage1" "$IE11_CACHE_DIR/stage2"
      exit 1
    fi

    cp -f "$dll" "$out_path"
    rm -rf "$IE11_CACHE_DIR/stage1" "$IE11_CACHE_DIR/stage2"
    if [[ -n "$dll_sha256" ]]; then
      echo "$dll_sha256  $out_path" | sha256sum -c - >&2
    fi
  ) 9>"$IE11_LOCK"
}

mkdir -p "$DIST_DIR"

# JScript 5.8.16428 DLL from IE11 installer
if ! [[ -f "$DIST_DIR/jscript64.dll" ]]; then
  # "Internet Explorer 11 (64-bit) for Windows 7 ONLY"
  # https://www.microsoft.com/en-us/download/details.aspx?id=41628
  download_ie11_jscript \
    "https://download.microsoft.com/download/2/9/4/29413f94-2acf-496a-ad9c-8f43598510b7/EIE11_EN-US_MCM_WIN764.EXE" \
    "56387171ef230102ed8fd59f92d346a355f9fa43c134ee3d1ba27a5e5216cf15" \
    "jscript.dll" \
    "8e7a68cdf3f4c06f432ff4fad09cfe6b9a7f8f836f9b07e76cda12f0665b3611" \
    "$DIST_DIR/jscript64.dll"
fi

# if ! [[ -f "$DIST_DIR/jscript32.dll" ]]; then
#   # "Internet Explorer 11 (32-Bit) for Windows 7 ONLY"
#   # https://www.microsoft.com/en-us/download/details.aspx?id=40907
#   download_ie11_jscript \
#     "https://download.microsoft.com/download/9/0/8/908b5c6b-f23e-4ded-9906-77ce4e9e8528/EIE11_EN-US_MCM_WIN7.EXE" \
#     "51d3262f806dd47bcb1c119d90d39067f7037de51c472577ea39c5f17e0dabc2" \
#     "jscript.dll" \
#     "681ceede8c1295b0245675a54e01898860f24ac21171b2858160d05b5e08e387" \
#     "$DIST_DIR/jscript32.dll"
# fi

if [[ "${1:-}" == --download ]]; then
  exit 0
fi

export WINEDEBUG="${WINEDEBUG:--all,+err}"
export LD_PRELOAD=
export XDG_RUNTIME_DIR=${XDG_RUNTIME_DIR:-/tmp}

if [[ -x /usr/lib/wine/wine64 ]]; then
  WINE=/usr/lib/wine/wine64
fi
exec "${WINE:-wine}" "$DIST_DIR/jscript64.exe" --dll "$DIST_DIR/jscript64.dll" "$@"
