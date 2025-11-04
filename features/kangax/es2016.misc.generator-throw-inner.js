// ES6: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-generatorfunction-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*#IteratorResult_object_returned_instead_of_throwing
// compat-table: ES2016+ > 2016 misc > generator throw() caught by inner generator (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function * generator() {
    yield * (function * () {
      try {
        yield 'foo';
      }
      catch (e) {
        return;
      }
    }());
    yield 'bar';
  }
  var iter = generator();
  iter.next();
  return iter['throw']().value === 'bar';
}

try {
  if (testCode()) {
    console.log("es2016.misc.generator-throw-inner.js: OK");
  } else {
    console.log("es2016.misc.generator-throw-inner.js: FAIL");
  }
} catch (e) {
  console.log("es2016.misc.generator-throw-inner.js: FAIL: " + e);
}