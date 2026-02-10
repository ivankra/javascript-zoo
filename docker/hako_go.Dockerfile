# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://github.com/6over3/hako.git
ARG REV=go

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)
RUN git submodule update --depth=1 --init --recursive

COPY hako_go.patch /src/hako_go.patch
RUN patch -p1 </src/hako_go.patch

COPY --from=jsz-hako /dist/hako.wasm /src/hosts/go/hako.wasm
COPY repl.js /src/hosts/go/repl.js
COPY hako_go.go /src/hosts/go/hako_go.go
RUN cd /src/hosts/go && go build -mod=mod -o /dist/hako_go ./hako_go.go

RUN du -bc /dist/hako_go | tail -1 | cut -f 1 >/dist/jsz_binary_size

ENV JS_BINARY=/dist/hako_go
CMD ${JS_BINARY}
