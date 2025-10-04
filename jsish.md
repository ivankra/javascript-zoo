# jsish

Buggy unfinished interpreter.

* Repository: https://github.com/pcmacdon/jsish.git <img src="https://img.shields.io/github/stars/pcmacdon/jsish?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/pcmacdon/jsish?label=&style=flat-square" alt="Last commit" title="Last commit">
* LOC:        50896 (`cloc src`)
* Language:   C
* License:    MIT
* Standard:   no (can't run ES1)
* Years:      2020-2022
* Runtime:    stack-based VM
* Regex:      POSIX
* Parser:     YACC

## Bugs

Bugs in == (anything equals null/undefined), new (returns null sometimes), no ASI, no Date class.
