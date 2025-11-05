#!/bin/bash
# Wrapper for some engine shells that use print() instead of console.log().
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 engine [args] test.js" >&2
  exit 1
fi

sed_script='s/\bconsole.log\b/print/g'
test_file="${@: -1}"
engine_args=("${@:1:$#-1}")

tmpfile=$(mktemp --suffix=.js)
trap "rm -f '$tmpfile'" EXIT INT TERM

sed "$sed_script" "$test_file" > "$tmpfile"

"${engine_args[@]}" "$tmpfile"
exit $?
