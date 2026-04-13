# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/markkurossi/js.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN ./configure && make -j1

COPY build/dist.py ./
RUN ./dist.py /dist/ngs \
      --binary=/src/src/js \
      version="$(/src/src/js --version | egrep -o '[0-9.]*$' | head -1)"
