# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/bramblex/jsjs.git
ARG REV=master

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN npm install
RUN npx webpack

RUN npm install esbuild
COPY engines/bramblex/main.js ./
RUN npx esbuild main.js --outfile=/dist/bramblex --bundle --platform=node

COPY build/dist.py ./
RUN ./dist.py /dist/bramblex --no-license
