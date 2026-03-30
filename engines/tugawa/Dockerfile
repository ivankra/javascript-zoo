# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-jdk
FROM $BASE

RUN apt-get update && apt-get install -y --no-install-recommends ruby && \
    rm -rf /var/lib/apt/lists/*

ARG REPO=https://github.com/tugawa/ejs-new.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

# Build: create build dir, copy Makefile template, patch for Linux, build
RUN mkdir build && cp ejsvm/Makefile.template build/Makefile && \
    sed -i 's/^SED = gsed/SED = sed/' build/Makefile && \
    sed -i 's/^PYTHON = python$/PYTHON = python3/' build/Makefile && \
    sed -i 's/^CXX = gcc$/CXX = g++/' build/Makefile && \
    cd build && make -j$(nproc)

RUN mkdir -p /dist/tugawa-dist && \
    cp /src/build/ejsvm /src/build/ejsc.jar /src/build/ejsvm.spec /dist/tugawa-dist/

COPY build/dist.py ./
RUN ./dist.py /dist/tugawa \
      --wrapper='if [ -z "$1" ]; then echo "Usage: tugawa <file.js>" >&2; exit 1; fi; SBC=$(mktemp /tmp/ejs.XXXXXX.sbc); java -jar "$SCRIPT_DIR/tugawa-dist/ejsc.jar" --spec "$SCRIPT_DIR/tugawa-dist/ejsvm.spec" -O "$1" -o "$SBC" && "$SCRIPT_DIR/tugawa-dist/ejsvm" "$SBC"; RC=$?; rm -f "$SBC"; exit $RC' \
      --dist_files=/dist/tugawa-dist \
      --no-license \
      console_log=print
