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

if [[ -z "$SED_FILE" ]]; then
  SED_FILE=$(mktemp --suffix=.js)
fi

trap "rm -f '$SED_FILE'" EXIT INT TERM

test_file="${@: -1}"
engine_args=("${@:1:$#-1}")

sed "$SED_SCRIPT" "$test_file" > "$SED_FILE"

"${engine_args[@]}" "$SED_FILE"
exit $?
