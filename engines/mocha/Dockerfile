# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/doodlewind/mocha1995.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

# Workaround for a crash in PR_cnvtf/PR_dtoa on arm64
RUN sed -i -e 's/PR_cnvtf(buf, sizeof buf, 20, fval);/snprintf(buf, sizeof(buf), "%.16g", fval);/' src/mo_num.c

RUN sed -i -e 's/CC=clang/CC="clang -O3"/' build.sh && bash -c 'source ./build.sh && compile_native'

COPY build/dist.py ./
RUN ./dist.py /dist/mocha --binary=/src/out/mo_shell --no-license
