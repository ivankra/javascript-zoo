# Wrapper to run js-interpreter with JavaScriptCore shell. Faster than Node/V8.
# TODO: implement inside bench script

ARG BASE=jsz-js-interpreter
FROM $BASE

COPY --from=jsz-jsc /src/jsz_version ./jsc_version

RUN echo >/dist/js-interpreter_jsc \
'#!/bin/bash'"\n"\
'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")'"\n"\
'"$SCRIPT_DIR"/jsc "$SCRIPT_DIR/js-interpreter.js" -- "$@"' && \
    chmod a+rx /dist/js-interpreter_jsc && \
    echo "jsc $(cat jsc_version)" >jsz_host_engine

ENV JS_BINARY=/dist/js-interpreter_jsc
CMD ${JS_BINARY}
