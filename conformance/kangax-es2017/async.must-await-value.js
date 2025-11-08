// compat-table: ES2016+ > 2017 features > async functions (large) > must await a value
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// spec: https://tc39.github.io/ecma262/#sec-async-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  async function a() {
    await Promise.resolve();
  }
  try {
    Function("(async function a() { await; }())")();
  } catch (e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es2017/async.must-await-value.js: OK");
  } else {
    console.log("kangax-es2017/async.must-await-value.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/async.must-await-value.js: exception: " + e);
}
