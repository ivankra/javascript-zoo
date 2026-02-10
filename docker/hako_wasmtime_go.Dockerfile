# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

WORKDIR /src
COPY --from=jsz-hako /dist/hako.wasm /src/hako.wasm

COPY repl.js /src/repl.js
COPY hako_wasmtime_go.go /src/hako_wasmtime_go.go
RUN cd /src && \
    go mod init hako-wasmtime-go-runner && \
    go get github.com/bytecodealliance/wasmtime-go/v41 && \
    go build -mod=mod -o /dist/hako_wasmtime_go ./hako_wasmtime_go.go

RUN du -bc /dist/hako_wasmtime_go | tail -1 | cut -f 1 >/dist/jsz_binary_size

ENV JS_BINARY=/dist/hako_wasmtime_go
CMD ${JS_BINARY}
