# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://gitlab.com/cznic/quickjs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY modernc-quickjs.go main.go

RUN go build main.go

COPY dist.py ./
RUN ./dist.py /dist/modernc-quickjs --binary=/src/main --license=LICENSE*
