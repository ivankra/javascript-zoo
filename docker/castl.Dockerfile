ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/PaulBernier/castl.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN apt-get update -y && \
    apt-get install -y luajit luarocks libpcre2-dev && \
    # Optional runtime dependency for regex support \
    luarocks install lrexlib-pcre2

RUN npm install && npm install esbuild

RUN mkdir -p /dist && \
    # Fix race condition (.script.lua deleted before luajit reads it) \
    sed -i 's|^\(fs.unlinkSync.*\);|//\1|' bin/castl.js && \
    sed -i '/function execCallback.*/a\ if (fs.existsSync(tmpFilename)) fs.unlinkSync(tmpFilename);' bin/castl.js && \
    # Use newer libpcre2 instead of obsolete libpcre3 \
    sed -i 's/"rex_pcre"/"rex_pcre2"/' lua/castl/modules/regexphelper.lua && \
    # Adjust LUA_PATH in js in case it's called without bash wrapper \
    sed -i 's| + ";/usr| + ";" + __dirname + "/castl-dist/?.lua;/usr|' bin/castl.js && \
    # Fix indirect require(), so that esbuild would bundle acorn and esprima. \
    # ~70kb minified js per parser \
    sed -i 's/require(parsername)/parsername == "acorn" ? require("acorn") : require("esprima")/' bin/castl.js && \
    # Make babel an optional runtime dependency - problematic to bundle, huge \
    sed -i '/var babel =/d; s/ babel\./ require("babel-core")./' bin/castl.js && \
    npx esbuild bin/castl.js --outfile=/dist/castl.js --bundle --platform=node --external:babel-* && \
    npx esbuild bin/castl.js --outfile=/dist/castl.min.js --bundle --platform=node --external:babel-* --minify && \
    cp -r /src/lua /dist/castl-dist && \
    cp -f /usr/local/lib/lua/*/rex_pcre2.so /dist/castl-dist/ && \
    echo >/dist/castl \
'#!/bin/bash'"\n"\
'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")'"\n"\
'export LUA_PATH="$SCRIPT_DIR/castl-dist/?.lua;;"'"\n"\
'export LUA_CPATH="$SCRIPT_DIR/castl-dist/?.so;;"'"\n"\
'if ! [[ -f "$1" ]]; then echo "Usage: $0 <script>"; exit 1; fi'"\n"\
'node "$SCRIPT_DIR/castl.js" --jit "$@"' && \
    chmod a+rx /dist/castl && \
    du -bc castl.min.js /dist/castl-dist/castl | tail -1 | cut -f 1 >jsz_binary_size

# TODO: pure-lua shell using lua/castl/jscompile/castl_jit.lua

ENV JS_BINARY=/dist/castl
CMD ${JS_BINARY}
