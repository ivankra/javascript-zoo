# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/nyariv/SandboxJS.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install && npm install esbuild && npm run build

COPY sandboxjs.js ./

RUN npx esbuild sandboxjs.js --outfile=/dist/sandboxjs --bundle --platform=node && \
    du -bc /dist/sandboxjs | tail -1 | cut -f 1 >/dist/jsz_dist_size

ENV JS_BINARY=/dist/sandboxjs
# No REPL
