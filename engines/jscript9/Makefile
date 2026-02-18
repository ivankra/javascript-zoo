# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

ifeq ($(DOCKER_ARCH),amd64)
$(eval $(call build_engine,jscript9,Dockerfile))
else
all:
	@echo "jscript9: skipping, amd64 build only - build with 'DOCKER_ARCH=amd64 make'"
endif
