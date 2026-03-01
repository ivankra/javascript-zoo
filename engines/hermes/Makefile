# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= main
SUPPORTED_ARCHS = amd64 arm64

$(eval $(call build_engine,hermes,Dockerfile))
$(eval $(call build_engine,hermes_clang,Dockerfile,--build-arg BASE=jsz-clang))
