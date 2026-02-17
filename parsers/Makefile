# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SUBDIRS := $(sort $(patsubst %/,%,$(dir $(wildcard */Makefile))))

.PHONY: $(SUBDIRS)

all: $(SUBDIRS)

all-ignoring-errors:
	-for e in $(SUBDIRS); do $(MAKE) -C "$$e" all || true; done

dist:
	@for e in $(SUBDIRS); do $(MAKE) -C "$$e" dist || exit $$?; done

base:
	$(MAKE) -C ../build all

sh:
	$(MAKE) -C ../build sh

define subdir_targets
$(1):
	$(MAKE) -C "$(1)" all
endef

$(foreach d,$(SUBDIRS),$(eval $(call subdir_targets,$(d))))
