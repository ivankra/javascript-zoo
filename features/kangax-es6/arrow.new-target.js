// compat-table: ES6 > functions > arrow functions (large) > lexical "new.target" binding
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function C() {
    return x => new.target;
  }
  return new C()() === C && C()() === void undefined;
}

try {
  if (testCode()) {
    console.log("kangax-es6/arrow.new-target.js: OK");
  } else {
    console.log("kangax-es6/arrow.new-target.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/arrow.new-target.js: exception: " + e);
}
