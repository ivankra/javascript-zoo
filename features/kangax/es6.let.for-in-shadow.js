// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// compat-table: ES6 > bindings > let (medium) > for-in loop binding shadowing parameter
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    Function("function f(e) { for (let e in {}) e }");
    return true;
  } catch(e) {
    return false;
  }
}

try {
  if (testCode()) {
    console.log("es6.let.for-in-shadow.js: OK");
  } else {
    console.log("es6.let.for-in-shadow.js: FAIL");
  }
} catch (e) {
  console.log("es6.let.for-in-shadow.js: FAIL: " + e);
}