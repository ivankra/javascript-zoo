# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

$(eval $(call build_engine,kjs,Dockerfile))
$(eval $(call build_engine,kjs_clang,Dockerfile,--build-arg BASE=jsz-clang))
