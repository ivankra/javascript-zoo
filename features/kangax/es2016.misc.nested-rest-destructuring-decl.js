// ES6: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Nested_object_and_array_destructuring
// compat-table: ES2016+ > 2016 misc > nested rest destructuring, declarations (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var [x, ...[y, ...z]] = [1,2,3,4];
  return x === 1 && y === 2 && z + '' === '3,4';
}

try {
  if (testCode()) {
    console.log("es2016.misc.nested-rest-destructuring-decl.js: OK");
  } else {
    console.log("es2016.misc.nested-rest-destructuring-decl.js: FAIL");
  }
} catch (e) {
  console.log("es2016.misc.nested-rest-destructuring-decl.js: FAIL: " + e);
}