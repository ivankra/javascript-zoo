# rpython-langjs

JavaScript interpreter for PyPy.

* Repository:       https://github.com/progval/rpython-langjs.git <span class="shields"><img src="https://img.shields.io/github/stars/progval/rpython-langjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/progval/rpython-langjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              7189 (`cloc py-js.py js`)
* Language:         Python
* License:          Missing
* Standard:         ES3
* Years:            2009-2013
* Runtime platform: Python (PyPy 2.x's RPython)
* Interpreter:      stack-based VM

Original project: https://web.archive.org/web/20171028201832/https://bitbucket.org/pypy/lang-js/

## Conformance

<details><summary>ES1-ES5: 47%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/rpython-langjs.txt">Full log</a>.</li>
<li>ES1: 74%<pre>
<a href="../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: reverse returns this failed
<a href="../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: sort with comparefn failed; reverse comparefn failed
<a href="../conformance/es1/Date.diff.js">Date.diff.js</a>: failed
<a href="../conformance/es1/Date.js">Date.js</a>: typeof Date() != 'string'; new Date(2000, 0, 1).getFullYear() != 2000; new Date(2000, 0, 1).getMonth() != 0; new Date(2000, 0, 1).getDate() != 1; new Date(0).getTime() != 0
<a href="../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: failed
<a href="../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: failed
<a href="../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: failed
<a href="../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: failed
<a href="../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: failed
<a href="../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: raise NotImplementedError() NotImplementedError
<a href="../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: raise NotImplementedError() NotImplementedError
<a href="../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: raise NotImplementedError() NotImplementedError
<a href="../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: raise NotImplementedError() NotImplementedError
<a href="../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: raise NotImplementedError() NotImplementedError
<a href="../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: raise NotImplementedError() NotImplementedError
<a href="../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: raise NotImplementedError() NotImplementedError
<a href="../conformance/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: raise NotImplementedError() NotImplementedError
<a href="../conformance/es1/Date.prototype.setTime.js">Date.prototype.setTime.js</a>: ERROR in Date.prototype.setTime.js: TypeError: %s is not an instnace of Date
...
</pre></li>
<li>ES3: 20%<br>
<li>ES5: 27%<br>
</ul></details>
