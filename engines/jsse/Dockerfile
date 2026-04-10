# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/pmatos/jsse.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN cargo build --release

COPY build/dist.py ./
RUN ./dist.py /dist/jsse --binary=/src/target/release/jsse

# CI-like test262 run (see .github/workflows/nightly-test262-coverage.yml).
ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      git submodule update --init --depth=1 && \
      python3 scripts/run-test262.py --jsse ./target/release/jsse --test262 ./test262 && \
      cp test262-pass.txt /dist/jsse.test262.pass && \
      git -C test262 rev-parse HEAD >/dist/jsse.test262.rev; \
    fi || true
