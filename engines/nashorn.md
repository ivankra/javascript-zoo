# Nashorn

JavaScript engine of JDK 8-14 (2014-2020), based on invokedynamic JVM opcode.

* Homepage:         https://openjdk.org/projects/nashorn/
* Repository:       https://github.com/openjdk/nashorn.git <span class="shields"><img src="https://img.shields.io/github/stars/openjdk/nashorn?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/openjdk/nashorn?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              89134 (`cloc src/org.openjdk.nashorn`)
* Language:         Java
* License:          GPL-2.0-only WITH Classpath-exception-2.0
* Org:              Oracle
* Standard:         ES6 (partial)
* Years:            2011-
* Runtime platform: Java
* JIT:              via JVM
* Regex engine:     [joni](https://github.com/jruby/joni) (JRuby's Java port of Oniguruma)

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/nashorn.txt">Full log</a>.</li>
<li>ES1: 100%</li>
<li>ES3: 98%<pre>
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../conformance/es3/String.prototype.search.js">String.prototype.search.js</a>: search ignores lastIndex failed
<a href="../conformance/es3/regex.backref.js">regex.backref.js</a>: backref for a group that hasn't captured failed
</pre></li>
<li>ES5: 96%<pre>
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: failed: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 30%, ES2016+ 3%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 30%<br>
<li>ES2016: 0%<br>
<li>ES2017: 4%<br>
<li>ES2018: 0%<br>
<li>ES2019: 12%<br>
<li>ES2020: 0%<br>
<li>ES2021: 0%<br>
<li>ES2022: 4%<br>
<li>ES2023: 20%<br>
<li>ES2024: 0%<br>
<li>ES2025: 0%<br>
<li>Next: 6%<br>
<li>Intl: 25%<br>
</ul></details>
