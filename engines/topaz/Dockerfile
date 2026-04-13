# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/koculu/Topaz.git
RUN git clone --depth=1 "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

COPY engines/topaz/topaz.cs /src/
COPY engines/topaz/topaz_runner.csproj /src/topaz_runner.csproj

RUN dotnet publish topaz_runner.csproj -c Release -o /dist/topaz-dist

COPY build/dist.py ./
RUN ./dist.py /dist/topaz \
      --wrapper='exec dotnet --roll-forward Major "$SCRIPT_DIR/topaz-dist/topaz_runner.dll" "$@"' \
      version=$(git describe --tags | sed 's/^release-v//')
