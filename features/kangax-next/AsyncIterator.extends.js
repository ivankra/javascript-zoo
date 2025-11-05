// compat-table: ES Next > Stage 2 > Async Iterator Helpers (large) > extends AsyncIterator
// spec: https://github.com/tc39/proposal-async-iterator-helpers
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
    console.log("kangax-next/AsyncIterator.extends.js: OK");
  } else {
    console.log("kangax-next/AsyncIterator.extends.js: failed");
  }
} catch (e) {
  console.log("kangax-next/AsyncIterator.extends.js: exception: " + e);
}
