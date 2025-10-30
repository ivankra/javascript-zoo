# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

all: sed node

node:
	for f in *.js; do node $$f; done

sed:
	@for f in *.js; do \
	  if [ "$$(egrep -o 'es[0-9]+\.[-.a-zA-Z0-9]+\.js' $$f | uniq)" != "$$f" ]; then \
	    echo "$$f: $$(egrep -o 'es[0-9]+\.[-.a-zA-Z0-9]+\.js' $$f | uniq | tr '\n' ' ')"; \
	    sed -E -i -e "s/es[0-9]+\.[-.a-zA-Z0-9]+\.js/$$f/" $$f; \
	  fi; \
	done
