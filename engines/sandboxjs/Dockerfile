# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/nyariv/SandboxJS.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN npm install && npm install esbuild && npm run build

COPY engines/sandboxjs/sandboxjs.js ./

RUN npx esbuild sandboxjs.js --outfile=/dist/sandboxjs --bundle --platform=node

COPY build/dist.py ./
RUN ./dist.py /dist/sandboxjs
