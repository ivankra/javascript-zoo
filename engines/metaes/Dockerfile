# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/metaes/metaes.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN npm ci && npm install esbuild && npm run dist:compile

COPY engines/metaes/main.js ./
RUN npx esbuild main.js --outfile=/dist/metaes --bundle --platform=node

COPY build/dist.py ./
RUN ./dist.py /dist/metaes --license=README.md
