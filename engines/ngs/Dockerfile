# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/markkurossi/js.git
ARG REV=master

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN ./configure && make -j1

COPY build/dist.py ./
RUN ./dist.py /dist/ngs \
      --binary=/src/src/js \
      version="$(/src/src/js --version | egrep -o '[0-9.]*$' | head -1)"
