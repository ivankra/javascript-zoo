# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/bellard/mquickjs.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN make -j$(nproc) HOST_CC="${CC:-gcc}" CC="${CC:-gcc}"

COPY build/dist.py ./
RUN ./dist.py /dist/mquickjs --binary=/src/mqjs
