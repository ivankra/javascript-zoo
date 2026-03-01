# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

SUPPORTED_ARCHS = amd64

ifneq ($(strip $(REPO)),)
$(eval $(call build_engine,carakan,Dockerfile))
else
all:
	@echo "carakan: skipping, missing URL of the repository to build - please explicitly set it via 'REPO=https://... make'"
endif
