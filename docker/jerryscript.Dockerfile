# doesn't build easily with clang
ARG BASE=jsz-gcc14
FROM $BASE

ARG REPO=https://github.com/jerryscript-project/jerryscript.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

#RUN sed -i '/CMAKE_C_COMPILER/d' cmake/toolchain_linux_aarch64.cmake
#RUN python tools/build.py --mem-heap=65536 --cmake-param=-DCMAKE_C_COMPILER="$CC"

# Builds with -Os; add --build-type=Release for -O3, but ~70% larger binary!
# --mem-heap=65536 needed to pass splay.js
RUN python tools/build.py --mem-heap=65536

ENV JS_BINARY=/src/build/bin/jerry
CMD ${JS_BINARY}

