// ES6: https://github.com/tc39/proposal-throw-expressions
// compat-table: ES Next > Stage 2 > throw expressions (medium) > arrow function bodies
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var fn = () => throw 42;
  try {
    fn();
  } catch (e) {
    return e === 42;
  }
}

try {
  if (testCode()) {
    console.log("esnext.throw-expr.arrow.js: OK");
  } else {
    console.log("esnext.throw-expr.arrow.js: FAIL");
  }
} catch (e) {
  console.log("esnext.throw-expr.arrow.js: FAIL: " + e);
}