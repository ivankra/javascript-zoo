# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

$(eval $(call build_engine,quickjs-ng,Dockerfile,--build-arg DIST262=y --build-arg TEST262=y))
$(eval $(call build_engine,quickjs-ng_gcc,Dockerfile,--build-arg BASE=jsz-gcc --build-arg DIST262=n))
