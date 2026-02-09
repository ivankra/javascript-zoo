# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

ARG REPO=https://github.com/yantrajs/yantra.git
ARG REV=main

# Full git history is required for Nerdbank.GitVersioning to compute version height.
WORKDIR /src
RUN git clone --branch="$REV" "$REPO" . || \
    (git clone "$REPO" . && git fetch origin "$REV" && git checkout FETCH_HEAD)

RUN dotnet publish YantraJS/YantraJS.csproj -c Release -o /dist/yantra-dist && \
    printf '%s\n' \
      '#!/bin/bash' \
      'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")' \
      'exec dotnet --roll-forward Major "$SCRIPT_DIR/yantra-dist/YantraJS.dll" "$@"' \
      >/dist/yantra && \
    chmod a+rx /dist/yantra && \
    du -bc /dist/yantra /dist/yantra-dist | tail -1 | cut -f 1 >/dist/jsz_dist_size

ENV JS_BINARY=/dist/yantra
CMD ${JS_BINARY}
