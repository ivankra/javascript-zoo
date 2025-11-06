#!/bin/bash
# Usage: run.sh [-o report.txt] [engine [args]] [test.js ...]
#
# Should work with most engine shells and runtimes
# that provide console.log() method or similar.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

export LC_ALL=en_US.UTF-8

script_dir=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")

report_file=""
if [[ "$1" == "-o" ]]; then
  report_file="$2";
  shift 2;
fi

js_files=()
engine_cmd=("$@")

# Collect *.js filenames from the end of arguments list
while [[ ${#engine_cmd[@]} > 0 ]]; do
  arg="${engine_cmd[-1]}"

  if [[ "$arg" == var-console-log.js ]]; then
    break
  fi

  # Expand directories to dir/*.js, sort -V order
  if [[ -d "$arg" ]]; then
    arg="${arg%/}"
    mapfile -t dir_files < <(ls "$arg"/*.js 2>/dev/null | sort -V)
    if [[ ${#dir_files[@]} -eq 0 ]]; then
      break
    fi
    if [[ ${#dir_files[@]} == 0 ]]; then
      break
    fi
    js_files=("${dir_files[@]}" "${js_files[@]}")
    unset 'engine_cmd[-1]'
  elif [[ "$arg" == *.js ]]; then
    js_files=("$arg" "${js_files[@]}")
    unset 'engine_cmd[-1]'
  else
    break
  fi
done

# Default to 'node' if no engine specified
if [[ ${#engine_cmd[@]} == 0 ]]; then
  engine_cmd=(node)
fi

# Handle quirks of some engines:
# - default flags for some
# - add var-console-log.js for console.log if shell accepts multiple files
# - use sed-helper.sh/sed-console.log.sh to edit script on the fly if not

engine_name="${engine_cmd[0]##*/}"   # basename
if [[ "$engine_name" != spidermonkey_[12]* ]];then
  engine_name="${engine_name%_*}"    # strip _variant, jsc_gcc -> jsc
fi

sedfile=$(mktemp --suffix=.js)

case "$engine_name" in
  quickjs-ng)
    engine_cmd+=(--script);;
  escargot|jerryscript|jsc|nashorn|xs|cesanta-v7)
    engine_cmd+=("$script_dir/var-console-log.js");;
  hermes|mocha|spidermonkey_[12]*|kjs|js-interpreter|sablejs|sobek|starlight|tiny-js)
    engine_cmd=("$script_dir/sed-helper.sh" "$sedfile" print "${engine_cmd[@]}");;
  nova)
    engine_cmd=("$script_dir/sed-helper.sh" "$sedfile" print "${engine_cmd[@]}" eval);;
  dmdscript|dscriptcpp)
    engine_cmd=("$script_dir/sed-helper.sh" "$sedfile" println "${engine_cmd[@]}");;
esac

if [[ ${#js_files[@]} == 0 ]]; then
  echo "Engine: $engine_name, command: ${engine_cmd[@]} <test.js>, running on whole test suite ex kangax-next"
  mapfile -t js_files < <(ls \
    es1/*.js \
    es3/*.js \
    es5/*.js \
    kangax-es5/*.js \
    kangax-es6/*.js \
    kangax-es20??/*.js \
    kangax-intl/*.js \
    | sort -V)
else
  echo "Engine: $engine_name, command: ${engine_cmd[@]} <test.js>, running on selected tests"
fi

ARCH=$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/amd64/')
export PATH="../dist:../dist/$ARCH:$PATH"

passed=0
total=0
failed=0
failed_files=""

rm -f "$report_file"

for filename in "${js_files[@]}"; do
  basename="$(basename -- "$filename")"
  tmpfile=$(mktemp)
  rm -f "$tmpfile" "$tmpfile.time"

  timeout 3s stdbuf -oL -eL /usr/bin/time -v -o "$tmpfile.time" \
    "${engine_cmd[@]}" "$filename" 2>&1 \
    | tee "$tmpfile"

  ((total++))

  if ! fgrep -q "$basename: FAIL" "$tmpfile" && \
     ! fgrep -q "$basename: EXCEPTION" "$tmpfile" && \
     ! fgrep -q "Command terminated by signal" "$tmpfile.time" && \
     fgrep -q "$basename: OK" "$tmpfile"; then
    ((passed++))
    if [[ "$report_file" != "" ]]; then
      echo "$filename: OK" >>"$report_file"
    fi
  else
    ((failed++))
    failed_files+="$filename "

    if grep -q "Command terminated by signal [0-9]" "$tmpfile.time"; then
      crashed="crashed (signal $(sed -nE 's/.*Command terminated by signal ([0-9]+).*/\1/p' $tmpfile.time))"
    else
      crashed=""
    fi

    # Normalize output and transform into a one-liner summary
    cat "$tmpfile" 2>/dev/null \
      | sed -e 's/\s/ /; s/^ *//; s/ *$//' \
      | sed -Ee 's/^(js: |INFO |WARN )//' \
      | sed -Ee "s/^[\"'](.*)['\"]$/\\1/;" \
      | sed -Ee 's|20[0-9]{2}/[0-9]{2}/[0-9]{2} [0-9:]{8} ||' \
      | sed -E 's/\x1B\[[0-9;]*[A-Za-z]//g' \
      | sed -e "s|$sedfile|$basename|g" \
      | fgrep -v -x "$filename: failed" \
      | egrep -i "(/$basename: |error|panic|exception|uncaught|mismatch|failed|invalid|incorrect|unsupported|cannot|can't|fail)" \
      | sed -e "s|^[a-z0-9/'\" -]*/$basename: \(exception: \|failed: \)\(.\+\)|\2;|" \
      | sed -Ee 's/(Uncaught |)exception: //' \
      | sed -e "s|^[a-z0-9/'\" -]*/$basename: \(.\+\)|\1;|" \
      | tr '\n' ' ' \
      | sed -e 's/\s\+/ /; s/^[ ;]*//; s/[ ;]*$//' \
      > "$tmpfile.filtered"

    sz=$(wc -c <"$tmpfile.filtered")
    if ((sz > 5)); then
      error="$crashed${crashed:+; }$(cat "$tmpfile.filtered" | head -1 | cut -c 1-300)"
    elif [[ "$crashed" != "" ]]; then
      error="$crashed"
    elif ! grep -q "Exit status:" "$tmpfile.time"; then
      error="timeout"
    else
      error="failed"
    fi

    printf "\033[1;31m%s: %s\033[0m\n" "$filename" "$error"
    if [[ "$report_file" != "" ]]; then
      echo "$filename: $error" >>"$report_file"
    fi
  fi

  rm -f "$tmpfile" "$tmpfile.time"
done

if [[ "$report_file" != "" ]]; then
  sort -V <"$report_file" >"$report_file.tmp"
  mv -f "$report_file.tmp" "$report_file"
fi

if [[ "$failed" != 0 ]]; then
  if ((2 * failed >= total)); then
    printf "\033[1;31m❌ %s: %d/%d (%d%%) passed, %d test(s) failed:\033[0m\n" \
           "$engine_name" "$passed" "$total" "$((passed * 100 / total))" "$failed"
  else
    # majority passed
    printf "\033[1;31m❌ %s: \033[1;33m%d/%d (%d%%) passed\033[1;31m, %d test(s) failed:\033[0m\n" \
           "$engine_name" "$passed" "$total" "$((passed * 100 / total))" "$failed"
  fi
  echo "$failed_files"
else
  printf "\033[1;32m✅ %s: %d tests passed\033[0m\n" "$engine_name" "$passed"
fi
