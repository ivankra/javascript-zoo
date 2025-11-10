# Quanta

Buggy unfinished interpreter.

* Repository:   https://github.com/solarbrowser/quanta.git <span class="shields"><img src="https://img.shields.io/github/stars/solarbrowser/quanta?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/solarbrowser/quanta?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          42129 (`cloc .`)
* Language:     C++
* License:      MPL-2.0
* Standard:     no (can't run ES1)
* Years:        2025-
* Interpreter:  tree walker
* Regex engine: std::regex

## Conformance

<details><summary>ES1-ES5: 43%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/quanta.txt">Full log</a>.</li>
<li>ES1: 48%<br>
<li>ES3: 47%<br>
<li>ES5: 22%, <b>1 crash</b><br>
</ul></details>

<details><summary>compat-table: ES6 23%, ES2016+ 14%, Next 0%, Intl 0%</summary><ul>
<li>ES6: 23%, <b>4 crashes</b><br>
<li>ES2016: 21%<br>
<li>ES2017: 22%<br>
<li>ES2018: 21%<br>
<li>ES2019: 0%<br>
<li>ES2020: 26%<br>
<li>ES2021: 14%<br>
<li>ES2022: 3%<br>
<li>ES2023: 0%<br>
<li>ES2024: 0%<br>
<li>ES2025: 18%<br>
<li>Next: 0%<br>
<li>Intl: 0%<br>
</ul></details>

💥 **5 crashes during testing**
