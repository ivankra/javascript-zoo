// ES6: https://github.com/tc39/proposal-iterator-helpers
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map
// compat-table: ES2016+ > 2025 features > Iterator Helpers (large) > Iterator.prototype.map
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Array.from([1, 2, 3].values().map(it => it * it)).join() === '1,4,9';
}

try {
  if (testCode()) {
    console.log("es2025.Iterator.prototype.map.js: OK");
  } else {
    console.log("es2025.Iterator.prototype.map.js: FAIL");
  }
} catch (e) {
  console.log("es2025.Iterator.prototype.map.js: FAIL: " + e);
}