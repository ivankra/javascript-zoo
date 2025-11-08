# GraalJS

High-performance JavaScript engine for JVM/GraalVM.

* Homepage:         https://www.graalvm.org/javascript/
* Repository:       https://github.com/oracle/graaljs.git <span class="shields"><img src="https://img.shields.io/github/stars/oracle/graaljs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/oracle/graaljs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
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
* [Elide](https://github.com/elide-dev/elide) <span class="shields"><img src="https://img.shields.io/github/stars/elide-dev/elide?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/elide-dev/elide?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - multi-language runtime on top of GraalVM

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/graaljs.txt">Full log</a>.</li>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 99%, Intl 100%</summary><ul>
<li>ES6: 98%<pre>
<a href="../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: RangeError: Maximum call stack size exceeded
<a href="../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RangeError: Maximum call stack size exceeded
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 99%<pre>
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: regex.unicode-property-escapes.unicode-17.0.js:10:30 Unsupported Unicode script name 'Sidetic'
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 96%<pre>
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 100%</li>
<li>Intl: 100%</li>
</ul></details>
