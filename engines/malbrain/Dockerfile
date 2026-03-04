# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/malbrain/javascript-database.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD
RUN git submodule update --init --recursive

COPY engines/malbrain/malbrain.patch ./
RUN git apply malbrain.patch

RUN bash ./build.linux

#TODO: mkdir -p /dist/malbrain-dist && cp jsdb system*.js /dist/malbrain-dist/

# Bug: print(40+2) => "integer"
COPY build/dist.py ./
RUN ./dist.py /dist/malbrain \
      --binary=/src/jsdb \
      --no-license \
      smoke_test_js='print("4"+"2");' \
      smoke_test_output=42
