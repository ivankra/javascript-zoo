# Rapidus

JavaScript engine written in Rust, aiming at ES5.

* Repository:  https://github.com/maekawatoshiki/rapidus.git <span class="shields"><img src="https://img.shields.io/github/stars/maekawatoshiki/rapidus?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/maekawatoshiki/rapidus?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         10810 (`cloc */src`)
* Language:    Rust
* License:     MIT
* Standard:    ES5 (partial)
* Years:       2018-2021
* Interpreter: stack-based VM ([vm.rs](https://github.com/maekawatoshiki/rapidus/blob/main/core/src/vm/vm.rs))

## Links

* [Live demo (WASM)](https://maekawatoshiki.github.io/rapidus)

## Conformance

<details><summary>ES1-ES5: 21%</summary><ul>
<li>ES1: 31%<br>
<li>ES3: 14%, <b>1 crash</b><br>
<li>ES5: 12%<br>
</ul></details>

<details><summary>compat-table: ES6 8%, ES2016+ 2%, Intl 0%</summary><ul>
<li>ES6: 8%<br>
<li>ES2016: 6%<br>
<li>ES2017: 0%<br>
<li>ES2018: 11%<br>
<li>ES2019: 0%<br>
<li>ES2020: 0%<br>
<li>ES2021: 0%<br>
<li>ES2022: 0%<br>
<li>ES2023: 0%<br>
<li>ES2024: 0%<br>
<li>ES2025: 0%<br>
<li>Intl: 0%<br>
</ul></details>

💥 **1 crash during testing**
