// ES6: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-array.prototype.includes
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/includes
// compat-table: ES2016+ > 2016 features > Array.prototype.includes (small) > %TypedArray%.prototype.includes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
  ].every(function (TypedArray) {
    return new TypedArray([1, 2, 3]).includes(1)
    && !new TypedArray([1, 2, 3]).includes(4)
    && !new TypedArray([1, 2, 3]).includes(1, 1);
  });
}

try {
  if (testCode()) {
    console.log("es2016.Array.prototype.includes.typed-array.js: OK");
  } else {
    console.log("es2016.Array.prototype.includes.typed-array.js: FAIL");
  }
} catch (e) {
  console.log("es2016.Array.prototype.includes.typed-array.js: FAIL: " + e);
}