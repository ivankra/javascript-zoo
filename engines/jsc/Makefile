# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# Pick revision from https://developer.apple.com/documentation/safari-technology-preview-release-notes/
# stp-release-237: http://commits.webkit.org/306595@main
REV ?= caed0239ff1d606ff67879ac662c1ae83c4aec9a

$(eval $(call build_engine,jsc,Dockerfile,--build-arg BASE=jsz-clang))
$(eval $(call build_engine,jsc_jitless,Dockerfile,--build-arg JITLESS=true --build-arg BASE=jsz-clang))
# gcc16 has linker errors
$(eval $(call build_engine,jsc_gcc,Dockerfile,--build-arg BASE=jsz-gcc15))
