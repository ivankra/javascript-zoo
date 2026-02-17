# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= 5824588da24f797b4255929918efbc8b484baa09

$(eval $(call build_engine,kjs,Dockerfile))
$(eval $(call build_engine,kjs_clang,Dockerfile,--build-arg BASE=jsz-clang))
