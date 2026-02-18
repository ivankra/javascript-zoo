# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SHELL := /bin/bash

DOCKER ?= $(shell command -v podman container 2>/dev/null || echo docker)
DOCKER_ARCH ?= $(shell uname -m | sed 's/aarch64/arm64/; s/x86_64/amd64/')

ROOT_DIR := $(abspath $(dir $(lastword $(MAKEFILE_LIST)))/..)
IID_DIR := $(ROOT_DIR)/.cache/iid/$(DOCKER_ARCH)
DIST_DIR := $(ROOT_DIR)/dist/$(DOCKER_ARCH)

# Leaf directory basename e.g. "quickjs", "v8"
PROJECT := $(notdir $(abspath $(CURDIR)))

# Parent directory basename e.g. "engines" or "parsers"
GROUP := $(notdir $(patsubst %/,%,$(dir $(abspath $(CURDIR)))))

# Parameters for conformance test run, can be overridden in leaf Makefiles.
CONFORMANCE_BINARY ?= $(PROJECT)       # build name e.g. "v8_intl", not full path
CONFORMANCE_SUITE ?= es[1-5] kangax-*  # globs for dir names inside conformance/
CONFORMANCE_CMD ?= "$(ROOT_DIR)/conformance/run.sh" -j 8 -o conformance.txt "$(DIST_DIR)/$(strip $(CONFORMANCE_BINARY))" $(addprefix $(ROOT_DIR)/conformance/,$(CONFORMANCE_SUITE))

# Delegate building any missing jsz-* docker image dependencies to build/Makefile
$(IID_DIR)/jsz-%:
	$(MAKE) -C $(ROOT_DIR)/build jsz-$*

# Metadata json for engines goes to the root of $(DIST_DIR).
# For parsers/transpilers - to $(DIST_DIR)/$(GROUP).
define dist_json_path
$(if $(filter engines,$(GROUP)),$(DIST_DIR)/$(1).json,$(DIST_DIR)/$(GROUP)/$(1).json)
endef

# Adds default --build-arg REV to docker build command line if missing.
# Note: env REV/REPO overrides are handled by build.sh and are stronger -
# will override --build-arg REV from Makefile (to enable `REV=... make` workflow)
# $(1): raw docker build args
define add_default_rev
$(strip \
  $(if $(or $(findstring --build-arg REV=,$(1)),$(findstring --build-arg=REV=,$(1))),,\
    $(if $(strip $(REV)),--build-arg REV=$(REV),)\
  ) \
$(1)\
)
endef

# Build rules for engines.
# $(1): build id, either $(PROJECT) or $(PROJECT)_<suffix>
# $(2): Dockerfile path relative to leaf dir
# $(3): extra docker build args (optional)
define build_engine
$(if $(or $(filter $(PROJECT),$(1)),$(filter $(PROJECT)_%,$(1))),,$(error build_engine id "$(1)" must be "$(PROJECT)" or "$(PROJECT)_<suffix>" in $(CURDIR)))

# Default build target, build+dist. Aggregates across all build_engine invocations.
all: $(1)

# Build docker image and copy out build artifacts.
$(1): $(IID_DIR)/jsz-$(1) $(call dist_json_path,$(1))
	@true

# Build docker image
build: $(IID_DIR)/jsz-$(1)

$(IID_DIR)/jsz-$(1): $$(shell bash "$(ROOT_DIR)/build/deps.sh" $(1) "$(abspath $(CURDIR)/$(2))" $(3))
	bash "$(ROOT_DIR)/build/build.sh" $(1) "$(abspath $(CURDIR)/$(2))" $(call add_default_rev,$(3))

# dist: copy build artifacts out of docker image
dist: $(call dist_json_path,$(1))

$(call dist_json_path,$(1)): $(IID_DIR)/jsz-$(1)
	bash "$(ROOT_DIR)/build/dist.sh" "$(1)"

# <name>-sh: start shell in the built image
$(1)-sh: $(IID_DIR)/jsz-$(1)
	$(DOCKER) run --arch $(DOCKER_ARCH) --rm -it \
	  -v "$(ROOT_DIR):/zoo" \
	  -v "$(ROOT_DIR)/.git:/zoo/.git:ro" \
	  jsz-$(1):$(DOCKER_ARCH)

# sh: start shell in the main image in leaf directory
$(if $(filter $(PROJECT),$(1)),sh: $(1)-sh)

# conformance: run engine on conformance test suite inside test container
# conformance-direct: run conformance testing command directly on host without launching a test container
$(if $(and $(filter engines,$(GROUP)),$(filter $(CONFORMANCE_BINARY),$(1)),$(strip $(CONFORMANCE_CMD))),
conformance conformance.txt: $(call dist_json_path,$(1)) $(IID_DIR)/jsz-runtime
	$(DOCKER) run --arch $(DOCKER_ARCH) --rm -it \
	  -v "$(ROOT_DIR):$(ROOT_DIR)" \
	  -v "$(ROOT_DIR)/.git:$(ROOT_DIR)/.git:ro" \
	  -w "$(CURDIR)" \
	  jsz-runtime:$(DOCKER_ARCH) \
	  bash -c '$(CONFORMANCE_CMD)'

conformance-direct:
	$(CONFORMANCE_CMD)

.PHONY: conformance conformance-direct conformance.txt
)

.PHONY: all build dist sh $(1) $(1)-sh
endef

# Build rules for base images (build/jsz-*.Dockerfile).
# These do not have build artifacts to copy out.
define build_base
all: $(1)

# Build docker image
$(1): $(IID_DIR)/$(1)
	@true

$(IID_DIR)/$(1): $$(shell bash "$(ROOT_DIR)/build/deps.sh" $(1) "$(abspath $(CURDIR)/$(2))" $(3))
	bash "$(ROOT_DIR)/build/build.sh" $(1) "$(abspath $(CURDIR)/$(2))" $(3)

# Start bash in the built image
$(1)-sh: $(IID_DIR)/$(1)
	$(DOCKER) run --arch $(DOCKER_ARCH) --rm -it \
	  -v "$(ROOT_DIR):/zoo" \
	  -v "$(ROOT_DIR)/.git:/zoo/.git:ro" \
	  $(1):$(DOCKER_ARCH) \
	  $(if $(filter jsz-runtime,$(1)),sh -c 'cd /dist; bash -i')

.PHONY: all $(1) $(1)-sh
endef
