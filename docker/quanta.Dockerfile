# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/solarbrowser/quanta.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN sed -i 's/\(CXXFLAGS += -msse4.2\|CORE_SOURCES += .*LinuxNativeAPI\)/#\1/' Makefile
RUN sed -i '1i #include <climits>' include/quanta/core/runtime/Value.h
RUN make -j

ENV JS_BINARY=/src/build/bin/quanta
CMD ${JS_BINARY}
