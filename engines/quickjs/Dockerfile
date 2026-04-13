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

COPY engines/quickjs/no-can-block.patch ./
RUN git apply no-can-block.patch || true

RUN git rev-parse --short=8 HEAD >VERSION && \
    sed -i "s/ -O2/ $OPT/" Makefile && \
    if ${CC:-cc} --version 2>&1 | grep -q clang; then export CONFIG_CLANG=y; fi; \
    if [ "$LTO" = y ]; then export CONFIG_LTO=y; fi; \
    make -j$(nproc)

COPY build/dist.py ./
RUN ./dist.py /dist/quickjs --binary=/src/qjs

# DIST262=y: package run-test262 binary as well
ARG DIST262=y
RUN if [ $DIST262 = y ]; then ./dist.py /dist/quickjs_262 --binary=/src/run-test262 --no-test; fi

ARG TEST262=y
RUN if [ "$TEST262" = y ] && [ "$DIST262" = y ]; then \
      make test2-bootstrap && make test2; \
    fi || true
COPY engines/quickjs/convert262.py ./
RUN python3 ./convert262.py test262_report.txt -o /dist/quickjs_262.test262 -b /dist/quickjs --test262-dir=test262 || true
