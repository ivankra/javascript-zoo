# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends erlang rebar3

WORKDIR /tmp/gleam
RUN git clone --depth=1 https://github.com/gleam-lang/gleam . && \
    cargo build --release

ARG REPO=https://github.com/alii/arc.git
ARG REV=master

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN /tmp/gleam/target/release/gleam export erlang-shipment

RUN mkdir -p /dist/arc-dist && cp -a /src/build/erlang-shipment/. /dist/arc-dist/

COPY build/dist.py ./
RUN ./dist.py /dist/arc \
      --wrapper='exec "$SCRIPT_DIR/arc-dist/entrypoint.sh" run "$@"' \
      --dist_files=/dist/arc-dist \
      --no-license \
      console_log=Arc.log \
      smoke_test_js='Arc.log(40+2);' \
      standard=ESnext
