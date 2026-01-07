# je-perl

JavaScript engine in pure Perl.

* Homepage:         https://metacpan.org/dist/JE
* Sources:          https://cpan.metacpan.org/authors/id/S/SP/SPROUT/JE-0.066.tar.gz
* LOC:              11007 (`cloc lib`)
* Language:         Perl
* License:          Artistic-1.0-Perl OR GPL-1.0-or-later
* Standard:         ES3
* Years:            2007-2014
* Runtime platform: Perl
* Interpreter:      tree walker

Packaged as [libje-perl](https://packages.debian.org/search?keywords=libje-perl) in Debian/Ubuntu.

## Conformance

<details><summary>ES1-ES5: 79%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/je-perl.txt">Full log</a>.</li>
<li>ES1: 97%<pre>
<a href="../conformance/es1/Number.MAX_VALUE.js">Number.MAX_VALUE.js</a>: failed
<a href="../conformance/es1/Number.MIN_VALUE.js">Number.MIN_VALUE.js</a>: failed
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: failed
<a href="../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
<a href="../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: 1e-7 failed
<a href="../conformance/es1/numbers.double.js">numbers.double.js</a>: failed
</pre></li>
<li>ES3: 90%<pre>
<a href="../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: failed
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: failed
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; zero failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (-6.9e-11).toExponential(4) != '-6.9000e-11' (got: '-6.9e-11')
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: Invalid conversion in sprintf: "%.I" at /dist/je-perl-dist/lib/perl5/JE/Object/Number.pm line 374. Invalid conversion in sprintf: "%.I" at /dist/je-perl-dist/lib/perl5/JE/Object/Number.pm line 385. toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: a before b failed; b after a failed; abc before abd failed
<a href="../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: $nn 10 captures failed; $nn reverse order failed
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: timeout
<a href="../conformance/es3/global.EvalError.js">global.EvalError.js</a>: constructor failed
<a href="../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: failed
<a href="../conformance/es3/literals.object.decimal.js">literals.object.decimal.js</a>: property name 1e2 failed; property name 2.5e1 failed
<a href="../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: failed
<a href="../conformance/es3/source.line-terminators.js">source.line-terminators.js</a>: failed
<a href="../conformance/es3/source.whitespace.js">source.whitespace.js</a>: failed
<a href="../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: failed
</pre></li>
<li>ES5: 9%</li>
</ul></details>
