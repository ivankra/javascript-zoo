# Clang-based build environment.
#
# clang20 LTO is broken (LLVMgold.so errors): https://github.com/llvm/llvm-project/issues/139602
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG LATEST_SNAPSHOT_VER=23
ARG VER=$LATEST_SNAPSHOT_VER

RUN apt-get remove -y build-essential gcc g++ gcc-14 g++-14 libstdc++-14-dev && apt-get autoremove -y
# Note: removes libtool - depends on gcc

RUN if [ "$VER" != 19 ]; then \
      apt-get install -y --no-install-recommends gpg gpgv && \
      wget -O /tmp/llvm-snapshot.gpg.key https://apt.llvm.org/llvm-snapshot.gpg.key && \
      gpg --dearmor -o /usr/share/keyrings/llvm-snapshot.gpg /tmp/llvm-snapshot.gpg.key && \
      rm -f /tmp/llvm-snapshot.gpg.key && \
      echo "deb [signed-by=/usr/share/keyrings/llvm-snapshot.gpg] https://apt.llvm.org/$(lsb_release -sc)/ llvm-toolchain-$(lsb_release -sc)$(if [ "$VER" != "$LATEST_SNAPSHOT_VER" ]; then echo -$VER; fi) main" >>/etc/apt/sources.list.d/llvm.list && \
      # Workaround for apt/sqv failing with:
      # "SHA1 is not considered secure since 2026-02-01T00:00:00Z".
      echo 'APT::Key::gpgvcommand "/usr/bin/gpgv";' >/etc/apt/apt.conf.d/99use-gpgv-for-llvm; \
    fi

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        clang-$VER \
        clang-format-$VER \
        clang-tidy-$VER \
        clang-tools-$VER \
        clangd-$VER \
        libc++-$VER-dev \
        libc++abi-$VER-dev \
        lld-$VER \
        lldb-$VER \
        llvm-$VER

# V8's build system needs these four to be explicitly set
ENV CC=/usr/bin/clang-$VER CXX=/usr/bin/clang++-$VER AR=/usr/bin/llvm-ar-$VER NM=/usr/bin/llvm-nm-$VER

RUN update-alternatives --install /usr/bin/cc cc $CC 150 && \
    update-alternatives --install /usr/bin/c++ c++ $CXX 150 && \
    update-alternatives --install /usr/bin/clang clang $CC 150 && \
    update-alternatives --install /usr/bin/clang++ clang++ $CXX 150 && \
    update-alternatives --install /usr/bin/ld.lld ld.lld /usr/bin/ld.lld-$VER 150 && \
    update-alternatives --install /usr/bin/lld lld /usr/bin/lld-$VER 150 && \
    update-alternatives --install /usr/bin/llvm-ar llvm-ar $AR 150 && \
    update-alternatives --install /usr/bin/llvm-nm llvm-nm $NM 150

# Record compiler's version in build metadata.
RUN mkdir -p /dist && $CC -v 2>&1 | sed -ne 's/.*clang version /clang /p' >/dist/jsz_cc

# Verify binaries: readelf -p .comment <binary>
