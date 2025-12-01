# Build instructions:
# https://github.com/LadybirdBrowser/ladybird/blob/master/Documentation/BuildInstructionsLadybird.md
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y autoconf autoconf-archive automake build-essential ccache cmake curl fonts-liberation2 git libdrm-dev libgl1-mesa-dev libtool nasm ninja-build pkg-config python3-venv qt6-base-dev qt6-tools-dev-tools qt6-wayland tar unzip zip qt6-multimedia-dev libpulse-dev

ARG REPO=https://github.com/LadybirdBrowser/ladybird.git
ARG REV1=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV1" "$REPO" .

RUN sed -i 's/geteuid() == 0/geteuid() == 42/' Meta/ladybird.py
RUN Meta/ladybird.py vcpkg

# An extra cmake run just for docker to cache vcpkg deps build (extremely slow),
# so that subsequent builds at a different REV would reuse them.
RUN export ARCH=$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/x64/') && \
    cmake \
      -S . -B Build/release --preset Release \
      -DCMAKE_MAKE_PROGRAM=ninja \
      -DCMAKE_C_COMPILER=$CC \
      -DCMAKE_CXX_COMPILER=$CXX \
      -DBUILD_SHARED_LIBS=OFF \
      -DENABLE_GUI_TARGETS=OFF \
      -DENABLE_QT=OFF \
      -DVCPKG_TARGET_TRIPLET="$ARCH-linux-release"

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD

RUN export ARCH=$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/x64/') && \
    cmake \
      -S . -B Build/release --preset Release \
      -DCMAKE_MAKE_PROGRAM=ninja \
      -DCMAKE_C_COMPILER=$CC \
      -DCMAKE_CXX_COMPILER=$CXX \
      -DBUILD_SHARED_LIBS=OFF \
      -DENABLE_GUI_TARGETS=OFF \
      -DENABLE_QT=OFF \
      -DVCPKG_TARGET_TRIPLET="$ARCH-linux-release"

RUN ninja -C Build/release test262-runner js

ENV JS_BINARY=/src/Build/release/bin/js
CMD ${JS_BINARY}
