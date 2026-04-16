# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-dotnet
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/akeit0/okojo.git
RUN git clone --depth=1 "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

COPY build/dist.py ./
RUN dotnet publish src/Okojo.Node.Cli/Okojo.Node.Cli.csproj \
        -c Release \
        -o /dist/okojo-dist \
        -r "linux-$(uname -m | sed 's/x86_64/x64/; s/aarch64/arm64/')"
RUN ./dist.py /dist/okojo --wrapper='exec dotnet /dist/okojo-dist/okojonode.dll "$@"'

ARG TEST262=y
RUN if [ "$TEST262" = y ]; then \
       git clone --depth=1 https://github.com/tc39/test262 test262 && \
       dotnet run --project tools/Test262Runner/Test262Runner.csproj -c Release -- --progress-json progress.json; \
    fi || true
COPY engines/okojo/convert262.py ./
RUN rev="$(git -C test262 rev-parse HEAD 2>/dev/null || true)"; \
    python3 ./convert262.py TEST262_PROGRESS_INCREMENTAL.json -o /dist/okojo.ci-test262 -b /dist/okojo --test262-rev="$rev" || truie
