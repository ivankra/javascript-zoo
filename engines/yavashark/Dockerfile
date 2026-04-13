# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/Sharktheone/yavashark.git
RUN git clone --depth=1 "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN cargo build --release

COPY build/dist.py ./
RUN ./dist.py /dist/yavashark --binary=/src/target/release/yavashark

ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      apt-get update -y && \
      apt-get install -y --no-install-recommends golang-go && \
      git clone --depth=1 https://github.com/tc39/test262 /src/test262 && \
      (cd /src/crates/yavashark_test262/runner && go build) && \
      cargo build --release -p yavashark_test262 && \
      mkdir -p /tmp/yavashark-test262-data && \
      (cd /src/crates/yavashark_test262 && \
        ./runner/yavashark_test262_runner \
          --ci \
          --repo /tmp/yavashark-test262-data \
          --test_root ../../test262/test \
          --workers "$(nproc)") && \
      cp /tmp/yavashark-test262-data/results.json /dist/yavashark.test262.log && \
      git -C /src/test262 rev-parse HEAD >/dist/yavashark.test262.rev; \
    fi || true
