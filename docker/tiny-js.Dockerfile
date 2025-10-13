ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/gfwilliams/tiny-js.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY tiny-js.cc script-runner-snippet.cc

# Add file script runner snippet, stop REPL on EOF, raise loop iter limit, optimized build
RUN sed -i -e '/^  try {/r script-runner-snippet.cc' Script.cpp && \
    sed -i -e 's/fgets (\(.*\));/if (!fgets(\1)) break;/' Script.cpp && \
    sed -i -e 's/\(TINYJS_LOOP_MAX_ITERATIONS\) = 8192;/\1 = 1000000000;/' TinyJS.h && \
    sed -i -e 's/CFLAGS=-c .*/CFLAGS=-c -O3/' Makefile && \
    make

ENV JS_BINARY=/src/Script
CMD ${JS_BINARY}
