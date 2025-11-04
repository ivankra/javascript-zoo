// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-__proto__-property-names-in-object-initializers
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto#Specifications
// compat-table: ES6 > annex b > __proto__ in object literals (tiny) > basic support
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return { __proto__ : [] } instanceof Array
    && !({ __proto__ : null } instanceof Object);
}

try {
  if (testCode()) {
    console.log("annexb.es6.__proto__.literals.js: OK");
  } else {
    console.log("annexb.es6.__proto__.literals.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.__proto__.literals.js: FAIL: " + e);
}