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

RUN npm install && npm run build && \
    mkdir -p /dist && cp ./dist/njs.js /dist/narcissus.js

# Much faster when run under SpiderMonkey
COPY dist.py ./
RUN ./dist.py /dist/narcissus \
      --dist_files=/dist/narcissus.js \
      --wrapper='if [[ -x "$SCRIPT_DIR/spidermonkey" ]]; then exec "$SCRIPT_DIR/spidermonkey" "$SCRIPT_DIR/narcissus.js" "$@"; else exec node "$SCRIPT_DIR/narcissus.js" "$@"; fi'
