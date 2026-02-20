#!/bin/bash
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -euo pipefail

SCRIPT_DIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"
DIST_DIR="$SCRIPT_DIR/jscript-dist"

download_jscript() {
  #...
  true
}

if ! [[ -f "$DIST_DIR/jscript.dll" ]]; then
  echo "Downloading jscript.dll" >&2
  mkdir -p "$DIST_DIR"
  download_jscript "$DIST_DIR/jscript.dll"
fi

if [[ "${1:-}" == --download ]]; then
  exit 0
fi

if ! [[ -f "$DIST_DIR/jscript64.exe" ]]; then
  echo "Error: $DIST_DIR/jscript64.exe is missing" >&2
  exit 1
fi

export WINEDEBUG="${WINEDEBUG:--all,+err}"
export LD_PRELOAD=
export XDG_RUNTIME_DIR=${XDG_RUNTIME_DIR:-/tmp}
exec wine "$DIST_DIR/jscript64.exe" --dll "$DIST_DIR/jscript.dll" "$@"
