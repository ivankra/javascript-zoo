# quad-wheel

Buggy unfinished interpreter.

* Homepage:     [code.google.com/archive/p/quad-wheel](https://code.google.com/archive/p/quad-wheel/)
* Repository:   [radare/quad-wheel](https://github.com/radare/quad-wheel.git) <span class="shields"><img src="https://img.shields.io/github/stars/radare/quad-wheel?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/radare/quad-wheel?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          7917 (`cloc *.{c,h}`)
* Language:     C
* License:      MIT
* Standard:     no (can't run ES1)
* Years:        2010
* Parser:       YACC
* Interpreter:  stack-based VM
* Regex engine: POSIX (regex.h)

## Quirks

Claims to target ES3, but poorly tested, basic ES1 features are buggy or missing:
  * no typeof, hex literals, Date, Math.\*, function hoisting, ASI
  * null is treated as alias for undefined

Part of code assume 32-bit CPU, need to be patched for 64-bit builds.

Richards score ~100 on M4 (34800us/iter).

## Conformance

<details><summary>ES1-ES5: 16%</summary><ul>
<li>ES1: 24%, <b>1 crash</b></li>
<li>ES3: 11%</li>
<li>ES5: 4%</li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 1%, Next 0%, Intl 0%</summary><ul>
<li>ES6: 1%, <b>3 crashes</b></li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 0%</li>
<li>ES2019: 12%, <b>1 crash</b></li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 0%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 0%</li>
</ul></details>

💥 **5 crashes during testing**
