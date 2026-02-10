# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends binaryen

ARG WASI_SDK_VER=27
ENV WASI_SDK_PATH=/opt/wasi-sdk

RUN wasi_arch="$(uname -m | sed -e 's/^x86_64$/x86_64/; s/^aarch64$/arm64/; s/^arm64$/arm64/')"; \
    curl -fsSL -o /tmp/wasi-sdk.tar.gz "https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-${WASI_SDK_VER}/wasi-sdk-${WASI_SDK_VER}.0-${wasi_arch}-linux.tar.gz" && \
    mkdir -p "$WASI_SDK_PATH" && \
    tar -xzf /tmp/wasi-sdk.tar.gz -C "$WASI_SDK_PATH" --strip-components=1 && \
    rm -f /tmp/wasi-sdk.tar.gz

ARG REPO=https://github.com/6over3/hako.git
ARG REV=main

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)
RUN git submodule update --depth=1 --init --recursive

RUN hosts/dotnet/scripts/build-engine.sh

# Copy hako.wasm for reference. Used by other hako_*.Dockerfile.
# Not needed to run the binary - it's also embedded in hako-dist.
RUN cp -f /src/hosts/dotnet/Hako/Resources/hako.wasm /dist/hako.wasm

COPY hako.cs /src/hako-runner.cs
COPY hako.csproj /src/hako-runner.csproj

RUN rid="$(uname -m | sed -e 's/^x86_64$/linux-x64/; s/^aarch64$/linux-arm64/; s/^arm64$/linux-arm64/')"; \
    dotnet publish /src/hako-runner.csproj -c Release -f net10.0 -r "$rid" --self-contained false -o /dist/hako-dist

RUN printf '%s\n' \
      '#!/bin/bash' \
      'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")' \
      'exec dotnet --roll-forward Major "$SCRIPT_DIR/hako-dist/hako-runner.dll" "$@"' \
      >/dist/hako && \
    chmod a+rx /dist/hako && \
    du -bc /dist/hako /dist/hako-dist | tail -1 | cut -f 1 >/dist/jsz_dist_size

ENV JS_BINARY=/dist/hako
CMD ${JS_BINARY}
