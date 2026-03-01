# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/DelSkayn/toyjs.git
ARG REV=master-backup

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN rustup toolchain install nightly-2022-04-01 && rustup override set nightly-2022-04-01
RUN cargo build --release -p toyjs --bin cli

COPY build/dist.py ./
RUN ./dist.py /dist/delskayn --binary=/src/target/release/cli --no-license console_log=print
