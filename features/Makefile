# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SHELL := /bin/bash

all: sed node

# Fix filenames in console.log(...) messages
sed:
	@for f in es[1-5]/*.js kangax-es*/*.js; do \
	  if [[ "$$(egrep -o '[-._/a-zA-Z0-9]+\.js:' $$f | uniq)" != "$$f:" ]]; then \
	    echo "$$f: $$(egrep -o '[-._/a-zA-Z0-9]+\.js:' $$f | uniq | tr '\n' ' ' | tr -d :)"; \
	    sed -E -i -e "s|[-._/a-zA-Z0-9]+\.js:|$$f:|" $$f; \
	  fi; \
	done

node: sed
	./run.sh node

jsc: sed
	./run.sh jsc

quickjs: sed
	./run.sh quickjs

quickjs5: sed
	./run.sh quickjs es[1-5]

spec: spec-rm spec1.txt spec3.txt spec5.txt spec51.txt spec6.txt spec6.html

spec-rm:
	rm -f spec*.txt

spec1.pdf:
	wget -O spec1.pdf https://ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf

spec3.pdf:
	wget -O spec3.pdf https://ecma-international.org/wp-content/uploads/ECMA-262_3rd_edition_december_1999.pdf

spec5.pdf:
	wget -O spec5.pdf https://ecma-international.org/wp-content/uploads/ECMA-262_5th_edition_december_2009.pdf

spec51.pdf:
	wget -O spec51.pdf https://ecma-international.org/wp-content/uploads/ECMA-262_5.1_edition_june_2011.pdf

spec6.pdf:
	wget -O spec6.pdf https://ecma-international.org/wp-content/uploads/ECMA-262_6th_edition_june_2015.pdf

spec6.html:
	curl -o spec6.html https://262.ecma-international.org/6.0/

# Normalize somewhat for diffing and grep.
# 'dwdiff -ic spec1.txt spec3.txt | less' or meld works well diffing.
%.txt: %.pdf
	pdftotext -nopgbrk -layout $< /dev/stdout \
	  | egrep -v '^..     *- [ivx0-9]+ -$$' \
	  | egrep -v '^ *[0-9ivx]* *© Ecma International [0-9]* *[0-9ivx]*$$' \
	  | sed -E '1,400 s/ *[.]{20,} ?[0-9]+$$//' \
	  | sed -E '1,400 s/^( *[0-9]+([.][0-9.]+)? +[A-Z\[].*?) *     [0-9]+$$/\1/' \
	  | sed -E 's/^ ? ?([0-9]+[.])/\1/' \
	  | sed -E 's/ *$$//' \
	  | uniq >$@

# Download compat-table data files
kangax-data:
	for f in data-common.json data-{es5,es6,es2016plus,esintl,esnext,non-standard}.js; do \
	  curl -o $$f "https://raw.githubusercontent.com/compat-table/compat-table/refs/heads/gh-pages/$$f"; \
	done

kangax-gen: kangax-data kangax-map.json
	./kangax.js gen
