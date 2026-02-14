# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SHELL    := /bin/bash

DOCKER      ?= $(shell command -v podman container 2>&1 || echo docker)
DOCKER_ARCH ?= $(shell uname -m | sed 's/aarch64/arm64/; s/x86_64/amd64/')

# $IID_DIR/<image tag> is used for tracking completion of image builds for make
IID_DIR  := ../.cache/iid/$(DOCKER_ARCH)
DIST_DIR := ../dist/$(DOCKER_ARCH)

FILE_TARGETS := $(patsubst %.Dockerfile,%,$(wildcard [a-z0-9]*.Dockerfile))
ARGS_TARGETS := $(shell cat args.txt | egrep -o '^[-a-z0-9_.]+' | sort -u)
ALL_TARGETS := $(sort $(FILE_TARGETS) $(ARGS_TARGETS))
# jsz-* targets are base containers with build and runtime environments.
# hub has a special make rule.
# Everything else should be an engine target.
# Note: docker image tags always will have jsz- prefix (added by build.sh).
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
  wine% \
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
	$(DOCKER) run --arch "$(DOCKER_ARCH)" --rm -it \
	  -v "$(PWD)/..:/zoo" \
	  -v "$(PWD)/../.git:/zoo/.git:ro" \
	  jsz-runtime sh -c 'cd /dist; bash -i'

hub:
	./hub.sh

base: $(BASE_TARGETS)
	@true

define base_rules
$(IID_DIR)/$(1): $$(shell bash ./build.sh --deps $(1))
	@chmod a+rx build.sh
	./build.sh $(1)

$(1): $(IID_DIR)/$(1)
	@true
endef

$(foreach var,$(BASE_TARGETS),$(eval $(call base_rules,$(var))))

define engine_rules
$(IID_DIR)/jsz-$(1): $$(shell bash ./build.sh --deps $(1))
	@chmod a+rx build.sh
	./build.sh $(1)

$(1): $(IID_DIR)/jsz-$(1) $(DIST_DIR)/$(1).json
	@true

$(1)-dist: $(DIST_DIR)/$(1).json
	@true

$(DIST_DIR)/$(1).json: $(IID_DIR)/jsz-$(1) dist.sh
	@chmod a+rx dist.sh
	./dist.sh $(1)

$(1)-sh: $(IID_DIR)/jsz-$(1)
	$(DOCKER) run --arch "$(DOCKER_ARCH)" --rm -it \
	  -v "$(PWD)/..:/zoo" \
	  -v "$(PWD)/../.git:/zoo/.git:ro" \
	  jsz-$(1)
endef

$(foreach var,$(ENGINE_TARGETS),$(eval $(call engine_rules,$(var))))

# Also consider 'podman system reset' to delete whole podman storage
# for the current user, if things get messed badly.
clean-docker:
	rm -rf "$(IID_DIR)"
	-$(DOCKER) container prune -f
	-$(DOCKER) image rm `$(DOCKER) image ls | grep jsz- | cut -f 1 -d ' '`
	$(DOCKER) image prune -f

.PHONY:
.SUFFIXES:
