// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/@@species
// compat-table: ES6 > built-ins > typed arrays (large) > ArrayBuffer[Symbol.species]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof ArrayBuffer[Symbol.species] === 'function';
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.ArrayBuffer.Symbol.species.js: OK");
  } else {
    console.log("es6.typed-arrays.ArrayBuffer.Symbol.species.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.ArrayBuffer.Symbol.species.js: FAIL: " + e);
}