// ES6: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-array.prototype.includes
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// compat-table: ES2016+ > 2016 features > Array.prototype.includes (small) > Array.prototype.includes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return [1, 2, 3].includes(1)
    && ![1, 2, 3].includes(4)
    && ![1, 2, 3].includes(1, 1)
    && [NaN].includes(NaN);
}

try {
  if (testCode()) {
    console.log("es2016.Array.prototype.includes.js: OK");
  } else {
    console.log("es2016.Array.prototype.includes.js: FAIL");
  }
} catch (e) {
  console.log("es2016.Array.prototype.includes.js: FAIL: " + e);
}