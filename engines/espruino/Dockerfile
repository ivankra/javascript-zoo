# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc14
FROM $BASE

ARG REPO=https://github.com/espruino/Espruino.git
ARG REV=master

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN make -j RELEASE=1

COPY build/dist.py ./
RUN ./dist.py /dist/espruino \
      --binary=/src/bin/espruino \
      version="$(/src/bin/espruino -e 'print(process.version)' | tail -2 | head -1 | tr -d '\r')"
