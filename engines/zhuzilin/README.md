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
<li>ES1: 68%, <b>49 crashes</b><pre>
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: crashed: SIGSEGV
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.js">Date.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getTime.js">Date.prototype.getTime.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: crashed: SIGABRT
...
</pre></li>
<li>ES3: 34%, <b>78 crashes</b></li>
<li>ES5: 47%, <b>26 crashes</b></li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 1%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 1%, <b>31 crashes</b></li>
<li>ES2016: 0%</li>
<li>ES2017: 4%, <b>1 crash</b></li>
<li>ES2018: 0%, <b>4 crashes</b></li>
<li>ES2019: 0%, <b>1 crash</b></li>
<li>ES2020: 0%, <b>1 crash</b></li>
<li>ES2021: 0%</li>
<li>ES2022: 4%, <b>1 crash</b></li>
<li>ES2023: 0%</li>
<li>ES2024: 0%, <b>5 crashes</b></li>
<li>ES2025: 0%, <b>1 crash</b></li>
<li>Next: 0%, <b>1 crash</b></li>
<li>Intl: 25%</li>
</ul></details>

💥 **208 crashes during testing**
