# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/trynova/nova.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN cargo generate-lockfile && \
    cargo update -p temporal_rs --precise 0.2.0 && \
    cargo update -p icu_calendar --precise 2.1.0 && \
    cargo build --release --locked --bin nova_cli

# Usage: nova repl / nova eval script.js
COPY build/dist.py ./
RUN ./dist.py /dist/nova --binary=/src/target/release/nova_cli \
      run_script_cmd='$BINARY eval ${MODULE:+--module}'
