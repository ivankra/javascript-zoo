# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

ifeq ($(DOCKER_ARCH),amd64)
$(eval $(call build_engine,starlight,Dockerfile))
else
all:
	@echo "starlight: skipping, arm64 build is broken - build with 'DOCKER_ARCH=amd64 make'"
endif
