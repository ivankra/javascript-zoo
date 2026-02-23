# Carakan

JavaScript engine of Opera 10.50 – 12.18.

* Sources:     [archive.org](https://web.archive.org/web/20170113134110/https://github.com/prestocore/browser)
* LOC:         [124811](# "cloc --fullpath --not_match_f='(?i)(test)' --exclude-ext=txt modules/ecmascript/carakan")
* Language:    C++
* License:     Proprietary
* Org:         Opera
* Standard:    ES5
* Years:       2010-2013
* Interpreter: register-based VM
* JIT:         arm, x86/x64, mips

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 97%<pre>
<a href="../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 5%, ES2016+ 2%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 5%</li>
<li>ES2016: 0%</li>
<li>ES2017: 7%</li>
<li>ES2018: 0%</li>
<li>ES2019: 2%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6%</li>
<li>Intl: 25%</li>
</ul></details>
