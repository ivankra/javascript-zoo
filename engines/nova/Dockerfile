# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/trynova/nova.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

# Hack test262 runner to print a line with every test's result
RUN sed -i '/let relpath = path.strip_prefix(&self.inner.tests_base).unwrap();/a\\ println!("RESULT: {}: {:?}", relpath.to_string_lossy(), test_result);' tests/test262_runner.rs

RUN cargo build --release

# Usage: nova repl / nova eval script.js
COPY build/dist.py ./
RUN ./dist.py /dist/nova --binary=/src/target/release/nova_cli \
      --smoke-test-cmd='$BINARY eval'

ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      git submodule update --init --depth=1 tests/test262 && \
      (/src/target/release/test262 --noprogress >/dist/nova.test262.log 2>&1 || true) && \
      git -C /src/tests/test262 rev-parse HEAD >/dist/nova.test262.rev; \
    fi || true
