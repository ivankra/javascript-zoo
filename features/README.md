# ECMAScript feature test suite

Test suite to check for major ECMAScript features in JavaScript engines.

Each test is a single self-contained JavaScript snippet, mostly relying
on basic language syntax (ES1 for ES1/ES3 tests, ES3 for ES5+) and
`console.log()` for printing, thus expected to work in a wide variety of
environments: browsers, Node.js and basic engine shells (perhaps with
a crude `s/console.log/print/`).  On success, each test is expected
to print its own `<filename>: OK`.

Test directories are named after ECMAScript spec which introduced
the feature.  Annex B features (optional for non-browsers), including
features that were only later moved there, are in
`annex-b.<spec>.<feature>.js`.

Most ES1-ES5 test cases are generated with LLM assistance from
specification texts as reference and reviewed/refined.
Test cases in `kangax-*/` are directly ported over from
[kangax / compat-table](https://compat-table.github.io/compat-table/es6/),
they can be regenerated with `kangax.js`.

## Running

`run.sh` wrapper should be able to handle most engine shells and run them
through the whole test suite.  By default, uses `node` and excludes the
usually failing ESnext.

```
Usage: run.sh [-o report.txt] engine [args] [test files/dirs]

$ ./run.sh | less -R            # run node on all tests and paginate
$ ./run.sh /dist/jsc es[1-5]    # run /dist/jsc on es[1-5]/*.js
$ ./run.sh /dist/jsc */*regex*  # run on all regex tests
$ ./run.sh gjs kangax-*/        # run GNOME's JS runtime on kangax tests
```

How to run a single test file directly with different engines:

```
$ node es5/es5.JSON.js

# Maybe pass a polyfill for console.log() if engine shell accepts multiple files
$ /dist/jsc var-console-log.js es5/JSON.js

# Or use sed to edit test on the fly
$ /dist/hermes <(sed s/console.log/print/ es5/JSON.js)
$ ./sed-console-log.sh /dist/hermes es5/JSON.js
```

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
  ES5/ES6+/ESnext test suite
* [test262](https://github.com/tc39/test262): official ECMAScript conformance test suite
