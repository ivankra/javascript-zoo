# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://github.com/dop251/goja.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

COPY engines/goja/main.go goja/main.go
RUN cd goja && go build

COPY build/dist.py ./
RUN ./dist.py /dist/goja --binary=/src/goja/goja

# CI-like test262 run (see .github/workflows/main.yml).
ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      ./.tc39_test262_checkout.sh && \
      (go test -vet=off -v -run TestTC39 ./... >/dist/goja.test262.log 2>&1 || true) && \
      git -C testdata/test262 rev-parse HEAD >/dist/goja.test262.rev; \
    fi || true
