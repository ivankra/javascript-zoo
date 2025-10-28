# jsish

Buggy unfinished interpreter.

* Repository:   https://github.com/pcmacdon/jsish.git <span class="shields"><img src="https://img.shields.io/github/stars/pcmacdon/jsish?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/pcmacdon/jsish?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          50896 (`cloc src`)
* Language:     C
* License:      MIT
* Standard:     no (can't run ES1)
* Years:        2020-2022
* Type:         JavaScript-like language
* Parser:       YACC
* Interpreter:  stack-based VM
* Regex engine: POSIX (vendored from musl)

## Bugs

Bugs in == (anything equals null/undefined), new (returns null sometimes), no ASI, no Date class.
