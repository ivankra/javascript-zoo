# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/ssrlive/javascript.git
ARG REV=vm

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

# REPL aborts on first run when ~/.js_repl_history does not exist
RUN sed -i '/rl\.load_history/d' js/src/main.rs

RUN cargo build --release -p js

COPY build/dist.py ./
RUN ./dist.py /dist/ssrlive --binary=/src/target/release/js

ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      apt-get update -y && apt-get install -y --no-install-recommends nodejs && \
      node ci/runner.js --limit 1000000; \
    fi || true
COPY engines/ssrlive/convert262.py ./
RUN python3 ./convert262.py test262-results.log -o /dist/ssrlive.ci-test262 -b /dist/ssrlive --test262-dir=/test262 || true
