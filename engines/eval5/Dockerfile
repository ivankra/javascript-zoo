# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/bplok20010/eval5.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN install -D /src/umd/eval5.js /dist/eval5-dist/eval5.js
COPY engines/eval5/main.js /dist/eval5

COPY build/dist.py ./
RUN ./dist.py /dist/eval5
