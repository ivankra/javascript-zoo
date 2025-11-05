// compat-table: ES6 > bindings > let (medium) > for-in loop binding shadowing parameter (strict mode)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    Function("'use strict'; function f(e) { for (let e in {}) e }");
    return true;
  } catch(e) {
    return false;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/let.strict.for-in-shadow.js: OK");
  } else {
    console.log("kangax-es6/let.strict.for-in-shadow.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/let.strict.for-in-shadow.js: exception: " + e);
}
