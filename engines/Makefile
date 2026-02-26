# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SHELL := /bin/bash

SUBDIRS := $(sort $(patsubst %/,%,$(dir $(wildcard */Makefile))))

# Space/comma-separated list of subdirs to skip; or set SKIP=errors to continue after failures.
SKIP ?=
comma := ,
SUBDIRS := $(filter-out $(strip $(subst $(comma), ,$(SKIP))),$(SUBDIRS))

define make_subdirs
	@failed=""; \
	for e in $(SUBDIRS); do \
	  if ! $(MAKE) -C $$e -n $(1) >/dev/null 2>&1; then continue; fi; \
	  if ! $(MAKE) -C $$e $(1); then \
	    if [ "$(SKIP)" = "errors" ]; then failed+=" $$e"; else exit 1; fi; \
	  fi; \
	done; \
	if [ -z "$$failed" ]; then echo "All OK"; else echo "Failed:$$failed"; fi;
endef

all:
	$(call make_subdirs,all)

dist:
	$(call make_subdirs,dist)

rev:
	$(call make_subdirs,rev)

conformance:
	$(call make_subdirs,conformance)

# List buildable engines for current DOCKER_ARCH (based on the presence of dist target)
list:
	@for e in $(SUBDIRS); do \
	  if $(MAKE) -C $$e -n dist >/dev/null 2>&1; then echo $$e; fi; \
	done

sh:
	$(MAKE) -C ../build sh

define subdir_targets
$(1):
	$(MAKE) -C $(1) all
endef

$(foreach d,$(SUBDIRS),$(eval $(call subdir_targets,$(d))))

.PHONY: $(SUBDIRS) all dist rev conformance list sh
