# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/solarbrowser/quanta.git
RUN git clone --depth=1 "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD
RUN git submodule update --init

RUN sed -i 's/-mtune=native//' Makefile CMakeLists.txt
RUN sed -i 's/-march=native//' Makefile CMakeLists.txt
RUN sed -i 's/\(CXXFLAGS += -msse4.2\|CORE_SOURCES += .*LinuxNativeAPI\)/#\1/' Makefile
RUN sed -i '1i #include <climits>' include/quanta/core/runtime/Value.h
RUN bash ./build.sh || (tail -n 1000 build/*.log; exit 1)

COPY build/dist.py ./
RUN ./dist.py /dist/quanta --binary=/src/build/bin/quanta
