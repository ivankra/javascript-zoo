#!/bin/bash
# Usage: run.sh [engine [args]] [test.js ...]
#
# Should work with most engine shells and runtimes
# that provide console.log() method.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

js_files=()
engine_args=("$@")

# Collect *.js filenames from the end of arguments list
while [[ ${#engine_args[@]} -gt 0 ]] && [[ "${engine_args[-1]}" == *.js ]] && [[ "${engine_args[-1]}" != .*.js ]]; do
  js_files=("${engine_args[-1]}" "${js_files[@]}")
  unset 'engine_args[-1]'
done

# Default to 'node' if no engine specified
if [[ ${#engine_args[@]} == 0 ]]; then
  engine_args=(node)
fi

# Add .var-console.js for some engine shells that only have print()
engine_name="${engine_args[0]##*/}"   # basename
engine_name="${engine_name%_*}"       # strip _variant
if [[ " escargot jerryscript jsc nashorn xs " == *" $engine_name "* ]]; then
  # && ${#engine_args[@]} == 1
  engine_args+=(".var-console.js")
fi

# By default, run on the whole test suite in order
if [[ ${#js_files[@]} == 0 ]]; then
  js_files=(
    es[135-9]*.*.js
    es2*.js
    annexb.*.js
    unicode*.js
    kangax/es5.*.js
    kangax/es6.*.js
    kangax/es2*.js
    kangax/annexb.*.js
    kangax/esintl.*.js
  )
fi

ARCH=$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/amd64/')
PATH="../dist:../dist/$ARCH:$PATH"

passed=0
failed=0
failed_files=""
tmpfile=$(mktemp)

for f in "${js_files[@]}"; do
  stdbuf -oL -eL "${engine_args[@]}" "$f" 2>&1 | tee "$tmpfile"
  if fgrep -q "$(basename $f): OK" "$tmpfile"; then
    passed=$((passed + 1))
  else
    printf "\033[1;31m%s failed\033[0m\n" "$f"
    failed=$((failed + 1))
    failed_files="$failed_files $f"
  fi
done

rm -f "$tmpfile"

if [[ "$failed" != 0 ]]; then
  printf "\033[1;31m%d test(s) passed, %d test(s) failed:%s\033[0m\n" "$passed" "$failed" "$failed_files"
else
  printf "\033[1;32mAll %d tests passed\033[0m\n" "$passed"
fi
