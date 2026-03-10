# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# Toolchain problems on other arch; build artifact itself is universal
SUPPORTED_ARCHS = arm64 amd64

$(eval $(call build_engine,topchetoeu,Dockerfile))
