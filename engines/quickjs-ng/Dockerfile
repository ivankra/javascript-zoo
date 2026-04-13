# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/quickjs-ng/quickjs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN make

COPY build/dist.py ./
RUN ./dist.py /dist/quickjs-ng --binary=/src/build/qjs

# DIST262=y: package run-test262 binary as well
ARG DIST262=n
RUN if [ $DIST262 = y ]; then ./dist.py /dist/quickjs-ng_262 --binary=/src/build/run-test262 --no-test; fi

ARG TEST262=y
RUN if [ "$TEST262" = y ] && [ "$DIST262" = y ]; then \
      git submodule update --init --checkout --depth 1 && \
      echo >test262_errors.txt && \
      make test262-update; \
    fi || true
COPY engines/quickjs/convert262.py ./
RUN python3 ./convert262.py test262_errors.txt -o /dist/quickjs-ng_262.ci-test262 -e quickjs-ng -b /dist/quickjs-ng --test262-dir=test262 || true
