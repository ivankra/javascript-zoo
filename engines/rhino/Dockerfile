# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

# Note: build fails with JDK 25
ARG BASE=jsz-jdk21
FROM $BASE

ARG REPO=https://github.com/mozilla/rhino.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN ./gradlew :rhino-all:build

RUN mkdir -p /dist && cp rhino-all/build/libs/rhino-all-*.jar /dist/rhino.jar

COPY build/dist.py ./
RUN ./dist.py /dist/rhino \
      --wrapper='exec java -jar "$SCRIPT_DIR/rhino.jar" "$@"' \
      --dist_files=/dist/rhino.jar \
      --license=LICENSE.txt \
      --license=NOTICE.txt \
      --license=NOTICE-tools.txt \
      version="$(git describe --tags | sed -Ee 's/^Rhino([0-9_]+)_Release/\1/; s/_/./g')"
