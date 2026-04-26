# twostroke

JavaScript interpreter written in Ruby.

* Repository:       [haileys/twostroke](https://github.com/haileys/twostroke.git) <span class="shields"><img src="https://img.shields.io/github/stars/haileys/twostroke?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/haileys/twostroke?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [4723](# "cloc *.rb lib")
* Language:         Ruby
* License:          MIT
* Standard:         ES3
* Years:            2011-2012
* Runtime platform: Ruby
* Interpreter:      stack-based VM

## Links

* [news.ycombinator.com/item?id=3460224](https://news.ycombinator.com/item?id=3460224)

## Conformance

<details><summary>ES1-ES5: 57%</summary><ul>
<li>Tested version: <a href="https://github.com/charliesome/twostroke/commit/3e6d5366bad603e987f78027d472255707ec26fa">2012-05-30</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/twostroke.json">json</a>)</li>
<li>ES1: 69.7% (138/198)<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: FAIL: Array.length failed
<a href="../../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: FAIL: Array.prototype.constructor failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: FAIL: Boolean() failed
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: FAIL: Boolean.prototype.constructor failed
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
<a href="../../conformance/es1/Date.js">Date.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
<a href="../../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
<a href="../../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
<a href="../../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
<a href="../../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.setDate.js">Date.prototype.setDate.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
<a href="../../conformance/es1/Date.prototype.setFullYear.js">Date.prototype.setFullYear.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
<a href="../../conformance/es1/Date.prototype.setHours.js">Date.prototype.setHours.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
<a href="../../conformance/es1/Date.prototype.setMilliseconds.js">Date.prototype.setMilliseconds.js</a>: FAIL: date.rb:21:in `local': mon out of range (ArgumentError); date.rb:21:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:144:in `block in newcall'; object.rb:49:in `constru...
...
</pre></li>
<li>ES3: 58.1% (86/148)<pre>
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: FAIL: twostroke-dist/repl.rb: failed to allocate memory (NoMemoryError)
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: FAIL: unshift multiple elements failed; unshift on empty array failed
<a href="../../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: FAIL: vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError); vm_frame.rb:53:in `execute'; vm.rb:16:in `execute'
<a href="../../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: FAIL
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: FAIL
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: FAIL
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: number.rb:30:in `log': Numerical argument is out of domain - log (Math::DomainError); number.rb:30:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:134:in `methcall'; v...
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: number.rb:30:in `log': Numerical argument is out of domain - log (Math::DomainError); number.rb:30:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:134:in `methcall'; v...
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: FAIL: number.rb:69:in `floor': NaN (FloatDomainError); number.rb:69:in `block (2 levels) in &lt;module:Runtime&gt;'; function.rb:80:in `call'; vm_frame.rb:134:in `methcall'; vm_frame.rb:48:in `block in execute'; ...
...
</pre></li>
<li>ES5: 20.3% (15/74)</li>
</ul></details>

<details><summary>compat-table: ES6 2%, ES2016+ 6%, Next 0%, Intl 4%</summary><ul>
<li>Tested version: <a href="https://github.com/charliesome/twostroke/commit/3e6d5366bad603e987f78027d472255707ec26fa">2012-05-30</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/twostroke.json">json</a>)</li>
<li>ES5: 34.9%</li>
<li>ES6: 1.6%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 8.4%</li>
<li>ES2019: 12.5%</li>
<li>ES2020: 0%</li>
<li>ES2021: 7.1%</li>
<li>ES2022: 8.9%</li>
<li>ES2023: 0%</li>
<li>ES2024: 8.2%</li>
<li>ES2025: 5.3%</li>
<li>Next: 0%</li>
<li>Intl: 3.6%</li>
</ul></details>
