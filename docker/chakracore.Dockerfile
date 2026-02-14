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

# TODO: fix x64 build with --embed-icu, seems to use system ICU instead of downloaded
# ChakraICU.h:21:10: fatal error: 'unicode/uvernum.h' file not found
RUN apt-get update -y && apt-get install -y libicu-dev

RUN ./build.sh --ninja --static \
      $([ "$INTL" = true ] && echo --embed-icu) \
      $([ "$INTL" != true ] && echo --no-icu --without-intl) \
      $([ "$JITLESS" = true -o `uname -m` = aarch64 ] && echo --no-jit)

COPY dist.py ./
RUN ./dist.py /dist/chakracore \
      --binary=/src/out/Release/ch \
      jit="$(grep DDISABLE_JIT=1 /src/out/Release/build.ninja >/dev/null 2>&1 || echo true)"
