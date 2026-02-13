# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/NeilFraser/JS-Interpreter.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install esbuild

COPY js-interpreter.js ./

RUN npx esbuild js-interpreter.js --outfile=/dist/js-interpreter --bundle --platform=node

COPY dist.py ./
RUN ./dist.py /dist/js-interpreter
