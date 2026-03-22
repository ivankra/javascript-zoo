# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/lynx-family/primjs.git
ARG REV=develop

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

# DISABLE_GC=y: disables tracing GC
ARG DISABLE_GC=
# TEST262=y: package run-test262 binary as primjs_262
ARG TEST262=

# Fix: logging.cc:(.text._ZN6primjs7general7logging10LogMessageD2Ev+0x64): undefined reference to `primjs::general::logging::Log(primjs::general::logging::LogMessage*)'
RUN sed -i '/^set(quickjs_sources/a     ${CMAKE_CURRENT_SOURCE_DIR}/src/basic/log/primjs_logging.cc' CMakeLists.txt

RUN sed -i 's/ -Os / -O3 /' CMakeLists.txt

RUN args="-DENABLE_UNITTESTS=ON"; \
    if [ "${DISABLE_GC}" != "y" ]; then \
      args="$args -DENABLE_LEPUSNG=ON -DENABLE_PRIMJS_SNAPSHOT=ON -DENABLE_COMPATIBLE_MM=ON -DCMAKE_C_FLAGS=-DENABLE_TRACING_GC -DCMAKE_CXX_FLAGS=-DENABLE_TRACING_GC"; \
      args="$args -DPLATFORM_ABI=$(uname -m | sed 's/^aarch64$/arm64/; s/^arm64$/arm64/; s/^x86_64$/x86_64/')"; \
    fi; \
    if [ "$TEST262" = y ]; then \
      args="$args -DCMAKE_EXE_LINKER_FLAGS=-Wl,--allow-multiple-definition"; \
      cmake -B build -G Ninja $args && \
      ninja -C build qjs run-test262; \
    else \
      cmake -B build -G Ninja $args && \
      ninja -C build qjs; \
    fi;

COPY build/dist.py ./
RUN ./dist.py /dist/primjs --binary=/src/build/qjs

RUN if [ "$TEST262" = y ]; then ./dist.py /dist/primjs_262 --binary=/src/build/run-test262 --no-test; fi
