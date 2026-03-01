# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc14
FROM $BASE

RUN dpkg --add-architecture i386 && \
    apt-get update -y && \
    apt-get install -y libc6:i386 libstdc++6:i386 g++-multilib libc6-dev-i386 qemu-user-static binfmt-support

ARG REPO=https://github.com/DigitalMars/DscriptCPP.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

COPY engines/dscriptcpp/dscriptcpp.patch ./
RUN git apply dscriptcpp.patch && make

COPY build/dist.py ./
RUN ./dist.py /dist/dscriptcpp --binary=/src/dscript console_log=println

# TODO: wrapper with 'qemu-i386-static ./dscript' for macOS containerization or check different kernels
