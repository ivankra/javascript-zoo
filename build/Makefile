# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include build.mk

FILE_TARGETS := $(patsubst %.Dockerfile,%,$(wildcard jsz-*.Dockerfile))
$(foreach t,$(FILE_TARGETS),$(eval $(call build_base,$(t),$(t).Dockerfile,)))

$(eval $(call build_base,jsz-gcc14,jsz-gcc.Dockerfile,--build-arg VER=14))
$(eval $(call build_base,jsz-gcc15,jsz-gcc.Dockerfile,--build-arg VER=15))
$(eval $(call build_base,jsz-gcc16,jsz-gcc.Dockerfile,--build-arg VER=16))
$(eval $(call build_base,jsz-clang19,jsz-clang.Dockerfile,--build-arg VER=19))
$(eval $(call build_base,jsz-clang20,jsz-clang.Dockerfile,--build-arg VER=20))
$(eval $(call build_base,jsz-clang21,jsz-clang.Dockerfile,--build-arg VER=21))
$(eval $(call build_base,jsz-clang22,jsz-clang.Dockerfile,--build-arg VER=22))
$(eval $(call build_base,jsz-clang23,jsz-clang.Dockerfile,--build-arg VER=23))
$(eval $(call build_base,jsz-dotnet-wasi,jsz-wasi.Dockerfile,--build-arg BASE=jsz-dotnet --build-arg VER=27))

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
