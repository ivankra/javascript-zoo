# SpiderMonkey

JavaScript engine of Firefox.

* Homepage:     https://spidermonkey.dev/
* Repository:   https://github.com/mozilla-firefox/firefox.git <span class="shields"><img src="https://img.shields.io/github/stars/mozilla-firefox/firefox?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/mozilla-firefox/firefox?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          1028123 (`cloc --not_match_d="(?i)(test|octane)" js/src`)
* Language:     C++
* License:      MPL-2.0
* Org:          Mozilla
* Standard:     ESnext
* Years:        1996-
* Ancestor:     [Mocha](mocha.md)
* Interpreter:  stack-based VM
* JIT:          2-tier JIT ([doc](https://firefox-source-docs.mozilla.org/js/index.html))
* GC:           generational GC, partially concurrent ([doc](https://firefox-source-docs.mozilla.org/js/gc.html))
* Regex engine: Irregexp, JIT-enabled (YARR in 1.8.1+ / Firefox 3.5+, Irregexp in Firefox 78+)

## History

* 1996: Nescape Navigator 2.0
  * Traces history all the way back to the first browser with JavaScript.
* 2008: TraceMonkey - tracing JIT compiler for hot loops
* 2010: JägerMonkey - method JIT
  * https://hacks.mozilla.org/2010/03/improving-javascript-performance-with-jagermonkey/
* 2012: IonMonkey - SSA-based optimizing compiler
* 2013: Baseline JIT - method JIT
  * Inline caching, collects type information
  * https://blog.mozilla.org/javascript/2013/04/05/the-baseline-compiler-has-landed/
* 2014: Irregexp engine from V8
  * https://hacks.mozilla.org/2020/06/a-new-regexp-engine-in-spidermonkey/
* 2019: Baseline Interpreter
  * https://hacks.mozilla.org/2019/08/the-baseline-interpreter-a-faster-js-interpreter-in-firefox-70/
  * https://github.com/mozilla-firefox/firefox/blob/main/js/src/vm/Interpreter.cpp
  * https://github.com/mozilla-firefox/firefox/blob/main/js/src/vm/Opcodes.h
* 2020: WarpMonkey

## Users

* Firefox, Thunderbird and other Mozilla apps
* [Elinks](https://github.com/rkd77/elinks) browser: can be configured to use SpiderMonkey, QuickJS or MuJS
* GNOME 3 and Cinnamon desktop environments
* [MongoDB](https://github.com/mongodb/mongo/tree/master/src/mongo/scripting), CouchDB, Riak
* [Acrobat Reader](https://opensource.adobe.com/dc-acrobat-sdk-docs/library/jsapiref/index.html) and other Adobe products ("AcroJS") - for evaluation of JavaScript code in .pdf. Stuck on old SpiderMonkey versions due to E4X.
* [Mozilla's list of FOSS users](https://web.archive.org/web/20210506104010/https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/FOSS)

## Runtimes

* [WinterJS](https://github.com/wasmerio/winterjs) <span class="shields"><img src="https://img.shields.io/github/stars/wasmerio/winterjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/wasmerio/winterjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - SpiderMonkey/hyper.rs-based runtime
* [spiderfire](https://github.com/Redfire75369/spiderfire) <span class="shields"><img src="https://img.shields.io/github/stars/Redfire75369/spiderfire?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Redfire75369/spiderfire?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* [Fastly Compute](https://github.com/fastly/js-compute-runtime) <span class="shields"><img src="https://img.shields.io/github/stars/fastly/js-compute-runtime?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/fastly/js-compute-runtime?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* [gjs](https://gitlab.gnome.org/GNOME/gjs) / [cjs](https://github.com/linuxmint/cjs) <span class="shields"><img src="https://img.shields.io/github/stars/linuxmint/cjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/linuxmint/cjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - GNOME 3 / Cinnamon's runtime

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 99%, Intl 100%</summary><ul>
<li>ES6: 98%<pre>
<a href="../features/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: InternalError: too much recursion
<a href="../features/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: InternalError: too much recursion
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 99%<pre>
<a href="../features/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js:10:28 SyntaxError: invalid property name in regular expression:
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 96%<pre>
<a href="../features/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 100%</li>
<li>Intl: 100%</li>
</ul></details>
