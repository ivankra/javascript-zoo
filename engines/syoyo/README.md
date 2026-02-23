# syoyo/lightjs

Vibe-coded JavaScript engine written in C++.

* Repository:  [syoyo/lightjs](https://github.com/syoyo/lightjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/syoyo/lightjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/syoyo/lightjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         28756 (`cloc src`)
* Language:    C++
* License:     MIT
* Standard:    ES2020
* Years:       2025-
* Interpreter: tree-walker

## Conformance

<details><summary>ES1-ES5: 34%</summary><ul>
<li>ES1: 37%</li>
<li>ES3: 28%, <b>1 crash</b></li>
<li>ES5: 38%, <b>1 crash</b></li>
</ul></details>

<details><summary>compat-table: ES6 33%, ES2016+ 27%, Next 0%, Intl 0%</summary><ul>
<li>ES6: 33%</li>
<li>ES2016: 20%</li>
<li>ES2017: 26%</li>
<li>ES2018: 32%</li>
<li>ES2019: 40%</li>
<li>ES2020: 71%<pre>
<a href="../conformance/kangax-es2020/BigInt64Array.js">BigInt64Array.js</a>: TypeError: Function is not a constructor
<a href="../conformance/kangax-es2020/BigUint64Array.js">BigUint64Array.js</a>: TypeError: Function is not a constructor
<a href="../conformance/kangax-es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: Function is not a constructor
<a href="../conformance/kangax-es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: Function is not a constructor
<a href="../conformance/kangax-es2020/Promise.allSettled.js">Promise.allSettled.js</a>: failed
<a href="../conformance/kangax-es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2021: 20%</li>
<li>ES2022: 12%</li>
<li>ES2023: 63%<pre>
<a href="../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: Cannot read properties of undefined
<a href="../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: Cannot read properties of undefined
<a href="../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: TypeError: Cannot read properties of undefined
<a href="../conformance/kangax-es2023/hashbang.js">hashbang.js</a>: Error in file 'hashbang.js': Unexpected character '#' at line 1, column 1
</pre></li>
<li>ES2024: 14%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 0%</li>
</ul></details>

💥 **2 crashes during testing**
