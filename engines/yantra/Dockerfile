# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

ARG REPO=https://github.com/yantrajs/yantra.git
ARG REV=main

# Full git history is required for Nerdbank.GitVersioning to compute version height.
WORKDIR /src
RUN (git clone --branch="$REV" "$REPO" . || \
    (git clone "$REPO" . && git fetch origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN dotnet publish YantraJS/YantraJS.csproj -c Release -o /dist/yantra-dist

COPY build/dist.py ./
RUN ./dist.py /dist/yantra --wrapper='exec dotnet --roll-forward Major "$SCRIPT_DIR/yantra-dist/YantraJS.dll" "$@"'
