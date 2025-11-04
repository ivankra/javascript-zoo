// ES6: https://github.com/tc39/proposal-async-iterator-helpers
// compat-table: ES Next > Stage 2 > Async Iterator Helpers (large) > extends AsyncIterator
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class Class extends AsyncIterator { }
  const instance = new Class();
  return instance[Symbol.asyncIterator]() === instance;
}

try {
  if (testCode()) {
    console.log("esnext.AsyncIterator.extends.js: OK");
  } else {
    console.log("esnext.AsyncIterator.extends.js: FAIL");
  }
} catch (e) {
  console.log("esnext.AsyncIterator.extends.js: FAIL: " + e);
}