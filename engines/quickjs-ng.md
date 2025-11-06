# QuickJS-NG

Community-oriented fork of [QuickJS](quickjs.md).

* Homepage:    https://quickjs-ng.github.io/quickjs/
* Repository:  https://github.com/quickjs-ng/quickjs.git <span class="shields"><img src="https://img.shields.io/github/stars/quickjs-ng/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/quickjs-ng/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         74458 (`cloc *.c *.h`)
* Language:    C
* License:     MIT
* Standard:    ES2023
* Years:       2023-
* Ancestor:    [QuickJS](quickjs.md) (forked in 2023 due to QuickJS being unmaintained at that time)
* Features:    PIC
* Interpreter: stack-based VM
* GC:          reference counting

## Quirks

Engine shell frequently misdetects script / ES module mode, causing various errors.
Pass `--script` argument to force classic sloppy script mode.

## Users

* [fastschema/qjs](fastschema-qjs.md)

## Runtimes

* [txiki.js](https://github.com/saghul/txiki.js) <span class="shields"><img src="https://img.shields.io/github/stars/saghul/txiki.js?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/saghul/txiki.js?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - QuickJS-ng/libuv-based JavaScript runtime
