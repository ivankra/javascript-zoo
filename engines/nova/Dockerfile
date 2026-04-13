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
RUN ./dist.py /dist/nova --binary=/src/target/release/nova_cli --smoke-test-cmd='$BINARY eval'

ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      git submodule update --init --depth=1 tests/test262 && \
      /src/target/release/test262 --noprogress >test262.log; \
    fi || true
COPY engines/nova/convert262.py ./
RUN python3 ./convert262.py test262.log -o /dist/nova.ci-test262 -b /dist/nova --test262-dir=/src/tests/test262 || true
