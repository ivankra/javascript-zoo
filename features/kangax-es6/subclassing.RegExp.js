// compat-table: ES6 > subclassing > RegExp is subclassable (tiny) > basic functionality
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-constructor
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
    console.log("kangax-es6/subclassing.RegExp.js: OK");
  } else {
    console.log("kangax-es6/subclassing.RegExp.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.RegExp.js: exception: " + e);
}
