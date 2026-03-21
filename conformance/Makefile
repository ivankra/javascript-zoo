# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SHELL := /bin/bash

all: sed node

# Fix filenames in console.log(...) messages
sed:
	@for f in es[1-5]/*.js compat-table/*/*.js; do \
	  if [[ "$$(egrep -o '[-._/a-zA-Z0-9]+\.js:' $$f | uniq)" != "$$f:" ]]; then \
	    echo "$$f: $$(egrep -o '[-._/a-zA-Z0-9]+\.js:' $$f | uniq | tr '\n' ' ' | tr -d :)"; \
	    sed -E -i -e "s|[-._/a-zA-Z0-9]+\.js:|$$f:|" $$f; \
	  fi; \
	done

# Run the whole test suite through nodejs
node:
	./run.py node

# Drop into shell in the test container with this repository bind-mounded
sh:
	make -C ../build sh
