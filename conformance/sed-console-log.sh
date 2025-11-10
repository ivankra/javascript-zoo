#!/bin/bash
# Wrapper for some engine shells that use print() instead of console.log().
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 engine [args] test.js" >&2
  exit 1
fi

if [[ "$SED_PRINT" == "" ]]; then
  SED_PRINT='print'
fi

if [[ -z "$SED_SCRIPT" ]]; then
  SED_SCRIPT="s/\\bconsole.log\\b/$SED_PRINT/g"
fi

test_file="${@: -1}"
engine_args=("${@:1:$#-1}")

if [[ -z "$SED_FILE" ]]; then
  SED_FILE=$(mktemp --suffix=.js)
  trap "rm -f '$SED_FILE'" EXIT INT TERM
  sed "$SED_SCRIPT" "$test_file" > "$SED_FILE"
  "${engine_args[@]}" "$SED_FILE"
  exit $?
else
  # clean-up up to caller
  sed "$SED_SCRIPT" "$test_file" > "$SED_FILE"
  exec "${engine_args[@]}" "$SED_FILE"
fi
