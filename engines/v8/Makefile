# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

CONFORMANCE_BINARY = v8_full
#SUPPORTED_ARCHS = arm64 amd64

$(eval $(call build_engine,v8,Dockerfile))
$(eval $(call build_engine,v8_full,Dockerfile,--build-arg FULL=y))
$(eval $(call build_engine,v8_jitless,Dockerfile,--build-arg JITLESS=y))
#$(eval $(call build_engine,v8_gcc,v8_gcc.Dockerfile))  -- often broken
#$(eval $(call build_engine,v8_pgo,v8_pgo.Dockerfile,--build-arg REV=$(REV_PGO)))  -- needs too much disk space
