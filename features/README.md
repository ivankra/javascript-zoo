# ECMAScript features test suite

Test suite to check for major ECMAScript features.

Like kangax compat-table, but starting from ES1.  Unlike test262, not
an exhaustive comformance test suite / collection of odd test cases.
The goal is to merely test which features are present and somewhat usable,
score engine's feature completeness and highlight missing functionality.

Each test is a single self-contained JavaScript snippet, relying on basic
language syntax and `console.log()` for printing, thus expected to work in
a wide variety of environments: browsers, Node.js, engine shells (perhaps
with a polyfill or crude `s/console.log/print/`).  Naming convention:
`<spec>.<feature>[.<subtest>].js`.  On success, each test prints its own
`<filename>: OK`.

Pass tests directly to your engine shell or use [bench](../bench) wrapper:
`bench ./engine /bench/features/es*.js`.

## Specs

* [ES1 (1997)](https://ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf)
* [ES3 (1999)](https://www.ecma-international.org/wp-content/uploads/ECMA-262_3rd_edition_december_1999.pdf)
* [ES5 (2009)](https://ecma-international.org/wp-content/uploads/ECMA-262_5th_edition_december_2009.pdf)
* [ES5.1 (2011)](https://262.ecma-international.org/5.1/)
* [ES6 / ES2015](https://262.ecma-international.org/6.0/)
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

* [compat-table](https://compat-table.github.io/compat-table/es6/) ([github](https://github.com/compat-table/compat-table)): test suite focused on ES5/ES6/ESnext features
* [test262](https://github.com/tc39/test262): official ECMAScript conformance test suite
