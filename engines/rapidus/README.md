# Rapidus

JavaScript engine written in Rust, aiming at ES5.

* Repository:  [maekawatoshiki/rapidus](https://github.com/maekawatoshiki/rapidus.git) <span class="shields"><img src="https://img.shields.io/github/stars/maekawatoshiki/rapidus?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/maekawatoshiki/rapidus?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [10810](# "cloc */src")
* Language:    Rust
* License:     MIT
* Standard:    ES5 (partial)
* Years:       2018-2021
* Interpreter: stack-based VM ([vm.rs](https://github.com/maekawatoshiki/rapidus/blob/main/core/src/vm/vm.rs))

## Links

* [Live demo (WASM)](https://maekawatoshiki.github.io/rapidus)

## Conformance

<details><summary>ES1-ES5: 21%</summary><ul>
<li>ES1: 31%</li>
<li>ES3: 14%, <b>1 crash</b></li>
<li>ES5: 12%</li>
</ul></details>

<details><summary>compat-table: ES6 8%, ES2016+ 2%, Next 0%, Intl 0%</summary><ul>
<li>ES6: 8%</li>
<li>ES2016: 6%</li>
<li>ES2017: 0%</li>
<li>ES2018: 11%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 0%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 0%</li>
</ul></details>

💥 **1 crash during testing**
