# Test container for running built binaries and common JavaScript runtimes.

ARG BASE=debian:stable
FROM $BASE AS jsz-runtime

RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        findutils \
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
        # for castl \
        luajit \
        make \
        # /usr/bin/ts for benchmarking \
        moreutils \
        openjdk-25-jdk-headless \
        procps \
        python3 \
        ripgrep \
        strace \
        sudo \
        tar \
        # /usr/bin/time for benchmarking \
        time \
        unzip \
        vim \
        wget \
        xz-utils && \
    echo "en_US.UTF-8 UTF-8" >/etc/locale.gen && \
    locale-gen

ENV LC_ALL=en_US.UTF-8 SHELL=/bin/bash

# Install latest node and npm (https://nodejs.org/en/download)
RUN export NVM_DIR=/opt/nvm && mkdir -p "$NVM_DIR" && \
    curl -o /opt/nvm-install.sh https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh && \
    echo "2d8359a64a3cb07c02389ad88ceecd43f2fa469c06104f92f98df5b6f315275f  /opt/nvm-install.sh" | sha256sum -c && \
    bash /opt/nvm-install.sh && rm -f /opt/nvm-install.sh && \
    bash -c 'source /opt/nvm/nvm.sh && nvm install node' && \
    ln -s /opt/nvm/versions/node/*/ /opt/node

ENV PATH=/bench:/opt/node/bin:$PATH

# Install other popular runtimes from npm:
#   * bun: JavaScriptCore-based JS/TS runtime written in Zig (https://github.com/oven-sh/bun)
#   * deno: V8/tokio-based JS/TS runtime written in Rust (https://github.com/denoland/deno)
RUN npm install -g bun deno && \
    (echo '' | bun repl >/dev/null 2>&1 || true)

# -----------------------------------------------------------------------------
# Dockerhub version

FROM jsz-runtime AS jsz-hub

ARG TARGETARCH

ADD dist/$TARGETARCH.tar /dist
COPY bench /bench
COPY docker/hub.motd /etc/motd

RUN rm -rf /bench/octane /bench/__pycache__ /bench/data.py && \
    echo 'eval $(dircolors); alias ls="ls --color=auto"; export PATH=/bench:$PATH; cat /etc/motd' >>/etc/profile && \
    sed -Ei "s/(build .*)/\\1 - $TARGETARCH/" /etc/motd

WORKDIR /dist
CMD /bin/bash --login -i
