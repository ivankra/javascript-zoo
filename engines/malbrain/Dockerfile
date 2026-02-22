# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/malbrain/javascript-database.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"
RUN git submodule update --init --recursive

COPY engines/malbrain/malbrain.patch ./
RUN git apply malbrain.patch

RUN bash ./build.linux

#TODO: mkdir -p /dist/malbrain-dist && cp jsdb system*.js /dist/malbrain-dist/

COPY build/dist.py ./
RUN ./dist.py /dist/malbrain --binary=/src/jsdb --no-license console_log=print
