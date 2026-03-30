# Building V8:
#   * https://v8.dev/docs/build-gn
#   * https://v8.dev/docs/compile-arm64
#   * https://www.chromium.org/developers/gn-build-configuration/
#
# Latest releases: https://chromiumdash.appspot.com/releases?platform=Linux
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

# Toolchain image *must* set CC CXX AR NM for V8's //build/toolchain/linux/unbundle
ARG BASE=jsz-clang
FROM $BASE

WORKDIR /src
RUN git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git /src/depot_tools
ENV PATH=/src/depot_tools:$PATH

# Google doesn't support non-arm64/amd64 builds with their vendored stuff, use system packages.
# https://chromium.googlesource.com/chromium/tools/depot_tools/+/refs/heads/main/.vpython3
ARG TARGETARCH
RUN touch cipd_env; \
    if [ "$TARGETARCH" != "amd64" ] && [ "$TARGETARCH" != "arm64" ]; then \
      echo 'export VPYTHON_BYPASS="manually managed python not supported by chrome operations"' >cipd_env && \
      apt-get install -y --no-install-recommends \
        python3-brotli python3-certifi python3-charset-normalizer python3-dateutil python3-httplib2 \
        python3-idna python3-lxml python3-requests python3-six python3-tz python3-urllib3 python3-yaml && \
      sed -i -e "s/from distutils import spawn/from shutil import which/; s/spawn.find_executable('gclient')/which('gclient')/" /src/depot_tools/fetch.py; \
    fi

RUN . ./cipd_env && fetch --nohooks --nohistory v8

ARG REV=lkgr
RUN . ./cipd_env && gclient sync --no-history --revision "v8@$REV"

WORKDIR /src/v8

RUN build/install-build-deps.sh --no-prompt

# Nightly Rust required for Temporal (V8 uses -Z nightly-only flags).
# Install bindgen into rust's sysroot so rust_bindgen_root can point there.
# Symlink libclang into sysroot/lib/ where V8 build expects it.
RUN apt-get install -y --no-install-recommends rustup && \
    rustup default nightly && \
    cargo install bindgen-cli --root "$(rustc --print sysroot)" && \
    ln -s "$(find /usr/lib -name "libclang-$($CC -dumpversion).so" -print -quit)" \
          "$(rustc --print sysroot)/lib/libclang.so"

# Configure build. Options: JITLESS=y => compile out JIT, FULL=y => fully-featured build.
ARG JITLESS=n
ARG FULL=n
COPY engines/v8/args.sh ./
RUN mkdir -p out/release && JITLESS="$JITLESS" FULL="$FULL" ./args.sh >out/release/args.gn

# Build
RUN gn gen out/release/
RUN autoninja -C out/release/ d8

# Find N.N.N tag just ahead of HEAD (stamping commit), with fallback to version()
RUN git fetch origin && \
    git describe --contains --match '[0-9]*.[0-9]*.[0-9]*' --exclude '*-*' HEAD 2>/dev/null | sed -n 's/~1$//; /^[0-9.]*$/p' >version; \
    if ! [ -s version ]; then \
      ./out/release/d8 -e 'console.log(version())' | sed -E 's/(\.0)? \(candidate\)//' >version; \
    fi

COPY build/dist.py ./
RUN ./dist.py /dist/v8 \
      --binary=/src/v8/out/release/d8 \
      $(if grep -q '"has_jitless": *true' out/release/v8_build_config.json; then echo jit=; fi) \
      rustc="$(rustc --version)" \
      v8_build_config.json="$(cat out/release/v8_build_config.json)" \
      version="$(cat version)"
