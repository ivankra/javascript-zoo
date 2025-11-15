# Build instructions:
# https://github.com/LadybirdBrowser/ladybird/blob/master/Documentation/BuildInstructionsLadybird.md
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/LadybirdBrowser/ladybird.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN apt-get update -y && apt-get install -y autoconf autoconf-archive automake build-essential ccache cmake curl fonts-liberation2 git libdrm-dev libgl1-mesa-dev libtool nasm ninja-build pkg-config python3-venv qt6-base-dev qt6-tools-dev-tools qt6-wayland tar unzip zip qt6-multimedia-dev libpulse-dev

RUN sed -i -e 's/geteuid() == 0/geteuid() == 42/' Meta/ladybird.py

# One command build wrapper
#RUN Meta/ladybird.py build --preset Release test262-runner js

RUN Meta/ladybird.py vcpkg

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

# GN build, doesn't work
#RUN sed -i -e 's/^exit_if_running_as_root/#/' Toolchain/BuildGN.sh
#RUN Toolchain/BuildGN.sh
#RUN Toolchain/Local/gn/bin/gn gen Build/release --args='host_cc="clang-20" host_cxx="clang++20" is_clang=true use_lld=true qt_install_headers="/usr/include/x86_64-linux-gnu/qt6/" qt_install_lib="/usr/lib/x86_64-linux-gnu" qt_install_libexec="/usr/lib/qt6/libexec/"'
#RUN ninja -C Build/release test262-runner js

ENV JS_BINARY=/src/Build/release/bin/js
CMD ${JS_BINARY}
