# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang-rust
FROM $BASE

ARG REPO=https://github.com/nupha/zuqe.git
ARG REV=r0.4

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN cargo build --release --example zjs

COPY build/dist.py ./
RUN ./dist.py /dist/zuqe --binary=/src/target/release/examples/zjs
