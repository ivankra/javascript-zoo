# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc15
FROM $BASE

ARG REPO=https://github.com/jow-/ucode.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN apt-get update -y && apt-get install -y --no-install-recommends libjson-c-dev

#RUN sed -i 's/-Os /-O3 /' CMakeLists.txt
RUN cmake -B build && cmake --build build -j

RUN mkdir -p /dist && \
    cp -a build /dist/ucode-dist && \
    cd /dist/ucode-dist && \
    rm -rf examples/ CMake* cmake* Makefile && \
    (strip * || true) && \
    echo >/dist/ucode \
'#!/bin/bash'"\n"\
'LIB=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")/ucode-dist'"\n"\
'LD_LIBRARY_PATH="$LIB" "$LIB/ucode" "-L$LIB" "$@"' && \
    chmod a+rx /dist/ucode && \
    # Only the core interpreter, without optional modules \
    du -bc /dist/ucode-dist/ucode /dist/ucode-dist/libucode.so.0 | tail -1 | cut -f 1 >/dist/jsz_binary_size

ENV JS_BINARY=/dist/ucode
# No REPL
