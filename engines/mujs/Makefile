# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

$(eval $(call build_engine,mujs,Dockerfile))
$(eval $(call build_engine,mujs_babel,mujs_babel.Dockerfile))
$(eval $(call build_engine,mujs_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
