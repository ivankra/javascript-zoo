# zhuzilin/es

JavaScript interpreter written in C++.

* Repository:  [zhuzilin/es](https://github.com/zhuzilin/es.git) <span class="shields"><img src="https://img.shields.io/github/stars/zhuzilin/es?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/zhuzilin/es?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [14807](# "cloc es.cc es")
* Language:    C++
* License:     AGPL-3.0
* Standard:    ES5
* Years:       2022-2026
* Interpreter: tree walker

## Conformance

<details><summary>ES1-ES5: 52%</summary><ul>
<li>Tested version: 0.2.0 (<a href="https://github.com/zhuzilin/es/commit/943e5c09470813e26404bd3920b93601fcc5b46b">2026-02-10</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/zhuzilin.json">json</a>)</li>
<li>ES1: 68.2% (135/198)<pre>
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: CRASH: SIGSEGV
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.js">Date.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getTime.js">Date.prototype.getTime.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: CRASH: SIGABRT
<a href="../../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: CRASH: SIGABRT
...
</pre></li>
<li>ES3: 33.8% (50/148)</li>
<li>ES5: 47.3% (35/74)</li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 1%, Next 0%, Intl 25%</summary><ul>
<li>Tested version: 0.2.0 (<a href="https://github.com/zhuzilin/es/commit/943e5c09470813e26404bd3920b93601fcc5b46b">2026-02-10</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/zhuzilin.json">json</a>)</li>
<li>ES5: 83.6%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.unshift.return-count.js">Array.prototype.unshift.return-count.js</a>: CRASH: SIGABRT
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: CRASH: SIGABRT
<a href="../../conformance/compat-table/es5/JSON.js">JSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: CRASH: SIGABRT
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: CRASH: SIGABRT
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: CRASH: SIGABRT
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: CRASH: SIGABRT
<a href="../../conformance/compat-table/es5/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: FAIL: calling non-object.
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Function.prototype.non-enumerable.js">misc.Function.prototype.non-enumerable.js</a>: CRASH: SIGABRT
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: CRASH: SIGSEGV
</pre></li>
<li>ES6: 1%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 0%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
