// compat-table: ES6 > annex b > RegExp.prototype.compile (tiny) > basic functionality
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/compile
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.compile
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
    console.log("kangax-es6/annex-b.RegExp.prototype.compile.js: OK");
  } else {
    console.log("kangax-es6/annex-b.RegExp.prototype.compile.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.RegExp.prototype.compile.js: exception: " + e);
}
