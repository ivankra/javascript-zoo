# Flathead

Buggy unfinished interpreter.

* Repository:   https://github.com/ndreynolds/flathead.git <span class="shields"><img src="https://img.shields.io/github/stars/ndreynolds/flathead?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ndreynolds/flathead?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          7075 (`cloc src`)
* Language:     C
* License:      MIT
* Standard:     no (can't run ES1)
* Years:        2012-2017
* Type:         JavaScript-like language
* Parser:       YACC
* Interpreter:  tree walker
* Regex engine: PCRE

## Bugs

Can't run ES1 code - incorrectly implements basic JavaScript object model:

```javascript
function Obj() { this.x = 1; }
o = new Obj();
function f() { return this.x; }
o.f = f;
o.f();  // => undefined
```

No ASI.
