# iv / lv5

JIT-enabled ES5 engine in C++.

* Repository:   https://github.com/Constellation/iv.git <span class="shields"><img src="https://img.shields.io/github/stars/Constellation/iv?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Constellation/iv?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          69771 (`cloc --not_match_d="(?i)(test|third_party)" iv`)
* Language:     C++
* License:      BSD-2-Clause
* Standard:     ES5
* Years:        2009-2015
* Features:     PIC
* Interpreter:  register-based VM
* JIT:          context-threaded/method JIT, x64
* Regex engine: own engine, JIT-enabled (x64)

## Components

  * iv/lv5/railgun: bytecode compiler
  * iv/lv5/railgun/vm.h: direct-threaded register-based VM, 3-args binary ops
  * iv/lv5/breaker: JIT compiler
  * iv/aero: regex engine with x64 JIT

## Conformance

<details><summary>ES1-ES5: 98%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4')
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: small number exponential notation failed; large number exponential notation failed
</pre></li>
<li>ES5: 92%<pre>
<a href="../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../conformance/es5/JSON.parse.js">JSON.parse.js</a>: negative number failed
<a href="../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: replacer array failed
<a href="../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: getter definition failed
<a href="../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
<a href="../conformance/es5/literals.object.getters.js">literals.object.getters.js</a>: { get x(){ return 1 } }.x failed; getter returning value failed; getter with side effects failed; getter accessing this failed
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 16%, ES2016+ 1%, Next 0%, Intl 46%</summary><ul>
<li>ES6: 16%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 0%</li>
<li>ES2019: 2%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 46%</li>
</ul></details>
