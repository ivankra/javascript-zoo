// ES6: https://github.com/tc39/proposal-throw-expressions
// compat-table: ES Next > Stage 2 > throw expressions (medium) > conditionals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  true ? 42 : throw 21;
  try {
    false ? 42 : throw 21;
  } catch (e) {
    return e === 21;
  }
}

try {
  if (testCode()) {
    console.log("esnext.throw-expr.conditional.js: OK");
  } else {
    console.log("esnext.throw-expr.conditional.js: FAIL");
  }
} catch (e) {
  console.log("esnext.throw-expr.conditional.js: FAIL: " + e);
}