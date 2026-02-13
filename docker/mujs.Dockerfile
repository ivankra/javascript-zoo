# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

# clang build is slightly faster, less flaky
ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://codeberg.org/ccxvii/mujs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN apt-get update -y && apt-get install -y --no-install-recommends libreadline-dev

# by default builds with -O3
RUN make -j release

COPY dist.py ./
RUN ./dist.py /dist/mujs --binary=/src/build/release/mujs
