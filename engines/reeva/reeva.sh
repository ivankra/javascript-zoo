#!/bin/bash
SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")
JAR="$SCRIPT_DIR/reeva-dist/reeva.jar"
CACHE="$SCRIPT_DIR/reeva-dist/reeva.aot"

# Use AOT compilation cache to speed up startup
if [[ -f "$CACHE" ]]; then
  exec java -XX:AOTCache="$CACHE" -jar "$JAR" "$@"
fi

# First invocation: train AOT cache under flock. Concurrent callers skip to plain java.
if flock -n "$CACHE.lock" java -XX:AOTCacheOutput="$CACHE" -jar "$JAR" "$@"; then
  exit 0
fi

exec java -jar "$JAR" "$@"
