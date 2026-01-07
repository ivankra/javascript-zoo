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

<details><summary>ES1-ES5: 54%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/quanta.txt">Full log</a>.</li>
<li>ES1: 58%<pre>
<a href="../conformance/es1/Boolean.prototype.toString.js">Boolean.prototype.toString.js</a>: failed
<a href="../conformance/es1/Boolean.prototype.valueOf.js">Boolean.prototype.valueOf.js</a>: failed
<a href="../conformance/es1/Date.diff.js">Date.diff.js</a>: failed
<a href="../conformance/es1/Date.js">Date.js</a>: typeof Date() != 'string'; new Date(2000, 0, 1).getFullYear() != 2000; new Date(2000, 0, 1).getMonth() != 0; new Date(2000, 0, 1).getDate() != 1; new Date(0).getTime() != 0
<a href="../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: failed
<a href="../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: failed
<a href="../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: failed
<a href="../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: failed
<a href="../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: failed
<a href="../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: failed
<a href="../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: failed
...
</pre></li>
<li>ES3: 53%<pre>
<a href="../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: pop from object failed; pop single element from object failed
<a href="../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: push to object failed; push multiple to empty object failed
<a href="../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: shift from object failed; shift single element from object failed
<a href="../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: delete on object failed; insert on object failed; negative start on object failed
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: unshift on object failed; unshift multiple on object failed; unshift on empty object failed
<a href="../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: failed
<a href="../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: failed
<a href="../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: max() with 0 args failed; max() with NaN failed
<a href="../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: min() with 0 args failed; min() with NaN failed
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; negative number failed; NaN failed; zero failed; Infinity failed; small number failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+01'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+04'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+00'); (1.255).toExponential(2) != '1.25e+0', got '1.25e+00'
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: NaN failed; rounding failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: NaN failed; Infinity failed; small number exponential notation failed; zero failed; large number exponential notation failed
<a href="../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: failed
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: failed
...
</pre></li>
<li>ES5: 47%, <b>1 crash</b></li>
</ul></details>

<details><summary>compat-table: ES6 31%, ES2016+ 26%, Next 0%, Intl 54%</summary><ul>
<li>ES6: 31%, <b>9 crashes</b></li>
<li>ES2016: 30%</li>
<li>ES2017: 30%</li>
<li>ES2018: 21%</li>
<li>ES2019: 17%, <b>1 crash</b></li>
<li>ES2020: 19%</li>
<li>ES2021: 43%</li>
<li>ES2022: 44%</li>
<li>ES2023: 57%<pre>
<a href="../conformance/kangax-es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: failed
<a href="../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: failed
<a href="../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: failed
<a href="../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: failed
<a href="../conformance/kangax-es2023/hashbang.js">hashbang.js</a>: SyntaxError: Expected identifier after '#'
</pre></li>
<li>ES2024: 20%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 54%<pre>
<a href="../conformance/kangax-intl/Intl.Collator.new-instances.js">Intl.Collator.new-instances.js</a>: failed
<a href="../conformance/kangax-intl/Intl.Collator.prototype.resolvedOptions.js">Intl.Collator.prototype.resolvedOptions.js</a>: failed
<a href="../conformance/kangax-intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.new-instances.js">Intl.DateTimeFormat.new-instances.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.rejects-invalid-tags.js">Intl.DateTimeFormat.rejects-invalid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: failed
<a href="../conformance/kangax-intl/Intl.NumberFormat.new-instances.js">Intl.NumberFormat.new-instances.js</a>: failed
<a href="../conformance/kangax-intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: failed
<a href="../conformance/kangax-intl/Intl.prototype.js">Intl.prototype.js</a>: failed
<a href="../conformance/kangax-intl/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: failed
</pre></li>
</ul></details>

💥 **11 crashes during testing**
