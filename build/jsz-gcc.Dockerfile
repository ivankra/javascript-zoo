# GCC-based build environment.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG VER=16

# Add debian testing repository in DEB822 format, with low priority, for gcc 15+.
# TODO: use heredoc after upgrading to podman 5+
RUN if [ "$VER" != 14 ]; then \
      apt-get remove -y --purge build-essential gcc g++ gcc-14 g++-14 cpp-14 libstdc++-14-dev; \
      apt-get autoremove -y; \
      { \
        echo "Types: deb"; \
        echo "URIs: http://deb.debian.org/debian"; \
        echo "Suites: testing"; \
        echo "Components: main"; \
        echo "Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg"; \
      } >/etc/apt/sources.list.d/testing.sources && \
      { \
        echo "Package: *"; \
        echo "Pin: release a=testing"; \
        echo "Pin-Priority: 1"; \
      } >/etc/apt/preferences.d/testing; \
    fi

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        $(if [ "$VER" != 14 ]; then echo -t testing; fi) \
        binutils \
        build-essential \
        g++-$VER \
        gcc-$VER \
        libstdc++-$VER-dev \
        libtool

# V8's build system needs these four to be explicitly set
ENV CC=/usr/bin/gcc-$VER CXX=/usr/bin/g++-$VER AR=/usr/bin/ar NM=/usr/bin/nm

RUN update-alternatives --install /usr/bin/cc cc $CC 150 && \
    update-alternatives --install /usr/bin/c++ c++ $CXX 150 && \
    update-alternatives --install /usr/bin/gcc gcc $CC 150 && \
    update-alternatives --install /usr/bin/g++ g++ $CXX 150

# For dist.py - copied into "cc" field in binary's metadata json
RUN $CC -v 2>&1 | sed -ne 's/ *$//; s/.*gcc version /gcc /p' >/jsz_cc
