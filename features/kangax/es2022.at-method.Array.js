// ES6: https://github.com/tc39/proposal-relative-indexing-method/
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
// compat-table: ES2016+ > 2022 features > .at() method on the built-in indexables (tiny) > Array.prototype.at()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var arr = [1, 2, 3];
  return arr.at(0) === 1
    && arr.at(-3) === 1
    && arr.at(1) === 2
    && arr.at(-2) === 2
    && arr.at(2) === 3
    && arr.at(-1) === 3
    && arr.at(3) === undefined
    && arr.at(-4) === undefined;
}

try {
  if (testCode()) {
    console.log("es2022.at-method.Array.js: OK");
  } else {
    console.log("es2022.at-method.Array.js: FAIL");
  }
} catch (e) {
  console.log("es2022.at-method.Array.js: FAIL: " + e);
}