// compat-table: ES2016+ > 2025 features > Iterator Helpers (large) > extends Iterator
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator#iterator_helpers
// spec: https://github.com/tc39/proposal-iterator-helpers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class Class extends Iterator { }
  const instance = new Class();
  return instance[Symbol.iterator]() === instance;
}

try {
  if (testCode()) {
    console.log("kangax-es2025/Iterator.extends.js: OK");
  } else {
    console.log("kangax-es2025/Iterator.extends.js: failed");
  }
} catch (e) {
  console.log("kangax-es2025/Iterator.extends.js: exception: " + e);
}
