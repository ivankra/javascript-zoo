# Building V8:
#   * https://v8.dev/docs/build-gn
#   * https://v8.dev/docs/compile-arm64
#   * https://www.chromium.org/developers/gn-build-configuration/
#   * https://github.com/just-js/v8
#
# Versions:
#   * https://v8.dev/docs/version-numbers
#   * https://chromiumdash.appspot.com/releases?platform=Linux
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

WORKDIR /src
RUN git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git /src/depot_tools
ENV PATH=/src/depot_tools:$PATH

RUN fetch --nohooks --nohistory v8

ARG REPO=https://chromium.googlesource.com/v8/v8.git
ARG REV=lkgr

RUN gclient sync --no-history --revision "v8@$REV"

WORKDIR /src/v8

# Build deps
RUN sed -i -e 's/ stable-updates$/ stable-updates bookworm/' /etc/apt/sources.list.d/debian.sources  # for the missing libpcre3-dev in trixie
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends rustc cargo build-essential gcc g++
RUN build/install-build-deps.sh --no-prompt

# Can do basic x64 build, but no customizations, fails for arm64 on linux
#RUN tools/dev/gm.py x64.release-d8

# Build clang - no pre-built linux arm64 toolchain for third_party/llvm-build
#RUN export ARCH=$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/x64/') && \
#    if [ "$ARCH" = "arm64" ]; then \
#      python build/linux/sysroot_scripts/install-sysroot.py --arch="$ARCH" && \
#      tools/clang/scripts/build.py --without-android --without-fuchsia --host-cc=gcc --host-cxx=g++ --use-system-cmake --disable-asserts --with-ml-inliner-model=""; \
#    fi

# Required for Temporal. Disable with enable_rust=false
# x86_64-binfmt-P: Could not open '/lib64/ld-linux-x86-64.so.2': No such file or directory
#RUN git config --global user.email "build@" && \
#    git config --global user.name "build" && \
#    tools/rust/build_rust.py

ARG JITLESS=
ARG INTL=

RUN export ARCH=$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/x64/') && \
    export IS_CLANG=$(bash -c '[[ "$CC" == *gcc* ]] && echo false || echo true'); \
    mkdir -p out/release && \
    { \
      # third_party/llvm-build doesn't have prebuilt arm64 linux binaries, \
      # tell it to use host toolchain via //build/toolchain/linux/unbundle. \
      # CC, CXX, AR, NM must be set. \
      # Might also need to enable_rust=false \
      [ "$ARCH" = arm64 ] && echo \
        clang_use_chrome_plugins=false \
        clang_warning_suppression_file=\"\" \
        custom_toolchain=\"//build/toolchain/linux/unbundle:default\" \
        host_toolchain=\"//build/toolchain/linux/unbundle:default\" \
        is_clang=${IS_CLANG} \
        use_sysroot=false; \
      # Full release build \
      # * chrome_pgo_phase=0 - due to unavailable PGO profiles \
      # * v8_use_external_startup_data=false - embed snapshot into binary \
      echo \
        chrome_pgo_phase=0 \
        dcheck_always_on=false \
        is_component_build=false \
        is_debug=false \
        is_official_build=true \
        target_cpu='"'$ARCH'"' \
        treat_warnings_as_errors=false \
        v8_target_cpu='"'$ARCH'"' \
        v8_use_external_startup_data=false; \
      # icu_use_data_file=false - embed ICU data \
      # v8_enable_temporal_support -> needs Rust \
      if [ "$INTL" = true ]; then echo \
        icu_use_data_file=false \
        v8_enable_i18n_support=true \
        v8_enable_temporal_support=false \
        v8_enable_webassembly=true; \
      else echo \
        v8_enable_disassembler=false \
        v8_enable_gdbjit=false \
        v8_enable_i18n_support=false \
        v8_enable_temporal_support=false \
        v8_enable_test_features=false \
        v8_enable_sandbox=false \
        v8_enable_webassembly=false; \
      fi; \
      # Disable JIT compilers \
      if [ "$JITLESS" = true ]; then echo \
        v8_jitless=true \
        v8_enable_sparkplug=false \
        v8_enable_maglev=false \
        v8_enable_turbofan=false; \
      fi; \
    } | tr ' ' '\n' >out/release/args.gn

RUN gn gen out/release/
RUN autoninja -C out/release/ d8

COPY build/dist.py ./
RUN ./dist.py /dist/v8 \
      --binary=/src/v8/out/release/d8 \
      version="$(/src/v8/out/release/d8 -e 'console.log(version())')"
