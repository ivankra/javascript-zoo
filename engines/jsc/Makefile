# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

$(eval $(call build_engine,jsc,Dockerfile,--build-arg BASE=jsz-clang))
$(eval $(call build_engine,jsc_jitless,Dockerfile,--build-arg JITLESS=true --build-arg BASE=jsz-clang))
# gcc16 has linker errors
$(eval $(call build_engine,jsc_gcc,Dockerfile,--build-arg BASE=jsz-gcc15))
