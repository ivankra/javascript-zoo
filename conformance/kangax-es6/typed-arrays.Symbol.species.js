// compat-table: ES6 > built-ins > typed arrays (large) > %TypedArray%[Symbol.species]
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/@@species
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Int8Array[Symbol.species] === "function" &&
      typeof Uint8Array[Symbol.species] === "function" &&
      typeof Uint8ClampedArray[Symbol.species] === "function" &&
      typeof Int16Array[Symbol.species] === "function" &&
      typeof Uint16Array[Symbol.species] === "function" &&
      typeof Int32Array[Symbol.species] === "function" &&
      typeof Uint32Array[Symbol.species] === "function" &&
      typeof Float32Array[Symbol.species] === "function" &&
      typeof Float64Array[Symbol.species] === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.Symbol.species.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.Symbol.species.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.Symbol.species.js: exception: " + e);
}
