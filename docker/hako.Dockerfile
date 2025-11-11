# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://github.com/andrewmd5/hako.git
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

RUN mkdir -p /dist && \
    cp bridge/build/hako.wasm /dist/hako.wasm && \
    du -bc /dist/hako.wasm | tail -1 | cut -f 1 >/dist/jsz_dist_size

# Shell with wasmtime runtime.
# Following example from https://gist.github.com/andrewmd5/197efb527ef40131c34ca12fd6d0a61e
COPY hako_wasmtime.go ./
RUN go mod init hako && go get github.com/bytecodealliance/wasmtime-go/v31 && \
    go build -o /dist/hako_wasmtime hako_wasmtime.go

# Shell with wazero runtime.
# Needs a tweaked wasm for some compatibility issues.
RUN sed -i 's/ -mtail-call / /; s/-Wl,--import-memory,--export-memory/-Wl,--export-memory/' bridge/CMakeLists.txt && \
    ./tools/build.sh && \
    cp bridge/build/hako.wasm /dist/hako_wazero.wasm
COPY hako_wazero.go ./
RUN go get github.com/tetratelabs/wazero && \
    go build -o /dist/hako_wazero hako_wazero.go

# hako-cli shell with WAMR runtime. Embeds a pre-built hako.wasm.
RUN apt install -y clang
RUN git clone --recursive https://github.com/andrewmd5/hako-cli.git /src/hako-cli
RUN cd /src/hako-cli && mkdir build && cmake -DCMAKE_C_COMPILER="clang" -DCMAKE_BUILD_TYPE=Release build . && make -j
RUN cp /src/hako-cli/bin/hako /dist/hako_wamr_prebuiltwasm
RUN cp /src/hako-cli/src/hako.wasm /dist/hako_wamr_prebuiltwasm.wasm
# Update hako.wasm in hako-cli
RUN cp /dist/hako.wasm /src/hako-cli/src/hako.wasm
RUN rm -rf /src/hako-cli/bin /src/hako-cli/build
RUN cd /src/hako-cli && mkdir build && cmake -DCMAKE_C_COMPILER="clang" -DCMAKE_BUILD_TYPE=Release build . && make -j
RUN cp /src/hako-cli/bin/hako /dist/hako_wamr

RUN ln -s hako_wamr /dist/hako

ENV JS_BINARY=/dist/hako
CMD ${JS_BINARY}
