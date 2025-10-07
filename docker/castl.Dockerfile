ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/PaulBernier/castl.git
ARG REV=master

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN apt-get update -y && apt-get install -y --no-install-recommends luajit

# Regex dependency (optional)
#RUN apt-get update -y && apt-get install -y --no-install-recommends luajit luarocks libpcre3 libpcre3-dev
#RUN luarocks install lrexlib-pcre PCRE_LIBDIR=/usr/lib/$(uname -m)-linux-gnu

RUN npm install && npm install esbuild

RUN mkdir -p /dist && \
    # Bundle all js code into /dist/castl.js \
    # TODO: bundle babel modules \
    # TODO: pure-Lua dist \
    sed -i 's/require(parsername)/parsername == "acorn" ? require("acorn") : require("esprima")/' bin/castl.js && \
    npx esbuild /src/bin/castl.js --bundle --platform=node --outfile=/dist/castl.js && \
    cp -r /src/lua /dist/castl-lua && \
    echo >/dist/castl \
'#!/bin/bash'"\n"\
'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")'"\n"\
'export LUA_PATH="$SCRIPT_DIR/castl-lua/?.lua"'"\n"\
'node "$SCRIPT_DIR/castl.js" --jit "$@"' && \
    chmod a+rx /dist/castl && \
    # JavaScript code is in principle unnecessary after build \
    du -bc /dist/castl-lua | tail -1 | cut -f 1 >jsz_binary_size

ENV JS_BINARY=/dist/castl
CMD ${JS_BINARY}
