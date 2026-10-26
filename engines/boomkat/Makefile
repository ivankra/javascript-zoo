# SPDX-FileCopyrightText: 2026 Ricardo Rocha Tomasi
# SPDX-License-Identifier: MIT

include ../../build/build.mk

SUPPORTED_ARCHS = amd64 arm64

$(eval $(call build_engine,boomkat,Dockerfile))
$(eval $(call build_engine,boomkat_full_icu,Dockerfile,--build-arg TARGET=boomkat-full-icu --build-arg NAME=boomkat_full_icu))
