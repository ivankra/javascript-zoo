# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet-wasi
FROM $BASE

ARG REPO=https://github.com/6over3/hako.git
ARG REV=main

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD
RUN git submodule update --depth=1 --init --recursive

RUN hosts/dotnet/scripts/build-engine.sh

# Copy hako.wasm for reference. Used by other hako_*.Dockerfile.
# Not needed to run the binary - it's also embedded in hako-dist.
RUN mkdir -p /dist && cp -f /src/hosts/dotnet/Hako/Resources/hako.wasm /dist/hako.wasm

COPY engines/hako/hako-runner.cs /src/hako-runner.cs
COPY engines/hako/hako-runner.csproj /src/hako-runner.csproj

RUN dotnet publish /src/hako-runner.csproj \
      -c Release \
      -f net10.0 \
      -o /dist/hako-dist \
      -r "linux-$(uname -m | sed 's/x86_64/x64/; s/aarch64/arm64/')" \
      --self-contained false

COPY build/dist.py ./
RUN ./dist.py /dist/hako --wrapper='exec dotnet --roll-forward Major "$SCRIPT_DIR/hako-dist/hako-runner.dll" "$@"'
