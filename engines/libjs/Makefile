# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# https://github.com/LadybirdBrowser/ladybird/commits/master/Libraries/LibJS
REV ?= 3355fb39ae18d6ce07ea9bba827e2654185dbd01

$(eval $(call build_engine,libjs,Dockerfile))
$(eval $(call build_engine,libjs_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
