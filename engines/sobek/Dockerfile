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
      go test -vet=off -v -run TestTC39 ./... >test262.log; \
    fi || true
COPY engines/goja/convert262.py ./
RUN python3 ./convert262.py test262.log -o /dist/sobek.ci-test262 -e sobek -b /dist/sobek --test262-dir=testdata/test262 || true
