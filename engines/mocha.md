# Mocha

The very first JavaScript engine that defined early JavaScript language (JS1.0/1.1), shipped in Netscape Navigator 2.0-3.0.

* Repository:  https://github.com/doodlewind/mocha1995.git <span class="shields"><img src="https://img.shields.io/github/stars/doodlewind/mocha1995?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/doodlewind/mocha1995?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * Based on [ns302](https://archive.org/details/netscape-communicator-3-0-2-source), ported to modern toolchain.
* LOC:         13728 (ns302)
* Language:    C++
* License:     Proprietary
* Standard:    JS1.1 (≈ES1)
* Years:       1995-1996
* Parser:      recursive descent, directly emits bytecode ([mo_parse.c](https://github.com/doodlewind/mocha1995/blob/main/src/mo_parse.c), 953 LOC)
* Interpreter: stack-based VM ([mocha.c](https://github.com/doodlewind/mocha1995/blob/main/src/mocha.c))
* GC:          reference counting

## History

* May 1995: prototyped during a 10-day sprint.
* Aug 1995: feature freeze for Netscape Navigator 2.0, constrained JS1.0 to feature set of what was working at that time, incomplete relative to envisioned language design.
* Sep 1995: Netscape Navigator 2.0b1 - first browser to support JavaScript (marketed as LiveScript at the time), JavaScript 1.0
* Dec 1995: Sun/Netscape press release announcing JavaScript
* Aug 1996: Netscape Navigator 3.0 came out - JavaScript 1.1 version, completed initial development of JavaScript.

## Links

* Allen Wirfs-Brock and Brendan Eich. 2020. [JavaScript: the first 20 years](https://dl.acm.org/doi/pdf/10.1145/3386327). Proc. ACM Program. Lang. 4, HOPL, Article 77.
* [Netscape Communicator 3.0.2 Source Tree](https://archive.org/details/netscape-communicator-3-0-2-source) (archive.org)
* https://oldweb.today/?browser=ns3-mac ([github](https://github.com/oldweb-today/netcapsule))
* https://mocha1995.js.org/

## Conformance

<details><summary>ES1-ES5: 36%</summary><ul>
<li>ES1: 74%<pre>
<a href="../features/es1/Array.js">Array.js</a>: failed
<a href="../features/es1/Date.js">Date.js</a>: failed
<a href="../features/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: failed
<a href="../features/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: failed
<a href="../features/es1/Date.prototype.setFullYear.js">Date.prototype.setFullYear.js</a>: failed
<a href="../features/es1/Date.prototype.setMilliseconds.js">Date.prototype.setMilliseconds.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCFullYear.js">Date.prototype.setUTCFullYear.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCHours.js">Date.prototype.setUTCHours.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCMilliseconds.js">Date.prototype.setUTCMilliseconds.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCMinutes.js">Date.prototype.setUTCMinutes.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCMonth.js">Date.prototype.setUTCMonth.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCSeconds.js">Date.prototype.setUTCSeconds.js</a>: failed
...
</pre></li>
<li>ES3: 3%<br>
<li>ES5: 1%<br>
<li><a href="../features/results/mocha.txt">Full results</a></li>
</ul></details>
