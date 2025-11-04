// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// compat-table: ES6 > bindings > let (medium) > is block-scoped
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  let bar = 123;
  { let bar = 456; }
  return bar === 123;
}

try {
  if (testCode()) {
    console.log("es6.let.block-scoped.js: OK");
  } else {
    console.log("es6.let.block-scoped.js: FAIL");
  }
} catch (e) {
  console.log("es6.let.block-scoped.js: FAIL: " + e);
}