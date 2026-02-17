# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= hermes-v250829098.0.7

$(eval $(call build_engine,hermes-v1,../hermes/Dockerfile))
$(eval $(call build_engine,hermes-v1_clang,../hermes/Dockerfile,--build-arg BASE=jsz-clang))
$(eval $(call build_engine,hermes-v1_intl,../hermes/Dockerfile,--build-arg INTL=true))
