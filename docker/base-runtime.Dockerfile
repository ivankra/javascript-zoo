# Test container for running built binaries and common JavaScript runtimes.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=debian:stable
FROM $BASE AS jsz-runtime

# gcc: for rpython-langjs
# luajit: for castl
# moreutils: ts, for benchmarking
# procps: top
# psmisc: killall
# python3-scipy: for benchmarking
# ruby: for twostroke
# time: /usr/bin/time, for benchmarking

RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        findutils \
        gcc \
        gdb \
        git \
        less \
        libatomic1 \
        libedit-dev \
        libgc1 \
        libicu-dev \
        libjson-c5 \
        libpcre2-dev \
        libreadline-dev \
        locales \
        lsb-release \
        luajit \
        make \
        moreutils \
        openjdk-25-jdk-headless \
        procps \
        psmisc \
        python3 \
        python3-scipy \
        ripgrep \
        ruby \
        strace \
        sudo \
        tar \
        time \
        unzip \
        vim \
        wget \
        xz-utils && \
    echo "en_US.UTF-8 UTF-8" >/etc/locale.gen && \
    locale-gen

ENV LC_ALL=en_US.UTF-8 \
    SHELL=/bin/bash \
    PATH=/bench:/opt/node/bin:$PATH

# Install latest node and npm (https://nodejs.org/en/download)
RUN export NVM_DIR=/opt/nvm && mkdir -p "$NVM_DIR" && \
    curl -o /opt/nvm-install.sh https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh && \
    echo "2d8359a64a3cb07c02389ad88ceecd43f2fa469c06104f92f98df5b6f315275f  /opt/nvm-install.sh" | sha256sum -c && \
    bash /opt/nvm-install.sh && rm -f /opt/nvm-install.sh && \
    bash -c 'source /opt/nvm/nvm.sh && nvm install node' && \
    ln -s /opt/nvm/versions/node/*/ /opt/node

# Install other popular runtimes from npm
RUN npm install -g bun deno && \
    (echo '' | bun repl >/dev/null 2>&1 || true)
