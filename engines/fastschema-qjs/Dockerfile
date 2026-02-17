# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://github.com/fastschema/qjs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

# Disable strict mode by default. No easy way to do it from main package.
RUN sed -i 's/ | JsEvalFlagStrict//' options.go

COPY engines/fastschema-qjs/fastschema-qjs.go ./
RUN go build fastschema-qjs.go

COPY build/dist.py ./
RUN ./dist.py /dist/fastschema-qjs --binary=/src/fastschema-qjs
