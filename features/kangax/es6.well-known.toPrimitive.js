// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive
// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.toPrimitive
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a = {}, b = {}, c = {};
  var passed = 0;
  a[Symbol.toPrimitive] = function(hint) { passed += hint === "number";  return 0; };
  b[Symbol.toPrimitive] = function(hint) { passed += hint === "string";  return 0; };
  c[Symbol.toPrimitive] = function(hint) { passed += hint === "default"; return 0; };

  a >= 0;
  b in {};
  c == 0; // eslint-disable-line eqeqeq
  return passed === 3;
}

try {
  if (testCode()) {
    console.log("es6.well-known.toPrimitive.js: OK");
  } else {
    console.log("es6.well-known.toPrimitive.js: FAIL");
  }
} catch (e) {
  console.log("es6.well-known.toPrimitive.js: FAIL: " + e);
}