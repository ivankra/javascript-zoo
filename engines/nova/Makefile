# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# "USDT only supports x86_64 and ARM64 architectures"
SUPPORTED_ARCHS = amd64 arm64

$(eval $(call build_engine,nova,Dockerfile))
