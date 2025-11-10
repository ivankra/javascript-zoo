SHELL := /bin/bash
DIST_DIR := /dist
JOBS := 8

ENGINES := $(shell \
	for bin in $(DIST_DIR)/*; do \
	  if ! [[ -f "$$bin" && -x "$$bin" && -f "$$bin.json" ]]; then continue; fi; \
	  name=$$(basename "$$bin"); \
	  if [[ -x "$${bin}_full" ]]; then continue; fi; \
	  if [[ "$$name" != "$${name%_*}" && ! "$$name" =~ ^(.*_full|mujs|js-interpreter|spidermonkey_[12]).* ]]; then continue; fi; \
	  echo "$$name"; \
	done)

ES5 := bali besen cesanta-elk echosoar-jsi espruino ngs yrm006-miniscript

all: $(addsuffix .txt, $(ENGINES)) table

table:
	./README-gen.py

#node.txt:
#	../run.sh --next -j $(JOBS) -o node.txt node

define ENGINE_RULE
$(1).txt: $(DIST_DIR)/$(1)
	../run.sh --next -j $(JOBS) -o $$@ $$<
endef
$(foreach engine,$(filter-out $(ES5),$(ENGINES)),$(eval $(call ENGINE_RULE,$(engine))))

define ES5_RULE
$(1).txt: $(DIST_DIR)/$(1)
	../run.sh -j $(JOBS) -o $$@ $$< ../es[1-5]
endef
$(foreach engine,$(ES5),$(eval $(call ES5_RULE,$(engine))))

.PHONY: all table
