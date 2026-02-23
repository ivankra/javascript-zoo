#!/bin/bash
# Usage: run.sh [-o output.txt] [-j jobs] [--next] [engine [args]] [test.js ...]
#
# Should work with most engine shells and runtimes
# that provide console.log() method or similar.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

export LC_ALL=en_US.UTF-8

SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")
OUTPUT_FILE=""
NUM_JOBS=1
INCLUDE_NEXT=0

while [[ "$1" != "" ]]; do
  if [[ "$1" == "-o" ]]; then
    OUTPUT_FILE="$2"
    shift 2
  elif [[ "$1" == "-j" ]]; then
    NUM_JOBS="$2"
    shift 2
  elif [[ "$1" == "--next" ]]; then
    INCLUDE_NEXT=1
    shift
  else
    break
  fi
done

JS_FILES=()
ENGINE_CMD=("$@")

# Collect *.js filenames from the end of arguments list
while [[ ${#ENGINE_CMD[@]} > 1 ]]; do
  arg="${ENGINE_CMD[-1]}"

  if [[ "$arg" == var-console-log.js ]]; then
    break
  fi

  arg="$(realpath -- "$arg")"

  # Expand directories to dir/*.js, sort -V order
  if [[ -d "$arg" ]]; then
    mapfile -t dir_files < <(ls "$arg"/*.js 2>/dev/null | sort -V)
    if [[ ${#dir_files[@]} -eq 0 ]]; then
      break
    fi
    if [[ ${#dir_files[@]} == 0 ]]; then
      break
    fi
    JS_FILES=("${dir_files[@]}" "${JS_FILES[@]}")
    unset 'ENGINE_CMD[-1]'
  elif [[ "$arg" == *.js ]]; then
    JS_FILES=("$arg" "${JS_FILES[@]}")
    unset 'ENGINE_CMD[-1]'
  else
    break
  fi
done

# Default to 'node' if no engine specified
if [[ ${#ENGINE_CMD[@]} == 0 ]]; then
  ENGINE_CMD=(node)
fi

ARCH=$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/amd64/')
export PATH="../dist:../dist/$ARCH:$PATH"

ENGINE_BINARY=$(which ${ENGINE_CMD[0]} 2>/dev/null)
if ! [[ -f "$ENGINE_BINARY" ]]; then
  echo "Can't find ${ENGINE_CMD[0]}" >&2
  exit 1
fi

ENGINE_JSON="${ENGINE_BINARY}.json"

# Handle quirks of some engines:
# - default flags for some
# - add var-console-log.js for console.log if shell accepts multiple files
# - use sed-console-log.sh to edit script on the fly if not

ENGINE_NAME="${ENGINE_CMD[0]##*/}"   # basename
if [[ "$ENGINE_NAME" != spidermonkey_[12]* ]];then
  ENGINE_NAME="${ENGINE_NAME%%_*}"   # strip _variant suffixes, quickjs_gcc_lto -> quickjs
fi

case "$ENGINE_NAME" in
  quickjs-ng)
    ENGINE_CMD+=(--script);;
  escargot|jerryscript|jsc|nashorn|xs|cesanta-v7|rpython-langjs|topchetoeu)
    ENGINE_CMD+=("$SCRIPT_DIR/var-console-log.js");;
  hermes|mocha|spidermonkey_[12]*|carakan|kjs|ejscript|malbrain|ngs|starlight|yrm006)
    ENGINE_CMD=("$SCRIPT_DIR/sed-console-log.sh" "${ENGINE_CMD[@]}");;
  nova)
    ENGINE_CMD=("$SCRIPT_DIR/sed-console-log.sh" "${ENGINE_CMD[@]}" eval);;
  yavashark)
    ENGINE_CMD+=("-i");;
  dmdscript|dscriptcpp)
    export SED_PRINT=println
    ENGINE_CMD=("$SCRIPT_DIR/sed-console-log.sh"  "${ENGINE_CMD[@]}");;
  fesi|yaji)
    export SED_PRINT=writeln
    ENGINE_CMD=("$SCRIPT_DIR/sed-console-log.sh"  "${ENGINE_CMD[@]}");;
esac

