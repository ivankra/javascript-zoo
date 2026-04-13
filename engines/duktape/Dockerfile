# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/svaarala/duktape.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN apt-get update -y && apt-get install -y --no-install-recommends nodejs npm bc

RUN sed -i "s/ -Os / -O3 /; s|^CC := .*|CC := $CC|" Makefile
RUN make -j all

COPY build/dist.py ./
RUN ./dist.py /dist/duktape --binary=/src/build/duk
