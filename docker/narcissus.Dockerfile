# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

# Many fixes needed to run the code on modern engines.
#ARG REPO=https://github.com/mozilla/narcissus.git
ARG REPO=https://github.com/ivankra/narcissus.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install && npm run build && \
    mkdir -p /dist && cp ./dist/njs.js /dist/narcissus && \
    # Much faster when run under SpiderMonkey \
    sed -i -e 's|^#!.*|#!/dist/spidermonkey|' /dist/narcissus

COPY dist.py ./
RUN ./dist.py /dist/narcissus
