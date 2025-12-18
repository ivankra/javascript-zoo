# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/quickjs-ng/quickjs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

# LTO=y to enable link-time optimization
ARG LTO=

RUN cmake \
      -B build \
      -DCMAKE_BUILD_TYPE=Release \
      -DCMAKE_INSTALL_PREFIX=/usr/local \
      $(if [ $LTO = y ]; then echo -DCMAKE_INTERPROCEDURAL_OPTIMIZATION=ON; fi) && \
    cmake --build build -j$(nproc)

ENV JS_BINARY=/src/build/qjs
CMD ${JS_BINARY}
