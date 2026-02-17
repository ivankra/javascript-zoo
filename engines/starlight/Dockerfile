# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

# Ancient Rust codebase. Only builds on x64.

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/Starlight-JS/starlight.git
ARG REV=dev

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN apt-get update -y && apt-get install -y --no-install-recommends rustup libssl-dev
#RUN rustup install 1.52.0 && rustup default 1.52.0
RUN rustup toolchain install nightly-2021-08-01 && rustup override set nightly-2021-08-01
RUN cargo build --release

RUN git tag -d nightly
COPY build/dist.py ./
RUN ./dist.py /dist/starlight --binary=/src/target/release/sl rustc="$(rustc --version)"
