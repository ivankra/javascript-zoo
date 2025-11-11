# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/yrm006/miniscript.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY yrm006-miniscript.c ./
RUN gcc -O3 -o miniscript miniscript.c mslib.c yrm006-miniscript.c #readme.c

ENV JS_BINARY=/src/miniscript
