# quad-wheel

Buggy unfinished interpreter.

* Homepage:     https://code.google.com/archive/p/quad-wheel/
* Repository:   https://github.com/radare/quad-wheel.git <span class="shields"><img src="https://img.shields.io/github/stars/radare/quad-wheel?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/radare/quad-wheel?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          7917 (`cloc *.{c,h}`)
* Language:     C
* License:      MIT
* Standard:     no (can't run ES1)
* Years:        2010
* Type:         JavaScript-like language
* Parser:       YACC
* Interpreter:  stack-based VM
* Regex engine: POSIX (regex.h)

## Bugs

Claims to target ES3, but poorly tested, basic ES1 features are buggy or missing:
  * no typeof, hex literals, Date, Math.\*, function hoisting, ASI
  * null is treated as alias for undefined

Part of code assume 32-bit CPU, need to be patched for 64-bit builds.

Richards score ~100 on M4 (34800us/iter).
