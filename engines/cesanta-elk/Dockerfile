# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/cesanta/elk.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

COPY engines/cesanta-elk/cesanta-elk.c ./
RUN cc -o elk -O3 -I. -DJS_DUMP elk.c cesanta-elk.c #examples/cmdline/main.c

COPY build/dist.py ./
RUN ./dist.py /dist/cesanta-elk --binary=/src/elk
