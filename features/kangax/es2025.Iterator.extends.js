// ES6: https://github.com/tc39/proposal-iterator-helpers
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator#iterator_helpers
// compat-table: ES2016+ > 2025 features > Iterator Helpers (large) > extends Iterator
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
    console.log("es2025.Iterator.extends.js: OK");
  } else {
    console.log("es2025.Iterator.extends.js: FAIL");
  }
} catch (e) {
  console.log("es2025.Iterator.extends.js: FAIL: " + e);
}