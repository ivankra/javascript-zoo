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

# TEST262=y: package run-test262 binary as well
ARG TEST262=
RUN if [ $TEST262 = y ]; then ./dist.py /dist/quickjs-ng_262 --binary=/src/build/run-test262 --no-test; fi
