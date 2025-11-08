// compat-table: ES Next > Stage 2 > throw expressions (medium) > arrow function bodies
// spec: https://github.com/tc39/proposal-throw-expressions
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
    console.log("kangax-next/throw-expr.arrow.js: OK");
  } else {
    console.log("kangax-next/throw-expr.arrow.js: failed");
  }
} catch (e) {
  console.log("kangax-next/throw-expr.arrow.js: exception: " + e);
}
