# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

WORKDIR /src
COPY --from=jsz-hako /dist/hako.wasm /src/hako.wasm

COPY build/repl.js /src/repl.js
COPY engines/hako/hako_wasmtime_go.go /src/hako_wasmtime_go.go
RUN cd /src && \
    go mod init hako-wasmtime-go-runner && \
    go get github.com/bytecodealliance/wasmtime-go/v41 && \
    go build -mod=mod -o /dist/hako_wasmtime_go ./hako_wasmtime_go.go

COPY --from=jsz-hako /dist/hako.LICENSE /dist/hako_wasmtime_go.LICENSE
COPY build/dist.py ./
RUN ./dist.py /dist/hako_wasmtime_go
