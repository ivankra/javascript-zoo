# StarlingMonkey: SpiderMonkey-based JS runtime on WebAssembly.
# Builds starling.wasm (a WASI component) and runs it via wasmtime.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/bytecodealliance/StarlingMonkey.git
ARG REV=main

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

# Fix: WASI SDK release names use arm64, not aarch64
RUN sed -i '1i string(REPLACE "aarch64" "arm64" WASI_SDK_ARCH ${HOST_CPU})' cmake/wasi-sdk.cmake && \
    sed -i 's/${HOST_CPU}-${HOST_OS}/${WASI_SDK_ARCH}-${HOST_OS}/' cmake/wasi-sdk.cmake

RUN cmake -S . -B build -GNinja -DCMAKE_BUILD_TYPE=Release
RUN cmake --build build --target starling

COPY starlingmonkey.sh /dist/starlingmonkey

RUN mkdir -p /dist/starlingmonkey-dist && \
    cp build/starling.wasm /dist/starlingmonkey-dist/ && \
    find deps -name wasmtime -type f -executable -exec cp {} /dist/starlingmonkey-dist/wasmtime ';'

COPY dist.py ./
RUN ./dist.py /dist/starlingmonkey
