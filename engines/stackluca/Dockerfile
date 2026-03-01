# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/stackluca/v3.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

COPY engines/stackluca/stackluca.patch ./
RUN git apply stackluca.patch && make -C src -f makefile

COPY build/dist.py ./
RUN ./dist.py /dist/stackluca --binary=/src/src/v3js --license=/src/LICENSE console_log=print
