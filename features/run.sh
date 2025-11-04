#!/bin/bash
# Usage: run.sh [engine [flags]] [test.js ...]
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

# Collect *.js filenames from the end of arguments list
js_files=()
engine_args=("$@")

while [[ ${#engine_args[@]} -gt 0 ]] && [[ "${engine_args[-1]}" == *.js ]] && [[ "${engine_args[-1]}" != .*.js ]]; do
  js_files=("${engine_args[-1]}" "${js_files[@]}")
  unset 'engine_args[-1]'
done

# Default to node if no engine specified
if [[ ${#engine_args[@]} == 0 ]]; then
  engine_args=(node)
fi

# Add .var-console.js for some engine shells that only have print()
if [[ ${#engine_args[@]} == 1 ]]; then
  engine_name="${engine_args[0]##*/}"   # basename
  engine_name="${engine_name%_*}"       # strip _variant
  if [[ " jsc escargot nashorn xs " == *" $engine_name "* ]]; then
    engine_args+=(".var-console.js")
  fi
fi

# Run on whole test suite by default
if [[ ${#js_files[@]} == 0 ]]; then
  js_files=(es*.js annex*.js)
fi

ARCH=$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/amd64/')
PATH="../dist:../dist/$ARCH:$PATH"

failed=0
failed_files=""
tmpfile=$(mktemp)

for f in "${js_files[@]}"; do
  stdbuf -oL -eL "${engine_args[@]}" "$f" 2>&1 | tee "$tmpfile"
  if ! fgrep -q "$f: OK" "$tmpfile"; then
    printf "\033[1;31m%s failed\033[0m\n" "$f"
    failed=$((failed + 1))
    failed_files="$failed_files $f"
  fi
done

rm -f "$tmpfile"

if [[ "$failed" != 0 ]]; then
  printf "\033[1;31m%d test(s) failed%s\033[0m\n" "$failed" "${failed_files:+: $failed_files}"
else
  printf "\033[1;32mAll OK\033[0m\n"
fi
