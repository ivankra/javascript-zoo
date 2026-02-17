# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= v3.0.0

$(eval $(call build_engine,jerryscript,Dockerfile))
$(eval $(call build_engine,jerryscript_clang,Dockerfile,--build-arg BASE=jsz-clang))
$(eval $(call build_engine,jerryscript_o3,Dockerfile,--build-arg CMAKE_BUILD_TYPE=Release))
