#!/bin/bash
# Wrapper to transform input to ES5 using babel before calling mujs.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -e -o pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 script.js" >&2
  exit 1
fi

SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")
DIST_DIR=$SCRIPT_DIR/mujs_babel-dist
INPUT="$1"
CFG=$(mktemp --suffix=.json)
TRANSFORMED=$(mktemp --suffix=.js)
export NODE_PATH=$DIST_DIR/node_modules

echo '{
  "sourceType": "script",
  "presets": [[
    "@babel/preset-env",
    {
      "strictMode": false,
      "modules": false
    }
  ]]
}' >$CFG
# TODO "useBuiltIns": "usage", "corejs": 3

"$NODE_PATH/.bin/babel" \
  --presets=@babel/preset-env \
  --out-file="$TRANSFORMED" \
  --config-file="$CFG" \
  "$1"

if [[ $? != 0 ]]; then
  echo "babel failed" >&2
  rm -f "$TMP" "$CFG"
  exit 1
fi

rm -f "$CFG"

"$SCRIPT_DIR/mujs" "$TRANSFORMED"
ex="$?"
rm -f "$TRANSFORMED"
exit "$ex"
