# Golang-based build environment.
# Installs latest Go from an official release at https://go.dev/dl/
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

# Specific version like "1.25.5" or "latest"
ARG VER=latest

ENV PATH=/usr/local/go/bin:$PATH

RUN if [ "$VER" = latest ]; then \
      export VER=$(curl -fsSL https://go.dev/VERSION?m=text | head -n1 | sed 's/go//'); \
    fi && \
    export GOLANG_ARCH=$(uname -m | sed 's/x86_64/amd64/; s/aarch64/arm64/') && \
    curl -fL -o /tmp/go.tar.gz https://go.dev/dl/go${VER}.linux-${GOLANG_ARCH}.tar.gz && \
    tar -C /usr/local -xzf /tmp/go.tar.gz && \
    rm -f /tmp/go.tar.gz && \
    # Record installed Go version in build metadata \
    mkdir -p /dist && go version | sed 's/go version go\([^ ]*\).*/\1/' >/dist/jsz_go
