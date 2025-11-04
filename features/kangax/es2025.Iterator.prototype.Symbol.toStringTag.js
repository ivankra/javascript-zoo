// ES6: https://github.com/tc39/proposal-iterator-helpers
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator#iterator_helpers
// compat-table: ES2016+ > 2025 features > Iterator Helpers (large) > Iterator.prototype[@@toStringTag]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Iterator.prototype[Symbol.toStringTag] === 'Iterator';
}

try {
  if (testCode()) {
    console.log("es2025.Iterator.prototype.Symbol.toStringTag.js: OK");
  } else {
    console.log("es2025.Iterator.prototype.Symbol.toStringTag.js: FAIL");
  }
} catch (e) {
  console.log("es2025.Iterator.prototype.Symbol.toStringTag.js: FAIL: " + e);
}