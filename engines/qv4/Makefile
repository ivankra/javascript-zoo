# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# https://github.com/qt/qtdeclarative/blob/dev/src/3rdparty/masm/assembler/MacroAssembler.h
JIT_ARCHS = amd64 arm64 386

ifeq ($(filter $(DOCKER_ARCH),$(JIT_ARCHS)),$(DOCKER_ARCH))
$(eval $(call build_engine,qv4,Dockerfile))
$(eval $(call build_engine,qv4_clang,Dockerfile,--build-arg BASE=jsz-clang))
$(eval $(call build_engine,qv4_jitless,Dockerfile,--build-arg JITLESS=true))
else
$(eval $(call build_engine,qv4,Dockerfile,--build-arg JITLESS=true))
$(eval $(call build_engine,qv4_clang,Dockerfile,--build-arg BASE=jsz-clang --build-arg JITLESS=true))
endif
