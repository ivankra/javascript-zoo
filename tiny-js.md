# tiny-js

Primitive interpreter for a limited subset of JavaScript.

* Repository:  https://github.com/gfwilliams/tiny-js.git <img src="https://img.shields.io/github/stars/gfwilliams/tiny-js?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/gfwilliams/tiny-js?label=&style=flat-square" alt="Last commit" title="Last commit">
* LOC:         2423 (`cloc TinyJS*.{cpp,h}`)
* Language:    C++
* License:     MIT
* Standard:    no (can't run ES1)
* Years:       2009-2012
* Type:        JavaScript-like language
* Interpreter: interprets from source

## Bugs

No ASI, no typeof, no Date, `WHILE Loop exceeded 8192 iterations`.

Richards score ~45 on M4 (78000us/iter).
