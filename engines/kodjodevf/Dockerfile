# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

RUN apt-get update -y && apt-get install -y --no-install-recommends wget gpg ca-certificates && \
    wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/dart.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/dart.gpg] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main" \
      > /etc/apt/sources.list.d/dart_stable.list && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends dart

ARG REPO=https://github.com/kodjodevf/js_interpreter.git
ARG REV=main

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN dart pub get

COPY engines/kodjodevf/main.dart .
RUN mkdir -p /dist && dart compile exe -o /dist/kodjodevf main.dart

COPY build/dist.py ./
RUN ./dist.py /dist/kodjodevf
