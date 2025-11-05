// compat-table: ES2016+ > 2025 features > Iterator Helpers (large) > Iterator.prototype.every
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/every
// spec: https://github.com/tc39/proposal-iterator-helpers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return [1, 2, 3].values().every(it => typeof it === 'number');
}

try {
  if (testCode()) {
    console.log("kangax-es2025/Iterator.prototype.every.js: OK");
  } else {
    console.log("kangax-es2025/Iterator.prototype.every.js: failed");
  }
} catch (e) {
  console.log("kangax-es2025/Iterator.prototype.every.js: exception: " + e);
}
