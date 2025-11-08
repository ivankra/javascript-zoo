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
  if [[ -x "${binary}_full" ]]; then
    # Skip base binary if there's alternative full-featured binary with Intl.
    continue
  elif [[ "$engine" != *_full ]]; then
    # Ignore most other variants
    if [[ "$engine" != "${engine%_*}" &&
          ! "$engine" =~ (|tiny-js|mujs|js-interpreter|spidermonkey_[12]).* ]]; then
      continue
    fi
  fi

  if [[ "$1" == "--print" ]]; then
    echo "$(basename $binary)"
    continue
  elif [[ "$1" != "" ]]; then
    if [[ "$1" != "$binary" && "$1" != "$(basename $binary)" ]]; then
      continue
    fi
  fi

  skip=0
  suite=
  case "$engine" in
    bali|cesanta-mjs|cesanta-elk|echosoar-jsi|espruino|yrm006-miniscript)
      skip=1;;
    besen|cesanta-v7|dmdscript|flathead|jsish|mocha|quad-wheel|tiny-js|ucode)
      suite=es[1-5]/;;
  esac

  if ((skip)); then
    continue
  fi

  echo "=== Testing $binary ==="
  if ! ./run.sh -o "$script_dir/$engine.txt.tmp" "$binary" $suite; then
    echo "run.sh $binary failed"
    continue
  fi

  mv -f "$script_dir/$engine.txt.tmp" "$script_dir/$engine.txt"
  cp -f "$binary.json" "$script_dir/$engine.json"
done

rm -f "$tmpfile"
