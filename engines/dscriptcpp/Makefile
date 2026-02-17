# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= bfa84682939d591c1357da90e4dec109809f49ad

ifeq ($(DOCKER_ARCH),amd64)
$(eval $(call build_engine,dscriptcpp,Dockerfile))
else
all:
	@echo "dscriptcpp: skipping, amd64 build only - non-portable 32-bit x86 code"
endif
