# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= 99f0aa14155d0b0c9e39f6273a51c35b497207de

ifeq ($(DOCKER_ARCH),amd64)
$(eval $(call build_engine,bali,Dockerfile))
else
all:
	@echo "bali: skipping, arm64 build is broken - build with 'DOCKER_ARCH=amd64 make'"
endif
