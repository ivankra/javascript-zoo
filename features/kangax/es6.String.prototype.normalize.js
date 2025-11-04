// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
// compat-table: ES6 > built-in extensions > String.prototype methods (medium) > String.prototype.normalize
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof String.prototype.normalize === "function"
    && "c\u0327\u0301".normalize("NFC") === "\u1e09"
    && "\u1e09".normalize("NFD") === "c\u0327\u0301";
}

try {
  if (testCode()) {
    console.log("es6.String.prototype.normalize.js: OK");
  } else {
    console.log("es6.String.prototype.normalize.js: FAIL");
  }
} catch (e) {
  console.log("es6.String.prototype.normalize.js: FAIL: " + e);
}