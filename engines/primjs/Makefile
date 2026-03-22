# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

SUPPORTED_ARCHS = arm64 amd64 arm 386

$(eval $(call build_engine,primjs,Dockerfile,--build-arg TEST262=y))
$(eval $(call build_engine,primjs_nogc,Dockerfile,--build-arg DISABLE_GC=y))
