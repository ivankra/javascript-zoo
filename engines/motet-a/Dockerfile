# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/motet-a/toy.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY engines/motet-a/motet-a.patch ./
RUN git apply motet-a.patch

RUN make release

COPY build/dist.py ./
RUN ./dist.py /dist/motet-a --binary=/src/toy console_log=print
