# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

RUN apt-get update -y && apt-get install -y --no-install-recommends qtbase5-dev

ARG REPO=https://github.com/aschet/qsaqt5.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

# Build only the core library; examples are GUI apps and not needed here.
RUN sed -i '/add_subdirectory(examples)/d' qsa/CMakeLists.txt
RUN cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release -DQSA_NO_DLL=ON -DQSA_NO_EDITOR=ON -DQSA_NO_IDE=ON
RUN cmake --build build --target qsa

COPY engines/qsa/main.cc ./
RUN c++ -O3 -std=c++17 -static-libgcc -static-libstdc++ -I/src/qsa/src -I/src/qsa/src/qsa main.cc /src/build/qsa/src/libqsa.a $(pkg-config --cflags --libs Qt5Widgets) -o /src/build/qsa-runner

# TODO: static binary

COPY build/dist.py ./
RUN ./dist.py /dist/qsa --binary=/src/build/qsa-runner --license=/src/qsa/LICENSE.GPL
