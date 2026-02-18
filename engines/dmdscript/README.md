# DMDScript

ECMAScript implementation by Digital Mars written in D.

* Homepage:    https://www.digitalmars.com/dscript/
* Repository:  https://github.com/DigitalMars/DMDScript.git <span class="shields"><img src="https://img.shields.io/github/stars/DigitalMars/DMDScript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/DigitalMars/DMDScript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         18013 (`cloc engine`)
* Language:    D
* License:     BSL-1.0 (Boost Software License 1.0)
* Org:         Digital Mars
* Standard:    ES3
* Years:       2002-
* Ancestor:    [DscriptCPP](../dscriptcpp/README.md) (original C++ version)
* Interpreter: register-based VM ([opcodes.d](https://github.com/DigitalMars/DMDScript/blob/master/engine/source/dmdscript/opcodes.d))

## Shell

No console object.

Shell built-ins ([dglobal.d](https://github.com/DigitalMars/DMDScript/blob/master/engine/source/dmdscript/dglobal.d#L757), [dglobal.c](https://github.com/DigitalMars/DscriptCPP/blob/main/src/dscript/dglobal.c#L1147)):
  * `print(s)`: print value without newline
  * `println(s)`
  * `readln()`: "" on EOF
  * `getenv(s)`
  * `println([ScriptEngine(), ScriptEngineBuildVersion(), ScriptEngineMajorVersion(), ScriptEngineMinorVersion()])` -> `DMDScript,1,5,5`

## Conformance

<details><summary>ES1-ES5: 74%</summary><ul>
<li>ES1: 93%<pre>
<a href="../conformance/es1/Date.js">Date.js</a>: typeof Date() != 'string'
<a href="../conformance/es1/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: failed
<a href="../conformance/es1/Date.prototype.toString.js">Date.prototype.toString.js</a>: failed
<a href="../conformance/es1/Date.prototype.toUTCString.js">Date.prototype.toUTCString.js</a>: failed
<a href="../conformance/es1/Function.prototype.toString.js">Function.prototype.toString.js</a>: toString type failed; Function toString failed
<a href="../conformance/es1/String.js">String.js</a>: 15.5.1.1 String(value) failed; 15.5.1.2 String() failed
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: non-compliant, expected to return 100 instead of 2000
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: failed
<a href="../conformance/es1/asi.js">asi.js</a>: dmdscript.script.ScriptException@engine/source/dmdscript/script.d(66): can't Put(0, 10) to a primitive Number
<a href="../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
<a href="../conformance/es1/new.typeof.js">new.typeof.js</a>: typeof String('x') != 'string'
<a href="../conformance/es1/return.typeof.js">return.typeof.js</a>: return string failed
<a href="../conformance/es1/types.js">types.js</a>: typeof '' != 'string'
<a href="../conformance/es1/var.typeof.js">var.typeof.js</a>: string var typeof failed
</pre></li>
<li>ES3: 80%, <b>1 crash</b><pre>
<a href="../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: basic toLocaleString failed; null/missing elements failed
<a href="../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: failed
<a href="../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../conformance/es3/Error.prototype.toString.js">Error.prototype.toString.js</a>: failed
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: small number failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: failed
<a href="../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: failed
<a href="../conformance/es3/RegExp.prototype.toString.js">RegExp.prototype.toString.js</a>: type failed
<a href="../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: crashed (signal 11); spec example failed
<a href="../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: $$ failed; combined replacements failed
<a href="../conformance/es3/String.prototype.replace.regex.js">String.prototype.replace.regex.js</a>: global regex replace failed; replace all occurrences failed
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: undead.regexp.RegExpException@/root/.dub/packages/undead/1.2.0/undead/src/undead/regexp.d(170): *+? not allowed in atom
<a href="../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: undead.regexp.RegExpException@/root/.dub/packages/undead/1.2.0/undead/src/undead/regexp.d(170): *+? not allowed in atom
<a href="../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: no exception for undeclared variable
<a href="../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: no exception for in number
<a href="../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: std.utf.UTFException@engine/source/dmdscript/utf.d(32): encoding a surrogate code point in UTF-8 (at index 56320)
<a href="../conformance/es3/in.js">in.js</a>: length in array failed
...
</pre></li>
<li>ES5: 9%</li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 2%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 1%, <b>3 crashes</b></li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 0%</li>
<li>ES2019: 12%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **4 crashes during testing**
