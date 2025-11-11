# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/gfwilliams/tiny-js.git
ARG REV=42tiny-js

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY 42tiny-js.patch ./
RUN git apply 42tiny-js.patch && make

ENV JS_BINARY=/src/Script
CMD ${JS_BINARY}
