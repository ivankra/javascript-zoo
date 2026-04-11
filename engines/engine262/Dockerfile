# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/engine262/engine262.git
ARG REV=main

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" --recurse-submodules --shallow-submodules "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && \
     git submodule update --init --depth=1 --recommend-shallow)) && \
    git submodule update --init --depth=1 --recommend-shallow && \
    git rev-parse HEAD

RUN npm install
RUN npm run build

# Bundle everything including the main script
# Have to manually inline createRequire-imported package.json
RUN sed -Ei -e 's/(const packageJson =).*/\1/; /const packageJson =/r package.json' lib/node/bin.mjs
RUN npx esbuild lib/node/bin.mjs --outfile=/dist/engine262 --bundle --platform=node --format=esm --external:node:*

COPY build/dist.py ./
RUN ./dist.py /dist/engine262

# Alternative wrappers using javascript shells instead of nodejs as host runtimes.
# Both d8 and jsc are much faster than nodejs.
COPY engines/engine262/main.js ./
RUN npx esbuild main.js --outfile=main.bundle.js --bundle --platform=browser --format=iife --external:fs
RUN (echo '#!/bin/bash'; echo '//bin/true; SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")"); exec "$SCRIPT_DIR/jsc" "$0" -- "$@"'; cat main.bundle.js) >/dist/engine262_jsc
RUN ./dist.py /dist/engine262_jsc --no-test console_log=console.log
RUN (echo '#!/bin/bash'; echo '//bin/true; SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")"); exec "$SCRIPT_DIR/v8_full" "$0" -- "$@"'; cat main.bundle.js) >/dist/engine262_d8
RUN ./dist.py /dist/engine262_d8 --no-test console_log=console.log

# Run tests except slow/skipped using the project's official runner.
ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      echo >test/test262/failed && \
      CI=1 TEST262= node test/test262/test262.mts --vv --update-failed >test262.log; \
    fi || true
COPY engines/engine262/convert262.py ./
RUN python3 ./convert262.py test262.log -o /dist/engine262.test262 -b /dist/engine262 --test262-dir=test/test262/test262 || true
