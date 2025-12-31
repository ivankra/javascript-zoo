#!/bin/bash
# Generates single self-contained octane benchmark tests.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -e -o pipefail

OCTANE_SOURCES=(
   richards.js
   deltablue.js
   crypto.js
   raytrace.js
   earley-boyer.js
   regexp.js
   splay.js
   navier-stokes.js
   pdfjs.js
   mandreel.js
   gbemu-part1.js
   gbemu-part2.js
   code-load.js
   box2d.js
   zlib.js
   zlib-data.js
   typescript.js
   typescript-input.js
   typescript-compiler.js
)

OCTANE_OUTPUTS=(
   richards.js
   deltablue.js
   crypto.js
   raytrace.js
   earley-boyer.js
   regexp.js
   splay.js
   navier-stokes.js
   pdfjs.js
   mandreel.js
   gbemu.js
   code-load.js
   box2d.js
   zlib.js
   typescript.js
)

SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")
OCTANE="$SCRIPT_DIR/../third_party/octane"

do_clean() {
  for f in "${OCTANE_SOURCES[@]}" "${OCTANE_OUTPUTS[@]}"; do
    rm -f "$f"
  done
}

if [[ "$1" == --clean ]]; then
  do_clean
  exit 0
fi

if ! [[ -f "$OCTANE/zlib.js" ]]; then
  (set -x; git submodule update --init --depth=1)
fi

for f in "${OCTANE_SOURCES[@]}"; do
  if ! [[ -f "$OCTANE/$f" ]]; then
    echo "Error: $OCTANE/$f doesn't exist" >&2
    exit 1
  fi
done

do_clean

gen() {
  local target="$1"; shift

  rm -f "$target"
  cat >"$target" <<EOF
// Single self-contained test from octane benchmark (https://github.com/chromium/octane)

// Define print() that should work across variety of shells.
if (typeof print == "undefined" && typeof console != "undefined") {
  if (typeof globalThis == "object") globalThis.print = console.log;
  else if (typeof this == "object") this.print = console.log;
  if (typeof print == "undefined") print = console.log;
}

EOF

  if [[ "$target" == pdfjs.js ]]; then
cat >>"$target" <<EOF
// Annex B function, not implemented by some engines
if (typeof String.prototype.substr == "undefined") {
  String.prototype.substr = function(start, length) {
    if (start < 0) start = Math.max(0, this.length + start);
    if (length === undefined) return this.substring(start);
    return this.substring(start, start + length);
  };
}

EOF
  fi

  if [[ "$target" == zlib.js ]]; then
cat >>"$target" <<'EOF'
// Annex B function, not implemented by some engines
if (typeof unescape == "undefined") {
  function _unescape_polyfill(s) {
    return String(s).replace(
      /%u([0-9A-Fa-f]{4}|[0-9A-Fa-f]{2})/gi,
      function (_, hex) { String.fromCharCode(parseInt(hex, 16)); });
  };
  if (typeof globalThis == "object") globalThis.unescape = _unescape_polyfill;
  else if (typeof this == "object") this.unescape = _unescape_polyfill;
  if (typeof unescape == "undefined") unescape = _unescape_polyfil;
}

EOF
  fi

cat >>"$target" <<EOF
// Undefine read/require for zlib and typescript tests that probe them
// and might go off track depending on how these two are defined.
var read, require;

EOF

  cat "$OCTANE/base.js" >>"$target"

  local src=""
  for src in "$@"; do
    cat "$OCTANE/$src" >>"$target"
  done

  if [[ "$src" == "" ]]; then
    cat "$OCTANE/$target" >>"$target"
  fi

  cat "$OCTANE/run.js" | sed 's|^load|//load|' >>"$target"

  if [[ "$target" != "v9.js" ]]; then
    # Don't print overall score in single tests
    sed -i -E 's|^(function PrintScore.*)|\1 return;|' "$target"
  fi
}

gen richards.js
gen deltablue.js
gen crypto.js
gen raytrace.js
gen earley-boyer.js
gen regexp.js
gen splay.js
gen navier-stokes.js
gen pdfjs.js
gen mandreel.js
gen gbemu.js gbemu-part1.js gbemu-part2.js
gen code-load.js
gen box2d.js
gen zlib.js zlib.js zlib-data.js
gen typescript.js typescript.js typescript-input.js typescript-compiler.js
