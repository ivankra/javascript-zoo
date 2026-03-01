# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= 7708cd5ccefffc86ed080666218d9e80703d17f4

$(eval $(call build_engine,primjs,Dockerfile))
$(eval $(call build_engine,primjs_nogc,Dockerfile,--build-arg DISABLE_GC=true))
