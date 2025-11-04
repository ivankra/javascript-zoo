// ES6: https://github.com/tc39/proposal-async-iterator-helpers
// compat-table: ES Next > Stage 2 > Async Iterator Helpers (large) > instanceof AsyncIterator
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (async function*() {})() instanceof AsyncIterator;
}

try {
  if (testCode()) {
    console.log("esnext.AsyncIterator.instanceof.js: OK");
  } else {
    console.log("esnext.AsyncIterator.instanceof.js: FAIL");
  }
} catch (e) {
  console.log("esnext.AsyncIterator.instanceof.js: FAIL: " + e);
}