# DscriptCPP

[DMDScript](dmdscript.md) version implemented in C++.

* Homepage:         https://www.digitalmars.com/dscript/cppscript.html
* Repository:       https://github.com/DigitalMars/DscriptCPP.git <span class="shields"><img src="https://img.shields.io/github/stars/DigitalMars/DscriptCPP?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/DigitalMars/DscriptCPP?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              43988 (`cloc src`)
* Language:         C++
* License:          BSL-1.0
* Org:              Digital Mars
* Standard:         ES3
* Years:            2000
* Runtime platform: native (Win32/Linux i386)
* Interpreter:      register-based VM ([opcodes.c](https://github.com/DigitalMars/DscriptCPP/blob/main/src/dscript/opcodes.c))

## Quirks

* Hacky non-portable x86-only C++ implementation: gccbitops.h, Gcx::fullcollectshell(), GC wants to scan stack, vtable hack.
* Can't parse object literals with quoted keys: `{"a": ...}`.

## Links

* https://news.ycombinator.com/item?id=45509636

## Conformance

<details><summary>ES1-ES5: 0%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/dscriptcpp.txt">Full log</a>.</li>
<li>ES1: 0%</li>
<li>ES3: 0%</li>
<li>ES5: 0%</li>
</ul></details>

<details><summary>compat-table: ES6 0%, ES2016+ 0%, Next 0%, Intl 0%</summary><ul>
<li>ES6: 0%</li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 0%</li>
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
