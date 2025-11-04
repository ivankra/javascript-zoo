// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.toStringTag
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a = {};
  a[Symbol.toStringTag] = "foo";
  return (a + "") === "[object foo]";
}

try {
  if (testCode()) {
    console.log("es6.well-known.toStringTag.js: OK");
  } else {
    console.log("es6.well-known.toStringTag.js: FAIL");
  }
} catch (e) {
  console.log("es6.well-known.toStringTag.js: FAIL: " + e);
}