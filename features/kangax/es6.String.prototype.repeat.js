// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
// compat-table: ES6 > built-in extensions > String.prototype methods (medium) > String.prototype.repeat
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof String.prototype.repeat === 'function'
    && "foo".repeat(3) === "foofoofoo";
}

try {
  if (testCode()) {
    console.log("es6.String.prototype.repeat.js: OK");
  } else {
    console.log("es6.String.prototype.repeat.js: FAIL");
  }
} catch (e) {
  console.log("es6.String.prototype.repeat.js: FAIL: " + e);
}