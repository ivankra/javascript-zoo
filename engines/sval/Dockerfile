# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/Siubaak/sval.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN npm install
RUN npm run build

RUN npm install esbuild
COPY engines/sval/main.js ./
RUN npx esbuild main.js --outfile=/dist/sval --bundle --platform=node

COPY build/dist.py ./
RUN ./dist.py /dist/sval
