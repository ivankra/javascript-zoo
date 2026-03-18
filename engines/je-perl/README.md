# je-perl

JavaScript engine in pure Perl.

* Homepage:         [metacpan.org/dist/JE](https://metacpan.org/dist/JE)
* Sources:          [JE-0.066.tar.gz](https://cpan.metacpan.org/authors/id/S/SP/SPROUT/JE-0.066.tar.gz)
* LOC:              [11007](# "cloc lib")
* Language:         Perl
* License:          Artistic-1.0-Perl OR GPL-1.0-or-later
* Standard:         ES3
* Years:            2007-2014
* Runtime platform: Perl
* Interpreter:      tree walker

Packaged as [libje-perl](https://packages.debian.org/search?keywords=libje-perl) in Debian/Ubuntu.

## Conformance

<details><summary>ES1-ES5: 79%</summary><ul>
<li>ES1: 97%<pre>
<a href="../../conformance/es1/Number.MAX_VALUE.js">Number.MAX_VALUE.js</a>: Can't locate object method "to_primitive" via package "1.79769313486232e+308" (perhaps you forgot to load "1.79769313486232e+308"?) at /dist/je-perl-dist/lib/perl5/JE/Code.pm line 917.
<a href="../../conformance/es1/Number.MIN_VALUE.js">Number.MIN_VALUE.js</a>: Can't locate object method "to_primitive" via package "4.94065645841247e-324" (perhaps you forgot to load "4.94065645841247e-324"?) at /dist/je-perl-dist/lib/perl5/JE/Code.pm line 917.
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: Old package separator "'" deprecated at /dist/je-perl-dist/lib/perl5/JE/escape.pl line 33.; Old package separator "'" deprecated at /dist/je-perl-dist/lib/perl5/JE/escape.pl line 77.
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: C++ like evaluation order in 'x += f()'
<a href="../../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: 1e-7 failed
<a href="../../conformance/es1/numbers.double.js">numbers.double.js</a>: failed
</pre></li>
<li>ES3: 90%<pre>
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: Can't locate object method "typeof" via package "2" (perhaps you forgot to load "2"?) at /dist/je-perl-dist/lib/perl5/JE/Code.pm line 973.
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: Can't locate object method "typeof" via package "3" (perhaps you forgot to load "3"?) at /dist/je-perl-dist/lib/perl5/JE/Code.pm line 973.
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; zero failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (-6.9e-11).toExponential(4) != '-6.9000e-11' (got: '-6.9e-11')
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: Invalid conversion in sprintf: "%.I" at /dist/je-perl-dist/lib/perl5/JE/Object/Number.pm line 374.; Invalid conversion in sprintf: "%.I" at /dist/je-perl-dist/lib/perl5/JE/Object/Number.pm line 385.; ...
<a href="../../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: Argument "b" isn't numeric in addition (+) at /dist/je-perl-dist/lib/perl5/JE/Number.pm line 93.; Argument "a" isn't numeric in addition (+) at /dist/je-perl-dist/lib/perl5/JE/Number.pm line 93.; Argu...
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: $nn 10 captures failed; $nn reverse order failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: timeout: &gt;10s
<a href="../../conformance/es3/global.EvalError.js">global.EvalError.js</a>: ReferenceError: The variable EvalError has not been declared at global.EvalError.js, line 14.
<a href="../../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: SyntaxError: Expected semicolon, '}' or end of line but found '� = 1;
<a href="../../conformance/es3/literals.object.decimal.js">literals.object.decimal.js</a>: property name 1e2 failed; property name 2.5e1 failed
<a href="../../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: SyntaxError: Expected colon but found '�: 42};
<a href="../../conformance/es3/source.line-terminators.js">source.line-terminators.js</a>: SyntaxError: Expected semicolon, '}' or end of line but found '��1;  // r' at source.line-terminators.js, line 13.
<a href="../../conformance/es3/source.whitespace.js">source.whitespace.js</a>: SyntaxError: Expected semicolon, '}' or end of line but found '�w = 4;   ' at source.whitespace.js, line 12.
<a href="../../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: SyntaxError: Expected semicolon, '}' or end of line but found '��x = 1;  ' at source.whitespace.unicode.js, line 8.
</pre></li>
<li>ES5: 9%</li>
</ul></details>
