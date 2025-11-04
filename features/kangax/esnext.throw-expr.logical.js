// ES6: https://github.com/tc39/proposal-throw-expressions
// compat-table: ES Next > Stage 2 > throw expressions (medium) > logical
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a, b;
  try {
    a = 19 || throw 77;
    b = 88 && throw 23;
  } catch (e) {
    return a + e === 42;
  }
}

try {
  if (testCode()) {
    console.log("esnext.throw-expr.logical.js: OK");
  } else {
    console.log("esnext.throw-expr.logical.js: FAIL");
  }
} catch (e) {
  console.log("esnext.throw-expr.logical.js: FAIL: " + e);
}