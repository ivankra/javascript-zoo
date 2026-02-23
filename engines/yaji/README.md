# YAJI

Fork of FESI interpreter with ES5 support.

* Repository:       [neades/yaji-ecmascript-interpreter](https://github.com/neades/yaji-ecmascript-interpreter.git) <span class="shields"><img src="https://img.shields.io/github/stars/neades/yaji-ecmascript-interpreter?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/neades/yaji-ecmascript-interpreter?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [41114](# "cloc --not_match_d='(?i)(test|gui)' yaji-ecmascript-interpreter/src")
* Language:         Java
* License:          LGPL-3.0-only
* Standard:         ES5
* Years:            2011-2012
* Ancestor:         [FESI](../fesi/README.md)
* Runtime platform: Java
* Interpreter:      tree walker

## History

> We have created this fork as we are heavily dependent of FESI, it would be difficult for us to replace this with another interpreter such as Rhino. To be honest we would recommend you use Rhino unless you have a good reason to use YAJI such as wanting to use LGPL rather than the dual licensing of Rhino (or you just fancy writing interpreters!).
>
> As development of FESI appears to have ceased (the last release was 29-Sep-2003), the best way for us to bring our core engine up to date was to do it ourselves, and as the code is LGPL, the best way of doing that was to create this Open Source project.

## Conformance

<details><summary>ES1-ES5: 93%</summary><ul>
<li>ES1: 98%<pre>
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: failed
<a href="../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
<a href="../conformance/es1/numbers.double.js">numbers.double.js</a>: failed
</pre></li>
<li>ES3: 91%<pre>
<a href="../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: Syntax error detected Encountered "function" at line 54, column 3. [[Error loading file' Function.prototype.apply.js']]
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: zero failed
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: ''.split(/.?/).length !== 0
<a href="../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: Runtime error The function 'substr' is not defined for object 'abcdefgh' [[Error loading file' annex-b.String.prototype.substr.js']]
<a href="../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: wrong exception for invalid token
<a href="../conformance/es3/labelled.break.js">labelled.break.js</a>: labelled break from block failed
<a href="../conformance/es3/nested-functions.eval.js">nested-functions.eval.js</a>: Syntax error detected Encountered "function" at line 10, column 3. [[Error loading file' nested-functions.eval.js']]
<a href="../conformance/es3/nested-functions.js">nested-functions.js</a>: Syntax error detected Encountered "function" at line 10, column 3. [[Error loading file' nested-functions.js']]
<a href="../conformance/es3/regex.backref.js">regex.backref.js</a>: backref for a group that hasn't captured failed
<a href="../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: Runtime error 'null' cannot be converted to Object [[Error loading file' regex.negative-lookahead.js']]
</pre></li>
<li>ES5: 84%<pre>
<a href="../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: escape sequences failed
<a href="../conformance/es5/Object.getOwnPropertyNames.js">Object.getOwnPropertyNames.js</a>: basic property names failed
<a href="../conformance/es5/Object.keys.js">Object.keys.js</a>: basic keys failed
<a href="../conformance/es5/debugger.js">debugger.js</a>: [[Error loading file' debugger.js']]
<a href="../conformance/es5/strict.js">strict.js</a>: failed
<a href="../conformance/es5/strict.no-arguments-caller.js">strict.no-arguments-caller.js</a>: Runtime error GetcallerThrower not valid in strict mode [[Error loading file' strict.no-arguments-caller.js']]
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: Syntax error detected Encountered "function" at line 10, column 3. [[Error loading file' strict.this-primitive-not-coerced-in-accessors.js']]
<a href="../conformance/es5/strict.unmapped-arguments.js">strict.unmapped-arguments.js</a>: failed
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 2%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 1%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 5%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
