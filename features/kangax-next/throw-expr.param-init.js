// compat-table: ES Next > Stage 2 > throw expressions (medium) > parameter initializers
// spec: https://github.com/tc39/proposal-throw-expressions
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
    console.log("kangax-next/throw-expr.param-init.js: OK");
  } else {
    console.log("kangax-next/throw-expr.param-init.js: failed");
  }
} catch (e) {
  console.log("kangax-next/throw-expr.param-init.js: exception: " + e);
}
