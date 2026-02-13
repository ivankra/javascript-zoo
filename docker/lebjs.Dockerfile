# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/LebsterFace/LebJS.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN apt-get install -y --no-install-recommends openjdk-25-jdk-headless ant

RUN javac -d out $(find src -name "*.java") && \
    mkdir -p out/META-INF && \
    cp src/META-INF/MANIFEST.MF out/META-INF/ && \
    jar cfm lebjs.jar out/META-INF/MANIFEST.MF -C out .

RUN mkdir -p /dist && \
    cp lebjs.jar /dist/lebjs.jar

COPY dist.py ./
RUN ./dist.py /dist/lebjs \
      --wrapper='exec java -jar "$SCRIPT_DIR/lebjs.jar" "$@"' \
      --dist_files=/dist/lebjs.jar
