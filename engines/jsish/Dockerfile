# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/pcmacdon/jsish.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN CFLAGS="-O3" make -j1

COPY build/dist.py ./
RUN ./dist.py /dist/jsish --binary=/src/jsish
