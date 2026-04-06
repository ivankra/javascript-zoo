# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-jdk21
FROM $BASE

ARG REPO=https://github.com/ReevaJS/reeva.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

COPY engines/reeva/reeva.patch ./
RUN git apply reeva.patch

RUN ./gradlew --no-daemon runnerJar

RUN install -D /src/build/libs/reeva-runner-sources.jar /dist/reeva-dist/reeva.jar
COPY engines/reeva/reeva.sh /dist/reeva

COPY build/dist.py ./
RUN ./dist.py /dist/reeva \
      --dist_files=/dist/reeva-dist/reeva.jar && \
    # AOT cache is specific to JVM version and jsz-runtime has a different JDK \
    rm -f /dist/reeva-dist/reeva.aot*
