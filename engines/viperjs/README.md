# ViperJS

Embeddable JavaScript engine in safe Rust, with zero runtime dependencies.

* Repository:   [MerlijnW70/viperjs](https://github.com/MerlijnW70/viperjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/MerlijnW70/viperjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/MerlijnW70/viperjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [79132](# "cloc --not_match_d='(?i)(test)' src")
* Language:     Rust
* License:      MIT OR Apache-2.0
* Standard:     ES2023 (partial)
* Years:        2026-
* Interpreter:  stack-based VM
* Regex engine: own (backtracking)

Notable for what it refuses rather than what it adds: the dependency table is empty and checked
in CI, the crate is `#![forbid(unsafe_code)]`, and no input may panic. `RegExp` is therefore its
own backtracking engine rather than a crate, and there is no `require`, no `fs` and no module
loading in the command-line host — the embedder provides I/O.

The command line binds one function, `print`. A run can be given a wall-clock budget that a
script cannot `catch`, which is what makes an untrusted script safe to embed.
