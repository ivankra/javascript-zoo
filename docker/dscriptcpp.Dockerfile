# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

RUN dpkg --add-architecture i386 && \
    apt update -y && \
    apt install -y libc6:i386 libstdc++6:i386 g++-multilib libc6-dev-i386 qemu-user-static binfmt-support

ARG REPO=https://github.com/DigitalMars/DscriptCPP.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY dscriptcpp.patch ./
RUN git apply dscriptcpp.patch && make

ENV JS_BINARY=/src/dscript
CMD ${JS_BINARY} /bench/repl.js

# TODO: wrapper with 'qemu-i386-static ./dscript' for macOS containerization or check different kernels
# TODO: errno=75 fstat error -> 64-bit inode
