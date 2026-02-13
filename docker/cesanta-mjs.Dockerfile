# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/cesanta/mjs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN cc -O3 -DMJS_MAIN -o mjs mjs.c

COPY dist.py ./
RUN ./dist.py /dist/cesanta-mjs --binary=/src/mjs
