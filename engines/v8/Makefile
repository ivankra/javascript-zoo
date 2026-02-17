# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# Pick latest beta from https://chromiumdash.appspot.com/releases?platform=Linux
REV ?= 14.5.201.7
REV_PGO ?= 145.0.7632.45

$(eval $(call build_engine,v8,Dockerfile))
$(eval $(call build_engine,v8_gcc,v8_gcc.Dockerfile,--build-arg BASE=jsz-gcc))
$(eval $(call build_engine,v8_intl,Dockerfile,--build-arg INTL=true --build-arg REV=lkgr))
$(eval $(call build_engine,v8_jitless,Dockerfile,--build-arg JITLESS=true))
$(eval $(call build_engine,v8_pgo,v8_pgo.Dockerfile,--build-arg REV=$(REV_PGO)))
