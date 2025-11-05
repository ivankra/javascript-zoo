// compat-table: ES6 > annex b > Object.prototype.__proto__ (tiny) > present in hasOwnProperty()
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.__proto__
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Object.prototype.hasOwnProperty('__proto__');
}

try {
  if (testCode()) {
    console.log("kangax-es6/annex-b.__proto__.Object.prototype.hasOwnProperty.js: OK");
  } else {
    console.log("kangax-es6/annex-b.__proto__.Object.prototype.hasOwnProperty.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.__proto__.Object.prototype.hasOwnProperty.js: exception: " + e);
}
