// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-object-constructor
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols
// compat-table: ES6 > built-in extensions > Object static methods (medium) > Object.getOwnPropertySymbols
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var o = {};
  var sym = Symbol(), sym2 = Symbol(), sym3 = Symbol();
  o[sym]  = true;
  o[sym2] = true;
  o[sym3] = true;
  var result = Object.getOwnPropertySymbols(o);
  return result[0] === sym
    && result[1] === sym2
    && result[2] === sym3;
}

try {
  if (testCode()) {
    console.log("es6.Object.getOwnPropertySymbols.js: OK");
  } else {
    console.log("es6.Object.getOwnPropertySymbols.js: FAIL");
  }
} catch (e) {
  console.log("es6.Object.getOwnPropertySymbols.js: FAIL: " + e);
}