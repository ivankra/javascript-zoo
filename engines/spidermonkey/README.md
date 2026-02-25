# SpiderMonkey

JavaScript engine of Firefox.

* Homepage:     [spidermonkey.dev](https://spidermonkey.dev/)
* Repository:   [mozilla-firefox/firefox](https://github.com/mozilla-firefox/firefox.git) <span class="shields"><img src="https://img.shields.io/github/stars/mozilla-firefox/firefox?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/mozilla-firefox/firefox?label=&style=flat-square" alt="Last commit" title="Last commit"></span> (engine in [js/src/](https://github.com/mozilla-firefox/firefox/tree/main/js/src))
* LOC:          [1028123](# "cloc --not_match_d='(?i)(test|octane)' js/src")
* Language:     C++
* License:      MPL-2.0
* Org:          Mozilla
* Standard:     ESnext
* Years:        1996-
* Ancestor:     [Mocha](../mocha/README.md)
* Interpreter:  stack-based VM
* JIT:          2-tier JIT ([doc](https://firefox-source-docs.mozilla.org/js/index.html))
* GC:           generational GC, partially concurrent ([doc](https://firefox-source-docs.mozilla.org/js/gc.html))
* Regex engine: Irregexp, JIT-enabled (YARR in 1.8.1+ / Firefox 3.5+, Irregexp in Firefox 78+)

## History

* 1995: Netscape Navigator 2.0 launched with [Mocha](../mocha/README.md)
* 1996: Mocha rewritten in C for Netscape 4.0. The new engine dubbed SpiderMonkey or JavaScript-C.
* 2008: TraceMonkey - tracing JIT compiler for hot loops
* 2010: [JägerMonkey](https://hacks.mozilla.org/2010/03/improving-javascript-performance-with-jagermonkey/) - method JIT
* 2012: IonMonkey - SSA-based optimizing compiler
* 2013: [Baseline JIT](https://blog.mozilla.org/javascript/2013/04/05/the-baseline-compiler-has-landed/) - method JIT, inline caching, collects type information
* 2014: [Irregexp engine from V8](https://hacks.mozilla.org/2020/06/a-new-regexp-engine-in-spidermonkey/)
* 2019: [Baseline Interpreter](https://hacks.mozilla.org/2019/08/the-baseline-interpreter-a-faster-js-interpreter-in-firefox-70/) ([Interpreter.cpp](https://github.com/mozilla-firefox/firefox/blob/main/js/src/vm/Interpreter.cpp))
* 2020: [WarpBuilder](https://hacks.mozilla.org/2020/11/warp-improved-js-performance-in-firefox-83/)

## Users

* Browsers:
  * Firefox
  * [Elinks](https://github.com/rkd77/elinks) - configurable to use SpiderMonkey, QuickJS or MuJS
* Runtimes:
  * [WinterJS](https://github.com/wasmerio/winterjs) <span class="shields"><img src="https://img.shields.io/github/stars/wasmerio/winterjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/wasmerio/winterjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - SpiderMonkey/hyper.rs-based runtime
  * [spiderfire](https://github.com/Redfire75369/spiderfire) <span class="shields"><img src="https://img.shields.io/github/stars/Redfire75369/spiderfire?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Redfire75369/spiderfire?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * [Fastly Compute](https://github.com/fastly/js-compute-runtime) <span class="shields"><img src="https://img.shields.io/github/stars/fastly/js-compute-runtime?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/fastly/js-compute-runtime?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * [gjs](https://gitlab.gnome.org/GNOME/gjs) / [cjs](https://github.com/linuxmint/cjs) <span class="shields"><img src="https://img.shields.io/github/stars/linuxmint/cjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/linuxmint/cjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - GNOME 3 / Cinnamon desktop environment's JavaScript runtime
  * [StarlingMonkey](../starlingmonkey/README.md) - SpiderMonkey-based JavaScript runtime compiled to WebAssembly
* Thunderbird and other Mozilla apps
* [MongoDB](https://github.com/mongodb/mongo/tree/master/src/mongo/scripting), CouchDB, Riak
* [Acrobat Reader](https://opensource.adobe.com/dc-acrobat-sdk-docs/library/jsapiref/index.html) and other Adobe products ("AcroJS") - for evaluation of JavaScript code in .pdf. Stuck on old SpiderMonkey versions due to E4X.
* [Mozilla's list of FOSS users](https://web.archive.org/web/20210506104010/https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/FOSS)

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 100%, Next 36%, Intl 100%</summary><ul>
<li>ES6: 98%<pre>
<a href="../../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: InternalError: too much recursion
<a href="../../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: InternalError: too much recursion
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 100%</li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 36%</li>
<li>Intl: 100%</li>
</ul></details>
