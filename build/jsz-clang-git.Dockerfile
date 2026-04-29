# Clang/LLVM toolchain built from source.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG LLVM_REPO=https://github.com/llvm/llvm-project.git
# ARG LLVM_REV=main
# Use the same revision as V8: https://github.com/v8/v8/blob/main/DEPS#L323
ARG LLVM_REV=20b6ec66967ac2a8f932863c1abf251e5b17a843

RUN git clone --depth=1 "$LLVM_REPO" /llvm && \
    cd /llvm && \
    git fetch --depth=1 origin "$LLVM_REV" && \
    git checkout FETCH_HEAD && \
    git rev-parse HEAD && \
    cmake -G Ninja \
        -S /llvm/llvm \
        -B /llvm/build \
        -DCMAKE_BUILD_TYPE=Release \
        -DCMAKE_INSTALL_PREFIX=/usr/local \
        -DLLVM_ENABLE_PROJECTS="clang;lld;clang-tools-extra" \
        -DLLVM_ENABLE_RUNTIMES="compiler-rt" \
        -DLLVM_TARGETS_TO_BUILD=host \
        -DLLVM_ENABLE_ASSERTIONS=OFF \
        -DLLVM_INCLUDE_TESTS=OFF \
        -DLLVM_INCLUDE_BENCHMARKS=OFF \
        -DLLVM_INCLUDE_EXAMPLES=OFF \
        -DLLVM_BUILD_DOCS=OFF \
        -DLLVM_ENABLE_IO_SANDBOX=OFF \
        -DLLVM_ENABLE_Z3_SOLVER=OFF \
        -DLLVM_ENABLE_CURL=OFF \
        -DLLVM_ENABLE_PER_TARGET_RUNTIME_DIR=OFF \
        -DLLVM_ENABLE_UNWIND_TABLES=OFF \
        -DLLVM_INSTALL_UTILS=ON \
        -DCLANG_DEFAULT_LINKER=lld \
        -DCLANG_PLUGIN_SUPPORT=OFF \
        -DCLANG_ENABLE_STATIC_ANALYZER=OFF \
        -DCLANG_ENABLE_ARCMT=OFF \
        -DLIBCLANG_BUILD_STATIC=ON && \
    ninja -C /llvm/build && \
    ninja -C /llvm/build install && \
    ldconfig && \
    rm -rf /llvm

RUN apt-get remove -y build-essential gcc g++ gcc-14 g++-14 libstdc++-14-dev && \
    apt-get autoremove -y

ENV CC=/usr/local/bin/clang CXX=/usr/local/bin/clang++ AR=/usr/local/bin/llvm-ar NM=/usr/local/bin/llvm-nm

RUN update-alternatives --install /usr/bin/cc cc $CC 150 && \
    update-alternatives --install /usr/bin/c++ c++ $CXX 150 && \
    update-alternatives --install /usr/bin/clang clang $CC 150 && \
    update-alternatives --install /usr/bin/clang++ clang++ $CXX 150 && \
    update-alternatives --install /usr/bin/ld.lld ld.lld /usr/local/bin/ld.lld 150 && \
    update-alternatives --install /usr/bin/lld lld /usr/local/bin/lld 150 && \
    update-alternatives --install /usr/bin/llvm-ar llvm-ar $AR 150 && \
    update-alternatives --install /usr/bin/llvm-nm llvm-nm $NM 150

# For dist.py - copied into "cc" field in binary's metadata json
RUN $CC -v 2>&1 | sed -ne 's/.*clang version /clang /p' >/jsz_cc
