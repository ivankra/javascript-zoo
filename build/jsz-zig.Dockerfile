# Zig build environment. Builds on Rust - needs cargo.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG VER=0.15.2

RUN cd /opt && \
    wget -O zig.tar.xz "https://ziglang.org/download/$VER/zig-$(uname -m)-linux-$VER.tar.xz" && \
    tar vxf zig.tar.xz && \
    rm -f zig.tar.xz && \
    ln -s /opt/zig-*/zig /usr/bin/zig && \
    zig version >/jsz_zig
