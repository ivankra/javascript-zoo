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

WORKDIR /src

ARG REPO=https://github.com/mozilla-firefox/firefox.git
RUN git clone --depth=1 --branch=main "$REPO" .

ARG REV=main
RUN git fetch --depth=1 origin "$REV" && git checkout -f FETCH_HEAD && git rev-parse HEAD

# FULL=y: build with full internationalization support.
ARG FULL=

# JITLESS=y: build without JIT. Behaves like --no-jit-backend CLI flag.
# Note: somehow, --no-jit-backend is NOT identical to --no-ion --no-baseline --no-asmjs --no-native-regexp!
ARG JITLESS=

# Run './js/src/configure --help' to see all configure options.
RUN { \
      echo "ac_add_options --enable-project=js"; \
      if [ "$JITLESS" = y ]; then \
        echo "ac_add_options --disable-jit"; \
      else \
        echo "ac_add_options --enable-jit"; \
      fi; \
      echo "ac_add_options --enable-optimize"; \
      echo "ac_add_options --enable-release"; \
      echo "ac_add_options --disable-tests"; \
      if [ "$FULL" != y ]; then \
        echo "ac_add_options --without-intl-api"; \
        echo "ac_add_options --disable-icu4x"; \
      fi; \
    } >MOZCONFIG

RUN MOZCONFIG=/src/MOZCONFIG ./mach build && ln -s obj-*/ obj

COPY build/dist.py ./
RUN ./dist.py /dist/spidermonkey \
      --binary=/src/obj/dist/bin/js \
      --license=toolkit/content/license.html \
      version="$(/src/obj/dist/bin/js -v | egrep -o '[0-9.]+' | head -1)" \
      $(if [ "$JITLESS" = y ]; then echo jit=; fi)

# Alternatively, can run `./mach jstests`, a wrapper around jstests.py.
ARG TEST262=y
RUN if [ "$TEST262" = y ] && [ "$FULL" = y ]; then \
      python3 js/src/tests/jstests.py \
          --format=automation \
          --output-file=/dist/spidermonkey_full.test262.log \
          /src/obj/dist/bin/js \
          test262/ && \
      grep -oE '[0-9a-f]{40}' js/src/tests/test262/GIT-INFO | head -1 >/dist/spidermonkey_full.test262.rev; \
    fi || true
