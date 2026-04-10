# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/Hans-Halverson/brimstone.git
ARG REV=master

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN cargo build --release

COPY build/dist.py ./
RUN ./dist.py /dist/brimstone --binary=/src/target/release/bs

# CI-like test262 run (see .github/workflows/ci.yml).
# install_test262.sh clones tc39/test262 at the pinned commit.
ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      ./tests/test262/install_test262.sh && \
      cargo brimstone-test -- --reindex && \
      cargo brimstone-test --release -- --report-test262-progress --save-result-files ./t262 && \
      cp ./t262_failed.json /dist/brimstone.test262.failed.json && \
      cp ./t262_success.json /dist/brimstone.test262.success.json && \
      git -C tests/test262/test262 rev-parse HEAD >/dist/brimstone.test262.rev; \
    fi || true
