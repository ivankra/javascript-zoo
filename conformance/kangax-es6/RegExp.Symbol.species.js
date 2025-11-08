// compat-table: ES6 > built-in extensions > RegExp.prototype properties (small) > RegExp[Symbol.species]
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@species
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype
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
    console.log("kangax-es6/RegExp.Symbol.species.js: OK");
  } else {
    console.log("kangax-es6/RegExp.Symbol.species.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/RegExp.Symbol.species.js: exception: " + e);
}
