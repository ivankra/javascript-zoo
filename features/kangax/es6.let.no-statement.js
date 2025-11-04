// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// compat-table: ES6 > bindings > let (medium) > cannot be in statements
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  let bar = 1;
  try {
    Function("if(true) let baz = 1;")();
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("es6.let.no-statement.js: OK");
  } else {
    console.log("es6.let.no-statement.js: FAIL");
  }
} catch (e) {
  console.log("es6.let.no-statement.js: FAIL: " + e);
}