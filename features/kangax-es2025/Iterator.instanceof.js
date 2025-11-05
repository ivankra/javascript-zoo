// compat-table: ES2016+ > 2025 features > Iterator Helpers (large) > instanceof Iterator
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator#iterator_helpers
// spec: https://github.com/tc39/proposal-iterator-helpers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return [1, 2, 3].values() instanceof Iterator;
}

try {
  if (testCode()) {
    console.log("kangax-es2025/Iterator.instanceof.js: OK");
  } else {
    console.log("kangax-es2025/Iterator.instanceof.js: failed");
  }
} catch (e) {
  console.log("kangax-es2025/Iterator.instanceof.js: exception: " + e);
}
