# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

ARG REPO=https://github.com/nilproject/NiL.JS.git
ARG REV=develop

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

COPY niljs.cs /src/
COPY niljs.csproj /src/

RUN dotnet publish niljs.csproj -c Release -o /dist/niljs-dist && \
    printf '%s\n' \
      '#!/bin/bash' \
      'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")' \
      'exec dotnet "$SCRIPT_DIR/niljs-dist/niljs.dll" "$@"' \
      >/dist/niljs && \
    chmod a+rx /dist/niljs && \
    du -bc /dist/niljs /dist/niljs-dist | tail -1 | cut -f 1 >/dist/jsz_dist_size

ENV JS_BINARY=/dist/niljs
CMD ${JS_BINARY}
