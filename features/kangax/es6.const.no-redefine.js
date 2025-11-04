// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
// compat-table: ES6 > bindings > const (medium) > redefining a const is an error
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const baz = 1;
  try {
    Function("const foo = 1; foo = 2;")();
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("es6.const.no-redefine.js: OK");
  } else {
    console.log("es6.const.no-redefine.js: FAIL");
  }
} catch (e) {
  console.log("es6.const.no-redefine.js: FAIL: " + e);
}