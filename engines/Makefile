# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SHELL := /bin/bash

SUBDIRS := $(sort $(patsubst %/,%,$(dir $(wildcard */Makefile))))

# Space/comma-separated list of subdirs to skip; or set SKIP=errors to continue after failures.
SKIP ?=
comma := ,
SUBDIRS := $(filter-out $(strip $(subst $(comma), ,$(SKIP))),$(SUBDIRS))

.PHONY: $(SUBDIRS) all dist conformance base sh

define make_subdirs
	@failed=""; \
	for e in $(SUBDIRS); do \
	  if [ "$(1)" != "all" ] && ! $(MAKE) -C $$e -n $(1) >/dev/null 2>&1; then \
	    echo "$$e: skipping (no $(1) target)"; \
	    continue; \
	  fi; \
	  $(MAKE) -C $$e $(1) || { \
	    rc=$$?; \
	    if [ "$(SKIP)" = "errors" ]; then \
	      failed+=" $$e"; \
	    else \
	      exit $$rc; \
	    fi; \
	  }; \
	done; \
	if [ -z "$$failed" ]; then \
	  echo "All OK"; \
	else \
	  echo "Failed:$$failed"; \
	fi
endef

all:
	$(call make_subdirs,all)

dist:
	$(call make_subdirs,dist)

conformance:
	$(call make_subdirs,conformance)

sh:
	$(MAKE) -C ../build sh

define subdir_targets
$(1):
	$(MAKE) -C $(1) all
endef

$(foreach d,$(SUBDIRS),$(eval $(call subdir_targets,$(d))))
