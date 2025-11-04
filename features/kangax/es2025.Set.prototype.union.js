// ES6: https://github.com/tc39/proposal-set-methods
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#instance_methods
// compat-table: ES2016+ > 2025 features > Set methods (medium) > Set.prototype.union()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var set = new Set([1, 2]).union(new Set([2, 3]));
  return set.size === 3
    && set.has(1)
    && set.has(2)
    && set.has(3);
}

try {
  if (testCode()) {
    console.log("es2025.Set.prototype.union.js: OK");
  } else {
    console.log("es2025.Set.prototype.union.js: FAIL");
  }
} catch (e) {
  console.log("es2025.Set.prototype.union.js: FAIL: " + e);
}