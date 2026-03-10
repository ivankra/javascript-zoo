# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# https://github.com/Samsung/escargot/blob/master/build/target.cmake#L102
SUPPORTED_ARCHS = amd64 arm64 arm 386 riscv64

$(eval $(call build_engine,escargot,Dockerfile))
$(eval $(call build_engine,escargot_clang,Dockerfile,--build-arg BASE=jsz-clang))
$(eval $(call build_engine,escargot_262,Dockerfile,--build-arg TEST262=y))
