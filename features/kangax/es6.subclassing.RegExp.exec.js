// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-constructor
// compat-table: ES6 > subclassing > RegExp is subclassable (tiny) > RegExp.prototype.exec
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class R extends RegExp {}
  var r = new R("baz","g");
  return r.exec("foobarbaz")[0] === "baz" && r.lastIndex === 9;
}

try {
  if (testCode()) {
    console.log("es6.subclassing.RegExp.exec.js: OK");
  } else {
    console.log("es6.subclassing.RegExp.exec.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.RegExp.exec.js: FAIL: " + e);
}