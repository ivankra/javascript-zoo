# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

#https://github.com/LadybirdBrowser/ladybird/blob/master/Meta/host_platform.py#L41
SUPPORTED_ARCHS = amd64 arm64 riscv64

$(eval $(call build_engine,libjs,Dockerfile))
$(eval $(call build_engine,libjs_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
