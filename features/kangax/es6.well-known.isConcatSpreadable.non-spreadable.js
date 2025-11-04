// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable
// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.isConcatSpreadable, non-spreadable array
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a = [], b = [];
  b[Symbol.isConcatSpreadable] = false;
  a = a.concat(b);
  return a[0] === b;
}

try {
  if (testCode()) {
    console.log("es6.well-known.isConcatSpreadable.non-spreadable.js: OK");
  } else {
    console.log("es6.well-known.isConcatSpreadable.non-spreadable.js: FAIL");
  }
} catch (e) {
  console.log("es6.well-known.isConcatSpreadable.non-spreadable.js: FAIL: " + e);
}