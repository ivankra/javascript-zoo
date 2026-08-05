# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/MerlijnW70/viperjs.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

# No system dependencies: the engine has zero runtime dependencies and an empty
# dependency table, so the base image's stable toolchain is all that is needed.
RUN cargo build --release --bin viper

COPY build/dist.py ./
RUN ./dist.py /dist/viperjs --binary=/src/target/release/viper
