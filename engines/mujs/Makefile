# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= 1.3.8

$(eval $(call build_engine,mujs,Dockerfile))
$(eval $(call build_engine,mujs_babel,mujs_babel.Dockerfile))
$(eval $(call build_engine,mujs_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
