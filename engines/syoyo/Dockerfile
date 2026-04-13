# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/syoyo/lightjs.git
RUN git clone --depth=1 "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN cmake -S . -G Ninja -B build && \
    cmake --build build --target lightjs_repl

COPY build/dist.py ./
RUN ./dist.py /dist/syoyo --binary=/src/build/lightjs
