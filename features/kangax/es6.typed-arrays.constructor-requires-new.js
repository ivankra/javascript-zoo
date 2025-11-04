// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
// compat-table: ES6 > built-ins > typed arrays (large) > constructors require new
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof global === "undefined") global = this;

function testCode() {
  var buffer = new ArrayBuffer(64);
  var constructors = [
    'ArrayBuffer',
    'DataView',
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array'
  ];
  return constructors.every(function (constructor) {
    try {
      if (constructor in global) {
        global[constructor](constructor === "ArrayBuffer" ? 64 : buffer);
      }
      return false;
    } catch(e) {
      return true;
    }
  });
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.constructor-requires-new.js: OK");
  } else {
    console.log("es6.typed-arrays.constructor-requires-new.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.constructor-requires-new.js: FAIL: " + e);
}