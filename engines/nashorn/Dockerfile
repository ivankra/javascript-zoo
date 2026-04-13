# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-jdk25
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/openjdk/nashorn.git
RUN git clone --depth=1 "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN cd make/nashorn && ant jar

RUN mkdir -p /dist/nashorn-dist && \
    cp /src/build/nashorn/dist/*.jar /dist/nashorn-dist && \
    cp /src/build/nashorn/dependencies/*.jar /dist/nashorn-dist

COPY build/dist.py ./
RUN ./dist.py /dist/nashorn \
      --wrapper='exec java -cp "$SCRIPT_DIR/nashorn-dist/*" --add-exports=jdk.internal.le/jdk.internal.org.jline.{reader,reader.impl,reader.impl.completer,terminal,keymap}=ALL-UNNAMED org.openjdk.nashorn.tools.jjs.Main --language=es6 "$@"' \
      version="$(git describe --tags | sed 's/^release-//')"

# Wrapper with -ot flag (optimistic types): helps some benchmarks esp. numeric, hurts others
RUN ./dist.py /dist/nashorn_ot \
      --wrapper='exec $SCRIPT_DIR/nashorn -ot "$@"' \
      version="$(git describe --tags | sed 's/^release-//')"
