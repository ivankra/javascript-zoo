# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/yrm006/miniscript.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY yrm006-miniscript.c ./
RUN cc -O3 --std=c99 -o miniscript miniscript.c mslib.c yrm006-miniscript.c #readme.c

COPY dist.py ./
RUN ./dist.py /dist/yrm006-miniscript --binary=/src/miniscript --no-license console_log=print
