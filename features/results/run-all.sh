#!/bin/bash
# Test all binarys in /dist

script_dir=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")
cd "$script_dir/.."

tmpfile=$(mktemp)

for binary in /dist/*; do
  if ! [[ -f "$binary" && -x "$binary" && -f "$binary.json" ]]; then
    continue
  fi

  engine="$(basename -- "$binary")"
  if [[ "$engine" != "${engine%_*}" &&
        ! "$engine" =~ (tiny-js|mujs|js-interpreter|spidermonkey_1).* ]]; then
    # ignore most variants
    continue
  fi

  skip=0
  suite=
  case "$engine" in
    # TODO v8|jsc|spidermonkey|chakracore|hermes)
    #   engine+="_intl";;
    bali|cesanta-mjs|cesanta-elk|echosoar-jsi|espruino|yrm006-miniscript)
      skip=1;;
    besen|cesanta-v7|dmdscript|flathead|jsish|mocha|quad-wheel|tiny-js|ucode)
      suite=es[1-5]/;;
  esac

  if ((skip)); then
    continue
  fi

  echo "=== Testing $binary ==="
  cp -f "$binary.json" "$script_dir/$engine.json"
  (set -x; ./run.sh -o "$script_dir/$engine.txt" "$binary" $suite)
  echo
done

rm -f "$tmpfile"
