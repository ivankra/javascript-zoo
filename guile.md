# Guile

Features a toy unfinished ECMAScript interpreter as of version 1.9.

* URL:        https://wingolog.org/archives/2009/02/22/ecmascript-for-guile
* Repository: https://git.savannah.gnu.org/git/guile.git
* LOC:        1713 (`cloc module/language/ecmascript`)
* Language:   C
* License:    LGPL-3.0-or-later
* Standard:   no (can't run ES1)
* Type:       JavaScript-like language
* Years:      2009

Run `guile --language=ecmascript` to start REPL.

Very incomplete implementation and not developed since the initial attempt in 2009.
Evidently maintainer got bored / underestimated complexity of the project.

Related: [Kawa](https://www.gnu.org/software/kawa/)'s [ecmascript](https://gitlab.com/kashell/Kawa/-/tree/master/gnu/ecmascript)
module - another incomplete implementation in another Scheme interpreter.
