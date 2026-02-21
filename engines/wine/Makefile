# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= eaea4240c4efb618be6d20c05f7fc9f3db9a104c

ifeq ($(DOCKER_ARCH),amd64)
$(eval $(call build_engine,wine,Dockerfile))
else
all:
	@echo "wine: skipping, amd64 build only - build with 'DOCKER_ARCH=amd64 make'"
endif
