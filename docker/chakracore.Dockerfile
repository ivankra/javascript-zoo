# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

# Requires clang, gcc unsupported
ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/chakra-core/ChakraCore.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

ARG INTL=
ARG JITLESS=

RUN ./build.sh --ninja --static \
      $(if [ "$INTL" = true ]; then echo --embed-icu; else echo --no-icu --without-intl; fi) \
      $(if [ "$JITLESS" = true ]; then echo --no-jit; fi)

ENV JS_BINARY=/src/out/Release/ch
CMD ${JS_BINARY} /bench/repl.js
