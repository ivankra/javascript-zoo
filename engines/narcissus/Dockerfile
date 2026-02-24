# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

# Many fixes needed to run the code on modern engines.
#ARG REPO=https://github.com/mozilla/narcissus.git
ARG REPO=https://github.com/ivankra/narcissus.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install && npm run build

# Much faster when run under SpiderMonkey
RUN mkdir -p /dist && \
    (echo '#!/bin/bash'; echo '//bin/true; SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")"); if [[ -x "$SCRIPT_DIR/spidermonkey" ]]; then exec "$SCRIPT_DIR/spidermonkey" "$0" "$@"; else exec node "$0" "$@"; fi;'; cat ./dist/njs.js | sed 1d) >/dist/narcissus

COPY build/dist.py ./
RUN ./dist.py /dist/narcissus
