# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/bplok20010/eval5.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN install -D /src/umd/eval5.js /dist/eval5-dist/eval5.js
COPY engines/eval5/main.js /dist/eval5

COPY build/dist.py ./
RUN ./dist.py /dist/eval5
