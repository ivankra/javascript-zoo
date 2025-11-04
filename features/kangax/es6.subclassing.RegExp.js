// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-constructor
// compat-table: ES6 > subclassing > RegExp is subclassable (tiny) > basic functionality
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof global === "undefined") global = this;

function testCode() {
  class R extends RegExp {}
  var r = new R("baz","g");
  return r.global && r.source === "baz";
}

try {
  if (testCode()) {
    console.log("es6.subclassing.RegExp.js: OK");
  } else {
    console.log("es6.subclassing.RegExp.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.RegExp.js: FAIL: " + e);
}