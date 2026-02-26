# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

$(eval $(call build_engine,quickjs,Dockerfile))
$(eval $(call build_engine,quickjs_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
