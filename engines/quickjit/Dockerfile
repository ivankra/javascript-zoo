# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/bnoordhuis/quickjit.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY engines/quickjit/quickjit.c ./

RUN sed -i 's/CFLAGS = .*/CFLAGS = -Wall -O3/' Makefile && \
    make -j && \
    cc -o quickjit -O3 quickjit.c libquickjit.a -lm

COPY build/dist.py ./
RUN ./dist.py /dist/quickjit --binary=/src/quickjit
