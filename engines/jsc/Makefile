# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# Pick revision from https://developer.apple.com/documentation/safari-technology-preview-release-notes/
# stp-release-236: http://commits.webkit.org/305413@main.
REV ?= c0b5ca70b2e64b6af1313ad0de1329d159f1e7b8

$(eval $(call build_engine,jsc,Dockerfile,--build-arg BASE=jsz-clang))
$(eval $(call build_engine,jsc_jitless,Dockerfile,--build-arg JITLESS=true --build-arg BASE=jsz-clang))
# gcc16 has linker errors
$(eval $(call build_engine,jsc_gcc,Dockerfile,--build-arg BASE=jsz-gcc15))
