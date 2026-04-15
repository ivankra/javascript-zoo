# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/zhuzilin/es.git
RUN git clone --depth=1 "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN mkdir -p bin && ${CXX:-c++} -o bin/es es.cc -std=c++17 -I. -include cstdint -include memory

COPY build/dist.py ./
RUN ./dist.py /dist/zhuzilin --binary=/src/bin/es
