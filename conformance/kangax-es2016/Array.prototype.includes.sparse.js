// compat-table: ES2016+ > 2016 features > Array.prototype.includes (small) > Array.prototype.includes handles sparse arrays
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// spec: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-array.prototype.includes
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
    console.log("kangax-es2016/Array.prototype.includes.sparse.js: OK");
  } else {
    console.log("kangax-es2016/Array.prototype.includes.sparse.js: failed");
  }
} catch (e) {
  console.log("kangax-es2016/Array.prototype.includes.sparse.js: exception: " + e);
}
