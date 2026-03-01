# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/CanadaHonk/porffor.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

#RUN npm install --prefix=/dist/porffor-dist "$REPO#$REV"
RUN npm install --prefix=/dist/porffor-dist "$(npm pack --silent .)"

COPY build/dist.py ./dist.py
RUN ./dist.py /dist/porffor --wrapper='exec node "$SCRIPT_DIR"/porffor-dist/node_modules/porffor/runtime/index.js "$@"'
