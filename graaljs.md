# GraalJS

High-performance JavaScript engine for JVM/GraalVM.

* Homepage:         https://www.graalvm.org/javascript/
* Repository:       https://github.com/oracle/graaljs.git <img src="https://img.shields.io/github/stars/oracle/graaljs?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/oracle/graaljs?label=&style=flat-square" alt="Last commit" title="Last commit">
* LOC:              191606 (`cloc --not_match_d="(?i)(test)" graal-js/src`)
* Language:         Java
* License:          GFTC, UPL-1.0
  * Oracle GraamVM - GraalVM Free Terms and Conditions
  * GraalVM Community Edition - Universal Permissive License 1.0
* Org:              Oracle
* Standard:         ESnext
* Years:            2018-
* Features:         WebAssembly engine (GraalWasm)
* Runtime platform: Java
* JIT:              2-tier JIT (HotSpot/Graal), arm64, x64
* Regex engine:     [TRegex](https://github.com/oracle/graal/tree/master/regex) (NFA-based)

## Tech

Truffle: framework for extending GraalVM with support for new languages by automatically deriving high-performance code from interpreters. Based on the idea of partial evaluation of interpreters (Futamura projection) - essentially, unrolling of interpreter's loop for a given input to it. Cons: compilation overhead.

Related: [weval](https://github.com/bytecodealliance/weval) ([blog](https://cfallin.org/blog/2024/08/28/weval/))

## Runtimes

* Ships with its own port of Node.js
* [Elide](https://github.com/elide-dev/elide): multi-language runtime on top of GraalVM
