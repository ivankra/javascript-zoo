# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

all: sed node

node:
	for f in *.js; do node $$f; done

sed:
	@for f in es*.js; do \
	  if [ "$$(egrep -o 'es[-._a-zA-Z0-9]*\.js' $$f | uniq)" != "$$f" ]; then \
	    echo "$$f: $$(egrep -o 'es[-._a-zA-Z0-9]*\.js' $$f | uniq | tr '\n' ' ')"; \
	    sed -E -i -e "s/es[-._a-zA-Z0-9]*\.js/$$f/" $$f; \
	  fi; \
	done
