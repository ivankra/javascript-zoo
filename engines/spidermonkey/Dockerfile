# Build instructions: https://firefox-source-docs.mozilla.org/js/build.html
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends rustup libicu-dev libxml2 libz-dev
    #ca-certificates build-essential git pkg-config python3

# Some llvm utils are required even for gcc builds
RUN ls /usr/bin/llvm-strip* >/dev/null 2>&1 || apt-get install -y --no-install-recommends llvm llvm-19-tools

# Debian's packaged rustc and cbindgen are too old to build latest firefox versions
RUN if [ "$(dpkg --print-architecture)" = i386 ]; then \
      rustup set default-host i686-unknown-linux-gnu; \
    fi && \
    rustup toolchain install stable && \
    cargo install cbindgen

ARG REPO=https://github.com/mozilla-firefox/firefox.git
ARG REV=release

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

# INTL=true: build with full internationalization support.
ARG INTL=

# JITLESS=true: build without JIT. Behaves like --no-jit-backend CLI flag.
# Note: somehow, --no-jit-backend is NOT identical to --no-ion --no-baseline --no-asmjs --no-native-regexp!
ARG JITLESS=

# Run './js/src/configure --help' to see all configure options.
RUN { \
      echo "ac_add_options --enable-project=js"; \
      if [ "$JITLESS" = true ]; then \
        echo "ac_add_options --disable-jit"; \
      else \
        echo "ac_add_options --enable-jit"; \
      fi; \
      echo "ac_add_options --enable-optimize"; \
      echo "ac_add_options --enable-release"; \
      echo "ac_add_options --disable-tests"; \
      if [ "$INTL" != true ]; then \
        echo "ac_add_options --without-intl-api"; \
        echo "ac_add_options --disable-icu4x"; \
      fi; \
    } >MOZCONFIG

RUN MOZCONFIG=/src/MOZCONFIG ./mach build && ln -s obj-*/ obj

COPY build/dist.py ./
RUN ./dist.py /dist/spidermonkey \
      --binary=/src/obj/dist/bin/js \
      --license=toolkit/content/license.html \
      version="$(/src/obj/dist/bin/js -v | egrep -o '[0-9.]+')"
