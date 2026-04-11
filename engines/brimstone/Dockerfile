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
      cargo brimstone-test --release -- --report-test262-progress --save-result-files ./test262; \
    fi || true
COPY engines/brimstone/convert262.py ./
RUN python3 ./convert262.py test262_failed.json test262_success.json tests/test262/ignored_tests.jsonc -o /dist/brimstone.test262 -b /dist/brimstone --test262-dir=tests/test262/test262 || true
