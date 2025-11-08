// compat-table: ES6 > annex b > RegExp.prototype.compile (tiny) > returns this
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/compile
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.compile
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
    console.log("kangax-es6/annex-b.RegExp.prototype.compile.returns-this.js: OK");
  } else {
    console.log("kangax-es6/annex-b.RegExp.prototype.compile.returns-this.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.RegExp.prototype.compile.returns-this.js: exception: " + e);
}
