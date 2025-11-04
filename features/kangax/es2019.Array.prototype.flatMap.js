// ES6: https://tc39.github.io/proposal-flatMap/
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
// compat-table: ES2016+ > 2019 features > Array.prototype.{flat, flatMap} (medium) > Array.prototype.flatMap
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return [{a: 1, b: 2}, {a: 3, b: 4}].flatMap(function (it) {
    return [it.a, it.b];
  }).join('') === '1234';
}

try {
  if (testCode()) {
    console.log("es2019.Array.prototype.flatMap.js: OK");
  } else {
    console.log("es2019.Array.prototype.flatMap.js: FAIL");
  }
} catch (e) {
  console.log("es2019.Array.prototype.flatMap.js: FAIL: " + e);
}