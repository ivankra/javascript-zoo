// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-object-constructor
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// compat-table: ES6 > misc > Object static methods accept primitives (tiny) > Object.freeze
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Object.freeze('a') === 'a';
}

try {
  if (testCode()) {
    console.log("es6.misc.Object.freeze.primitives.js: OK");
  } else {
    console.log("es6.misc.Object.freeze.primitives.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Object.freeze.primitives.js: FAIL: " + e);
}