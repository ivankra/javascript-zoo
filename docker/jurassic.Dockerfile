# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

ARG REPO=https://github.com/paulbartrum/jurassic.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

COPY jurassic.cs /src/REPL/Program.cs

RUN dotnet publish REPL/REPL.csproj -c Release -o /dist/jurassic-dist && \
    test -f /dist/jurassic-dist/REPL.dll

RUN printf '%s\n' \
      '#!/bin/bash' \
      'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")' \
      'exec dotnet --roll-forward Major "$SCRIPT_DIR/jurassic-dist/REPL.dll" "$@"' \
      >/dist/jurassic && \
    chmod a+rx /dist/jurassic && \
    du -bc /dist/jurassic /dist/jurassic-dist | tail -1 | cut -f 1 >/dist/jsz_dist_size

ENV JS_BINARY=/dist/jurassic
CMD ${JS_BINARY}
