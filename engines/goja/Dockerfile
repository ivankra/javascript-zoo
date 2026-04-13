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

ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      ./.tc39_test262_checkout.sh && \
      go test -vet=off -v -run TestTC39 ./... >test262.log; \
    fi || true
COPY engines/goja/convert262.py ./
RUN python3 ./convert262.py test262.log -o /dist/goja.ci-test262 -b /dist/goja --test262-dir=testdata/test262 || true
