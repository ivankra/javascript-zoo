# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# https://github.com/Samsung/escargot/blob/master/build/target.cmake#L102
SUPPORTED_ARCHS = amd64 arm64 riscv64 386

$(eval $(call build_engine,escargot,Dockerfile))
$(eval $(call build_engine,escargot_clang,Dockerfile,--build-arg BASE=jsz-clang))
