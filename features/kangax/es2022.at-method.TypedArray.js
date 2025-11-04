// ES6: https://github.com/tc39/proposal-relative-indexing-method/
// compat-table: ES2016+ > 2022 features > .at() method on the built-in indexables (tiny) > %TypedArray%.prototype.at()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof globalThis === "undefined") globalThis = this;

function testCode() {
  return [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array'
  ].every(function (TypedArray) {
    var Constructor = globalThis[TypedArray];
    if (typeof Constructor !== 'function') {
      return false;
    }
    var arr = new Constructor([1, 2, 3]);
    return arr.at(0) === 1
      && arr.at(-3) === 1
      && arr.at(1) === 2
      && arr.at(-2) === 2
      && arr.at(2) === 3
      && arr.at(-1) === 3
      && arr.at(3) === undefined
      && arr.at(-4) === undefined;
  });
}

try {
  if (testCode()) {
    console.log("es2022.at-method.TypedArray.js: OK");
  } else {
    console.log("es2022.at-method.TypedArray.js: FAIL");
  }
} catch (e) {
  console.log("es2022.at-method.TypedArray.js: FAIL: " + e);
}