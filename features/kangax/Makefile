# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SHELL := /bin/bash

all: data sed

# Fix filenames in console.log(...) messages
sed:
	@for f in es*.js annex*.js; do \
	  if [ "$$(egrep -o '(es|annex)[-._a-zA-Z0-9]*\.js' $$f | uniq)" != "$$f" ]; then \
	    echo "$$f: $$(egrep -o 'es[-._a-zA-Z0-9]*\.js' $$f | uniq | tr '\n' ' ')"; \
	    sed -E -i -e "s/(es|annex)[-._a-zA-Z0-9]*\.js/$$f/" $$f; \
	  fi; \
	done

# Download compat-table data files
data:
	for f in data-common.json data-{es5,es6,es2016plus,esintl,esnext,non-standard}.js; do \
	  curl -o $$f "https://raw.githubusercontent.com/compat-table/compat-table/refs/heads/gh-pages/$$f"; \
	done

#gen:
#	./gen.js map
#	./gen.js gen
