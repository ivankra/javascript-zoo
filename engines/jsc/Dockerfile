# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends libicu-dev
    #build-essential ca-certificates cmake git python3 ruby

ARG REPO=https://github.com/WebKit/WebKit.git
ARG REV=main

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

ARG JITLESS=

RUN export CXXFLAGS="-Wno-error" && \
    Tools/Scripts/build-webkit \
      $(if [ "$JITLESS" = true ]; then echo --no-jit --no-webassembly; fi) \
      --jsc-only \
      --release \
      --cmakeargs="-DENABLE_STATIC_JSC=ON -DUSE_THIN_ARCHIVES=OFF -DDEVELOPER_MODE_FATAL_WARNINGS=OFF"

# More trims:
#   * JIT-less with handcoded asm in LLint:
#     --no-jit --no-webassembly
#   * JIT-less with CLoop: machine-generated C++ ops in LLint, ~20% slower:
#     --no-jit --no-webassembly --cloop --no-sampling-profiler
#   * Baseline JIT only:
#     --no-ftl-jit --no-dfg-jit --no-webassembly
#   * Baseline+DFG:
#     --no-ftl-jit --no-webassembly

COPY build/dist.py ./
RUN ./dist.py /dist/jsc \
      --binary=/src/WebKitBuild/JSCOnly/Release/bin/jsc \
      --license=Source/JavaScriptCore/COPYING.LIB \
      version="$(curl "https://commits.webkit.org/$(git rev-parse HEAD)/json" 2>&1 | sed -En 's/.*\"identifier\": \"([^\"]+)\".*/\1/p' | sed 's/@main//')"
