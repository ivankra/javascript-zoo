# oxc

Collection of high-performance tools for JavaScript and TypeScript
written in Rust: parser, linter, formatter, minifier and others.

* Homepage:   https://oxc.rs/
* Repository: https://github.com/oxc-project/oxc.git <span class="shields"><img src="https://img.shields.io/github/stars/oxc-project/oxc?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/oxc-project/oxc?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:        52692 (`cloc crates/{oxc_ast,oxc_parser}/src`)
* Language:   Rust
* License:    MIT
* Standard:   ESnext
* Years:      2023-
* Features:   ESTree-like AST, TypeScript, JSX

## Features

* [oxc_ast](https://docs.rs/oxc_ast/latest/oxc_ast/):
  JavaScript/TypeScript/JSX AST nodes, similar to [ESTree](https://github.com/estree/estree)
  and typescript-eslint's definitions.
* [oxc_parser](https://docs.rs/oxc_parser/latest/oxc_parser/):
  Supports ESnext, TypeScript and JSX. Aims to be the fastest Rust-based
  ready-for-production parser, 3-5x faster than Rust-based [SWC](../swc/README.md) and [Biome](https://github.com/biomejs/biome).

## Users

* [Nova](../../engines/nova/README.md) engine
* [Rolldown](https://rolldown.rs/): Rust-based bundler
