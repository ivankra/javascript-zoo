# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/ivankra/FESI.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN install -D lib/fesi.jar /dist/fesi.jar

COPY build/dist.py ./
RUN ./dist.py /dist/fesi \
      --wrapper='if [ "$#" -gt 0 ]; then script="$1"; shift; if [ "$#" -gt 0 ]; then exec java -cp "$SCRIPT_DIR/fesi.jar" FESI.Interpreter.Interpret -f "$script" -A "$@"; else exec java -cp "$SCRIPT_DIR/fesi.jar" FESI.Interpreter.Interpret -f "$script"; fi; else exec java -cp "$SCRIPT_DIR/fesi.jar" FESI.Interpreter.Interpret -i; fi' \
      --dist_files=/dist/fesi.jar \
      --license=/src/License.txt \
      version="1.1.8" \
      console_log=writeln
