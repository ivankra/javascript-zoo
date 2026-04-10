# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/boa-dev/boa.git
ARG REV=main

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN apt-get update -y && apt-get install -y --no-install-recommends libssl-dev

RUN cargo build --release --bin boa

COPY build/dist.py ./
RUN ./dist.py /dist/boa --binary=/src/target/release/boa

# CI-like test262 run (see .github/workflows/test262.yml).
# boa_tester clones tc39/test262 at the commit pinned in test262_config.toml, saves it to latest.json.
ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      mkdir -p results/test262 && \
      cargo run --release --bin boa_tester -- run -v -o results/test262 && \
      cp results/test262/latest.json /dist/boa.test262.log; \
    fi || true
