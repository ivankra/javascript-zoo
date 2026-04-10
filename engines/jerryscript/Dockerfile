# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/jerryscript-project/jerryscript.git
ARG REV=master

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

# Fix arm64 linux build
RUN sed -i '/CMAKE_C_COMPILER/d' cmake/toolchain_linux_aarch64.cmake

# Builds with -Os by default (MinSizeRel).
# Set to Release to build with -O3, but ~70% larger binary!
ARG CMAKE_BUILD_TYPE=MinSizeRel

# --mem-heap=65536 needed to pass splay.js
RUN python tools/build.py \
      --mem-heap=65536 \
      --build-type="$CMAKE_BUILD_TYPE" \
      --cmake-param=-DCMAKE_C_COMPILER="$CC" \
      --compile-flag=-w

COPY build/dist.py ./
RUN ./dist.py /dist/jerryscript --binary=/src/build/bin/jerry

ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      python3 tools/run-tests.py --test262 update --buildoptions=--compile-flag=-w && \
      cp ./build/tests/test262/local/bin/test262.report /dist/jerryscript.test262.log && \
      git -C tests/test262/esnext rev-parse HEAD >/dist/jerryscript.test262.rev; \
    fi || true
