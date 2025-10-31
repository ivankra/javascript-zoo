ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/gfwilliams/tiny-js.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY tiny-js.patch ./

# Add file script runner snippet and stop REPL on EOF
# Raise loop iter limit
# Optimized build
RUN git apply tiny-js.patch && \
    sed -i 's/\(TINYJS_LOOP_MAX_ITERATIONS\) = 8192;/\1 = 1000000000;/' TinyJS.h && \
    sed -i 's/CFLAGS=-c .*/CFLAGS=-c -O3/' Makefile && \
    make

ENV JS_BINARY=/src/Script
CMD ${JS_BINARY}
