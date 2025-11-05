// compat-table: ES2016+ > 2025 features > Set methods (medium) > Set.prototype.symmetricDifference()
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#instance_methods
// spec: https://github.com/tc39/proposal-set-methods
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var set = new Set([1, 2]).symmetricDifference(new Set([2, 3]));
  return set.size === 2
    && set.has(1)
    && set.has(3);
}

try {
  if (testCode()) {
    console.log("kangax-es2025/Set.prototype.symmetricDifference.js: OK");
  } else {
    console.log("kangax-es2025/Set.prototype.symmetricDifference.js: failed");
  }
} catch (e) {
  console.log("kangax-es2025/Set.prototype.symmetricDifference.js: exception: " + e);
}
