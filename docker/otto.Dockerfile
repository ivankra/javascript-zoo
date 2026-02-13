# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://github.com/robertkrimen/otto.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN cd otto && go build

COPY dist.py ./
RUN ./dist.py /dist/otto --binary=/src/otto/otto
