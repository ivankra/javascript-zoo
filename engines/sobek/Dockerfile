# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://github.com/grafana/sobek.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY engines/sobek/sobek.go ./
RUN go build sobek.go

COPY build/dist.py ./
RUN ./dist.py /dist/sobek --binary=/src/sobek
