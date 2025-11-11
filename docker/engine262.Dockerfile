# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/engine262/engine262.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install
RUN npm run build

# Bundle everything including the main script
# Have to manually inline createRequire-imported package.json
RUN sed -Ei -e 's/(const packageJson =).*/\1/; /const packageJson =/r package.json' lib/node/bin.mjs && \
    npx esbuild lib/node/bin.mjs --outfile=/dist/engine262.js --bundle --platform=node --format=esm --external:node:* && \
    npx esbuild lib/node/bin.mjs --outfile=/dist/engine262.min.js --bundle --platform=node --format=esm --external:node:* --minify && \
    ln -s engine262.js /dist/engine262 && \
    du -bc /dist/engine262.min.js | tail -1 | cut -f 1 >/dist/jsz_dist_size

ENV JS_BINARY=/dist/engine262
CMD ${JS_BINARY}
