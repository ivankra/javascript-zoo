// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.compile
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/compile
// compat-table: ES6 > annex b > RegExp.prototype.compile (tiny) > returns this
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var rx = /a/;
  return rx.compile('b') === rx;
}

try {
  if (testCode()) {
    console.log("annexb.es6.RegExp.prototype.compile.returns-this.js: OK");
  } else {
    console.log("annexb.es6.RegExp.prototype.compile.returns-this.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.RegExp.prototype.compile.returns-this.js: FAIL: " + e);
}