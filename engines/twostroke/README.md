# twostroke

JavaScript interpreter written in Ruby.

* Homepage:         [news.ycombinator.com/item?id=3460224](https://news.ycombinator.com/item?id=3460224)
* Repository:       [haileys/twostroke](https://github.com/haileys/twostroke.git) <span class="shields"><img src="https://img.shields.io/github/stars/haileys/twostroke?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/haileys/twostroke?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              4723 (`cloc *.rb lib`)
* Language:         Ruby
* License:          MIT
* Standard:         ES3
* Years:            2011-2012
* Runtime platform: Ruby
* Interpreter:      stack-based VM

## Conformance

<details><summary>ES1-ES5: 57%</summary><ul>
<li>ES1: 70%<pre>
<a href="../conformance/es1/Array.js">Array.js</a>: Array.length failed
<a href="../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: Array.prototype.constructor failed
<a href="../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es1/Boolean.js">Boolean.js</a>: Boolean() failed
<a href="../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: Boolean.prototype.constructor failed
<a href="../conformance/es1/Date.diff.js">Date.diff.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.js">Date.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: failed
<a href="../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.setDate.js">Date.prototype.setDate.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.prototype.setFullYear.js">Date.prototype.setFullYear.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.prototype.setHours.js">Date.prototype.setHours.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.prototype.setMilliseconds.js">Date.prototype.setMilliseconds.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
<a href="../conformance/es1/Date.prototype.setMinutes.js">Date.prototype.setMinutes.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/date.rb:21:in `local': mon out of range (ArgumentError)
...
</pre></li>
<li>ES3: 58%<pre>
<a href="../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: timeout
<a href="../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: unshift multiple elements failed; unshift on empty array failed
<a href="../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/vm_frame.rb:53:in `throw': uncaught throw :exception (UncaughtThrowError) throw :exception, @exception if ex_stack.empty?
<a href="../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: failed
<a href="../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: failed
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/number.rb:30:in `log': Numerical argument is out of domain - log (Math::DomainError)
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/number.rb:30:in `log': Numerical argument is out of domain - log (Math::DomainError)
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: /dist/twostroke-dist/lib/twostroke/runtime/lib/number.rb:69:in `floor': NaN (FloatDomainError) toPrecision(5) fixed notation failed
<a href="../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: inherited property should be false failed
...
</pre></li>
<li>ES5: 20%</li>
</ul></details>
