# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# Some build errors on other archs
SUPPORTED_ARCHS = arm64 amd64 arm

$(eval $(call build_engine,jsc,Dockerfile,--build-arg BASE=jsz-clang))
$(eval $(call build_engine,jsc_jitless,Dockerfile,--build-arg JITLESS=true --build-arg BASE=jsz-clang))
$(eval $(call build_engine,jsc_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
