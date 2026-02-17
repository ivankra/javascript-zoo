# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= 58bdcf0ce35594df30bf5cfbba3be8b454799cc0

$(eval $(call build_engine,quickjs-ng,Dockerfile))
$(eval $(call build_engine,quickjs-ng_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
