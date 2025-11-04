// ES6: https://github.com/tc39/proposal-iterator-helpers
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/toArray
// compat-table: ES2016+ > 2025 features > Iterator Helpers (large) > Iterator.prototype.toArray
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const array = [1, 2, 3].values().toArray();
  return Array.isArray(array) && array.join() === '1,2,3';
}

try {
  if (testCode()) {
    console.log("es2025.Iterator.prototype.toArray.js: OK");
  } else {
    console.log("es2025.Iterator.prototype.toArray.js: FAIL");
  }
} catch (e) {
  console.log("es2025.Iterator.prototype.toArray.js: FAIL: " + e);
}