# quad-wheel

Buggy unfinished interpreter.

* URL:        https://code.google.com/archive/p/quad-wheel/
* Repository: https://github.com/radare/quad-wheel.git <img src="https://img.shields.io/github/stars/radare/quad-wheel?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/radare/quad-wheel?label=&style=flat-square" alt="Last commit" title="Last commit">
* LOC:        7917 (`cloc *.{c,h}`)
* Language:   C
* License:    MIT
* Standard:   no (can't run ES1)
* Type:       JavaScript-like language
* Years:      2010
* Parser:     YACC
* Runtime:    stack-based VM
* Regex:      POSIX

## Bugs

Claims to target ES3, but poorly tested, basic ES1 features are buggy or missing:
  * no typeof, hex literals, Date, Math.\*, function hoisting, ASI
  * null is treated as alias for undefined

Part of code assume 32-bit CPU, need to be patched for 64-bit builds.

Richards score ~100 on M4 (34800us/iter).
