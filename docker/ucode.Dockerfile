# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc15
FROM $BASE

ARG REPO=https://github.com/jow-/ucode.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN apt-get update -y && apt-get install -y --no-install-recommends libjson-c-dev

#RUN sed -i 's/-Os /-O3 /' CMakeLists.txt
RUN cmake -B build && cmake --build build -j

RUN mkdir -p /dist && \
    cp -a build /dist/ucode-dist && \
    cd /dist/ucode-dist && \
    rm -rf examples/ CMake* cmake* Makefile && \
    (strip * || true)

COPY dist.py ./
RUN ./dist.py /dist/ucode --wrapper='LIB=$SCRIPT_DIR/ucode-dist; export LD_LIBRARY_PATH=$LIB; exec "$LIB/ucode" "-L$LIB" "$@"'
