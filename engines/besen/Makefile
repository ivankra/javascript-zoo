# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

CONFORMANCE_SUITE = es[1-5]
# Limited to architectures supported by fpc
# https://packages.debian.org/sid/fp-compiler-3.2.2
SUPPORTED_ARCHS = amd64 arm64 ppc64le 386

$(eval $(call build_engine,besen,Dockerfile))
