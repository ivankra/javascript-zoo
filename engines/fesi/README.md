# FESI

JavaScript interpreter from late 1990s by Jean-Marc Lugrin, written in Java.

* Homepage:         [lugrin.ch/fesi](https://web.archive.org/web/20120523224913/http://www.lugrin.ch/fesi/)
* GitHub:           [ivankra/fesi](https://github.com/ivankra/fesi.git) <span class="shields"><img src="https://img.shields.io/github/stars/ivankra/fesi?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ivankra/fesi?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [23687](# "cloc --not_match_d='(?i)(test|gui)' --exclude-ext=html src")
* Language:         Java
* License:          LGPL-2.0-or-later
* Standard:         ES1
* Years:            1998-2003
* Runtime platform: Java
* Interpreter:      tree walker

## Notes

Forked by [YAJI](../yaji/README.md) in 2011.

## Conformance

<details><summary>ES1-ES5: 44%</summary><ul>
<li>ES1: 90%<pre>
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: Runtime error reverse only implemented for arrays [[Error loading file' Array.prototype.reverse.generic.js']]
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: Runtime error sort only implemented for arrays [[Error loading file' Array.prototype.sort.generic.js']]
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: failed
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: failed
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: Runtime error The function 'callee' is not defined for object '[object Object]' [[Error loading file' arguments.callee.js']]
<a href="../../conformance/es1/asi.js">asi.js</a>: Syntax error detected near line 71, column 5, after "++" [[Error loading file' asi.js']]
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
<a href="../../conformance/es1/bitwise.unsigned-shift.js">bitwise.unsigned-shift.js</a>: -12345 &gt;&gt;&gt; 0 != 4294954951 (got: -12345)
<a href="../../conformance/es1/conversions.ToBoolean.js">conversions.ToBoolean.js</a>: new Boolean(false) failed - expected it to be truthy
<a href="../../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: +Infinity failed; -Infinity failed; 2^32-1 failed; 2^32 failed; 2^31 failed; -2^31-1 failed
<a href="../../conformance/es1/conversions.ToNumber.js">conversions.ToNumber.js</a>: '' failed; '0xff' failed
<a href="../../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: 0.0001 failed; 1e21 failed; 1e-7 failed
<a href="../../conformance/es1/conversions.ToUint32.js">conversions.ToUint32.js</a>: +Infinity failed; -Infinity failed; 2^32-1 failed; 2^32 failed; 2^31 failed; -1 failed; -2^31 failed
<a href="../../conformance/es1/conversions.js">conversions.js</a>: 0 != ''; false != ''; 123 - '' != 123; 123 * '' != 0
<a href="../../conformance/es1/global.isFinite.js">global.isFinite.js</a>: isFinite(0/0) failed
<a href="../../conformance/es1/global.parseInt.radix.js">global.parseInt.radix.js</a>: Runtime error Only radix 2,8,10 and 16 supported [[Error loading file' global.parseInt.radix.js']]
<a href="../../conformance/es1/literals.string.hex.js">literals.string.hex.js</a>: failed
<a href="../../conformance/es1/this.js">this.js</a>: Syntax error detected near line 11, column 16, after "=" [[Error loading file' this.js']]
<a href="../../conformance/es1/void.js">void.js</a>: Exception in thread "main" java.lang.NullPointerException: value
<a href="../../conformance/es1/void.typeof.js">void.typeof.js</a>: Exception in thread "main" java.lang.NullPointerException: value
</pre></li>
<li>ES3: 3%</li>
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
