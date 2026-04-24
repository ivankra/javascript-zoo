# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

SUPPORTED_ARCHS = amd64 arm64 riscv64  # see Meta/host_platform.py
REV ?= 4b1ecbc9df6d862109a3e284d3a70c26b764459d

$(eval $(call build_engine,libjs,Dockerfile))
$(eval $(call build_engine,libjs_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
