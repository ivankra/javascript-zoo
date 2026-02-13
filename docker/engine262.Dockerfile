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
    npx esbuild lib/node/bin.mjs --outfile=/dist/engine262 --bundle --platform=node --format=esm --external:node:*

COPY dist.py ./
RUN ./dist.py /dist/engine262
