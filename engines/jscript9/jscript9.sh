#!/bin/bash
# Wrapper for downloading jscript9.dll and launching via wine + custom DLL host (jsrt.cc).
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -euo pipefail

SCRIPT_DIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"
DIST_DIR="$SCRIPT_DIR/jscript9-dist"

download_jscript9_ie11_x64() {
  # JScript 11.0.16428 via IE11 package for Windows 7 x64
  # https://www.microsoft.com/en-us/download/details.aspx?id=41628
  local IE11_URL="https://download.microsoft.com/download/2/9/4/29413f94-2acf-496a-ad9c-8f43598510b7/EIE11_EN-US_MCM_WIN764.EXE"
  local DLL_SHA256="b80642ee98e167d6376612fbbfe9a14f134fbc4de90abd2e1fa321e539b4ed78"

  local out_dll="$1"
  local work_dir="$(mktemp -d /tmp/jscript9-payload.XXXXXX)"
  trap "rm -rf '$work_dir'" EXIT
  mkdir -p "$work_dir/stage1" "$work_dir/stage2" "$(dirname "$out_dll")"

  curl -fL "$IE11_URL" -o "$work_dir/ie11-installer.exe"
  7z x -y "-o$work_dir/stage1" "$work_dir/ie11-installer.exe" >/dev/null
  7z x -y "-o$work_dir/stage2" "$work_dir/stage1/IE-REDIST.EXE" >/dev/null

  local dll="$(find "$work_dir/stage2" -type f -iname 'jscript9.dll' | grep -Ei '/(amd64|x64)_' | head -n1 || true)"
  if [[ -z "$dll" ]]; then
    echo "Could not locate jscript9.dll in extracted IE payload" >&2
    find "$work_dir" -maxdepth 5 -type f | sed -n '1,200p' >&2 || true
    exit 1
  fi

  cp -f "$dll" "$out_dll"
  echo "$DLL_SHA256  $out_dll" | sha256sum -c -
}

if ! [[ -f "$DIST_DIR/jscript9.dll" ]]; then
  echo "Downloading jscript9.dll" >&2
  mkdir -p "$DIST_DIR"
  download_jscript9_ie11_x64 "$DIST_DIR/jscript9.dll" >&2
fi

if [[ "${1:-}" == --download ]]; then
  exit 0
fi

export WINEDEBUG="${WINEDEBUG:--all,+err}"
export LD_PRELOAD=
export XDG_RUNTIME_DIR=${XDG_RUNTIME_DIR:-/tmp}
exec wine "$DIST_DIR/jsrt64.exe" --dll "$DIST_DIR/jscript9.dll" "$@"
