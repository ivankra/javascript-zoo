# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/trynova/nova.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN cargo build --release --bin nova_cli

# Usage: nova repl / nova eval script.js
COPY dist.py ./
RUN ./dist.py /dist/nova --binary=/src/target/release/nova_cli \
      run_script_cmd='$BINARY eval ${MODULE:+--module} $FILE'
