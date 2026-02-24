# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/engine262/engine262.git
ARG REV=main

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN npm install
RUN npm run build

# Bundle everything including the main script
# Have to manually inline createRequire-imported package.json
RUN sed -Ei -e 's/(const packageJson =).*/\1/; /const packageJson =/r package.json' lib/node/bin.mjs
RUN npx esbuild lib/node/bin.mjs --outfile=/dist/engine262 --bundle --platform=node --format=esm --external:node:*

COPY build/dist.py ./
RUN ./dist.py /dist/engine262

# Alternative wrapper using JavaScriptCore shell as host instead of Node
COPY engines/engine262/main.js ./
RUN npx esbuild main.js --outfile=engine262_jsc.js --bundle --platform=browser --format=iife --external:fs
RUN (echo '#!/bin/bash'; echo '//bin/true; SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")"); exec "$SCRIPT_DIR/jsc" "$0" -- "$@"'; cat engine262_jsc.js) >/dist/engine262_jsc
RUN ./dist.py /dist/engine262_jsc console_log=console.log
