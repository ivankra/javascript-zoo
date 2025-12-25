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

# Experimental Linux ARM64 patch. Only JIT-less build supported.
COPY chakracore-arm64.patch ./
RUN git apply chakracore-arm64.patch

# TODO: fix x64 build with --embed-icu, seems to use system ICU instead of downloaded
# ChakraICU.h:21:10: fatal error: 'unicode/uvernum.h' file not found
RUN apt-get update -y && apt-get install -y libicu-dev

RUN ./build.sh --ninja --static \
      $(if [ "$INTL" = true ]; then echo --embed-icu; else echo --no-icu --without-intl; fi) \
      $(if [ "$JITLESS" = true -o `uname -m` = aarch64 ]; then echo --no-jit; echo "" >jsz_jit; fi)

ENV JS_BINARY=/src/out/Release/ch
CMD ${JS_BINARY} /bench/repl.js
