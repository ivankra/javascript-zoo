#!/bin/bash
# Wrapper that transforms input to ES5 using babel and core-js polyfills
# and then calls mujs (or another engine of your choice).
#
# Usage: ./mujs_babel [engine [args...]] script.js
#
# MuJS is a pure and fairly compliant ES5 engine, thus a good choice
# to test how much of ES6+ support babel + core-js bring to the table.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -e -o pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 [engine [args...]] script.js" >&2
  exit 1
fi

SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")
DIST_DIR="$SCRIPT_DIR/mujs_babel-dist"

INPUT="${@: -1}"
set -- "${@:1:$#-1}"

if [[ $# -eq 0 ]]; then
  ENGINE="$SCRIPT_DIR/mujs"
else
  ENGINE="$1"
  shift
fi

ROLLUP_CFG=$(mktemp --suffix=.cjs)
TRANSFORMED=$(mktemp --suffix=.js)

trap 'rm -f "$ROLLUP_CFG" "$TRANSFORMED"' EXIT

export NODE_PATH="$DIST_DIR/node_modules"

cat >"$ROLLUP_CFG" <<EOF
const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: '$INPUT',
  output: {
    file: '$TRANSFORMED',
    format: 'iife',
    inlineDynamicImports: true,
    strict: false
  },
  context: 'this',
  plugins: [
    babel.default({
      babelHelpers: 'bundled',
      exclude: /node_modules/,
      extensions: ['.js'],
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'usage',
          corejs: 3,
          modules: false
        }]
      ]
    }),
    resolve.default({
      preferBuiltins: false,
      modulesOnly: false,
      modulePaths: ['$NODE_PATH']
    }),
    commonjs({
      sourceMap: false
    })
  ]
};
EOF

if ! "$NODE_PATH/.bin/rollup" --config "$ROLLUP_CFG" --silent; then
  echo "Warning: babel failed, falling back to the original script" >&2
  "$ENGINE" "$@" "$INPUT"
else
  "$ENGINE" "$@" "$TRANSFORMED"
fi