if [[ ${#JS_FILES[@]} == 0 ]]; then
  echo "Engine: $ENGINE_NAME, command: ${ENGINE_CMD[@]} <test.js>, running on whole test suite"
  mapfile -t JS_FILES < <(ls \
    $SCRIPT_DIR/es1/*.js \
    $SCRIPT_DIR/es3/*.js \
    $SCRIPT_DIR/es5/*.js \
    $SCRIPT_DIR/kangax-es5/*.js \
    $SCRIPT_DIR/kangax-es6/*.js \
    $SCRIPT_DIR/kangax-es20??/*.js \
    $SCRIPT_DIR/kangax-intl/*.js \
    $( ((INCLUDE_NEXT)) && echo $SCRIPT_DIR/kangax-next/*.js) \
    | sort -V)
else
  echo "Engine: $ENGINE_NAME, command: ${ENGINE_CMD[@]} <test.js>"
fi

export -a ENGINE_CMD  # bash 5.2+

do_part() {
  local part_output_file="$1"; shift
  local abspath

  export SED_FILE=$(mktemp --suffix=.js)

  for abspath in "$@"; do
    local basename="$(basename -- "$abspath")"
    local tmpfile=$(mktemp)
    rm -f "$tmpfile" "$tmpfile.time"

    timeout 3s stdbuf -oL -eL /usr/bin/time -v -o "$tmpfile.time" \
      "${ENGINE_CMD[@]}" "$abspath" </dev/null 2>&1 \
      | head -1000000 | tee "$tmpfile"

    local relpath="$abspath"
    if [[ "$relpath" == "$SCRIPT_DIR/"* ]]; then
      relpath="$(realpath --relative-to="$SCRIPT_DIR" -- "$abspath")"
    fi

    if ! fgrep -q -i "$basename: fail" "$tmpfile" && \
       ! fgrep -q -i "$basename: exception" "$tmpfile" && \
       ! fgrep -q "Command terminated by signal" "$tmpfile.time" && \
       fgrep -q "$basename: OK" "$tmpfile"; then
      echo "$relpath: OK" >>"$part_output_file"
    else
      local crashed=""
      if grep -q "Command terminated by signal [0-9]" "$tmpfile.time"; then
        crashed="crashed (signal $(sed -nE 's/.*Command terminated by signal ([0-9]+).*/\1/p' $tmpfile.time))"
      fi

      # Normalize output and transform into a one-liner summary
      cat "$tmpfile" 2>/dev/null \
        | sed 's/\s/ /; s/^ *//; s/ *$//' \
        | sed -E 's/^(js: |INFO |WARN )//' \
        | sed -E "s/^[\"'](.*)['\"]$/\\1/;" \
        | sed -E 's|20[0-9]{2}/[0-9]{2}/[0-9]{2} [0-9:]{8} ||' \
        | sed -E 's/\x1B\[[0-9;]*[A-Za-z]//g' \
        | sed "s|$SED_FILE|$basename|g; s|$abspath|$basename|g" \
        | fgrep -v -x "$relpath: failed" \
        | egrep -i "(/$basename: |error|panic|exception|uncaught|mismatch|failed|invalid|incorrect|unsupported|cannot|can't|fail)" \
        | sed "s|^[a-z0-9/'\" -]*/$basename: \(exception: \|failed: \)\(.\+\)|\2;|" \
        | sed -E 's/(Uncaught |)exception: //' \
        | sed "s|^[a-z0-9/'\" -]*/$basename: \(.\+\)|\1;|" \
        | uniq \
        | tr '\r\n' ' ' \
        | sed -e 's/\s\+/ /; s/^[ ;]*//; s/[ ;]*$//' \
        > "$tmpfile.filtered"

      local sz=$(wc -c <"$tmpfile.filtered")
      local error="failed"
      if ((sz > 5)); then
        error="$crashed${crashed:+; }$(cat "$tmpfile.filtered" | head -1 | cut -c 1-300)"
      elif [[ "$crashed" != "" ]]; then
        error="$crashed"
      elif ! grep -q "Exit status:" "$tmpfile.time"; then
        error="timeout"
      fi

      printf "\033[1;31m%s: %s\033[0m\n" "$relpath" "$error"
      echo "$relpath: $error" >>"$part_output_file"
    fi

    rm -f "$tmpfile" "$tmpfile.time" "$SED_FILE"
  done
}

main() {
  local output="$(mktemp)"

  rm -f "$OUTPUT_FILE"

  # Trap Ctrl-C to terminate all background jobs
  trap 'kill $(jobs -p) 2>/dev/null; exit 130' INT

  if ((NUM_JOBS > 1)); then
    local per_job=$(( (${#JS_FILES[@]} + NUM_JOBS - 1) / NUM_JOBS ))
    for ((i=0; i<NUM_JOBS && i*per_job<${#JS_FILES[@]}; i++)); do
      do_part "$output.part$i" "${JS_FILES[@]:i*per_job:per_job}" &
    done
    wait
  else
    do_part "$output.part" "${JS_FILES[@]}"
  fi

  cat "$output.part"* | sort -V >"$output"
  rm -f "$output.part"*

  if [[ "$OUTPUT_FILE" != "" ]]; then
    if [[ -f "$ENGINE_JSON" ]]; then
      echo "Metadata: $(cat "$ENGINE_JSON" | tr '\n' ' ' | sed 's/\s\+/ /g; s/{ /{/g; s/ }/}/g; s/ *$//')" >"$OUTPUT_FILE"
    else
      rm -f "$OUTPUT_FILE"
    fi
    cat "$output" >>"$OUTPUT_FILE"
  fi

  local total=$(cat "$output" | wc -l)
  local passed=$(cat "$output" | grep '^[^:]*: OK$' | wc -l)
  local failed=$((total - passed))

  if [[ "$failed" != 0 ]]; then
    if ((2 * failed >= total)); then
      printf "\033[1;31m❌ %s: %d/%d (%d%%) passed, %d test(s) failed:\033[0m\n" \
             "$ENGINE_NAME" "$passed" "$total" "$((passed * 100 / total))" "$failed"
    else
      # majority passed
      printf "\033[1;31m❌ %s: \033[1;33m%d/%d (%d%%) passed\033[1;31m, %d test(s) failed:\033[0m\n" \
             "$ENGINE_NAME" "$passed" "$total" "$((passed * 100 / total))" "$failed"
    fi
    cat "$output" | grep -v '^[^:]*: OK' | sed 's/:.*//' | tr '\n' ' '
    echo
  else
    printf "\033[1;32m✅ %s: %d tests passed\033[0m\n" "$ENGINE_NAME" "$passed"
  fi

  rm -f "$output"
}

main
