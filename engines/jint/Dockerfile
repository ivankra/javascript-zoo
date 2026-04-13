# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/sebastienros/jint.git
RUN git clone --depth=1 "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN dotnet publish Jint.Repl/Jint.Repl.csproj -c Release -p:SuppressTrimAnalysisWarnings=true -p:TreatWarningsAsErrors=false

COPY build/dist.py ./
RUN ./dist.py /dist/jint --binary=/src/artifacts/publish/Jint.Repl/release/Jint.Repl

ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
      apt-get update -y && apt-get install -y --no-install-recommends tzdata tzdata-legacy && \
      DOTNET_ROLL_FORWARD=Major dotnet test Jint.Tests.Test262/Jint.Tests.Test262.csproj -c Release --logger "trx;LogFileName=/src/test262.trx"; \
    fi || true
COPY engines/jint/convert262.py ./
RUN python3 ./convert262.py test262.trx -o /dist/jint.ci-test262 -b /dist/jint --test262-rev="$(sed -nE 's/.*"SuiteGitSha": "([0-9a-f]+)".*/\1/p' Jint.Tests.Test262/Test262Harness.settings.json)" || true
