# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include build.mk

$(eval $(call build_base,jsz-runtime,jsz-runtime.Dockerfile,))

$(eval $(call build_base,jsz-debian,jsz-debian.Dockerfile,))
$(eval $(call build_base,jsz-golang,jsz-golang.Dockerfile,))
$(eval $(call build_base,jsz-node,jsz-node.Dockerfile,))
$(eval $(call build_base,jsz-rust,jsz-rust.Dockerfile,))
$(eval $(call build_base,jsz-zig,jsz-zig.Dockerfile,))

$(eval $(call build_base,jsz-gcc14,jsz-gcc.Dockerfile,--build-arg VER=14))
$(eval $(call build_base,jsz-gcc15,jsz-gcc.Dockerfile,--build-arg VER=15))
$(eval $(call build_base,jsz-gcc16,jsz-gcc.Dockerfile,--build-arg VER=16))
$(eval $(call build_base,jsz-gcc,jsz-gcc.Dockerfile,--build-arg VER=16))

$(eval $(call build_base,jsz-jdk21,jsz-jdk.Dockerfile,--build-arg VER=21))
$(eval $(call build_base,jsz-jdk25,jsz-jdk.Dockerfile,--build-arg VER=25))
$(eval $(call build_base,jsz-jdk,jsz-jdk.Dockerfile,--build-arg VER=25))

ifeq ($(DOCKER_ARCH),amd64)
$(eval $(call build_base,jsz-mingw,jsz-mingw.Dockerfile,))
endif

ifneq ($(filter $(DOCKER_ARCH),amd64 arm64),)
$(eval $(call build_base,jsz-dotnet,jsz-dotnet.Dockerfile,))
$(eval $(call build_base,jsz-wasi,jsz-wasi.Dockerfile,))
$(eval $(call build_base,jsz-dotnet-wasi,jsz-wasi.Dockerfile,--build-arg BASE=jsz-dotnet --build-arg VER=27))
#$(eval $(call build_base,jsz-clang19,jsz-clang.Dockerfile,--build-arg VER=19))
#$(eval $(call build_base,jsz-clang20,jsz-clang.Dockerfile,--build-arg VER=20))
#$(eval $(call build_base,jsz-clang21,jsz-clang.Dockerfile,--build-arg VER=21))
#$(eval $(call build_base,jsz-clang22,jsz-clang.Dockerfile,--build-arg VER=22))
#$(eval $(call build_base,jsz-clang23,jsz-clang.Dockerfile,--build-arg VER=23))
$(eval $(call build_base,jsz-clang,jsz-clang.Dockerfile,--build-arg VER=23))
else
# Fallback to debian's clang19 if not on amd64/arm64 (only archs provided by clang's apt repositories)
$(eval $(call build_base,jsz-clang,jsz-clang.Dockerfile,--build-arg VER=19))
endif

hub:
	bash ./hub.sh

sh: jsz-runtime-sh
	@true

clean-docker:
	rm -rf "$(IID_DIR)"
	-$(DOCKER) container prune -f
	-$(DOCKER) image ls | awk '/jsz-/{print $$1}' | xargs -r $(DOCKER) image rm
	$(DOCKER) image prune -f

.PHONY: hub sh clean-docker
