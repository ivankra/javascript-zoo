ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/openjdk/nashorn.git
ARG REV=main

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN apt-get install -y --no-install-recommends openjdk-25-jdk-headless ant
RUN cd make/nashorn && ant jar

RUN mkdir -p /dist/nashorn-dist && \
    cp /src/build/nashorn/dist/*.jar /dist/nashorn-dist && \
    cp /src/build/nashorn/dependencies/*.jar /dist/nashorn-dist && \
    echo >/dist/nashorn \
'#!/bin/bash'"\n"\
'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")'"\n"\
'java -cp "$SCRIPT_DIR/nashorn-dist/*" --add-exports=jdk.internal.le/jdk.internal.org.jline.{reader,reader.impl,reader.impl.completer,terminal,keymap}=ALL-UNNAMED org.openjdk.nashorn.tools.jjs.Main --language=es6 "$@"' && \
    chmod a+rx /dist/nashorn && \
    git describe --tags | sed -e 's/^release-//' >jsz_version && \
    du -bc /dist/nashorn-dist | tail -1 | cut -f 1 >jsz_dist_size

ENV JS_BINARY=/dist/nashorn
CMD ${JS_BINARY}

# Useful flags:
#   --language=es5/es6
#   -ot (optimistic types): may or may not help on some tests
