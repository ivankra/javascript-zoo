# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/frostney/GocciaScript.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN apt-get update -y && apt-get install -y --no-install-recommends fpc

RUN chmod +x ./build.pas && ./build.pas --prod loader

COPY build/dist.py ./
RUN ./dist.py /dist/gocciascript --binary=/src/build/ScriptLoader
