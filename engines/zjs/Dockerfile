# SPDX-FileCopyrightText: 2026 Aneryu
# SPDX-License-Identifier: MIT

ARG BASE=jsz-zig
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/aneryu/zjs.git
RUN git clone --depth=1 "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN case "$(dpkg --print-architecture 2>/dev/null || true)" in \
      arm64) zig build zjs -Dcpu=baseline --summary all;; \
      amd64) zig build zjs -Dcpu=x86_64_v3 --summary all;; \
      *) zig build zjs --summary all;; \
    esac

COPY build/dist.py ./
RUN ./dist.py /dist/zjs --binary=/src/zig-out/bin/zjs
