// compat-table: ES Next > Stage 2 > Async Iterator Helpers (large) > instanceof AsyncIterator
// spec: https://github.com/tc39/proposal-async-iterator-helpers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (async function*() {})() instanceof AsyncIterator;
}

try {
  if (testCode()) {
    console.log("kangax-next/AsyncIterator.instanceof.js: OK");
  } else {
    console.log("kangax-next/AsyncIterator.instanceof.js: failed");
  }
} catch (e) {
  console.log("kangax-next/AsyncIterator.instanceof.js: exception: " + e);
}
