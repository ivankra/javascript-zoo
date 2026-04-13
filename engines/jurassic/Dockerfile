# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/paulbartrum/jurassic.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

COPY engines/jurassic/jurassic.cs /src/REPL/Program.cs

RUN dotnet publish REPL/REPL.csproj -c Release -o /dist/jurassic-dist

COPY build/dist.py ./
RUN ./dist.py /dist/jurassic --wrapper='exec dotnet --roll-forward Major "$SCRIPT_DIR/jurassic-dist/REPL.dll" "$@"'
