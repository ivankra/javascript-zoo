# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SHELL := /bin/bash

# Prefer to use *_full/intl binaries here over the default size-optimized one
# Ignore most uninteresting variants
ENGINES := $(shell \
	for bin in /dist/*; do \
	  if ! [[ -f "$$bin" && -x "$$bin" && -f "$$bin.json" ]]; then continue; fi; \
	  name=$$(basename "$$bin"); \
	  if [[ -x "$${bin}_full" || -x "$${bin}_intl" ]]; then continue; fi; \
	  if [[ "$$name" != "$${name%_*}" && ! "$$name" =~ ^(.*_full|.*_intl|mujs|js-interpreter|spidermonkey_[12]).* ]]; then continue; fi; \
	  echo "$$name"; \
	done)

MANUAL := topchetoeu
ES5 := bali besen cesanta-elk echosoar-jsi espruino je-perl jispy ngs rpython-langjs twostroke yrm006-miniscript
ESNEXT := $(filter-out $(ES5) $(MANUAL),$(ENGINES))

all: $(addsuffix .txt, $(ENGINES)) table

$(ESNEXT:%=%.txt): %.txt: /dist/%
	../run.sh --next -j 8 -o $@ $<

$(ES5:%=%.txt): %.txt: /dist/%
	../run.sh -j 8 -o $@ $< ../es[1-5]

topchetoeu.txt: /dist/topchetoeu
	../run.sh -j 1 -o topchetoeu.txt /dist/topchetoeu ../es[1-5]

node.txt:
	../run.sh --next -j 8 -o node.txt node

duktape_babel.txt: /dist/duktape /dist/mujs_babel
	../run.sh --next -j 8 -o duktape_babel.txt /dist/mujs_babel /dist/duktape

iv-lv5_babel.txt: /dist/iv-lv5 /dist/mujs_babel
	../run.sh --next -j 8 -o iv-lv5_babel.txt /dist/mujs_babel /dist/iv-lv5

table:
	./README-gen.py

.PHONY: all table
