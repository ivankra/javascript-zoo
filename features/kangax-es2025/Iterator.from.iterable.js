// compat-table: ES2016+ > 2025 features > Iterator Helpers (large) > Iterator.from, iterable
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/from
// spec: https://github.com/tc39/proposal-iterator-helpers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const iterator = Iterator.from([1, 2, 3]);
  return 'next' in iterator
    && iterator instanceof Iterator
    && Array.from(iterator).join() === '1,2,3';
}

try {
  if (testCode()) {
    console.log("kangax-es2025/Iterator.from.iterable.js: OK");
  } else {
    console.log("kangax-es2025/Iterator.from.iterable.js: failed");
  }
} catch (e) {
  console.log("kangax-es2025/Iterator.from.iterable.js: exception: " + e);
}
