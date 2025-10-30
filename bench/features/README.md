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

## Related projects

* [compat-table](https://compat-table.github.io/compat-table/es6/) ([github](https://github.com/compat-table/compat-table)): test suite focused on ES5/ES6/ESnext features
* [test262](https://github.com/tc39/test262): official ECMAScript conformance test suite
