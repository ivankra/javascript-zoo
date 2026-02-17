#!/bin/bash
SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")

FILE="$1"
if [[ -z "$FILE" ]]; then
  echo "Usage: $0 script.js" >&2
  exit 1
fi

if [[ "$FILE" != /* ]]; then
  FILE="$PWD/$FILE"
fi

exec "$SCRIPT_DIR/starlingmonkey-dist/wasmtime" -S http --dir / "$SCRIPT_DIR/starlingmonkey-dist/starling.wasm" --legacy-script "$FILE"
