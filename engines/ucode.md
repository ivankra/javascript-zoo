# ucode

Interpreter for a small ES6-like language for microcontrollers from OpenWrt project.

* Homepage:     https://ucode.mein.io/
* Repository:   https://github.com/jow-/ucode.git <span class="shields"><img src="https://img.shields.io/github/stars/jow-/ucode?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/jow-/ucode?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          39692 (`cloc *.c include lib`)
* Language:     C
* License:      ISC
* Org:          OpenWrt
* Standard:     no (distinct ES6-inspired language, different non-object-oriented standard library)
* Years:        2020-
* Type:         JavaScript-like language ([syntax](https://ucode.mein.io/tutorial-02-syntax.html))
* Interpreter:  stack-based VM
* GC:           reference counting + mark-and-sweep GC
* Regex engine: POSIX (regex.h)

## Users

* OpenWrt

## Features

* Borrows much of ECMAScript 6 syntax but is a rather different, leaner language,
  not designed for full JavaScript compatibility.
* Completely different non-object-oriented standard library, mimicking Perl 5 built-ins.
  E.g. `arr.length` -> `length(arr)`, `Object.keys(obj)` -> `keys(obj)`.
* No `var`, only `let`/`const`.
* No function hoisting and no forward name references in general.
* Built-in jinja-like templating.
* Separate float and int (64-bit) types. Integer division: 1/2 => 0.
* JSON, rest/spread operators, regex
* `undefined` is an alias for `null`
* No `new`, but first-class functions, `this` somewhat supported and prototype-based
  inheritance via `proto()` built-in, so JavaScript-like object model can be emulated
  like shown below.

```javascript
const CounterPrototype = {
  str: function() { return "Counter(" + this.n + ")"; },
  inc: function() { this.n += 1; },
};

function Counter(start) {
  return proto({n: start}, CounterPrototype);
};
```

## Conformance

<details><summary>ES1-ES5: 1%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/ucode.txt">Full log</a>.</li>
<li>ES1: 2%<br>
<li>ES3: 1%<br>
<li>ES5: 1%<br>
</ul></details>

<details><summary>compat-table: ES6 0%, ES2016+ 0%, Next 0%, Intl 0%</summary><ul>
<li>ES6: 0%<br>
<li>ES2016: 0%<br>
<li>ES2017: 0%<br>
<li>ES2018: 0%<br>
<li>ES2019: 0%<br>
<li>ES2020: 0%<br>
<li>ES2021: 0%<br>
<li>ES2022: 0%<br>
<li>ES2023: 0%<br>
<li>ES2024: 0%<br>
<li>ES2025: 0%<br>
<li>Next: 0%<br>
<li>Intl: 0%<br>
</ul></details>
