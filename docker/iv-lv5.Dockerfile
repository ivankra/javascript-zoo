# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends libgc-dev subversion
    #build-essential ca-certificates cmake git python3

ARG REPO=https://github.com/Constellation/iv.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

# Some bug on arm64 with gc causing infinite init loop, call LabelTable() singleton early.
RUN sed -i 's/iv::lv5::railgun::ExecuteInGlobal/iv::lv5::railgun::VM::LabelTable(); iv::lv5::railgun::ExecuteInGlobal/' iv/lv5/main.cc

ARG JITLESS=
ARG STATIC=true

# Builds with -O3 by default
RUN export CXXFLAGS="-w -Wno-implicit-fallthrough -Wno-deprecated-copy -Wno-deprecated -Wl,--allow-multiple-definition" && \
    cmake -Bbuild -DCMAKE_BUILD_TYPE=Release \
      $(if [ "$JITLESS" = true ]; then echo -DJIT=OFF; fi) \
      $(if [ "$STATIC" = true ]; then echo -DCMAKE_EXE_LINKER_FLAGS=-static; fi) && \
    make -C build -j lv5

ENV JS_BINARY=/src/build/iv/lv5/lv5
RUN if ${JS_BINARY} -v | grep -q "JIT..off"; then echo "" >jsz_jit; fi  # metadata
CMD ${JS_BINARY}
