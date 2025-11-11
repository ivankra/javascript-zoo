# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/TopchetoEU/jscript.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN apt-get install -y --no-install-recommends openjdk-21-jdk-headless nodejs npm

RUN cd /tmp && wget https://services.gradle.org/distributions/gradle-8.5-bin.zip && \
    unzip -q gradle-8.5-bin.zip && \
    mv gradle-8.5 /opt/gradle && \
    ln -sf /opt/gradle/bin/gradle /usr/bin/gradle

RUN npm install

COPY topchetoeu.patch ./
RUN git apply topchetoeu.patch

RUN gradle build

RUN mkdir -p /dist && \
    cp /src/build/libs/jscript-*.jar /dist/topchetoeu.jar && \
    echo >/dist/topchetoeu \
'#!/bin/bash'"\n"\
'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")'"\n"\
'java -jar "$SCRIPT_DIR/topchetoeu.jar" "$@"' && \
    chmod a+rx /dist/topchetoeu && \
    du -bc /dist/topchetoeu.jar | tail -1 | cut -f 1 >jsz_dist_size

ENV JS_BINARY=/dist/topchetoeu
CMD ${JS_BINARY}
