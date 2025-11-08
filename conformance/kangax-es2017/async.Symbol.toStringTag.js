// compat-table: ES2016+ > 2017 features > async functions (large) > async function prototype, Symbol.toStringTag
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// spec: https://tc39.github.io/ecma262/#sec-async-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Object.getPrototypeOf(async function () {})[Symbol.toStringTag] === "AsyncFunction";
}

try {
  if (testCode()) {
    console.log("kangax-es2017/async.Symbol.toStringTag.js: OK");
  } else {
    console.log("kangax-es2017/async.Symbol.toStringTag.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/async.Symbol.toStringTag.js: exception: " + e);
}
