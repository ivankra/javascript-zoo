# JScript9 / Chakra

JavaScript engine of Internet Explorer 9.0 – 11.0.

* Language:   C++
* License:    Proprietary
* Org:        Microsoft
* Standard:   ES5
* Years:      2009-2013
* Ancestor:   [JScript](../jscript/README.md)
* Features:   deferred parsing
* JIT:        arm, x86/x64
* GC:         concurrent GC
* DLL:        jscript9.dll (JSRT API), jscript9Legacy.dll (IActiveScript COM API)

## History

Succeeded by a newer engine in Microsoft Edge (Legacy) - which originally also kept Chakra name (chakra.dll),
later open-sourced as [ChakraCore](../chakracore/README.md).

Still ships in Windows as `jscript9Legacy.dll` - Windows 11 24H2's drop-in replacement of
classic [JScript](../jscript/README.md) with a Chakra-based engine.

## Links

* [MS-ES6](https://learn.microsoft.com/en-us/openspecs/ie_standards/ms-es6/2262a105-d776-4a44-9d2a-f11bb039b4c5): ES6 compliance documentation
* https://www.microsoft.com/en-us/research/wp-content/uploads/2018/04/41159.compressed.pdf
* https://www.usenix.org/legacy/event/webapps10/tech/full_papers/Ratanaworabhan.pdf
* https://learn.microsoft.com/en-us/archive/microsoft-edge/legacy/developer/hosting/chakra-hosting/targeting-edge-vs-legacy-engines-in-jsrt-apis
* https://web.archive.org/web/20150219063105/http://blogs.msdn.com/b/ie/archive/2012/06/13/advances-in-javascript-performance-in-ie10-and-windows-8.aspx

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 98%<pre>
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0' ; failed
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed ; failed
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: '0'.split(undefined, 0).length !== 0 ; failed
</pre></li>
<li>ES5: 99%<pre>
<a href="../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 11%, ES2016+ 2%, Next 6%, Intl 29%</summary><ul>
<li>ES6: 11%</li>
<li>ES2016: 0%</li>
<li>ES2017: 6%</li>
<li>ES2018: 0%</li>
<li>ES2019: 2%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6%</li>
<li>Intl: 29%</li>
</ul></details>
