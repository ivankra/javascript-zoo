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

ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      apt-get update -y && apt-get install -y --no-install-recommends tzdata tzdata-legacy && \
      DOTNET_ROLL_FORWARD=Major dotnet test Jint.Tests.Test262/Jint.Tests.Test262.csproj -c Release --logger "trx;LogFileName=trx.log" || true; \
      cp Jint.Tests.Test262/TestResults/trx.log /dist/jint.test262.log && \
      sed -nE 's/.*"SuiteGitSha": "([0-9a-f]+)".*/\1/p' Jint.Tests.Test262/Test262Harness.settings.json >/dist/jint.test262.rev; \
    fi || true
