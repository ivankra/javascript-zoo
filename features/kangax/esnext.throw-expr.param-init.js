// ES6: https://github.com/tc39/proposal-throw-expressions
// compat-table: ES Next > Stage 2 > throw expressions (medium) > parameter initializers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function fn (arg = throw 42) {
    return arg;
  }

  if (fn(21) !== 21) return false;

  try {
    fn();
  } catch (e) {
    return e === 42;
  }
}

try {
  if (testCode()) {
    console.log("esnext.throw-expr.param-init.js: OK");
  } else {
    console.log("esnext.throw-expr.param-init.js: FAIL");
  }
} catch (e) {
  console.log("esnext.throw-expr.param-init.js: FAIL: " + e);
}