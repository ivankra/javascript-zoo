// ES6: https://github.com/tc39/proposal-async-iterator-helpers
// compat-table: ES Next > Stage 2 > Async Iterator Helpers (large) > AsyncIterator.prototype[@@toStringTag]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return AsyncIterator.prototype[Symbol.toStringTag] === 'AsyncIterator';
}

try {
  if (testCode()) {
    console.log("esnext.AsyncIterator.prototype.Symbol.toStringTag.js: OK");
  } else {
    console.log("esnext.AsyncIterator.prototype.Symbol.toStringTag.js: FAIL");
  }
} catch (e) {
  console.log("esnext.AsyncIterator.prototype.Symbol.toStringTag.js: FAIL: " + e);
}