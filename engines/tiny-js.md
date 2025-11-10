# tiny-js

Primitive interpreter for a limited subset of JavaScript.

* Repository:  https://github.com/gfwilliams/tiny-js.git <span class="shields"><img src="https://img.shields.io/github/stars/gfwilliams/tiny-js?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/gfwilliams/tiny-js?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         2423 (`cloc TinyJS*.{cpp,h}`)
* Language:    C++
* License:     MIT
* Standard:    no (can't run ES1)
* Years:       2009-2012
* Interpreter: interprets from source

## Quirks

No ASI, no typeof, no Date, `WHILE Loop exceeded 8192 iterations`.

Richards score ~45 on M4 (78000us/iter).

## Conformance

<details><summary>ES1-ES5: 8%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/tiny-js.txt">Full log</a>.</li>
<li>ES1: 12%<br>
<li>ES3: 5%<br>
<li>ES5: 4%<br>
</ul></details>

<details><summary>compat-table: ES6 0%, ES2016+ 0%, Next 0%, Intl 0%</summary><ul>
<li>ES6: 0%<br>
<li>ES2016: 0%<br>
<li>ES2017: 0%<br>
<li>ES2018: 0%<br>
<li>ES2019: 0%<br>
<li>ES2020: 0%<br>
<li>ES2021: 0%<br>
<li>ES2022: 0%<br>
<li>ES2023: 0%<br>
<li>ES2024: 0%<br>
<li>ES2025: 0%<br>
<li>Next: 0%<br>
<li>Intl: 0%<br>
</ul></details>
