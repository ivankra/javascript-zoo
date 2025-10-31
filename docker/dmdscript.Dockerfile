ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/DigitalMars/DMDScript.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN apt-get update -y && apt-get install -y --no-install-recommends ldc dub

RUN bash ./build.sh

ENV JS_BINARY=/src/dmdscript
CMD ${JS_BINARY} /bench/repl.js
