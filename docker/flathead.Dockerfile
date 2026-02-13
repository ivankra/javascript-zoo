# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/ndreynolds/flathead.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN apt-get update -y && apt-get install -y --no-install-recommends libreadline-dev
RUN sed -i -e 's/yycolumn/yycolumn2/' src/lexer.l && \
    (make -j regexp=off HAS_FPU=yes || true) && \
    make -j regexp=off HAS_FPU=yes

COPY dist.py ./
RUN ./dist.py /dist/flathead --binary=/src/bin/flat
