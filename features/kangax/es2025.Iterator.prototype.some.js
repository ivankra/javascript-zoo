// ES6: https://github.com/tc39/proposal-iterator-helpers
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/some
// compat-table: ES2016+ > 2025 features > Iterator Helpers (large) > Iterator.prototype.some
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return [1, 2, 3].values().some(it => typeof it === 'number');
}

try {
  if (testCode()) {
    console.log("es2025.Iterator.prototype.some.js: OK");
  } else {
    console.log("es2025.Iterator.prototype.some.js: FAIL");
  }
} catch (e) {
  console.log("es2025.Iterator.prototype.some.js: FAIL: " + e);
}