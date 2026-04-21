#!/bin/bash
SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")
JAVA_FLAGS="--enable-native-access=ALL-UNNAMED"
JAR="$SCRIPT_DIR/rhino-dist/rhino.jar"
CACHE="$SCRIPT_DIR/rhino-dist/rhino.aot"

# Use AOT compilation cache to speed up startup (JVM 25+)
JAVA_VER=$(java --version 2>&1 | egrep -o '[0-9]+' | head -1)
if [[ -n "$JAVA_VER" && "$JAVA_VER" -ge 25 ]]; then
  if [[ -f "$CACHE" ]]; then
    exec java $JAVA_FLAGS -XX:AOTCache="$CACHE" -jar "$JAR" "$@"
  fi

  # First invocation: train AOT cache under flock. Concurrent callers skip to plain java.
  if flock -n "$CACHE.lock" java $JAVA_FLAGS -XX:AOTCacheOutput="$CACHE" -jar "$JAR" "$@"; then
    exit 0
  fi
fi

exec java $JAVA_FLAGS -jar "$JAR" "$@"
