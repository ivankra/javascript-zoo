# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

ARG REPO=https://github.com/koculu/Topaz.git
ARG REV=main

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

COPY topaz.cs /src/
COPY topaz.csproj /src/topaz_runner.csproj

RUN dotnet publish topaz_runner.csproj -c Release -o /dist/topaz-dist && \
    test -f /dist/topaz-dist/topaz_runner.dll

RUN printf '%s\n' \
      '#!/bin/bash' \
      'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")' \
      'exec dotnet --roll-forward Major "$SCRIPT_DIR/topaz-dist/topaz_runner.dll" "$@"' \
      >/dist/topaz && \
    chmod a+rx /dist/topaz && \
    du -bc /dist/topaz /dist/topaz-dist | tail -1 | cut -f 1 >/dist/jsz_dist_size

ENV JS_BINARY=/dist/topaz
CMD ${JS_BINARY}
