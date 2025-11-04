// ES6: https://tc39.github.io/proposal-flatMap/
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
// compat-table: ES2016+ > 2019 features > Array.prototype.{flat, flatMap} (medium) > Array.prototype.flat
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return [1, [2, 3], [4, [5, 6]]].flat().join('') === '12345,6';
}

try {
  if (testCode()) {
    console.log("es2019.Array.prototype.flat.js: OK");
  } else {
    console.log("es2019.Array.prototype.flat.js: FAIL");
  }
} catch (e) {
  console.log("es2019.Array.prototype.flat.js: FAIL: " + e);
}