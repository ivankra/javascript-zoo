# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/zhuzilin/es.git
ARG REV=main

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN mkdir -p bin && ${CXX:-c++} -o bin/es es.cc -std=c++17 -I. -include cstdint -include memory

COPY build/dist.py ./
RUN ./dist.py /dist/zhuzilin --binary=/src/bin/es console_log=console.log
