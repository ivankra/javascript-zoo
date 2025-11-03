# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

all: sed node

node:
	for f in *.js; do node $$f; done

# Fix filenames in console.log(...) messages
sed:
	@for f in es*.js; do \
	  if [ "$$(egrep -o 'es[-._a-zA-Z0-9]*\.js' $$f | uniq)" != "$$f" ]; then \
	    echo "$$f: $$(egrep -o 'es[-._a-zA-Z0-9]*\.js' $$f | uniq | tr '\n' ' ')"; \
	    sed -E -i -e "s/es[-._a-zA-Z0-9]*\.js/$$f/" $$f; \
	  fi; \
	done

spec: spec-rm spec1.txt spec3.txt spec5.txt spec51.txt spec6.txt

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

kangax:
	for f in es5 es6 es2016plus esintl esnext non-standard; do \
	  curl https://raw.githubusercontent.com/compat-table/compat-table/refs/heads/gh-pages/data-$$f.js \
	    >kangax-$$f.txt; \
	done
