# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= 69cf58f0c63cacc6fda0c8cc296f995bb9897e79
CONFORMANCE_SUITE = es[1-5]

ifeq ($(DOCKER_ARCH),amd64)
$(eval $(call build_engine,malbrain,Dockerfile))
else
all:
	@echo "malbrain: skipping, amd64 build only - build with 'DOCKER_ARCH=amd64 make'"
endif
