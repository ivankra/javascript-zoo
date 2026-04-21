# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-jdk25
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/mozilla/rhino.git
RUN git clone "$REPO" .

ARG REV=master
RUN git fetch origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN ./gradlew :rhino-all:build

RUN mkdir -p /dist/rhino-dist && cp rhino-all/build/libs/rhino-all-*.jar /dist/rhino-dist/rhino.jar
COPY engines/rhino/rhino.sh /dist/rhino

COPY build/dist.py ./
COPY engines/rhino/convert262.py ./convert262.py
RUN ./dist.py /dist/rhino \
      --dist_files=/dist/rhino-dist/rhino.jar \
      --license=LICENSE.txt \
      --license=NOTICE.txt \
      --license=NOTICE-tools.txt \
      version="$(sed -n 's/^version=//p' gradle.properties)"

# Convert test262 results generated and checked-in by CI (see .github/workflows/gradle.yml).
RUN git submodule update --init --depth=1 && \
    python3 ./convert262.py . -o /dist/rhino.ci-test262 -b /dist/rhino
