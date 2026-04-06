#!/bin/bash
SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")
JARS="$SCRIPT_DIR/nashorn-dist/*"
CACHE="$SCRIPT_DIR/nashorn-dist/nashorn.aot"
JAVA_ARGS=(-cp "$JARS" --add-exports=jdk.internal.le/jdk.internal.org.jline.{reader,reader.impl,reader.impl.completer,terminal,keymap}=ALL-UNNAMED org.openjdk.nashorn.tools.jjs.Main --language=es6)

# Use AOT compilation cache to speed up startup
if [[ -f "$CACHE" ]]; then
  exec java -XX:AOTCache="$CACHE" "${JAVA_ARGS[@]}" "$@"
fi

# First invocation: train AOT cache under flock. Concurrent callers skip to plain java.
if flock -n "$CACHE.lock" java -XX:AOTCacheOutput="$CACHE" "${JAVA_ARGS[@]}" "$@"; then
  exit 0
fi

exec java "${JAVA_ARGS[@]}" "$@"
