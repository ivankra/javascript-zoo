// ES6: https://github.com/tc39/proposal-set-methods
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#instance_methods
// compat-table: ES2016+ > 2025 features > Set methods (medium) > Set.prototype.isSubsetOf()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new Set([1, 2, 3]).isSubsetOf(new Set([5, 4, 3, 2, 1]));
}

try {
  if (testCode()) {
    console.log("es2025.Set.prototype.isSubsetOf.js: OK");
  } else {
    console.log("es2025.Set.prototype.isSubsetOf.js: FAIL");
  }
} catch (e) {
  console.log("es2025.Set.prototype.isSubsetOf.js: FAIL: " + e);
}