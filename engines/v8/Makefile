# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# Latest beta: https://chromiumdash.appspot.com/releases?platform=Linux
# REV ?= 14.6.202.2
# REV_PGO ?= 146.0.7680.16

CONFORMANCE_BINARY = v8_intl

$(eval $(call build_engine,v8,Dockerfile))
$(eval $(call build_engine,v8_intl,Dockerfile,--build-arg INTL=true))
$(eval $(call build_engine,v8_jitless,Dockerfile,--build-arg JITLESS=true))
#$(eval $(call build_engine,v8_gcc,v8_gcc.Dockerfile))  -- often broken
#$(eval $(call build_engine,v8_pgo,v8_pgo.Dockerfile,--build-arg REV=$(REV_PGO)))  -- needs too much disk space
