ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/solarbrowser/quanta.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN sed -i 's/\(CXXFLAGS += -msse4.2\|CORE_SOURCES += .*LinuxNativeAPI\)/#\1/' Makefile && \
    make -j

ENV JS_BINARY=/src/build/bin/quanta
CMD ${JS_BINARY}
