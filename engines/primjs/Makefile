# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

$(eval $(call build_engine,primjs,Dockerfile))
$(eval $(call build_engine,primjs_nogc,Dockerfile,--build-arg DISABLE_GC=true))
