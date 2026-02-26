# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends rustup

RUN rustup toolchain install stable

RUN mkdir -p /dist && rustc --version >/jsz_rustc
