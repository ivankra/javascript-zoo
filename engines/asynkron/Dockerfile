# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

ARG REPO=https://github.com/asynkron/Asynkron.JsEngine.git
ARG REV=main

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

COPY engines/asynkron/asynkron.cs /src/
COPY engines/asynkron/asynkron.csproj /src/

# Allow our assembly to access engine internals (e.g. DrainMicrotasks).
RUN echo '[assembly: System.Runtime.CompilerServices.InternalsVisibleTo("asynkron")]' \
      >> src/Asynkron.JsEngine/Properties/AssemblyInfo.cs

# Generate Test262AbstractModuleSource.cs with CreateAbstractModuleSource
# method extracted from upstream Test262Test.cs.
COPY engines/asynkron/gen-ams.sh ./
RUN bash ./gen-ams.sh

RUN dotnet publish asynkron.csproj -c Release -o /dist/asynkron-dist
RUN rm -rf /dist/asynkron-dist/*.pdb

COPY build/dist.py ./
RUN ./dist.py /dist/asynkron --wrapper='exec dotnet "$SCRIPT_DIR/asynkron-dist/asynkron.dll" "$@"'
