# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

RUN curl -fsSL https://cli.moonbitlang.com/install/unix.sh | bash -s "latest"
ENV PATH=/root/.moon/bin:$PATH

ARG REPO=https://github.com/dowdiness/js_engine.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN apt-get update -y && apt-get install -y --no-install-recommends jq
RUN jq '.deps = ((.deps // {}) + {"moonbitlang/x":"0.4.38"})' moon.mod.json | sponge moon.mod.json

COPY engines/dowdiness/main.mbt ./cmd/main/main.mbt
COPY engines/dowdiness/moon.pkg ./cmd/main/moon.pkg

# Make print/console.log eager instead of buffering stuff till the end.
RUN sed -i 's/output.push(parts.join(" "))/println(parts.join(" "))/' interpreter/stdlib/builtins.mbt interpreter/runtime/property.mbt

RUN moon update && moon build --target native --release cmd/main

COPY build/dist.py ./
RUN ./dist.py /dist/dowdiness --binary=/src/_build/native/release/build/cmd/main/main.exe
