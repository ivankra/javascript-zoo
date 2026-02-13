# Hako shell with a small footprint interpreter WAMR runtime
# Note: it embeds its own older non-compatible hako.wasm build inside.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc15
FROM $BASE

ARG REPO=https://github.com/andrewmd5/hako-cli.git
ARG REV=main

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)
RUN git submodule update --depth=1 --init --recursive

RUN cmake -G Ninja -B build -DCMAKE_BUILD_TYPE=Release && \
    cmake --build build

COPY --from=jsz-hako /dist/hako.LICENSE /dist/hako_wamr.LICENSE
COPY dist.py ./
RUN ./dist.py /dist/hako_wamr --binary=/src/build/bin/hako
