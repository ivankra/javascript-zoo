# Zig build environment. Builds on Rust - needs cargo.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG VER=0.16.0

# https://ziglang.org/download/
RUN export ZIG_ARCH=$(uname -m | sed 's/ppc64le/powerpc64le/; s/i686/x86/; s/armv7l/arm/'); \
    cd /opt && \
    wget -O zig.tar.xz "https://ziglang.org/download/$VER/zig-${ZIG_ARCH}-linux-$VER.tar.xz" && \
    tar vxf zig.tar.xz && \
    rm -f zig.tar.xz && \
    ln -s /opt/zig-*/zig /usr/bin/zig && \
    zig version >/jsz_zig  # for dist.py - copied into "zig" field in binary's metadata json
