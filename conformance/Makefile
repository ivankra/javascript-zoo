# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SHELL := /bin/bash

all: mypy sed node

mypy:
	python3 -m mypy run.py test262.py

node:
	./run.sh node

# Fix filenames in console.log(...) messages
sed:
	@for f in es[1-5]/*.js compat-table/*/*.js; do \
	  if [[ "$$(egrep -o '[-._/a-zA-Z0-9]+\.js:' $$f | uniq)" != "$$f:" ]]; then \
	    echo "$$f: $$(egrep -o '[-._/a-zA-Z0-9]+\.js:' $$f | uniq | tr '\n' ' ' | tr -d :)"; \
	    sed -E -i -e "s|[-._/a-zA-Z0-9]+\.js:|$$f:|" $$f; \
	  fi; \
	done

sh:
	make -C ../build sh
