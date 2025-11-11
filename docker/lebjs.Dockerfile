# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/LebsterFace/LebJS.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN apt-get install -y --no-install-recommends openjdk-25-jdk-headless ant

RUN javac -d out $(find src -name "*.java") && \
    mkdir -p out/META-INF && \
    cp src/META-INF/MANIFEST.MF out/META-INF/ && \
    jar cfm lebjs.jar out/META-INF/MANIFEST.MF -C out .

RUN mkdir -p /dist && \
    cp lebjs.jar /dist/ && \
    echo >/dist/lebjs \
'#!/bin/bash'"\n"\
'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")'"\n"\
'java -jar "$SCRIPT_DIR/lebjs.jar" "$@"' && \
    chmod a+rx /dist/lebjs && \
    du -bc /dist/lebjs.jar | tail -1 | cut -f 1 >jsz_dist_size

ENV JS_BINARY=/dist/lebjs
CMD ${JS_BINARY}
