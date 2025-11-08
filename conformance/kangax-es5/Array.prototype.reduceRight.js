// compat-table: ES5 > Array methods (large) > Array.prototype.reduceRight
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.reduceRight === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Array.prototype.reduceRight.js: OK");
  } else {
    console.log("kangax-es5/Array.prototype.reduceRight.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Array.prototype.reduceRight.js: exception: " + e);
}
