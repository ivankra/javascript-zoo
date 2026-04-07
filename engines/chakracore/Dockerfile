# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

# Requires clang, gcc unsupported
ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/chakra-core/ChakraCore.git
ARG REV=master

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

# TODO: fix x64 build with --embed-icu, seems to use system ICU instead of downloaded
# ChakraICU.h:21:10: fatal error: 'unicode/uvernum.h' file not found
RUN apt-get update -y && apt-get install -y libicu-dev

# FULL=y: enable Intl support and test flags (especially -Test262)
ARG FULL=n
# JITLESS=y: JIT-less build
ARG JITLESS=n

RUN ./build.sh --ninja --static \
      $(if [ "$FULL" = y ]; then \
          echo --embed-icu --test-build; \
        else \
          echo --no-icu --without-intl; \
        fi) \
      $(if [ "$JITLESS" = y ] || [ "$(uname -m)" != "x86_64" ]; then \
          echo --no-jit; \
        fi)

COPY build/dist.py ./
RUN ./dist.py /dist/chakracore \
      --binary=$(ls /src/out/*/ch) \
      jit="$(grep DDISABLE_JIT=1 /src/out/*/build.ninja >/dev/null 2>&1 || echo true)"
