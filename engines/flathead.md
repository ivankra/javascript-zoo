# Flathead

Buggy unfinished interpreter.

* Repository:   https://github.com/ndreynolds/flathead.git <span class="shields"><img src="https://img.shields.io/github/stars/ndreynolds/flathead?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ndreynolds/flathead?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          7075 (`cloc src`)
* Language:     C
* License:      MIT
* Standard:     no (can't run ES1)
* Years:        2012-2017
* Parser:       YACC
* Interpreter:  tree walker
* Regex engine: PCRE

## Quirks

Can't run ES1 code - incorrectly implements basic JavaScript object model:

```javascript
function Obj() { this.x = 1; }
o = new Obj();
function f() { return this.x; }
o.f = f;
o.f();  // => undefined
```

No ASI.

## Conformance

<details><summary>ES1-ES5: 53%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/flathead.txt">Full log</a>.</li>
<li>ES1: 76%, <b>1 crash</b><pre>
<a href="../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: Array.prototype.constructor failed; array instance constructor failed
<a href="../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: failed
<a href="../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: timeout
<a href="../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: timeout
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: failed
<a href="../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: sort with comparefn failed
<a href="../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: Boolean.prototype.constructor failed; boolean instance constructor failed
<a href="../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: failed
<a href="../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: Function.prototype.constructor failed; function instance constructor failed
<a href="../conformance/es1/Number.js">Number.js</a>: Number() failed
<a href="../conformance/es1/Number.prototype.constructor.js">Number.prototype.constructor.js</a>: Number.prototype.constructor failed; number instance constructor failed
<a href="../conformance/es1/Object.prototype.constructor.js">Object.prototype.constructor.js</a>: Object.prototype.constructor failed; object instance constructor failed
<a href="../conformance/es1/String.fromCharCode.js">String.fromCharCode.js</a>: Error: Unicode is not supported
<a href="../conformance/es1/String.generics.js">String.generics.js</a>: charAt failed; Error: Unicode is not supported
<a href="../conformance/es1/String.length.js">String.length.js</a>: String object length failed
<a href="../conformance/es1/String.prototype.charCodeAt.js">String.prototype.charCodeAt.js</a>: Error: Unicode is not supported
<a href="../conformance/es1/String.prototype.constructor.js">String.prototype.constructor.js</a>: String.prototype.constructor failed; string instance constructor failed
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: escape is not defined
<a href="../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: unescape is not defined
<a href="../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: failed
<a href="../conformance/es1/arguments.js">arguments.js</a>: failed
...
</pre></li>
<li>ES3: 28%, <b>9 crashes</b></li>
<li>ES5: 39%, <b>2 crashes</b></li>
</ul></details>

<details><summary>compat-table: ES6 0%, ES2016+ 1%, Next 3%, Intl 25%</summary><ul>
<li>ES6: 0%, <b>16 crashes</b></li>
<li>ES2016: 0%</li>
<li>ES2017: 0%, <b>1 crash</b></li>
<li>ES2018: 0%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 9%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4%</li>
<li>ES2025: 0%</li>
<li>Next: 3%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **30 crashes during testing**
