// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// compat-table: ES6 > functions > class (large) > anonymous class
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof class {} === "function";
}

try {
  if (testCode()) {
    console.log("es6.class.anonymous.js: OK");
  } else {
    console.log("es6.class.anonymous.js: FAIL");
  }
} catch (e) {
  console.log("es6.class.anonymous.js: FAIL: " + e);
}