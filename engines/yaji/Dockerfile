# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openjdk-21-jdk-headless ant ant-optional

ARG REPO=https://github.com/neades/yaji-ecmascript-interpreter.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

WORKDIR /src/yaji-ecmascript-interpreter

# Don't block build on failing tests
RUN sed -i 's/<target name="jars" depends="compile,test"/<target name="jars" depends="compile"/' ant/build.xml

RUN ant -f ant/build.xml jars

RUN install -D lib/fesi.jar /dist/yaji.jar

COPY build/dist.py ./
RUN ./dist.py /dist/yaji \
      --wrapper='if [ "$#" -gt 0 ]; then exec java -jar "$SCRIPT_DIR/yaji.jar" -f "$1"; else exec java -jar "$SCRIPT_DIR/yaji.jar" -i; fi' \
      --dist_files=/dist/yaji.jar \
      --license=/src/yaji-ecmascript-interpreter/License.txt \
      console_log=writeln
