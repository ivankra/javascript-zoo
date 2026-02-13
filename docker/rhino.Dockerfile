# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/mozilla/rhino.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

# Build fails with JDK 25
RUN apt-get install -y --no-install-recommends openjdk-21-jdk-headless

RUN ./gradlew :rhino-all:build

RUN mkdir -p /dist && \
    cp rhino-all/build/libs/rhino-all-*.jar /dist/rhino.jar

COPY dist.py ./
RUN ./dist.py /dist/rhino \
      --wrapper='exec java -jar "$SCRIPT_DIR/rhino.jar" "$@"' \
      --license=LICENSE.txt \
      --license=NOTICE.txt \
      --license=NOTICE-tools.txt \
      version="$(git describe --tags | sed -Ee 's/^Rhino([0-9_]+)_Release/\1/; s/_/./g')" \
      dist_size="$(du -bs /dist/rhino.jar | cut -f 1)"
