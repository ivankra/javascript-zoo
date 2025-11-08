// compat-table: ES6 > annex b > Object.prototype.__proto__ (tiny) > set prototype
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.__proto__
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var o = {};
  o.__proto__ = Array.prototype;
  return o instanceof Array;
}

try {
  if (testCode()) {
    console.log("kangax-es6/annex-b.__proto__.Object.prototype.set.js: OK");
  } else {
    console.log("kangax-es6/annex-b.__proto__.Object.prototype.set.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.__proto__.Object.prototype.set.js: exception: " + e);
}
