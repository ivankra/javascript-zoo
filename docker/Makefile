# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SHELL    := /bin/bash

DOCKER       := $(shell command -v podman 2>/dev/null || echo docker)
DOCKER_ARCH  := $(shell uname -m | sed -e 's/aarch64/arm64/; s/x86_64/amd64/')
DOCKER_BUILD := $(DOCKER) build --platform linux/$(DOCKER_ARCH)
DOCKER_RUN   := $(DOCKER) run --platform linux/$(DOCKER_ARCH)

IID_DIR  := ../.cache/iid
DIST_DIR := ../dist/$(DOCKER_ARCH)

FILE_TARGETS := $(patsubst %.Dockerfile,%,$(wildcard [a-z0-9]*.Dockerfile))
ARGS_TARGETS := $(shell cat args.txt | egrep -o '^[-a-z0-9_.]+' | sort -u)
ALL_TARGETS := $(sort $(FILE_TARGETS) $(ARGS_TARGETS))
# jsz-* targets are base containers with build and runtime environments.
# hub has a special make rule.
# Everything else should be an engine target
BASE_TARGETS := $(filter jsz-%,$(ALL_TARGETS))
ENGINE_TARGETS := $(filter-out jsz-% hub,$(ALL_TARGETS))

# bali: arm64 build broken
# dscriptcpp: hacky non-portable code, 32-bit x86 only
# quickjit: x64 only
# spidermonkey_1.8.5+: doesn't support arm64 due to JIT that can't be compiled out
# starlight: arm64 build broken
# *_jitless: no arm64 JIT, main build is JIT-less - don't build same thing under a different name
AMD64_ONLY_TARGETS := \
  bali \
  chakracore_jitless \
  dscriptcpp \
  iv-lv5_jitless \
  jscript \
  quickjit \
  spidermonkey_1.8.5 \
  spidermonkey_17 \
  spidermonkey_24 \
  starlight

DISABLED_TARGETS :=

ENGINE_TARGETS := $(filter-out $(DISABLED_TARGETS),$(ENGINE_TARGETS))
ifeq ($(DOCKER_ARCH),arm64)
  ENGINE_TARGETS := $(filter-out $(AMD64_ONLY_TARGETS),$(ENGINE_TARGETS))
endif

all: base $(ENGINE_TARGETS)

all-ignoring-errors: base
	-for target in $(ENGINE_TARGETS); do make "$$target"; done

dist: $(patsubst %,$(DIST_DIR)/%.json,$(ENGINE_TARGETS))
	@true

sh: $(IID_DIR)/jsz-runtime
	$(DOCKER_RUN) --rm -it \
	  -v $(PWD)/..:/zoo:rw \
	  -v $(PWD)/../.git:/zoo/.git:ro \
	  -v $(PWD)/../bench:/bench:rw \
	  -v $(PWD)/../dist/$(DOCKER_ARCH):/dist:ro \
	  -v $(PWD)/../dist/$(DOCKER_ARCH):/zoo/dist:ro \
	  -w /dist \
	  jsz-runtime

hub:
	./hub.sh

base: $(BASE_TARGETS)
	@true

define base_rules
$(IID_DIR)/$(1): $$(shell ./build.sh --dep $(1)) build.sh
	./build.sh $(1)

$(1): $(IID_DIR)/$(1)
	@true
endef

$(foreach var,$(BASE_TARGETS),$(eval $(call base_rules,$(var))))

define engine_rules
$(IID_DIR)/jsz-$(1): $$(shell ./build.sh --dep $(1)) build.sh
	./build.sh $(1)

$(1): $(IID_DIR)/jsz-$(1) $(DIST_DIR)/$(1).json
	@true

$(1)-dist: $(DIST_DIR)/$(1).json
	@true

$(DIST_DIR)/$(1).json: $(IID_DIR)/jsz-$(1) dist.sh
	./dist.sh $(1)

$(1)-repl: $(IID_DIR)/jsz-$(1)
	$(DOCKER_RUN) --rm -it -v $(PWD)/../bench:/bench jsz-$(1)

$(1)-sh: $(IID_DIR)/jsz-$(1)
	$(DOCKER_RUN) --rm -it -v $(PWD)/../bench:/bench jsz-$(1) \
	  /bin/bash -c '[[ -f $$$$JS_BINARY && ! -f $(1) ]] && ln -sv "$$$$JS_BINARY" "./$(1)"; /bin/bash -i'
endef

$(foreach var,$(ENGINE_TARGETS),$(eval $(call engine_rules,$(var))))

# Also consider 'podman system reset' to delete whole podman storage
# for the current user, if things get messed badly.
clean-docker:
	rm -rf "$(IID_DIR)"
	-$(DOCKER) container prune
	-$(DOCKER) image rm `$(DOCKER) image ls | grep jsz- | cut -f 1 -d ' '`
	$(DOCKER) image prune

.PHONY:
.SUFFIXES:
