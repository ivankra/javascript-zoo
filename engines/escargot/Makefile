# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= af4c67a706e03ef4b5593106ef55ac266408881a

$(eval $(call build_engine,escargot,Dockerfile))
$(eval $(call build_engine,escargot_clang,Dockerfile,--build-arg BASE=jsz-clang))
