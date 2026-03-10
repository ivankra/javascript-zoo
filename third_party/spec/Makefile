# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

all: es1.txt es3.txt es5.txt es51.txt es6.txt es6.html

es1.pdf:
	wget -O es1.pdf https://ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf

es3.pdf:
	wget -O es3.pdf https://ecma-international.org/wp-content/uploads/ECMA-262_3rd_edition_december_1999.pdf

es5.pdf:
	wget -O es5.pdf https://ecma-international.org/wp-content/uploads/ECMA-262_5th_edition_december_2009.pdf

es51.pdf:
	wget -O es51.pdf https://ecma-international.org/wp-content/uploads/ECMA-262_5.1_edition_june_2011.pdf

es6.pdf:
	wget -O es6.pdf https://ecma-international.org/wp-content/uploads/ECMA-262_6th_edition_june_2015.pdf

es6.html:
	curl -o es6.html https://262.ecma-international.org/6.0/

# Normalize somewhat for diffing and grep.
# 'dwdiff -ic spec1.txt spec3.txt | less' or meld works well diffing.
%.txt: %.pdf Makefile
	pdftotext -nopgbrk -layout $< /dev/stdout \
	  | egrep -v '^..     *- [ivx0-9]+ -$$' \
	  | egrep -v '^ *[0-9ivx]* *© Ecma International [0-9]* *[0-9ivx]*$$' \
	  | sed -E '1,400 s/ *[.]{20,} ?[0-9]+$$//' \
	  | sed -E '1,400 s/^( *[0-9]+([.][0-9.]+)? +[A-Z\[].*?) *     [0-9]+$$/\1/' \
	  | sed -E 's/^ ? ?([0-9]+[.])/\1/' \
	  | sed -E 's/ *$$//' \
	  | uniq >$@
