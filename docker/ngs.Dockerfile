# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/markkurossi/js.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN ./configure && make -j 1

ENV JS_BINARY=/src/src/js
RUN ${JS_BINARY} --version | egrep -o '[0-9.]*$' | head -1 >jsz_version
# No REPL
