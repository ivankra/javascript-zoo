#!/bin/bash
# Test all binaries in /dist

SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")
cd "$SCRIPT_DIR/.."

for binary in /dist/*; do
  if ! [[ -f "$binary" && -x "$binary" && -f "$binary.json" ]]; then
    continue
  fi

  if [[ -x "${binary}_full" ]]; then
    # Skip base binary if there's alternative full-featured binary with Intl.
    continue
  fi

  # Ignore most variants
  engine="$(basename -- "$binary")"
  if [[ "$engine" != "${engine%_*}" && ! "$engine" =~ ^(.*_full|tiny-js|mujs|js-interpreter|spidermonkey_[12]).* ]]; then
    continue
  fi

  suite=
  case "$engine" in
    bali|cesanta-elk|echosoar-jsi|espruino|yrm006-miniscript)
      continue;;
    #besen|cesanta-v7|dmdscript|flathead|jsish|mocha|quad-wheel|tiny-js|ucode)
    besen)
      suite=es[1-5]/;;
  esac

  (set -x; ./run.sh -o "$SCRIPT_DIR/$engine.txt" -j 8 --next "$binary" $suite)
done
