ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/gfwilliams/tiny-js.git
ARG REV=42tiny-js

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY tiny-js_42.patch ./
RUN git apply tiny-js_42.patch && make

ENV JS_BINARY=/src/Script
CMD ${JS_BINARY}
