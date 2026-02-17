# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= 0aec6a12b4135e6981a6e72decf0c31a92e78f15

$(eval $(call build_engine,libjs,Dockerfile))
$(eval $(call build_engine,libjs_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
