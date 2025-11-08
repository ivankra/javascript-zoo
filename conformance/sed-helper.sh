#!/bin/bash
# Wrapper for sed used by run.sh.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

if [[ $# -lt 3 ]]; then
  echo "Usage: $0 sed_file print_function engine [args] test.js" >&2
  exit 1
fi

sed_file="$1"; shift;
print_function="$1"; shift;
sed_script="s|\\bconsole.log\\b|$print_function|g"
test_file="${@: -1}"
engine_cmd=("${@:1:$#-1}")

tmpfile=$(mktemp --suffix=.js)
trap "rm -f '$tmpfile'" EXIT INT TERM

sed "$sed_script" "$test_file" > "$sed_file"

"${engine_cmd[@]}" "$sed_file"
exit $?
