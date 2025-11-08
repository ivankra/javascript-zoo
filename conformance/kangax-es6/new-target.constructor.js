// compat-table: ES6 > syntax > new.target (small) > in constructors
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-built-in-function-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new function f() {
    passed = (new.target === f);
  }();
  (function() {
    passed &= (new.target === void undefined);
  }());
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/new-target.constructor.js: OK");
  } else {
    console.log("kangax-es6/new-target.constructor.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/new-target.constructor.js: exception: " + e);
}
