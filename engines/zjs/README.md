# zjs

Zig-native JavaScript engine, source-aligned with QuickJS.

* Repository:  [aneryu/zjs](https://github.com/aneryu/zjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/aneryu/zjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/aneryu/zjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [235432](# "cloc src")
* Language:    Zig
* License:     MIT
* Standard:    ES2023 (partial)
* Years:       2026-
* Ancestor:    [QuickJS](../quickjs/README.md)
* Interpreter: stack-based VM
* GC:          reference counting with cycle removal

zjs is a Zig rewrite that uses QuickJS as its semantic reference. It provides
a Zig embedding API, a standalone command-line interpreter, and syntax-only
TypeScript erasure. It is not a drop-in replacement for QuickJS's C API.
