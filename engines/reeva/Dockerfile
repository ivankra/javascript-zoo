# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-jdk21
FROM $BASE

ARG REPO=https://github.com/ReevaJS/reeva.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY engines/reeva/reeva.patch ./
RUN git apply reeva.patch

RUN ./gradlew --no-daemon runnerJar

RUN install -D /src/build/libs/reeva-runner-sources.jar /dist/reeva.jar

COPY build/dist.py ./
RUN ./dist.py /dist/reeva \
      --wrapper='exec java -jar "$SCRIPT_DIR/reeva.jar" "$@"' \
      --dist_files=/dist/reeva.jar
