# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/sablejs/sablejs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN npm install
RUN sed -i 's/.*spawn.sync.*/process.exit(0);/' cli.js && node ./cli.js cli.js

COPY engines/sablejs/sablejs.js /dist/sablejs

RUN mkdir -p /dist/sablejs-dist && \
    cp -r .pkg/sablejs-linux-* /dist/sablejs-dist/ && \
    cp runtime.js /dist/sablejs-dist/runtime.js

COPY build/dist.py ./
RUN ./dist.py /dist/sablejs
