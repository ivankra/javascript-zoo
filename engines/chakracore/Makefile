# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= 792ee7660cbb14f1b3f9f77a6f919aeed4ec1fc2

CONFORMANCE_BINARY = chakracore_intl

# JIT is only supported on amd64
ifeq ($(DOCKER_ARCH),amd64)
$(eval $(call build_engine,chakracore,Dockerfile))
$(eval $(call build_engine,chakracore_intl,Dockerfile,--build-arg INTL=true --build-arg JITLESS=true --build-arg BASE=jsz-clang20))
$(eval $(call build_engine,chakracore_jitless,Dockerfile,--build-arg JITLESS=true))
else
$(eval $(call build_engine,chakracore,Dockerfile,--build-arg JITLESS=true))
$(eval $(call build_engine,chakracore_intl,Dockerfile,--build-arg INTL=true --build-arg JITLESS=true --build-arg BASE=jsz-clang20 --build-arg JITLESS=true))
endif
