// ES6: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-array.prototype.includes
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// compat-table: ES2016+ > 2016 features > Array.prototype.includes (small) > Array.prototype.includes handles sparse arrays
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return [,].includes()
    && Array(1).includes();
}

try {
  if (testCode()) {
    console.log("es2016.Array.prototype.includes.sparse.js: OK");
  } else {
    console.log("es2016.Array.prototype.includes.sparse.js: FAIL");
  }
} catch (e) {
  console.log("es2016.Array.prototype.includes.sparse.js: FAIL: " + e);
}