ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/yrm006/miniscript.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN gcc -O3 -o miniscript miniscript.c mslib.c readme.c

ENV JS_BINARY=/src/miniscript
# No REPL
