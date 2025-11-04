// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@species
// compat-table: ES6 > built-in extensions > RegExp.prototype properties (small) > RegExp[Symbol.species]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var prop = Object.getOwnPropertyDescriptor(RegExp, Symbol.species);
  return 'get' in prop && RegExp[Symbol.species] === RegExp;
}

try {
  if (testCode()) {
    console.log("es6.RegExp.Symbol.species.js: OK");
  } else {
    console.log("es6.RegExp.Symbol.species.js: FAIL");
  }
} catch (e) {
  console.log("es6.RegExp.Symbol.species.js: FAIL: " + e);
}