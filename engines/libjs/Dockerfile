# Build instructions:
# https://github.com/LadybirdBrowser/ladybird/blob/master/Documentation/BuildInstructionsLadybird.md
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y \
      autoconf \
      autoconf-archive \
      automake \
      build-essential \
      ccache \
      cmake \
      curl \
      fonts-liberation2 \
      git \
      libdrm-dev \
      libgl1-mesa-dev \
      libpulse-dev \
      libtool \
      nasm \
      ninja-build \
      pkg-config \
      python3-venv \
      qt6-base-dev \
      qt6-multimedia-dev \
      qt6-tools-dev-tools \
      qt6-wayland \
      rustup \
      tar \
      unzip \
      zip

RUN rustup toolchain install stable

WORKDIR /src
ARG REPO=https://github.com/LadybirdBrowser/ladybird.git
RUN git clone --depth=1 --branch=master "$REPO" .

RUN sed -i 's/geteuid() == 0/geteuid() == 42/' Meta/ladybird.py && Meta/ladybird.py vcpkg

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout -f FETCH_HEAD

# Truncate vcpkg dependencies to a minimal necessary set for LibJS build
# If running into cmake errors, add missing components here from
# https://github.com/LadybirdBrowser/ladybird/blob/master/vcpkg.json
RUN sed -i '/"dependencies":/,/^  ],$/c "dependencies": ["fast-float", "fmt", "icu", "libtommath", "libxml2", "openssl", "simdjson", "simdutf", "sqlite3", "zlib"],' vcpkg.json

# Target AVX2 / generic ARMv8 CPUs rather than native
# for higher compatibility of built binaries
RUN case `dpkg --print-architecture` in \
      arm64) sed -i 's/-march=native/-march=armv8-a/' Meta/CMake/common_compile_options.cmake;; \
      amd64) sed -i 's/-march=native/-march=x86-64-v3/' Meta/CMake/common_compile_options.cmake;; \
    esac

RUN if [ `uname -m` = riscv64 ]; then export VCPKG_FORCE_SYSTEM_BINARIES=1; fi; \
    cmake -B build -G Ninja --preset=Release \
      -DCMAKE_C_COMPILER=$CC \
      -DCMAKE_CXX_COMPILER=$CXX \
      -DBUILD_SHARED_LIBS=OFF \
      -DENABLE_GUI_TARGETS=OFF \
      -DENABLE_QT=OFF \
      -DVCPKG_TARGET_TRIPLET="$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/x64/')-linux-release"

RUN ninja -C build test262-runner js

COPY build/dist.py ./
RUN ./dist.py /dist/libjs --binary=/src/build/bin/js
