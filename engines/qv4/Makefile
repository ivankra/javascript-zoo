# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

$(eval $(call build_engine,qv4,Dockerfile))
$(eval $(call build_engine,qv4_clang,Dockerfile,--build-arg BASE=jsz-clang))
$(eval $(call build_engine,qv4_jitless,Dockerfile,--build-arg JITLESS=true))
