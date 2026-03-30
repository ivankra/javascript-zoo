# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://github.com/marcoschwartz/espresso.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN cd cmd/espresso && go build

COPY build/dist.py ./
RUN ./dist.py /dist/espresso --binary=/src/cmd/espresso/espresso --no-license
