# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/echosoar/jsi.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY echosoar-jsi.rs src/main.rs

RUN cargo build --release

ENV JS_BINARY=/src/target/release/jsi
# No REPL
