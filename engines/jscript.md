# JScript

JavaScript engine of Internet Explorer 3.0 – 8.0.

* Homepage:    https://learn.microsoft.com/en-us/previous-versions/hbxc2t98%28v=vs.85%29
* Language:    C++
* License:     Proprietary
* Org:         Microsoft
* Standard:    ES3
* Years:       1996-2011
* Interpreter: stack-based VM
* DLL:         jscript.dll

## History

* 1996: Released with Internet Explorer 3.0 in May 1996.
* 2009: Succeeded by [JScript9](jscript9.md) "Chakra" engine in IE9-11, but lingers in Windows for compatibility reasons till today.
* 2025: Windows 11 24H2 shipped a mostly compatible drop-in Chakra-based replacement (`JScript9Legacy.dll`).

## Links

* https://www.usenix.org/legacy/event/webapps10/tech/full_papers/Ratanaworabhan.pdf
* https://labs.withsecure.com/publications/internet-exploiter-understanding-vulnerabilities-in-internet-explorer
* https://techcommunity.microsoft.com/blog/windows-itpro-blog/jscript9legacy-scripting-engine-now-enabled-by-default/4431326

## Conformance

<details><summary>ES1-ES5: 78%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/jscript.txt">Full log</a>.</li>
<li>ES1: 99%<pre>
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: non-compliant, expected to return 100 instead of 2000
</pre></li>
<li>ES3: 86%<pre>
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: unshift on object failed ; unshift multiple on object failed ; unshift on empty object failed ; failed
<a href="../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: unshift single element failed ; unshift multiple elements failed ; unshift on empty array failed ; unshift with no arguments failed ; failed
<a href="../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: empty array unshift failed ; multiple elements unshift failed ; no arguments unshift failed ; failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0' ; failed
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError ; toExponential(-Infinity) does not throw RangeError ; failed
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed ; rounding failed ; failed
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: 'ab'.split(/(?:ab)*/).length !== 2 ; '.'.split(/(.?)(.?)/).length !== 4 ; failed
<a href="../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: split with regex failed ; split with capturing group failed ; failed
<a href="../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: negative start failed ; negative start with length failed ; failed
<a href="../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: wrong exception for undeclared variable ; wrong exception for undeclared function ; wrong exception for undeclared in expression ; wrong exception for property access on undeclared ; failed
<a href="../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: Z:\tmp\jscript.letQYr.js(37, 1) Microsoft JScript runtime error: '$I.Ar' is undefined
<a href="../conformance/es3/literals.array.elisions.js">literals.array.elisions.js</a>: array with only elision failed ; failed
<a href="../conformance/es3/literals.array.trailing-comma.js">literals.array.trailing-comma.js</a>: [1,].length failed ; trailing comma failed ; multiple elements with trailing comma failed ; failed
<a href="../conformance/es3/literals.string.esc-v.js">literals.string.esc-v.js</a>: failed
<a href="../conformance/es3/nested-functions.eval.js">nested-functions.eval.js</a>: Z:\tmp\jscript.4zjJVs.js(29, 1) Microsoft JScript runtime error: Object expected
<a href="../conformance/es3/regex.disjunction.js">regex.disjunction.js</a>: complex disjunction failed ; failed
<a href="../conformance/es3/regex.escape.control.js">regex.escape.control.js</a>: \v failed ; failed
<a href="../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: spec example failed ; failed
<a href="../conformance/es3/source.line-terminators.js">source.line-terminators.js</a>: failed
<a href="../conformance/es3/source.whitespace.js">source.whitespace.js</a>: Z:\tmp\jscript.b9TKYg.js(15, 6) Microsoft JScript compilation error: Expected ';'
<a href="../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: Z:\tmp\jscript.IIhyf8.js(15, 1) Microsoft JScript runtime error: 'x' is undefined
</pre></li>
<li>ES5: 7%</li>
</ul></details>
