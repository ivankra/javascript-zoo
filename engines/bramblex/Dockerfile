# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/bramblex/jsjs.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN npm install
RUN npx webpack

RUN npm install esbuild
COPY engines/bramblex/main.js ./
RUN npx esbuild main.js --outfile=/dist/bramblex --bundle --platform=node

COPY build/dist.py ./
RUN ./dist.py /dist/bramblex --no-license
