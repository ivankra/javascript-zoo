# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

ARG REPO=https://github.com/nilproject/NiL.JS.git
ARG REV=develop

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

COPY engines/niljs/niljs.cs /src/
COPY engines/niljs/niljs.csproj /src/

RUN dotnet publish niljs.csproj -c Release -o /dist/niljs-dist

COPY build/dist.py ./
RUN ./dist.py /dist/niljs --wrapper='exec dotnet "$SCRIPT_DIR/niljs-dist/niljs.dll" "$@"'
