// compat-table: ES2016+ > 2025 features > Set methods (medium) > Set.prototype.isDisjointFrom()
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#instance_methods
// spec: https://github.com/tc39/proposal-set-methods
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new Set([1, 2, 3]).isDisjointFrom(new Set([4, 5, 6]));
}

try {
  if (testCode()) {
    console.log("kangax-es2025/Set.prototype.isDisjointFrom.js: OK");
  } else {
    console.log("kangax-es2025/Set.prototype.isDisjointFrom.js: failed");
  }
} catch (e) {
  console.log("kangax-es2025/Set.prototype.isDisjointFrom.js: exception: " + e);
}
