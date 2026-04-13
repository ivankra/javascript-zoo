# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

# Note: build fails with JDK 25
ARG BASE=jsz-jdk21
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/mozilla/rhino.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN ./gradlew :rhino-all:build

RUN mkdir -p /dist/rhino-dist && cp rhino-all/build/libs/rhino-all-*.jar /dist/rhino-dist/rhino.jar
COPY engines/rhino/rhino.sh /dist/rhino

COPY build/dist.py ./
RUN ./dist.py /dist/rhino \
      --dist_files=/dist/rhino-dist/rhino.jar \
      --license=LICENSE.txt \
      --license=NOTICE.txt \
      --license=NOTICE-tools.txt \
      version="$(git describe --tags | sed -Ee 's/^Rhino([0-9_]+)_Release/\1/; s/_/./g')" && \
    # AOT cache is specific to JVM version and jsz-runtime has a different JDK \
    rm -f /dist/rhino-dist/rhino.aot*

# Copy test262 results generated and checked-in by CI (see .github/workflows/gradle.yml).
# Rerunning: `./gradlew :tests:test --tests Test262SuiteTest -DupdateTest262properties`.
RUN cp tests/testsrc/test262.properties /dist/rhino.test262.log && \
    git -C tests/test262 rev-parse HEAD >/dist/rhino.test262.rev
