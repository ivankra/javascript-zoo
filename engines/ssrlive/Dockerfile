# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/ssrlive/javascript.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

# REPL aborts on first run when ~/.js_repl_history does not exist
RUN sed -i '/rl\.load_history/d' js/src/main.rs

RUN cargo build --release -p js

COPY build/dist.py ./
RUN ./dist.py /dist/ssrlive --binary=/src/target/release/js
