# echosoar/jsi

JavaScript interpreter written in Rust with QuickJS-inspired bytecode.

* Repository: https://github.com/echosoar/jsi.git <span class="shields"><img src="https://img.shields.io/github/stars/echosoar/jsi?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/echosoar/jsi?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:        5945 (`cloc src`)
* Language:   Rust
* License:    MIT
* Standard:   no (can't run ES1)
* Years:      2022-

## Conformance

<details><summary>ES1-ES5: 19%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/echosoar-jsi.txt">Full log</a>.</li>
<li>ES1: 25%</li>
<li>ES3: 15%, <b>2 crashes</b></li>
<li>ES5: 9%</li>
</ul></details>

💥 **2 crashes during testing**
