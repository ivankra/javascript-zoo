# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-jdk25
FROM $BASE

ARG REPO=https://github.com/openjdk/nashorn.git
ARG REV=main

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN cd make/nashorn && ant jar

RUN mkdir -p /dist/nashorn-dist && \
    cp /src/build/nashorn/dist/*.jar /dist/nashorn-dist && \
    cp /src/build/nashorn/dependencies/*.jar /dist/nashorn-dist
COPY engines/nashorn/nashorn.sh /dist/nashorn

COPY build/dist.py ./
RUN ./dist.py /dist/nashorn \
      --dist_files=/dist/nashorn-dist/*.jar \
      version="$(git describe --tags | sed 's/^release-//')"

# Wrapper with -ot flag (optimistic types): helps some benchmarks esp. numeric, hurts others
RUN ./dist.py /dist/nashorn_ot \
      --dist_files=/dist/nashorn-dist/*.jar \
      --wrapper='exec $SCRIPT_DIR/nashorn -ot "$@"' \
      version="$(git describe --tags | sed 's/^release-//')"
