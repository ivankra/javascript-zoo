# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/oracle/graaljs.git
ARG REV=graal-25.0.1

# Download pre-built release

WORKDIR /dist
RUN wget "https://github.com/oracle/graaljs/releases/download/$REV/$(echo "$REV" | sed -e 's/graal/graaljs/')-linux-$(uname -m | sed -e 's/x86_64/amd64/').tar.gz" && \
    tar xf graaljs-*.tar.gz && \
    rm -f graaljs-*.tar.gz && \
    mv graaljs-* graaljs-dist

# Don't use symlinks - docker's COPY will f them up \
RUN echo >/dist/graaljs \
'#!/bin/bash'"\n"\
'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")'"\n"\
'"$SCRIPT_DIR/graaljs-dist/bin/js" "$@"' && \
    chmod a+rx /dist/graaljs && \
    /dist/graaljs --version | egrep -o '[0-9.]+' >jsz_version && \
    du -bc /dist/graaljs-* | tail -1 | cut -f 1 >jsz_dist_size && \
    sed -En 's/^SOURCE=".* graal-js:([0-9a-f]+) .*/\1/p' </dist/graaljs-dist/release >jsz_revision

ENV JS_BINARY=/dist/graaljs LICENSE=/dist/graaljs-dist/LICENSE.txt
CMD ${JS_BINARY}
