# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

$(eval $(call build_engine,quickjs-ng,Dockerfile))
$(eval $(call build_engine,quickjs-ng_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
