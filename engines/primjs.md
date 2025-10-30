# PrimJS

[QuickJS](quickjs.md)-based engine from ByteDance for their cross-platform mobile apps framework Lynx.

* Repository:  https://github.com/lynx-family/primjs.git <span class="shields"><img src="https://img.shields.io/github/stars/lynx-family/primjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/lynx-family/primjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         292098 (`cloc src`)
* Language:    C++
* License:     Apache-2.0
* Standard:    ES2019
* Years:       2024-
* Ancestor:    [QuickJS](quickjs.md)
* Interpreter: stack-based VM
* GC:          mark-and-sweep / reference counting
  * One of key features - compile-time option to replace QuickJS's reference counting with a mark-and-sweep GC, touting +10-20% performance ([doc](https://github.com/lynx-family/primjs/blob/develop/docs/gc.md)).

## Forks

* [Hako](hako.md): PrimJS ported to WASM
