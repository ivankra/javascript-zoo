# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# Limited by platforms for ldc: https://packages.debian.org/sid/ldc
SUPPORTED_ARCHS = amd64 arm64 armhf 386 loong64 ppc64le riscv64

$(eval $(call build_engine,dmdscript,Dockerfile))
