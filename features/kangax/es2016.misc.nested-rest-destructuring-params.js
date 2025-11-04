// ES6: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-destructuring-assignment
// compat-table: ES2016+ > 2016 misc > nested rest destructuring, parameters (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return function ([x, ...[y, ...z]]) {
    return x === 1 && y === 2 && z + '' === '3,4';
  }([1,2,3,4]);
}

try {
  if (testCode()) {
    console.log("es2016.misc.nested-rest-destructuring-params.js: OK");
  } else {
    console.log("es2016.misc.nested-rest-destructuring-params.js: FAIL");
  }
} catch (e) {
  console.log("es2016.misc.nested-rest-destructuring-params.js: FAIL: " + e);
}