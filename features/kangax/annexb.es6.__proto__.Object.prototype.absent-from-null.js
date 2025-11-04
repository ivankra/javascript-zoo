// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.__proto__
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
// compat-table: ES6 > annex b > Object.prototype.__proto__ (tiny) > absent from Object.create(null)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var o = Object.create(null), p = {};
  o.__proto__ = p;
  return Object.getPrototypeOf(o) !== p;
}

try {
  if (testCode()) {
    console.log("annexb.es6.__proto__.Object.prototype.absent-from-null.js: OK");
  } else {
    console.log("annexb.es6.__proto__.Object.prototype.absent-from-null.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.__proto__.Object.prototype.absent-from-null.js: FAIL: " + e);
}