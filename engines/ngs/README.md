# NGS

An independent implementation of JavaScript from late 1990s.

* Homepage:    https://web.archive.org/web/20000817004334/http://www.ngs.fi/js/
* Repository:  https://github.com/markkurossi/js.git <span class="shields"><img src="https://img.shields.io/github/stars/markkurossi/js?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/markkurossi/js?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* Sources:     https://web.archive.org/web/20070705224001/http://www.njs-javascript.org/js-0.2.5.tar.gz
* LOC:         36390 (`cloc --not_match_d="(?i)(test)" src`)
* Language:    C
* License:     LGPL-2.0-only
* Standard:    JS1.4 (≈ES3)
* Years:       1998-1999
* Interpreter: stack-based VM

Shipped as ngs-js package in early Debian releases.

Last released version 0.2.5.

There was a short-lived fork NJS:
  * https://web.archive.org/web/20080509072332/http://www.njs-javascript.org/
  * https://web.archive.org/web/20080517015930/http://www.bbassett.net/njs/
  * https://sourceforge.net/projects/njs/
  * https://sourceforge.net/code-snapshots/cvs/n/nj/njs.zip

## Conformance

<details><summary>ES1-ES5: 36%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../../conformance/results/ngs.txt">Full log</a>.</li>
<li>ES1: 58%, <b>1 crash</b><pre>
<a href="../conformance/es1/Array.js">Array.js</a>: crashed (signal 11)
<a href="../conformance/es1/Array.length.assignment.js">Array.length.assignment.js</a>: ngs: evaluation of file `Array.length.assignment.js' failed:
<a href="../conformance/es1/Array.length.js">Array.length.js</a>: ngs: evaluation of file `Array.length.js' failed:
<a href="../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: Array.prototype.constructor failed; array instance constructor failed
<a href="../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: ngs: evaluation of file `Array.prototype.join.generic.js' failed:
<a href="../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: ngs: evaluation of file `Array.prototype.reverse.generic.js' failed:
<a href="../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: reverse returns this failed
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: ngs: evaluation of file `Array.prototype.sort.generic.js' failed:
<a href="../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: sort returns this failed
<a href="../conformance/es1/Boolean.js">Boolean.js</a>: new Boolean(true) failed; new Boolean() failed
<a href="../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: Boolean.prototype.constructor failed; boolean instance constructor failed
<a href="../conformance/es1/Date.diff.js">Date.diff.js</a>: failed
<a href="../conformance/es1/Date.js">Date.js</a>: typeof new Date() != 'object'; ngs: evaluation of file `Date.js' failed:
<a href="../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: failed
<a href="../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: ngs: evaluation of file `Date.prototype.getFullYear.js' failed:
<a href="../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: ngs: evaluation of file `Date.prototype.getHours.js' failed:
<a href="../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: ngs: evaluation of file `Date.prototype.getMilliseconds.js' failed:
<a href="../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: ngs: evaluation of file `Date.prototype.getMinutes.js' failed:
<a href="../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: ngs: evaluation of file `Date.prototype.getSeconds.js' failed:
<a href="../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: ngs: evaluation of file `Date.prototype.getTimezoneOffset.js' failed:
<a href="../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: ngs: evaluation of file `Date.prototype.getUTCDate.js' failed:
...
</pre></li>
<li>ES3: 25%</li>
<li>ES5: 1%</li>
</ul></details>

💥 **1 crash during testing**
