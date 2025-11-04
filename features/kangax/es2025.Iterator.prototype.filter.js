// ES6: https://github.com/tc39/proposal-iterator-helpers
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter
// compat-table: ES2016+ > 2025 features > Iterator Helpers (large) > Iterator.prototype.filter
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Array.from([1, 2, 3].values().filter(it => it % 2)).join() === '1,3';
}

try {
  if (testCode()) {
    console.log("es2025.Iterator.prototype.filter.js: OK");
  } else {
    console.log("es2025.Iterator.prototype.filter.js: FAIL");
  }
} catch (e) {
  console.log("es2025.Iterator.prototype.filter.js: FAIL: " + e);
}