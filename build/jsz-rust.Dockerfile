# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends rustup && \
    if [ "$(dpkg --print-architecture)" = i386 ]; then \
      rustup set default-host i686-unknown-linux-gnu; \
    fi && \
    rustup toolchain install stable && \
    rustc --version >/jsz_rustc
