# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/BeRo1985/besen.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN apt-get update -y && apt-get install -y --no-install-recommends fpc

COPY engines/besen/besen.patch ./
RUN git apply besen.patch

RUN fpc -O3 -Mdelphi src/BESENShell.lpr

COPY build/dist.py ./
RUN ./dist.py /dist/besen --binary=/src/src/BESENShell
