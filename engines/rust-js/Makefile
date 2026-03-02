# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# Old Rust codebase, needs efforting for porting to recent Rust versions
SUPPORTED_ARCHS = amd64 arm64

$(eval $(call build_engine,rust-js,Dockerfile))
