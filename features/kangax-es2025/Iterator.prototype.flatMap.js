// compat-table: ES2016+ > 2025 features > Iterator Helpers (large) > Iterator.prototype.flatMap
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap
// spec: https://github.com/tc39/proposal-iterator-helpers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Array.from([1, 2, 3].values().flatMap(it => [it, 0])).join() === '1,0,2,0,3,0';
}

try {
  if (testCode()) {
    console.log("kangax-es2025/Iterator.prototype.flatMap.js: OK");
  } else {
    console.log("kangax-es2025/Iterator.prototype.flatMap.js: failed");
  }
} catch (e) {
  console.log("kangax-es2025/Iterator.prototype.flatMap.js: exception: " + e);
}
