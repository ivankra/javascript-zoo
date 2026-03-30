# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

CONFORMANCE_BINARY = chakracore_full

# https://github.com/chakra-core/ChakraCore/blob/master/CMakeLists.txt#L55
SUPPORTED_ARCHS = amd64 arm64 arm 386
JIT_ARCHS = amd64

ifeq ($(filter $(DOCKER_ARCH),$(JIT_ARCHS)),$(DOCKER_ARCH))
$(eval $(call build_engine,chakracore,Dockerfile))
$(eval $(call build_engine,chakracore_jitless,Dockerfile,--build-arg JITLESS=y))
$(eval $(call build_engine,chakracore_full,Dockerfile,,--build-arg FULL=y --build-arg JITLESS=y))
$(eval $(call build_engine,chakracore_test,Dockerfile,,--build-arg FULL=y --build-arg JITLESS=y --build-arg TEST=y))
else
$(eval $(call build_engine,chakracore,Dockerfile,--build-arg JITLESS=y))
$(eval $(call build_engine,chakracore_full,Dockerfile,,--build-arg FULL=y --build-arg JITLESS=y))
$(eval $(call build_engine,chakracore_test,Dockerfile,,--build-arg FULL=y --build-arg JITLESS=y --build-arg TEST=y))
endif
