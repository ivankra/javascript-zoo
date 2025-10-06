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
    npx esbuild lib/node/bin.mjs --bundle --outfile=/dist/engine262.js --platform=node --format=esm --external:node:* && \
    echo >/dist/engine262 \
'#!/bin/bash'"\n"\
'node "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"/engine262.js "$@"' && \
    chmod a+rx /dist/engine262

ENV JS_BINARY=/dist/engine262
CMD ${JS_BINARY}
