# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/DrkWithT/DerkJS-Redux.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN apt-get update -y && apt-get install -y --no-install-recommends cmake ninja-build

RUN sed -i '1s|^cmake_minimum_required(.*)$|cmake_minimum_required(VERSION 3.28)|' CMakeLists.txt

#RUN ./utility.sh build  -- macOS only

RUN cmake -S . -B build -G Ninja \
      -DCMAKE_CXX_STANDARD=23 \
      -DCMAKE_BUILD_TYPE=Release \
      -DCMAKE_CXX_FLAGS="-stdlib=libc++" \
      -DCMAKE_EXE_LINKER_FLAGS="-stdlib=libc++ -static" && \
    cmake --build build

COPY build/dist.py ./
RUN ./dist.py /dist/derkjs \
      --binary=/src/build/derkjs_tco \
      --no-license \
      --smoke-test-cmd='$BINARY -r'
