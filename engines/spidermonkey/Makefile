# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

REV ?= FIREFOX_148_0b13_RELEASE

$(eval $(call build_engine,spidermonkey,Dockerfile))
$(eval $(call build_engine,spidermonkey_gcc,Dockerfile,--build-arg BASE=jsz-gcc))
$(eval $(call build_engine,spidermonkey_intl,Dockerfile,--build-arg INTL=true))
$(eval $(call build_engine,spidermonkey_jitless,Dockerfile,--build-arg JITLESS=true))

$(eval $(call build_engine,spidermonkey_1.5,spidermonkey_1.5.Dockerfile,--build-arg TARBALL=https://archive.mozilla.org/pub/js/older-packages/js-1.5.tar.gz))
$(eval $(call build_engine,spidermonkey_1.6,spidermonkey_1.5.Dockerfile,--build-arg TARBALL=https://archive.mozilla.org/pub/js/js-1.60.tar.gz))
$(eval $(call build_engine,spidermonkey_1.7,spidermonkey_1.5.Dockerfile,--build-arg TARBALL=https://archive.mozilla.org/pub/js/js-1.7.0.tar.gz))
$(eval $(call build_engine,spidermonkey_1.8.0,spidermonkey_1.5.Dockerfile,--build-arg TARBALL=https://archive.mozilla.org/pub/js/js-1.8.0-rc1.tar.gz))

# 1.8.5/17/24 have JIT which doesn't support arm64 and difficult to compile out
ifeq ($(DOCKER_ARCH),amd64)
$(eval $(call build_engine,spidermonkey_1.8.5,spidermonkey_1.8.5.Dockerfile,--build-arg TARBALL=https://archive.mozilla.org/pub/js/js185-1.0.0.tar.gz))
$(eval $(call build_engine,spidermonkey_17,spidermonkey_1.8.5.Dockerfile,--build-arg TARBALL=https://archive.mozilla.org/pub/js/mozjs17.0.0.tar.gz))
$(eval $(call build_engine,spidermonkey_24,spidermonkey_1.8.5.Dockerfile,--build-arg TARBALL=https://archive.mozilla.org/pub/js/mozjs-24.2.0.tar.bz2))
endif
