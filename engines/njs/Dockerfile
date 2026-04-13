# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/nginx/njs.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN apt-get update -y && apt-get install -y --no-install-recommends libpcre2-dev libedit-dev
RUN ./configure --cc-opt="-O3" --no-openssl --no-libxml2 --no-quickjs --no-zlib && make -j

COPY build/dist.py ./
RUN ./dist.py /dist/njs --binary=/src/build/njs
