# Duktape

Embeddable Javascript engine with a focus on portability and compact footprint.

* Homepage:    [duktape.org](https://duktape.org/)
* Repository:  [svaarala/duktape](https://github.com/svaarala/duktape.git) <span class="shields"><img src="https://img.shields.io/github/stars/svaarala/duktape?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/svaarala/duktape?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [72815](# "cloc --exclude-ext=txt src-input")
* Language:    C
* License:     MIT
* Standard:    ES5 (with some ES6 features)
* Years:       2013-
* Interpreter: register-based VM

## Users

* Browsers:
  * [NetSurf](https://github.com/netsurf-browser/netsurf/tree/master/content/handlers/javascript)
* Runtimes:
  * [dukluv](https://github.com/creationix/dukluv) <span class="shields"><img src="https://img.shields.io/github/stars/creationix/dukluv?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/creationix/dukluv?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - libuv bindings for duktape
  * [lowjs](https://github.com/neonious/lowjs) <span class="shields"><img src="https://img.shields.io/github/stars/neonious/lowjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/neonious/lowjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - low-footprint Node.js port for duktape
* [Zabbix](https://github.com/zabbix/zabbix/tree/master/src/libs/zbxembed/)
* [wasm-jseval](https://github.com/maple3142/wasm-jseval) <span class="shields"><img src="https://img.shields.io/github/stars/maple3142/wasm-jseval?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/maple3142/wasm-jseval?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - safe eval library based on WebAssembly and Duktape/QuickJS

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 99%<pre>
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 29%, ES2016+ 8%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 29%</li>
<li>ES2016: 21%</li>
<li>ES2017: 13%</li>
<li>ES2018: 0%</li>
<li>ES2019: 14%</li>
<li>ES2020: 14%</li>
<li>ES2021: 7%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
