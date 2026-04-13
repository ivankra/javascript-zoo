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

RUN fetch --nohooks --nohistory v8

ARG REV=lkgr
RUN gclient sync --no-history --revision "v8@$REV"

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

# Run test262 via V8's official test runner.
# By default it hides expected results - patch it to emit everything.
# test262 data is pulled by gclient sync into test/test262/data.
ARG TEST262=y
RUN if [ "$TEST262" = y ] && [ "$FULL" = y ]; then \
      sed -i 's/if not result.has_unexpected_output and run == 0:/if False:/; s/"result": test.output_proc.get_outcome(output),/"result": (test.output_proc.get_outcome(output) if result.has_unexpected_output else ""),/' tools/testrunner/testproc/indicators.py; \
      tools/run-tests.py --outdir=out/release --json-test-results=test262-results.json test262; \
    fi || true
COPY engines/v8/convert262.py ./
RUN python3 ./convert262.py test262-results.json -o /dist/v8.ci-test262 -b /dist/v8 --test262-dir=test/test262/data || true
