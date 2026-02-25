# 42tiny-js

Fork of [tiny-js](../tiny-js/README.md) with more features.

* Repository:  [gfwilliams/tiny-js](https://github.com/gfwilliams/tiny-js.git) <span class="shields"><img src="https://img.shields.io/github/stars/gfwilliams/tiny-js?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/gfwilliams/tiny-js?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* Branch:      [42tiny-js](https://github.com/gfwilliams/tiny-js/tree/42tiny-js)
* LOC:         [9209](# "cloc *.cpp *.h")
* Language:    C++
* License:     MIT
* Standard:    no (can't run ES1)
* Years:       2010-2014
* Ancestor:    [tiny-js](../tiny-js/README.md)
* Interpreter: interprets from source

## Conformance

<details><summary>ES1-ES5: 55%</summary><ul>
<li>ES1: 62%<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: &gt; es1/Array.js: Array.length failed &gt; es1/Array.js: Array(len) failed &gt; es1/Array.js: failed
<a href="../../conformance/es1/Array.length.assignment.js">Array.length.assignment.js</a>: &gt; es1/Array.length.assignment.js: length truncation failed &gt; es1/Array.length.assignment.js: failed
<a href="../../conformance/es1/Array.length.js">Array.length.js</a>: &gt; es1/Array.length.js: length assignment failed &gt; es1/Array.length.js: failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: &gt; es1/Array.prototype.join.generic.js: failed
<a href="../../conformance/es1/Array.prototype.join.js">Array.prototype.join.js</a>: &gt; es1/Array.prototype.join.js: join() without separator failed &gt; es1/Array.prototype.join.js: failed
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: ReferenceError: reverse is undefined at Line:13 Column:12
<a href="../../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: ReferenceError: reverse is undefined at Line:9 Column:20
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: ReferenceError: sort is undefined at Line:14 Column:9
<a href="../../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: ReferenceError: sort is undefined at Line:9 Column:17
<a href="../../conformance/es1/Array.prototype.toString.js">Array.prototype.toString.js</a>: &gt; es1/Array.prototype.toString.js: numeric array toString failed &gt; es1/Array.prototype.toString.js: string array toString failed &gt; es1/Array.prototype.toString.js: failed
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: TypeError: Date is not a constructor at Line:13 Column:18
<a href="../../conformance/es1/Date.js">Date.js</a>: ReferenceError: Date is undefined at Line:9 Column:13
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: ReferenceError: Date is undefined at Line:6 Column:9
<a href="../../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: TypeError: Date is not a constructor at Line:6 Column:17
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: TypeError: Date is not a constructor at Line:6 Column:17
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: TypeError: Date is not a constructor at Line:6 Column:17
<a href="../../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: TypeError: Date is not a constructor at Line:6 Column:17
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: TypeError: Date is not a constructor at Line:6 Column:17
<a href="../../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: TypeError: Date is not a constructor at Line:6 Column:17
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: TypeError: Date is not a constructor at Line:6 Column:17
<a href="../../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: TypeError: Date is not a constructor at Line:6 Column:17
...
</pre></li>
<li>ES3: 59%<pre>
<a href="../../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: ReferenceError: concat is undefined at Line:14 Column:24
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: ReferenceError: pop is undefined at Line:13 Column:34
<a href="../../conformance/es3/Array.prototype.pop.js">Array.prototype.pop.js</a>: ReferenceError: pop is undefined at Line:12 Column:21
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: ReferenceError: push is undefined at Line:12 Column:32
<a href="../../conformance/es3/Array.prototype.push.js">Array.prototype.push.js</a>: ReferenceError: push is undefined at Line:11 Column:19
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: ReferenceError: shift is undefined at Line:13 Column:37
<a href="../../conformance/es3/Array.prototype.shift.js">Array.prototype.shift.js</a>: ReferenceError: shift is undefined at Line:12 Column:24
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: ReferenceError: slice is undefined at Line:14 Column:36
<a href="../../conformance/es3/Array.prototype.slice.js">Array.prototype.slice.js</a>: ReferenceError: slice is undefined at Line:13 Column:23
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: ReferenceError: splice is undefined at Line:14 Column:38
<a href="../../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: ReferenceError: splice is undefined at Line:13 Column:25
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: ReferenceError: toLocaleString is undefined at Line:12 Column:27
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: ReferenceError: unshift is undefined at Line:12 Column:35
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: ReferenceError: unshift is undefined at Line:11 Column:22
<a href="../../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: ReferenceError: unshift is undefined at Line:9 Column:25
<a href="../../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: TypeError: Date is not a constructor at Line:6 Column:18
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: TypeError: Date is not a constructor at Line:10 Column:17
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: TypeError: Date is not a constructor at Line:10 Column:17
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: TypeError: Date is not a constructor at Line:10 Column:17
<a href="../../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: TypeError: Date is not a constructor at Line:6 Column:18
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: TypeError: toExponential is not a function at Line:11 Column:20
...
</pre></li>
<li>ES5: 31%</li>
</ul></details>

<details><summary>compat-table: ES6 9%, ES2016+ 7%, Next 0%, Intl 4%</summary><ul>
<li>ES6: 9%</li>
<li>ES2016: 5%</li>
<li>ES2017: 13%</li>
<li>ES2018: 0%</li>
<li>ES2019: 29%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 10%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4%</li>
<li>ES2025: 3%</li>
<li>Next: 0%</li>
<li>Intl: 4%</li>
</ul></details>
