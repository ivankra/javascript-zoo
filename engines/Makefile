# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SUBDIRS := $(sort $(patsubst %/,%,$(dir $(wildcard */Makefile))))

.PHONY: $(SUBDIRS) all all-ignoring-errors dist conformance base sh

all: $(SUBDIRS)

all-ignoring-errors:
	-for e in $(SUBDIRS); do $(MAKE) -C "$$e" all || true; done

dist:
	@for e in $(SUBDIRS); do \
	  if $(MAKE) -C "$$e" -n dist >/dev/null 2>&1; then \
	    $(MAKE) -C "$$e" dist || exit $$?; \
	  else \
	    echo "$$e: skipping (no dist target)"; \
	  fi; \
	done

conformance:
	@for e in $(SUBDIRS); do \
	  if $(MAKE) -C "$$e" -n conformance >/dev/null 2>&1; then \
	    $(MAKE) -C "$$e" conformance || exit $$?; \
	  else \
	    echo "$$e: skipping (no conformance target)"; \
	  fi; \
	done

base:
	$(MAKE) -C ../build all

sh:
	$(MAKE) -C ../build sh

define subdir_targets
$(1):
	$(MAKE) -C "$(1)" all
endef

$(foreach d,$(SUBDIRS),$(eval $(call subdir_targets,$(d))))
