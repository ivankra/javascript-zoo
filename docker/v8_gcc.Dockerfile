# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc16
FROM $BASE

WORKDIR /src
RUN git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git /src/depot_tools
ENV PATH=/src/depot_tools:$PATH

RUN fetch --nohooks --nohistory v8

ARG REPO=https://chromium.googlesource.com/v8/v8.git
ARG REV=lkgr

RUN gclient sync --no-history --revision "v8@$REV"

WORKDIR /src/v8

RUN apt-get update -y && apt-get install -y --no-install-recommends rustc cargo
RUN build/install-build-deps.sh --no-prompt

RUN git config --global user.email "build@" && \
    git config --global user.name "build"
    #tools/rust/build_rust.py

ARG JITLESS=
ARG INTL=

RUN export ARCH=$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/x64/') && \
    if [ "$ARCH" = arm64 ]; then \
      # gcc doesn't have -mmark-bti-property flag \
      sed -i '/-mmark-bti-property/d' BUILD.gn third_party/icu/BUILD.gn && \
      # broken build \
      sed -i '/define NEON64/d' src/objects/simd.cc && \
      # broken build \
      sed -i '/<arm_neon.h>/a #include <climits>' src/base/memcopy.h && \
      # https://wiki.debian.org/ToolChain/GCS \
      # "warning: GCS is required by -z gcs, but this shared library lacks the necessary property note." \
      export LDFLAGS="-Wl,-z,gcs-report-dynamic=none"; \
    fi && \
    mkdir -p out/release && \
    { \
      echo is_clang=false use_custom_libcxx=false; \
      echo enable_rust=true rust_sysroot_absolute=\"/usr\"; \
      # third_party/llvm-build doesn't have prebuilt arm64 linux binaries, \
      # tell it to use host toolchain via //build/toolchain/linux/unbundle. \
      # CC, CXX, AR, NM must be set. \
      # Might also need to enable_rust=false \
      [ "$ARCH" = arm64 ] && echo \
        clang_use_chrome_plugins=false \
        clang_warning_suppression_file=\"\" \
        custom_toolchain=\"//build/toolchain/linux/unbundle:default\" \
        host_toolchain=\"//build/toolchain/linux/unbundle:default\" \
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
    } | tr ' ' '\n' >out/release/args.gn && \
    gn gen out/release/

RUN autoninja -C out/release/ d8

COPY dist.py ./
RUN ./dist.py /dist/v8_gcc \
      --binary=/src/v8/out/release/d8 \
      version="$(/src/v8/out/release/d8 -e 'console.log(version())')"
