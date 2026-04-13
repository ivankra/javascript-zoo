# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/6over3/hako.git
RUN git clone --depth=1 "$REPO" .

ARG REV=go
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD
RUN git submodule update --depth=1 --init --recursive

COPY engines/hako/hako_go.patch /src/hako_go.patch
RUN patch -p1 </src/hako_go.patch

COPY --from=jsz-hako /dist/hako.wasm /src/hosts/go/hako.wasm
COPY build/repl.js /src/hosts/go/repl.js
COPY engines/hako/hako_go.go /src/hosts/go/hako_go.go
RUN cd /src/hosts/go && go build -mod=mod -o /dist/hako_go ./hako_go.go

COPY --from=jsz-hako /dist/hako.LICENSE /dist/hako_go.LICENSE
COPY build/dist.py ./
RUN ./dist.py /dist/hako_go
