// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// compat-table: ES6 > built-ins > Symbol (large) > cannot coerce to string or number
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var symbol = Symbol();

  try {
    symbol + "";
    return false;
  }
  catch(e) {}

  try {
    symbol + 0;
    return false;
  } catch(e) {}

  return true;
}

try {
  if (testCode()) {
    console.log("es6.Symbol.no-coerce.js: OK");
  } else {
    console.log("es6.Symbol.no-coerce.js: FAIL");
  }
} catch (e) {
  console.log("es6.Symbol.no-coerce.js: FAIL: " + e);
}