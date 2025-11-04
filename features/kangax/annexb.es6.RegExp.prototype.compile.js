// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.compile
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/compile
// compat-table: ES6 > annex b > RegExp.prototype.compile (tiny) > basic functionality
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  if (typeof RegExp.prototype.compile !== 'function')
    return false
  var rx = /a/;
  rx.compile('b');
  return rx.test('b');
}

try {
  if (testCode()) {
    console.log("annexb.es6.RegExp.prototype.compile.js: OK");
  } else {
    console.log("annexb.es6.RegExp.prototype.compile.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.RegExp.prototype.compile.js: FAIL: " + e);
}