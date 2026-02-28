# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/DrkWithT/DerkJS-Redux.git
ARG REV=main

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN apt-get update -y && apt-get install -y --no-install-recommends cmake ninja-build

# Upstream asks for CMake 4.2, but this project config works with modern 3.x.
RUN sed -i '1s|^cmake_minimum_required(.*)$|cmake_minimum_required(VERSION 3.28)|' CMakeLists.txt

RUN cmake -S . -B build -G Ninja \
      -DCMAKE_CXX_SCAN_FOR_MODULES=ON \
      -DCMAKE_CXX_STANDARD=23 \
      -DCMAKE_CXX_EXTENSIONS=OFF \
      -DCMAKE_BUILD_TYPE=Release \
      -DCMAKE_CXX_FLAGS="-stdlib=libc++" \
      -DCMAKE_EXE_LINKER_FLAGS="-stdlib=libc++" && \
    cmake --build build

COPY build/dist.py ./
RUN ./dist.py /dist/derkjs \
      --binary=/src/build/derkjs_tco \
      --no-license \
      run_script_cmd='$BINARY -r $FILE'
