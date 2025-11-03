# ECMAScript feature test suite

Test suite to check for major ECMAScript features in JavaScript engines.

The scope is somewhat between [compat-table](https://compat-table.github.io/compat-table/es6/)
and [test262](https://github.com/tc39/test262) -
to test which features are present and reasonably usable, highlight
missing functionality, but not to be an exhaustive conformance test suite
or collection of odd test cases.  Additionally, the very basic tests are
written starting from ES1/ES3 and assume incomplete implementation.

Each test is a single self-contained JavaScript snippet, mostly relying on
very basic language syntax and `console.log()` for printing, thus expected
to work in a wide variety of environments: browsers, Node.js and basic
engine shells (perhaps with a crude `s/console.log/print/`).  There is no
need for a specialized test runner binary with custom built-ins as with
test262, a basic print function is the only requirement from runtime
environment.  On success, each test prints its own `<filename>: OK`.

Tests are prefixed with ECMAScript spec which introduced the feature.
Except for features that are/were in Annex B (optional for non-browsers)
for some specification version, these are in `annexb.<spec>.<feature>.js`.

Much of the raw test code is generated with LLM assistance, using
specification text as the main reference.

## Specifications

* ES1 (1997): [pdf](https://ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf)
* ES3 (1999): [pdf](https://ecma-international.org/wp-content/uploads/ECMA-262_3rd_edition_december_1999.pdf)
* ES5 (2009): [pdf](https://ecma-international.org/wp-content/uploads/ECMA-262_5th_edition_december_2009.pdf)
* ES5.1 (2011): [pdf](https://ecma-international.org/wp-content/uploads/ECMA-262_5.1_edition_june_2011.pdf),
  [html](https://262.ecma-international.org/5.1/)
* ES6 / ES2015: [pdf](https://ecma-international.org/wp-content/uploads/ECMA-262_6th_edition_june_2015.pdf),
  [html](https://262.ecma-international.org/6.0/)
* [ES2016](https://tc39.es/ecma262/2016/)
* [ES2017](https://tc39.es/ecma262/2017/)
* [ES2018](https://tc39.es/ecma262/2018/)
* [ES2019](https://tc39.es/ecma262/2019/)
* [ES2020](https://tc39.es/ecma262/2020/)
* [ES2021](https://tc39.es/ecma262/2021/)
* [ES2022](https://tc39.es/ecma262/2022/)
* [ES2023](https://tc39.es/ecma262/2023/)
* [ES2024](https://tc39.es/ecma262/2024/)
* [ES2025](https://tc39.es/ecma262/2025/)
* [ESnext](https://tc39.es/ecma262/)

## Related projects

* [compat-table](https://compat-table.github.io/compat-table/es6/) ([github](https://github.com/compat-table/compat-table)):
  test suite focused on basic detection of ES5/ES6+/ESnext features
* [test262](https://github.com/tc39/test262): official ECMAScript conformance test suite
