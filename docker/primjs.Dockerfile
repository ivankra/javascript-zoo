# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/lynx-family/primjs.git
ARG REV=develop

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN sed -i '/^set(quickjs_sources/a     ${CMAKE_CURRENT_SOURCE_DIR}/src/basic/log/primjs_logging.cc' CMakeLists.txt
RUN sed -i 's/ -Os / -O3 /' CMakeLists.txt

# Set to true to disable tracing GC
ARG DISABLE_GC=

RUN platform_abi="$(uname -m | sed -e 's/^aarch64$/arm64/; s/^arm64$/arm64/; s/^x86_64$/x86_64/')"; \
    cmake_args="-DENABLE_UNITTESTS=ON"; \
    if [ "${DISABLE_GC}" != "true" ]; then \
      cmake_args="$cmake_args -DENABLE_LEPUSNG=ON -DENABLE_PRIMJS_SNAPSHOT=ON -DENABLE_COMPATIBLE_MM=ON -DPLATFORM_ABI=${platform_abi} -DCMAKE_C_FLAGS=-DENABLE_TRACING_GC -DCMAKE_CXX_FLAGS=-DENABLE_TRACING_GC"; \
    fi; \
    cmake -B build -G Ninja $cmake_args && \
    ninja -C build qjs

COPY dist.py ./
RUN ./dist.py /dist/primjs --binary=/src/build/qjs
