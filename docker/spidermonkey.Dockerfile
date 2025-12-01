# Build instructions: https://firefox-source-docs.mozilla.org/js/build.html
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends cargo rustc libicu-dev libxml2 libz-dev
    #ca-certificates build-essential git pkg-config python3

# Some llvm utils are required even for gcc builds
RUN which llvm-strip >/dev/null 2>&1 || apt-get install -y --no-install-recommends llvm llvm-19-tools

RUN cargo install cbindgen  # debian's version is a bit old, FF 146+ needs 0.29.1

ARG REPO=https://github.com/mozilla-firefox/firefox.git
ARG REV=release

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

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

ENV JS_BINARY=/src/obj/dist/bin/js LICENSE=toolkit/content/license.html
RUN ${JS_BINARY} -v | egrep -o [0-9.]+ >jsz_version
CMD ${JS_BINARY}
