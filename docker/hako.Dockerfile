ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://github.com/andrewmd5/hako
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git submodule update --init

RUN sed -i "s/arm64/aarch64/g; s/WASI_SDK_TARBALL=/SYS_ARCH=$(uname -m | sed s/aarch64/arm64/) WASI_SDK_TARBALL=/" tools/envsetup.sh && \
    ./tools/envsetup.sh

RUN sed -i '/git commit -m/d' tools/patch.sh && \
    ./tools/patch.sh

RUN sed -i 's/\(cmake_minimum_required(VERSION\) 4.0.0/\1 3.0.0/' bridge/CMakeLists.txt && \
    sed -i 's/\(wasm-strip .*\)/\1 || true/' tools/build.sh && \
    ./tools/build.sh

COPY hako.go ./
RUN go mod init hako && go get github.com/bytecodealliance/wasmtime-go/v31 && go build hako.go

RUN mkdir -p /dist && cp bridge/build/hako.wasm ./ && cp hako.wasm /dist/

ENV JS_BINARY=/src/hako
CMD ${JS_BINARY}
