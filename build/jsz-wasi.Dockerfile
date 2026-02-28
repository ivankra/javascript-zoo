# WASI SDK based build environment.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG VER=27
ENV WASI_SDK_PATH=/opt/wasi-sdk

RUN WASI_ARCH="$(uname -m | sed 's/aarch64/arm64/')"; \
    curl -fsSL -o /tmp/wasi-sdk.tar.gz "https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-$VER/wasi-sdk-$VER.0-${WASI_ARCH}-linux.tar.gz" && \
    mkdir -p "$WASI_SDK_PATH" && \
    tar -xzf /tmp/wasi-sdk.tar.gz -C "$WASI_SDK_PATH" --strip-components=1 && \
    rm -f /tmp/wasi-sdk.tar.gz && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends binaryen
