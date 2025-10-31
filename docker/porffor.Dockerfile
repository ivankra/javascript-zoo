ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/CanadaHonk/porffor.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install --prefix=/dist/porffor-dist "$REPO#$REV"

RUN echo >/dist/porffor \
'#!/bin/bash'"\n"\
'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")'"\n"\
'node "$SCRIPT_DIR"/porffor-dist/node_modules/porffor/runtime/index.js "$@"' && \
    chmod a+rx /dist/porffor

ENV JS_BINARY=/dist/porffor
CMD ${JS_BINARY}
