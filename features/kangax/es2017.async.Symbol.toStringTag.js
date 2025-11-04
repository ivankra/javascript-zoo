// ES6: https://tc39.github.io/ecma262/#sec-async-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// compat-table: ES2016+ > 2017 features > async functions (large) > async function prototype, Symbol.toStringTag
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Object.getPrototypeOf(async function () {})[Symbol.toStringTag] === "AsyncFunction";
}

try {
  if (testCode()) {
    console.log("es2017.async.Symbol.toStringTag.js: OK");
  } else {
    console.log("es2017.async.Symbol.toStringTag.js: FAIL");
  }
} catch (e) {
  console.log("es2017.async.Symbol.toStringTag.js: FAIL: " + e);
}