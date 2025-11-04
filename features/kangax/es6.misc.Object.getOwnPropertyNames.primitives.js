// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-object-constructor
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
// compat-table: ES6 > misc > Object static methods accept primitives (tiny) > Object.getOwnPropertyNames
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var s = Object.getOwnPropertyNames('a');
  return s.length === 2 &&
    ((s[0] === 'length' && s[1] === '0') || (s[0] === '0' && s[1] === 'length'));
}

try {
  if (testCode()) {
    console.log("es6.misc.Object.getOwnPropertyNames.primitives.js: OK");
  } else {
    console.log("es6.misc.Object.getOwnPropertyNames.primitives.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Object.getOwnPropertyNames.primitives.js: FAIL: " + e);
}