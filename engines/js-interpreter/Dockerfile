# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/NeilFraser/JS-Interpreter.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install esbuild

COPY engines/js-interpreter/js-interpreter.js ./

RUN npx esbuild js-interpreter.js --outfile=/dist/js-interpreter --bundle --platform=node

COPY build/dist.py ./
RUN ./dist.py /dist/js-interpreter

# Alternative wrapper using JavaScriptCore shell as host (faster than Node/V8)
RUN (echo '#!/bin/bash'; echo '//bin/true; SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")"); exec "$SCRIPT_DIR/jsc" "$0" -- "$@"'; cat /dist/js-interpreter | sed 1d) >/dist/js-interpreter_jsc
RUN ./dist.py /dist/js-interpreter_jsc console_log=console.log
