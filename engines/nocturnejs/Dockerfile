# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

RUN curl -fsSL https://cli.moonbitlang.com/install/unix.sh | bash -s "latest"
ENV PATH=/root/.moon/bin:$PATH

WORKDIR /src
ARG REPO=https://github.com/Lampese/NocturneJS.git
RUN git clone --depth=1 "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN moon update && moon build --target native --release cmd/main

COPY build/dist.py ./
RUN ./dist.py /dist/nocturnejs --binary=/src/_build/native/release/build/cmd/main/main.exe --no-license
