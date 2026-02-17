# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= c90e358e2f54932caad1126dde7220eed22660ed

$(eval $(call build_engine,escargot,Dockerfile))
$(eval $(call build_engine,escargot_clang,Dockerfile,--build-arg BASE=jsz-clang))
