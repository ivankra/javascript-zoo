# ucode

Interpreter for a small ES6-like language for microcontrollers.

* URL:        https://ucode.mein.io/
* Repository: https://github.com/jow-/ucode.git <img src="https://img.shields.io/github/stars/jow-/ucode?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/jow-/ucode?label=&style=flat-square" alt="Last commit" title="Last commit">
* LOC:        39692 (`cloc *.c include lib`)
* Language:   C
* License:    ISC
* Org:        OpenWrt
* Standard:   no (distinct ES6-inspired language, different non-object-oriented standard library)
* Type:       JavaScript-like language
* Years:      2020-
* Runtime:    stack-based VM
* GC:         reference counting + mark-and-sweep GC
* Regex:      POSIX

## Users

* OpenWrt

## Features

* Borrows much of ECMAScript 6 syntax but is a different, leaner language,
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
  inheritance via `proto()` build-in, so JavaScript-like object model can be emulated
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
