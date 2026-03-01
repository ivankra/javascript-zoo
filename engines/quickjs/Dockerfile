# clang produces significantly more performant builds than gcc.
# LTO inconsistently helps, default off.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/bellard/quickjs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

# -O3 instead of default -O2 for consistency with quickjs-ng and other engines
ARG OPT=-O3
# LTO=y to enable link-time optimization
ARG LTO=

RUN git rev-parse --short=8 HEAD >VERSION && \
    sed -i "s/ -O2/ $OPT/" Makefile && \
    if ${CC:-cc} --version 2>&1 | grep -q clang; then export CONFIG_CLANG=y; fi; \
    if [ "$LTO" = y ]; then export CONFIG_LTO=y; fi; \
    make -j$(nproc) qjs

COPY build/dist.py ./
RUN ./dist.py /dist/quickjs --binary=/src/qjs
