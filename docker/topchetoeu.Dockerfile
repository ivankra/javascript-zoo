# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

#ARG REPO=https://github.com/TopchetoEU/jscript.git
#ARG REPO=https://git.topcheto.eu/topchetoeu/j2s.git
ARG REPO=https://github.com/ivankra/topchetoeu.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN apt-get install -y --no-install-recommends openjdk-21-jdk-headless nodejs npm

RUN cd /opt && wget https://services.gradle.org/distributions/gradle-8.5-bin.zip && \
    echo '9d926787066a081739e8200858338b4a69e837c3a821a33aca9db09dd4a41026  gradle-8.5-bin.zip' | sha256sum -c && \
    unzip gradle-8.5-bin.zip && \
    ln -sf /opt/gradle-8.5/bin/gradle /usr/bin/gradle

RUN cd lib && npm install

RUN gradle build

RUN mkdir -p /dist && \
    cp /src/build/libs/j2s-repl-*-beta-all.jar /dist/topchetoeu.jar && \
    echo >/dist/topchetoeu \
'#!/bin/bash'"\n"\
'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")'"\n"\
'exec java -jar "$SCRIPT_DIR/topchetoeu.jar" "$@"' && \
    chmod a+rx /dist/topchetoeu && \
    du -bc /dist/topchetoeu.jar | tail -1 | cut -f 1 >jsz_dist_size

ENV JS_BINARY=/dist/topchetoeu
CMD ${JS_BINARY}
