# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/ivankra/continuum.git
ARG REV=gh-pages

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

# Use Node's fs module instead of a fake browser stub
RUN sed -i 's/^    fs: {/    browser_fs: {/' continuum.js && \
    sed -i "/function require(request){/a\\    if (request === 'fs') return module.require('fs');" continuum.js

RUN install -D /src/continuum.js /dist/continuum-dist/continuum.js

COPY engines/continuum/main.js /dist/continuum

COPY build/dist.py ./
RUN ./dist.py /dist/continuum
