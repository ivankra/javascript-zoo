# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/bnoordhuis/quickjit.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY quickjit.c ./

RUN sed -i 's/CFLAGS = .*/CFLAGS = -Wall -O3/' Makefile && \
    make -j && \
    gcc -o quickjit -O3 quickjit.c libquickjit.a -lm

ENV JS_BINARY=/src/quickjit
CMD ${JS_BINARY}
