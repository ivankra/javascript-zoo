# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SHELL := /bin/bash
ENGINES := $(shell \
	for bin in /dist/*; do \
	  if ! [[ -f "$$bin" && -x "$$bin" && -f "$$bin.json" ]]; then continue; fi; \
	  name=$$(basename "$$bin"); \
	  if [[ -x "$${bin}_full" ]]; then continue; fi; \
	  if [[ "$$name" != "$${name%_*}" && ! "$$name" =~ ^(.*_full|mujs|js-interpreter|spidermonkey_[12]).* ]]; then continue; fi; \
	  echo "$$name"; \
	done)

all: $(addsuffix .txt, $(ENGINES)) table

table:
	./README-gen.py

ES5 := bali besen cesanta-elk echosoar-jsi espruino je-perl jispy ngs twostroke yrm006-miniscript
MANUAL := topchetoeu

define ENGINE_RULE
$(1).txt: /dist/$(1)
	../run.sh --next -j 8 -o $(1).txt /dist/$(1)
endef
$(foreach engine,$(filter-out $(ES5) $(MANUAL),$(ENGINES)),$(eval $(call ENGINE_RULE,$(engine))))

define ES5_RULE
$(1).txt: /dist/$(1)
	../run.sh -j 8 -o $(1).txt /dist/$(1) ../es[1-5]
endef
$(foreach engine,$(ES5),$(eval $(call ES5_RULE,$(engine))))

.PHONY: all table

topchetoeu.txt: /dist/topchetoeu
	../run.sh -j 1 -o topchetoeu.txt /dist/topchetoeu ../es[1-5]

node.txt:
	../run.sh --next -j 8 -o node.txt node
