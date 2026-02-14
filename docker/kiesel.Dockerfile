# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-zig
FROM $BASE

ARG REPO=https://codeberg.org/kiesel-js/kiesel.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN zig build --release=fast

COPY dist.py ./
RUN ./dist.py /dist/kiesel \
      --binary=/src/zig-out/bin/kiesel \
      version="$(/src/zig-out/bin/kiesel --version | grep -i kiesel | grep -o '[0-9].*')"
