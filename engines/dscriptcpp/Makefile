# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

ifeq ($(DOCKER_ARCH),amd64)
$(eval $(call build_engine,dscriptcpp,Dockerfile))
else
all:
	@echo "dscriptcpp: skipping, amd64 build only due to non-portable 32-bit x86 code - build with 'DOCKER_ARCH=amd64 make'"
endif
