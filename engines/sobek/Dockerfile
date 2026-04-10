# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://github.com/grafana/sobek.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

COPY engines/sobek/main.go ./
RUN go build main.go

COPY build/dist.py ./
RUN ./dist.py /dist/sobek --binary=/src/main

ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      ./.tc39_test262_checkout.sh && \
      (go test -vet=off -v -run TestTC39 ./... >/dist/sobek.test262.log 2>&1 || true) && \
      git -C testdata/test262 rev-parse HEAD >/dist/sobek.test262.rev; \
    fi || true
