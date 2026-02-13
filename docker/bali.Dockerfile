# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/ferus-web/bali.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN sed -i -e 's/ stable-updates$/ stable-updates unstable/' /etc/apt/sources.list.d/debian.sources
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends nim libgmp-dev libicu-dev libgc-dev

RUN git clone https://github.com/simdutf/simdutf && cd simdutf && cmake . && sudo make install . -j

RUN nimble build balde

COPY dist.py ./
RUN ./dist.py /dist/bali --binary=/src/bin/balde
