# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

# https://github.com/Moddable-OpenSource/moddable/blob/master/xs/platforms/xsPlatform.h#L65
SUPPORTED_ARCHS = amd64 arm64 arm 386

$(eval $(call build_engine,xs,Dockerfile))
$(eval $(call build_engine,xs_clang,Dockerfile,--build-arg BASE=jsz-clang))
