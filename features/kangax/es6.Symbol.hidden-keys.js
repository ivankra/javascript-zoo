// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// compat-table: ES6 > built-ins > Symbol (large) > symbol keys are hidden to pre-ES6 code
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var object = {};
  var symbol = Symbol();
  object[symbol] = 1;

  for (var x in object){}
  var passed = !x;

  if (Object.keys && Object.getOwnPropertyNames) {
    passed &= Object.keys(object).length === 0
      && Object.getOwnPropertyNames(object).length === 0;
  }

  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Symbol.hidden-keys.js: OK");
  } else {
    console.log("es6.Symbol.hidden-keys.js: FAIL");
  }
} catch (e) {
  console.log("es6.Symbol.hidden-keys.js: FAIL: " + e);
}