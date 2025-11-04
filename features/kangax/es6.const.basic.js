// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
// compat-table: ES6 > bindings > const (medium) > basic support
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const foo = 123;
  return (foo === 123);
}

try {
  if (testCode()) {
    console.log("es6.const.basic.js: OK");
  } else {
    console.log("es6.const.basic.js: FAIL");
  }
} catch (e) {
  console.log("es6.const.basic.js: FAIL: " + e);
}