# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/openjdk/nashorn.git
ARG REV=main

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN apt-get install -y --no-install-recommends openjdk-25-jdk-headless ant
RUN cd make/nashorn && ant jar

RUN mkdir -p /dist/nashorn-dist && \
    cp /src/build/nashorn/dist/*.jar /dist/nashorn-dist && \
    cp /src/build/nashorn/dependencies/*.jar /dist/nashorn-dist

COPY dist.py ./
RUN ./dist.py /dist/nashorn \
      --wrapper='exec java -cp "$SCRIPT_DIR/nashorn-dist/*" --add-exports=jdk.internal.le/jdk.internal.org.jline.{reader,reader.impl,reader.impl.completer,terminal,keymap}=ALL-UNNAMED org.openjdk.nashorn.tools.jjs.Main --language=es6 "$@"' \
      version="$(git describe --tags | sed 's/^release-//')"

# Wrapper with -ot flag (optimistic types): helps some benchmarks esp. numeric, hurts others
RUN ./dist.py /dist/nashorn_ot \
      --wrapper='exec $SCRIPT_DIR/nashorn -ot "$@"' \
      version="$(git describe --tags | sed 's/^release-//')"
