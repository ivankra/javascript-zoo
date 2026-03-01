# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/maekawatoshiki/rapidus.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN rustup toolchain install nightly-2023-02-01 && rustup override set nightly-2023-02-01
RUN cargo build --release

COPY build/dist.py ./
RUN ./dist.py /dist/rapidus --binary=/src/target/release/rapidus-repl
