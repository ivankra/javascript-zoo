# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/svaarala/duktape.git
ARG REV=master

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN apt-get update -y && apt-get install -y --no-install-recommends nodejs npm bc

RUN sed -i "s/ -Os / -O3 /; s|^CC := .*|CC := $CC|" Makefile
RUN make -j all

COPY build/dist.py ./
RUN ./dist.py /dist/duktape --binary=/src/build/duk
