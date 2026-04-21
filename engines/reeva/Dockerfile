# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-jdk21
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/ReevaJS/reeva.git
RUN git clone --depth=1 "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

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
