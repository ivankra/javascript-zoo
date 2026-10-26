# SPDX-FileCopyrightText: 2026 Ricardo Rocha Tomasi
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

# Build the same pinned compiler on both architectures. C3 0.8.4's Linux
# release binary is x86-64 only; arm64 needs a native source build.
ARG C3C_VERSION=0.8.4
RUN apt-get update -y && apt-get install -y --no-install-recommends \
      clang-19 llvm-19-dev libclang-19-dev liblld-19-dev libpolly-19-dev \
      libclang-rt-19-dev libzstd-dev zlib1g-dev
RUN git clone --depth=1 --branch "v$C3C_VERSION" https://github.com/c3lang/c3c.git /tmp/c3c && \
    cmake -S /tmp/c3c -B /tmp/c3c/build -G Ninja \
      -DCMAKE_BUILD_TYPE=Release -DCMAKE_PREFIX_PATH=/usr/lib/llvm-19 \
      -DC3_LLVM_VERSION="$(/usr/lib/llvm-19/bin/llvm-config --version)" && \
    cmake --build /tmp/c3c/build --parallel $(nproc) && \
    mkdir -p /opt/c3 && cp /tmp/c3c/build/c3c /opt/c3/c3c && \
    cp -R /tmp/c3c/lib /opt/c3/lib && rm -rf /tmp/c3c
ENV PATH=/opt/c3:$PATH
RUN c3c --version | head -1 >/jsz_cc

ARG REPO=https://github.com/ricardobeat/boomkat.git
ARG REV=main
WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

# Use the engine's checked-in release settings (O2/small).
ARG TARGET=boomkat
ARG NAME=boomkat
RUN make "$TARGET"

COPY build/dist.py ./
RUN ./dist.py "/dist/$NAME" --binary="/src/out/$TARGET"
