# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://codeberg.org/ccxvii/mujs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN apt-get update -y && apt-get install -y --no-install-recommends libreadline-dev

# by default builds with -O3
RUN make -j release || make -j release || make -j release  # flaky

ENV JS_BINARY=/src/build/release/mujs
CMD ${JS_BINARY}
