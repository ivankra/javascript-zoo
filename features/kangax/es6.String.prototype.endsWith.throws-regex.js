// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object
// compat-table: ES6 > built-in extensions > String.prototype methods (medium) > String.prototype.endsWith throws on RegExp
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    "a".endsWith(/./);
  } catch(e) {
    return typeof String.prototype.endsWith === 'function';
  }
}

try {
  if (testCode()) {
    console.log("es6.String.prototype.endsWith.throws-regex.js: OK");
  } else {
    console.log("es6.String.prototype.endsWith.throws-regex.js: FAIL");
  }
} catch (e) {
  console.log("es6.String.prototype.endsWith.throws-regex.js: FAIL: " + e);
}