# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/echosoar/jsi.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY engines/echosoar-jsi/main.rs src/main.rs

RUN cargo build --release

COPY build/dist.py ./
RUN ./dist.py /dist/echosoar-jsi --binary=/src/target/release/jsi --license=readme.md
