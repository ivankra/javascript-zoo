# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= 64c3a9c7c517063f29d90d449180ea8f6f4d946f

# JIT is only supported on amd64
ifeq ($(DOCKER_ARCH),amd64)
$(eval $(call build_engine,iv-lv5,Dockerfile))
$(eval $(call build_engine,iv-lv5_clang,Dockerfile,--build-arg BASE=jsz-clang))
$(eval $(call build_engine,iv-lv5_jitless,Dockerfile,--build-arg JITLESS=true))
else
$(eval $(call build_engine,iv-lv5,Dockerfile,--build-arg JITLESS=true))
$(eval $(call build_engine,iv-lv5_clang,Dockerfile,--build-arg BASE=jsz-clang --build-arg JITLESS=true))
endif
