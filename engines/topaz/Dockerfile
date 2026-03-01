# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

ARG REPO=https://github.com/koculu/Topaz.git
ARG REV=main

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

COPY engines/topaz/topaz.cs /src/
COPY engines/topaz/topaz_runner.csproj /src/topaz_runner.csproj

RUN dotnet publish topaz_runner.csproj -c Release -o /dist/topaz-dist

COPY build/dist.py ./
RUN ./dist.py /dist/topaz --wrapper='exec dotnet --roll-forward Major "$SCRIPT_DIR/topaz-dist/topaz_runner.dll" "$@"'
