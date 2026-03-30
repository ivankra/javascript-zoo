#!/bin/bash -eu
# Generates GN args for V8 build, prints to stdout.
#
# Optional environment params:
#   * FULL=y: include Intl, Temporal, Wasm.
#   * JITLESS=y: compile out JIT support

ARCH=$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/x64/; s/ppc64le/ppc64/; s/loongarch64/loong64/; s/armv[0-9]l/arm/; s/i[3-6]86/x86/')

# Static release build
cat <<EOF
dcheck_always_on=false
is_component_build=false
is_debug=false
is_official_build=true
target_cpu="$ARCH"
treat_warnings_as_errors=false
v8_target_cpu="$ARCH"
EOF

# Embed the snapshot (pre-serialized heap with builtins) into the binary.
echo "v8_use_external_startup_data=false"

# No PGO data for d8 - profiles are only available for Chromium builds.
echo "chrome_pgo_phase=0"

# On arm64 there are no prebuilt clang/rust binaries in third_party/llvm-build,
# so use the system toolchain via //build/toolchain/linux/unbundle.
# CC, CXX, AR, NM must be set in the environment.
if [[ "$ARCH" != "x64" ]]; then
  echo 'clang_use_chrome_plugins=false'
  echo 'clang_warning_suppression_file=""'
  echo 'custom_toolchain="//build/toolchain/linux/unbundle:default"'
  echo 'host_toolchain="//build/toolchain/linux/unbundle:default"'
  echo 'is_clang=true'
  echo 'use_sysroot=false'
fi

if [[ "${FULL:-}" = "y" ]]; then
  # Full build needs Rust for Temporal
  # rust_bindgen_root points to the sysroot where bindgen + libclang live
  echo "enable_rust=true"
  echo "rust_sysroot_absolute=\"$(rustc --print sysroot)\""
  echo "rust_bindgen_root=\"$(rustc --print sysroot)\""
  echo "rustc_version=\"$(rustc --version | awk '{print $2}')\""
  echo 'rust_force_head_revision=true'
  echo 'icu_use_data_file=false'  # embed ICU data (icudtl.dat, ~10M) for a self-contained build
  echo 'v8_enable_i18n_support=true'
  echo 'v8_enable_temporal_support=true'
  echo 'v8_enable_webassembly=true'
else
  # Minimal build: no Intl, no Wasm, no Temporal => no Rust needed
  echo 'enable_rust=false'
  echo 'v8_enable_snapshot_compression=true'  # compress embedded snapshot
  echo 'v8_enable_i18n_support=false'
  echo 'v8_enable_temporal_support=false'
  echo 'v8_enable_webassembly=false'
  echo 'v8_enable_disassembler=false'
  echo 'v8_enable_gdbjit=false'
  echo 'v8_enable_sandbox=false'
  echo 'v8_enable_test_features=false'
fi

if [[ "${JITLESS:-}" = "y" ]]; then
  # JIT-less build
  echo 'v8_jitless=true'
  echo 'v8_enable_sparkplug=false'
  echo 'v8_enable_maglev=false'
  echo 'v8_enable_turbofan=false'
fi
