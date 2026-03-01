# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

CONFORMANCE_BINARY = chakracore_intl
SUPPORTED_ARCHS = amd64 arm64
JIT_ARCHS = amd64

ifeq ($(filter $(DOCKER_ARCH),$(JIT_ARCHS)),$(DOCKER_ARCH))
$(eval $(call build_engine,chakracore,Dockerfile))
$(eval $(call build_engine,chakracore_intl,Dockerfile,--build-arg INTL=true --build-arg JITLESS=true))
$(eval $(call build_engine,chakracore_jitless,Dockerfile,--build-arg JITLESS=true))
else
$(eval $(call build_engine,chakracore,Dockerfile,--build-arg JITLESS=true))
$(eval $(call build_engine,chakracore_intl,Dockerfile,--build-arg INTL=true --build-arg JITLESS=true --build-arg JITLESS=true))
endif
