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

# Wrapper to run with JavaScriptCore shell (faster than Node/V8)
RUN ./dist.py /dist/js-interpreter_jsc \
      --wrapper='exec "$SCRIPT_DIR"/jsc "$SCRIPT_DIR/js-interpreter" -- "$@"' \
      --dist_files=/dist/js-interpreter \
      console_log=console.log
