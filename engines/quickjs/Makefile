# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= f1139494d18a2053630c5ed3384a42bb70db3c53

$(eval $(call build_engine,quickjs,Dockerfile))
$(eval $(call build_engine,quickjs_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
