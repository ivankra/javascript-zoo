# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

ifeq ($(DOCKER_ARCH),amd64)
ifneq ($(strip $(REPO)),)
$(eval $(call build_engine,carakan,Dockerfile))
else
all:
	@echo "carakan: skipping, missing URL of the repository to build - please explicitly set it via 'REPO=https://... make'"
endif
else
all:
	@echo "carakan: skipping, amd64 build only - build with 'DOCKER_ARCH=amd64 make'"
endif
