# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

ARG REPO=https://github.com/sebastienros/jint.git
ARG REV=main

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN dotnet publish Jint.Repl/Jint.Repl.csproj \
      -c Release \
      -o /dist/jint-dist \
      -p:SuppressTrimAnalysisWarnings=true \
      -p:TreatWarningsAsErrors=false

COPY build/dist.py ./
RUN ./dist.py /dist/jint --wrapper='exec "$SCRIPT_DIR/jint-dist/Jint.Repl" "$@"'
