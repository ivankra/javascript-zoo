# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/tyrchen/rjs.git
ARG REV=master
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

COPY engines/tyrchen/print.patch /tmp/print.patch
RUN git apply /tmp/print.patch

RUN cargo build --release -p rjs

COPY build/dist.py ./
RUN ./dist.py /dist/tyrchen --binary=/src/target/release/rjs
