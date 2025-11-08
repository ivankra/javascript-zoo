// compat-table: ES6 > built-in extensions > Date.prototype[Symbol.toPrimitive] (tiny)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/@@toPrimitive
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-date.prototype-@@toprimitive
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var tp = Date.prototype[Symbol.toPrimitive];
  return tp.call(Object(2), "number") === 2
    && tp.call(Object(2), "string") === "2"
    && tp.call(Object(2), "default") === "2";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Date.prototype.Symbol.toPrimitive.js: OK");
  } else {
    console.log("kangax-es6/Date.prototype.Symbol.toPrimitive.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Date.prototype.Symbol.toPrimitive.js: exception: " + e);
}
