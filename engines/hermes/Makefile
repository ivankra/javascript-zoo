# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= hermes-v0.15.1

$(eval $(call build_engine,hermes,Dockerfile))
$(eval $(call build_engine,hermes_clang,Dockerfile,--build-arg BASE=jsz-clang))
